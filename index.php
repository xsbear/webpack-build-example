<?php

require_once('view.php');

$view = new Template();
$view->title = "Hello World app";
$view->properties['name'] = "Jude";

echo $view->render('/home.html');