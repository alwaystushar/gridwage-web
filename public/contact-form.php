<?php
// contact-form.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ========================================
// LOCALHOST DETECTION (dev mode)
// ========================================
$host = $_SERVER['HTTP_HOST']
    ?? ($_SERVER['SERVER_NAME'] ?? ($_SERVER['HTTP_X_FORWARDED_HOST'] ?? ''));

$isLocalhost = (
    stripos($host, 'local') !== false ||
    stripos($host, '127.') !== false ||
    stripos($host, '0.0.0.0') !== false ||
    $host === 'localhost' ||
    empty($host)
);

if ($isLocalhost) {
    // Do NOT send email on localhost, just simulate success
    sleep(1);
    echo json_encode([
        'success' => true,
        'message' => '✅ Form works perfectly! (Localhost test mode)',
    ]);
    exit;
}

// ========================================
// PRODUCTION – VALIDATE FIELDS
// ========================================
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$company = trim($_POST['company'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

if (strlen($name) < 2 || strlen($name) > 100) {
    $errors[] = 'Name must be 2–100 characters.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 100) {
    $errors[] = 'Please enter a valid email address.';
}

if (strlen($message) < 10 || strlen($message) > 1000) {
    $errors[] = 'Message must be 10–1000 characters.';
}

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors),
    ]);
    exit;
}

// ========================================
// SEND EMAIL (Hostinger-friendly)
// ========================================

// CHANGE THESE TWO TO YOUR REAL ADDRESSES
$to   = 'info@gridwage.com';          // where you receive messages
$from = 'info@gridwage.com';      // must be a real mailbox on your domain

$subject = '🔔 New Contact Form - GridWage';

// Build headers
$headers = [
    "From: GridWage Contact Form <{$from}>",
    "Reply-To: " . $email,
    "X-Mailer: PHP/" . phpversion(),
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
];

// Escape content for HTML
$escName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$escEmail   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$escCompany = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$escMsg     = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$ip         = htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? 'unknown', ENT_QUOTES, 'UTF-8');
$submitted  = date('M j, Y g:i A');

// Build HTML body
$email_body = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background:#f5f5f7;'>
  <h2 style='color: #7C3AED; margin-top:0;'>🔔 New Contact Form</h2>

  <div style='background: #ffffff; padding: 20px 24px; border-radius: 12px; margin: 20px 0; border:1px solid #eee;'>
    <table style='width: 100%; border-collapse: collapse;'>
      <tr>
        <td style='padding: 4px 16px 4px 0; font-weight: 600; width: 90px;'>Name:</td>
        <td><strong>{$escName}</strong></td>
      </tr>
      <tr>
        <td style='padding: 4px 16px 4px 0; font-weight: 600;'>Email:</td>
        <td><strong style='color: #7C3AED;'>{$escEmail}</strong></td>
      </tr>
      <tr>
        <td style='padding: 4px 16px 4px 0; font-weight: 600;'>Company:</td>
        <td><strong>{$escCompany}</strong></td>
      </tr>
    </table>
  </div>

  <div style='background: #f0f4f8; padding: 20px 24px; border-radius: 12px; border:1px solid #e1e7ef;'>
    <h3 style='margin-top: 0; margin-bottom: 8px;'>Message</h3>
    <p style='margin-top: 0; white-space: pre-wrap; line-height: 1.5;'>{$escMsg}</p>
    <p style='font-size: 13px; color: #666; margin-top: 20px;'>
      <strong>Submitted:</strong> {$submitted}<br>
      <strong>IP:</strong> {$ip}
    </p>
  </div>
</body>
</html>
";

// Send
$sent = mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => "Thank you! We'll reply within 24 hours.",
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email send failed. Please try again later.',
    ]);
}
