<?php

declare(strict_types=1);

require '../../../vendor/autoload.php';

chdir(dirname(__DIR__));

$http = Blue\Snappy\Core\Http::htmlApp();
$http->initAssets(__DIR__ . '/static/assets-manifest.json');
$http->onGET('index', '/', new Blue\Example\IndexHandler());
