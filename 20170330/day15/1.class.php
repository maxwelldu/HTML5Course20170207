<?php
/**
 * Created by PhpStorm.
 * User: sks
 * Date: 2017/3/30
 * Time: 14:44
 */

class Api {
    public $format = "json";

    public function show() {
        echo $this->format;
    }
}
$api = new Api();
$api->show();