<?php
/**
 * Contact form handler for static hosting (PHP + SMTP).
 * Configure secrets in contact-config.php (copy from contact-config.example.php).
 */

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

$configPath = __DIR__ . "/contact-config.php";
if (!is_readable($configPath)) {
    http_response_code(500);
    echo json_encode([
        "error" =>
            "Server email is not configured. On the host, copy contact-config.example.php to contact-config.php next to contact.php, then set SMTP password (see file comments).",
    ]);
    exit;
}

/** @var array<string, mixed> $cfg */
$cfg = require $configPath;
$required = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "contact_to", "contact_from_email", "contact_from_name"];
foreach ($required as $k) {
    if (empty($cfg[$k])) {
        http_response_code(500);
        echo json_encode(["error" => "Incomplete contact-config.php (missing $k)."]);
        exit;
    }
}

$raw = file_get_contents("php://input");
$data = json_decode($raw ?? "", true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Please check the form fields and try again."]);
    exit;
}

$adTypes = [
    "College Advertising",
    "Digital Ads",
    "Local Promotions",
    "Brand Campaigns (Hybrid)",
];
$budgetRanges = [
    "Under ₹10k",
    "₹10k–₹25k",
    "₹25k–₹50k",
    "₹50k–₹1L",
    "₹1L+",
];

$name = trim((string) ($data["name"] ?? ""));
$company = trim((string) ($data["company"] ?? ""));
$phone = trim((string) ($data["phone"] ?? ""));
$email = trim((string) ($data["email"] ?? ""));
$adType = $data["adType"] ?? "";
$budgetRange = $data["budgetRange"] ?? "";
$message = trim((string) ($data["message"] ?? ""));

$err = null;
if (strlen($name) < 2) {
    $err = "Please enter your name.";
} elseif (strlen($company) < 2) {
    $err = "Please enter your company name.";
} elseif (strlen($phone) < 8 || strlen($phone) > 20) {
    $err = "Please enter a valid phone number.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $err = "Please enter a valid email.";
} elseif (!in_array($adType, $adTypes, true)) {
    $err = "Please select an ad type.";
} elseif (!in_array($budgetRange, $budgetRanges, true)) {
    $err = "Please select a budget range.";
} elseif (strlen($message) < 10) {
    $err = "Please share a few details (at least 10 characters).";
}

if ($err !== null) {
    http_response_code(400);
    echo json_encode(["error" => $err]);
    exit;
}

$subject = "ED10X Lead — {$adType} — {$company}";
$text = implode("\n", [
    "Name: {$name}",
    "Company: {$company}",
    "Phone: {$phone}",
    "Email: {$email}",
    "Ad Type: {$adType}",
    "Budget: {$budgetRange}",
    "",
    "Message:",
    $message,
]);

$fromEmail = (string) $cfg["contact_from_email"];
$fromName = (string) $cfg["contact_from_name"];
$to = (string) $cfg["contact_to"];

try {
    smtp_send_mail($cfg, $fromEmail, $fromName, $to, $email, $subject, $text);
} catch (Throwable $e) {
    error_log("[ED10X contact.php] " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Could not send email. Please try again later."]);
    exit;
}

echo json_encode(["ok" => true]);

/**
 * @param array<string, mixed> $cfg
 *
 * @throws RuntimeException
 */
function smtp_send_mail(
    array $cfg,
    string $fromEmail,
    string $fromName,
    string $to,
    string $replyTo,
    string $subject,
    string $body
): void {
    $host = (string) $cfg["smtp_host"];
    $port = (int) $cfg["smtp_port"];
    $user = (string) $cfg["smtp_user"];
    $pass = (string) $cfg["smtp_pass"];

    $verifyPeer = empty($cfg["smtp_tls_insecure"]);
    $ctx = stream_context_create([
        "ssl" => [
            "verify_peer" => $verifyPeer,
            "verify_peer_name" => $verifyPeer,
            "allow_self_signed" => !$verifyPeer,
        ],
    ]);

    $ehloHost = smtp_ehlo_hostname($fromEmail);
    $useStartTls = $port === 587 || (!empty($cfg["smtp_encryption"]) && strtolower((string) $cfg["smtp_encryption"]) === "starttls");

    if ($useStartTls && $port !== 465) {
        $fp = @stream_socket_client(
            "tcp://{$host}:{$port}",
            $errno,
            $errstr,
            45,
            STREAM_CLIENT_CONNECT,
            $ctx
        );
        if (!$fp) {
            throw new RuntimeException("SMTP TCP connect failed: {$errstr} ({$errno})");
        }
        stream_set_timeout($fp, 45);
        smtp_expect($fp, [220]);
        smtp_cmd($fp, "EHLO {$ehloHost}", [250]);
        smtp_cmd($fp, "STARTTLS", [220]);
        $cryptoOk = @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        if (!$cryptoOk) {
            fclose($fp);
            throw new RuntimeException("STARTTLS negotiation failed");
        }
        smtp_cmd($fp, "EHLO {$ehloHost}", [250]);
    } else {
        $fp = @stream_socket_client(
            "ssl://{$host}:{$port}",
            $errno,
            $errstr,
            45,
            STREAM_CLIENT_CONNECT,
            $ctx
        );
        if (!$fp) {
            throw new RuntimeException("SMTP SSL connect failed: {$errstr} ({$errno})");
        }
        stream_set_timeout($fp, 45);
        smtp_expect($fp, [220]);
        smtp_cmd($fp, "EHLO {$ehloHost}", [250]);
    }

    smtp_cmd($fp, "AUTH LOGIN", [334]);
    smtp_cmd($fp, base64_encode($user), [334]);
    smtp_cmd($fp, base64_encode($pass), [235]);

    smtp_cmd($fp, "MAIL FROM:<{$fromEmail}>", [250]);
    smtp_cmd($fp, "RCPT TO:<{$to}>", [250, 251]);
    smtp_cmd($fp, "DATA", [354]);

    $encodedSubject = smtp_mime_header_encode($subject);
    $fromHeader = smtp_mime_header_encode($fromName) . " <{$fromEmail}>";

    $headers = [
        "From: {$fromHeader}",
        "To: {$to}",
        "Reply-To: {$replyTo}",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit",
        "Subject: {$encodedSubject}",
    ];

    $bodyNorm = str_replace("\r\n", "\n", $body);
    $bodyNorm = str_replace("\r", "\n", $bodyNorm);
    $bodyStuffed = smtp_dot_stuff($bodyNorm);

    $payload = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n", "\r\n", $bodyStuffed) . "\r\n.";
    fwrite($fp, $payload . "\r\n");
    smtp_expect($fp, [250]);
    smtp_cmd($fp, "QUIT", [221]);
    fclose($fp);
}

function smtp_ehlo_hostname(string $fromEmail): string {
    $at = strpos($fromEmail, "@");
    if ($at !== false && $at < strlen($fromEmail) - 1) {
        return substr($fromEmail, $at + 1);
    }
    $h = $_SERVER["HTTP_HOST"] ?? "";
    $h = preg_replace("/:\d+$/", "", $h);
    return $h !== "" ? $h : "localhost";
}

function smtp_mime_header_encode(string $text): string {
    if (function_exists("mb_encode_mimeheader")) {
        return mb_encode_mimeheader($text, "UTF-8", true);
    }
    return "=?UTF-8?B?" . base64_encode($text) . "?=";
}

function smtp_dot_stuff(string $body): string {
    $lines = explode("\n", $body);
    $out = [];
    foreach ($lines as $line) {
        if ($line !== "" && $line[0] === ".") {
            $out[] = "." . $line;
        } else {
            $out[] = $line;
        }
    }
    return implode("\n", $out);
}

/**
 * @param resource $fp
 * @param int[] $codes
 */
function smtp_expect($fp, array $codes): void {
    $line = fgets($fp, 8192);
    if ($line === false) {
        throw new RuntimeException("SMTP read failed (no data)");
    }
    $code = (int) substr($line, 0, 3);
    while (isset($line[3]) && $line[3] === "-") {
        $line = fgets($fp, 8192);
        if ($line === false) {
            throw new RuntimeException("SMTP read failed (multiline)");
        }
    }
    if (!in_array($code, $codes, true)) {
        throw new RuntimeException("SMTP unexpected response: " . trim($line));
    }
}

/**
 * @param resource $fp
 * @param int[] $codes
 */
function smtp_cmd($fp, string $cmd, array $codes): void {
    fwrite($fp, $cmd . "\r\n");
    smtp_expect($fp, $codes);
}
