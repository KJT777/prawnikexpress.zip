<?php

error_reporting(0);

$mailToSend = "trzebiatowska@vp.pl";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $antybot = $_POST["honey"];

        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8". "\r\n";
        $headers .= "From: ".$email."\r\n";
        $headers .= "Reply-to: ".$email;

        $content = '
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                '.$message.'
            </html>';

            if (mail($mailToSend, "Zamówienie! Prawnikexpress", $content, $headers)) {
                $return["status"] = "ok";
            } else {
                $return["status"] = "error";
            }

    header("Content-Type: application/json");
    echo json_encode($return);
}