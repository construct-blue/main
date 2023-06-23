<?php

require_once '../vendor/autoload.php';

$data = \Blue\HafasClient\Hafas::createOeBB()->searchTrips('D 346', new DateTime('today 00:00'), new DateTime('today 23:00'));
$data = \Blue\HafasClient\Hafas::createOeBB()->trip($data[0]->id);
echo json_encode($data, JSON_PRETTY_PRINT);