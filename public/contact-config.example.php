<?php
/**
 * On the server: copy this file to contact-config.php (same folder as contact.php, e.g. out/ or public_html).
 * Set smtp_pass to the real password for support@ed10x.com (Hostinger → Email → your mailbox).
 * Do not commit contact-config.php to Git.
 */
return [
    "smtp_host" => "smtp.hostinger.com",
    "smtp_port" => 465,
    "smtp_user" => "support@ed10x.com",
    "smtp_pass" => "PASTE_YOUR_MAILBOX_PASSWORD_HERE",
    "contact_to" => "support@ed10x.com",
    "contact_from_email" => "support@ed10x.com",
    "contact_from_name" => "ED10X",
];
