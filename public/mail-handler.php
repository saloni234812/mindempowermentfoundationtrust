<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Handle preflight options request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data) {
        $type = isset($data['form_type']) ? $data['form_type'] : 'volunteer';
        $to = "mindempowermentfoundationtrust@gmail.com";
        
        if ($type === 'contact') {
            $name = strip_tags($data['name']);
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $phone = isset($data['phone']) ? strip_tags($data['phone']) : 'N/A';
            $subjectLine = isset($data['subject']) ? strip_tags($data['subject']) : 'New Contact Inquiry';
            $messageText = strip_tags($data['message']);

            $subject = "New Contact Inquiry: " . $subjectLine;
            $message = "
            <html>
            <head>
                <title>Contact Form Submission</title>
            </head>
            <body style='font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333333;'>
                <div style='max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 25px; background-color: #ffffff;'>
                    <h2 style='color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-top: 0;'>New Contact Message Received</h2>
                    <p><b>Name:</b> {$name}</p>
                    <p><b>Email:</b> <a href='mailto:{$email}' style='color: #ea580c; text-decoration: none;'>{$email}</a></p>
                    <p><b>Phone:</b> {$phone}</p>
                    <p><b>Subject:</b> {$subjectLine}</p>
                    <h4 style='color: #ea580c; margin-top: 20px; margin-bottom: 8px;'>Message:</h4>
                    <div style='background-color: #f9f9f9; border-left: 4px solid #ea580c; padding: 15px; border-radius: 4px; font-style: italic;'>
                        " . nl2br($messageText) . "
                    </div>
                    <hr style='border: 0; border-top: 1px solid #eeeeee; margin-top: 30px;' />
                    <p style='font-size: 11px; color: #888888; text-align: center; margin-bottom: 0;'>Submitted via MEFT Contact Portal</p>
                </div>
            </body>
            </html>
            ";
        } else {
            // Volunteer form
            $name = strip_tags($data['name']);
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $phone = strip_tags($data['phone']);
            $location = strip_tags($data['location']);
            $availability = strip_tags($data['availability']);
            $skills = is_array($data['skills']) ? implode(', ', $data['skills']) : strip_tags($data['skills']);
            $statement = strip_tags($data['statement']);

            $subject = "New Volunteer Application: " . $name;
            $message = "
            <html>
            <head>
                <title>New Volunteer Application</title>
            </head>
            <body style='font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333333;'>
                <div style='max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 25px; background-color: #ffffff;'>
                    <h2 style='color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-top: 0;'>New Volunteer Registration</h2>
                    <table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>
                        <tr style='border-bottom: 1px solid #eeeeee;'><td style='padding: 10px; font-weight: bold; width: 35%; color: #555555;'>Name:</td><td style='padding: 10px; font-weight: 600;'>{$name}</td></tr>
                        <tr style='border-bottom: 1px solid #eeeeee;'><td style='padding: 10px; font-weight: bold; color: #555555;'>Email:</td><td style='padding: 10px;'><a href='mailto:{$email}' style='color: #ea580c; text-decoration: none;'>{$email}</a></td></tr>
                        <tr style='border-bottom: 1px solid #eeeeee;'><td style='padding: 10px; font-weight: bold; color: #555555;'>Phone:</td><td style='padding: 10px;'>{$phone}</td></tr>
                        <tr style='border-bottom: 1px solid #eeeeee;'><td style='padding: 10px; font-weight: bold; color: #555555;'>Location:</td><td style='padding: 10px;'>{$location}</td></tr>
                        <tr style='border-bottom: 1px solid #eeeeee;'><td style='padding: 10px; font-weight: bold; color: #555555;'>Availability:</td><td style='padding: 10px; text-transform: capitalize;'>{$availability}</td></tr>
                        <tr style='border-bottom: 1px solid #eeeeee;'><td style='padding: 10px; font-weight: bold; color: #555555;'>Skills Offered:</td><td style='padding: 10px; font-weight: 500;'>{$skills}</td></tr>
                    </table>
                    <h4 style='color: #ea580c; margin-top: 20px; margin-bottom: 8px;'>Statement of Purpose:</h4>
                    <div style='background-color: #fffaf0; border-left: 4px solid #ea580c; padding: 15px; border-radius: 4px; font-style: italic;'>
                        " . nl2br($statement) . "
                    </div>
                    <hr style='border: 0; border-top: 1px solid #eeeeee; margin-top: 30px;' />
                    <p style='font-size: 11px; color: #888888; text-align: center; margin-bottom: 0;'>Submitted via MEFT Volunteer Portal</p>
                </div>
            </body>
            </html>
            ";
        }

        // Setup headers for HTML email format
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: MEFT Portal <noreply@" . $_SERVER['HTTP_HOST'] . ">" . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(array("success" => true, "message" => "Email notification processed successfully."));
        } else {
            echo json_encode(array("success" => false, "message" => "Mail transmission failed. Verify server configuration."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid request payload."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method."));
}
?>
