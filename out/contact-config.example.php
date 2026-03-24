<?php
/**
 * On the server: copy this file to contact-config.php (same folder as contact.php).
 * Set smtp_pass to the real mailbox password (Hostinger → Email → Configure / Manual settings).
 *
 * If 465 fails, try port 587 (STARTTLS) — uncomment the 587 block and comment out 465.
 * If you get SSL/certificate errors, set "smtp_tls_insecure" => true (last resort only).
 * Do not commit contact-config.php to Git.
 */
return [
    "smtp_host" => "smtp.hostinger.com",

    // Try 587 first if 465 fails (Hostinger often documents both).
    "smtp_port" => 587,
    // "smtp_port" => 465,

    "smtp_user" => "support@ed10x.com",
    "smtp_pass" => "PASTE_YOUR_MAILBOX_PASSWORD_HERE",
    "contact_to" => "support@ed10x.com",
    "contact_from_email" => "support@ed10x.com",
    "contact_from_name" => "ED10X",

    // "smtp_encryption" => "starttls", // optional hint when using 587
    // "smtp_tls_insecure" => true,    // only if TLS verify fails on shared hosting
];
