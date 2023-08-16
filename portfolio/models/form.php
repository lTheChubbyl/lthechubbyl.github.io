<?php
    header("Content-type: application/json");

    function regExChecker($regEx, $field) {
        if (!preg_match($regEx, $field)) {
            return true;
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        try {
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

            $to = "miloscubrak@gmail.com";
            $subject = "Portfolio Contact Form - {$array["fname"]} {$array["lname"][0]}.";
            $body = "
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
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: {$array["email"]}" . "\r\n";

            if (mail($to, $subject, $body, $headers)) {
                echo "Email successfully sent to $to email...";
            } else {
                echo "Email sending failed...";
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
?>