<?php
    //Import PHPMailer classes into the global namespace
    //These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../PHPMailer/src/Exception.php';
    require '../PHPMailer/src/PHPMailer.php';
    require '../PHPMailer/src/SMTP.php';

    header("Content-type: application/json");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        foreach ($_POST as $key => $value) {
            $array[$key] = $value;
        }
        $number = $array["number"] ? $array["number"] : "N/A";

        $errors = array();

        $regExName = "/^[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/";
        if (regExChecker($regExName, $array["fname"])) {
            $errors["fname"] = "Invalid.";
        }
        if (regExChecker($regExName, $array["lname"])) {
            $errors["lname"] = "Invalid.";
        }
        $regExEmail = "/^[\w\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/";
        if (regExChecker($regExEmail, $array["email"])) {
            $errors["email"] = "Invalid.";
        }
        if ($number != "N/A") {
            $regExNumber = "/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/";
            if (regExChecker($regExNumber, $number)) {
                $errors["phone-number"] = "Invalid.";
            }
        }
        $regExMessage = "/^[\s\S]{1,500}$/";
        if (regExChecker($regExMessage, $array["message"])) {
            $errors["message"] = "Invalid.";
        }

        // $to = "miloscubrak@gmail.com";
        // $subject = "Portfolio Contact Form - {$array["fname"]} {$array["lname"][0]}.";
        // $body = "
        //     <html>
        //         <body>
        //             <p><strong>First Name:</strong> {$array["fname"]}</p>
        //             <p><strong>Last Name:</strong> {$array["lname"]}</p>
        //             <p><strong>Email:</strong> {$array["email"]}</p>
        //             <p><strong>Phone Number:</strong> $number</p>
        //             <p><strong>Message:</strong> {$array["message"]}</p>
        //         </body>
        //     </html>
        // ";
        // $headers = "MIME-Version: 1.0" . "\r\n";
        // $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        // $headers .= "From: {$array["email"]}" . "\r\n";

        // if (mail($to, $subject, $body, $headers)) {
        //     echo "Email successfully sent to $to email...";
        // } else {
        //     echo "Email sending failed...";
        // }
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = "smtp.gmail.com";                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = "miloscubrak@gmail.com";                     //SMTP username
            $mail->Password   = "uwljcdcqtgjvlxlv";                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom($array["email"], "{$array["fname"]} {$array["lname"]}");
            $mail->addAddress("miloscubrak@gmail.com");     //Add a recipient
            // $mail->addReplyTo("info@example.com", "Information");
            // $mail->addCC("cc@example.com");
            // $mail->addBCC("bcc@example.com");

            //Attachments
            // $mail->addAttachment("/var/tmp/file.tar.gz");         //Add attachments
            // $mail->addAttachment("/tmp/image.jpg", "new.jpg");    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = "Portfolio Contact Form - {$array["fname"]} {$array["lname"][0]}.";
            $mail->Body = "
                <html>
                    <body>
                        <p><strong>First Name:</strong> {$array["fname"]}</p>
                        <p><strong>Last Name:</strong> {$array["lname"]}</p>
                        <p><strong>Email:</strong> {$array["email"]}</p>
                        <p><strong>Phone Number:</strong> $number</p>
                        <p><strong>Message:</strong> {$array["message"]}</p>
                    </body>
                </html>
            ";
            // $mail->AltBody = "This is the body in plain text for non-HTML mail clients";

            $mail->send();
            echo "Message has been sent";
        } 
        catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    function regExChecker($regEx, $field) {
        if (!preg_match($regEx, $field)) {
            return true;
        }
    }
?>

