<?php
// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: https://0hbbj4q2-3002.usw3.devtunnels.ms');
date_default_timezone_set("America/Mazatlan");
$fecha = date("d/m/Y");
// echo date_create($fecha)->modify('-20 days')->format("d-m-Y");
echo $fecha;
?>