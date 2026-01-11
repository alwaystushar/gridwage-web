<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ✅ YOUR EMAIL - GridWage info email
$to_email = 'info@gridwage.com';
$subject = '🆕 New Demo Request - GridWage';

// Get and sanitize form data
$name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING));
$email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$companyName = trim(filter_input(INPUT_POST, 'companyName', FILTER_SANITIZE_STRING));
$companySize = trim(filter_input(INPUT_POST, 'companySize', FILTER_SANITIZE_STRING));
$country = trim(filter_input(INPUT_POST, 'country', FILTER_SANITIZE_STRING));
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING));

// Validate required fields
$errors = [];
if (empty($name)) $errors[] = 'Name is required';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($companyName)) $errors[] = 'Company name is required';
if (empty($companySize)) $errors[] = 'Company size is required';
if (empty($country)) $errors[] = 'Country is required';
if (empty($message)) $errors[] = 'Message is required';

if (!empty($errors)) {
    echo json_encode([
        'success' => false, 
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Build beautiful HTML email body
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>GridWage - New Demo Request</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f8f9ff; border-radius: 8px; border-left: 4px solid #667eea; }
        .field strong { color: #2d3748; display: block; margin-bottom: 5px; }
        .field span { color: #4a5568; }
        .highlight { background: #fff5f5; border-left-color: #e53e3e; }
        .footer { margin-top: 30px; padding: 20px; background: #f7fafc; border-radius: 8px; text-align: center; font-size: 14px; color: #718096; }
    </style>
</head>
<body>
    <div class='header'>
        <h1>🚀 New Demo Request</h1>
        <p>A potential customer wants to try GridWage!</p>
    </div>

    <div class='field'>
        <strong>👤 Full Name</strong>
        <span>" . htmlspecialchars($name) . "</span>
    </div>

    <div class='field'>
        <strong>📧 Work Email</strong>
        <span><a href='mailto:" . htmlspecialchars($email) . "' style='color: #667eea;'>" . htmlspecialchars($email) . "</a></span>
    </div>

    <div class='field'>
        <strong>🏢 Company Name</strong>
        <span>" . htmlspecialchars($companyName) . "</span>
    </div>

    <div class='field'>
        <strong>📊 Company Size</strong>
        <span>" . htmlspecialchars($companySize) . "</span>
    </div>

    <div class='field'>
        <strong>🌍 Country</strong>
        <span>" . htmlspecialchars($country) . "</span>
    </div>

    <div class='field highlight'>
        <strong>💬 Their Message</strong>
        <span>" . nl2br(htmlspecialchars($message)) . "</span>
    </div>

    <div class='footer'>
        <p><strong>📅 Submitted:</strong> " . date('F j, Y \a\t g:i A') . ' IST</p>
        <p>GridWage Demo Requests | info@gridwage.com</p>
    </div>
</body>
</html>
";

// Email headers for professional delivery
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: GridWage Demo <noreply@gridwage.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1'
];

$headers = implode("\r\n", $headers);

// Send the email
$success = mail($to_email, $subject, $email_body, $headers);

// Log for debugging
error_log("GridWage Demo submission: " . ($success ? 'SUCCESS' : 'FAILED') . " from $email to info@gridwage.com");

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! We\'ll get back to you within 24 hours to schedule your demo.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, something went wrong. Please try again or email info@gridwage.com directly.'
    ]);
}
?>
