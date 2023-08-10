<?php
    header("Content-type: application/json");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        try {
            echo "cunt";
        } catch (\Throwable $th) {
            //throw $th;
            echo "twat";
        }
    }
?>