<?php
    function insertLog() {
        $file = fopen("data/log.txt", "a");
        $date = date("Y-m-d");
        $time = date("H:i:s");
        

        fwrite($file, "$date | $time | {$_SERVER["REMOTE_ADDR"]} \n");

        fclose($file);
    }
?>