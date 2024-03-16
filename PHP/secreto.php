<?php
date_default_timezone_set("America/Mazatlan");
$ip = $_POST["ip"];
$hora = date("Y-m-d h:i:sa");
$gestor = fopen("secretoAbierto.txt", "a");
if ($ip == "187.188.228.51") {
    $ip = $ip . " Luis";
}
if ($ip == "64.32.79.190") {
    $ip = $ip . " Marié";
}
if ($ip == "190.167.117.159") {
    $ip = $ip . " Marié (2)";
}
fwrite($gestor, "Hora: $hora. IP: $ip\n");
fclose($gestor);
?>