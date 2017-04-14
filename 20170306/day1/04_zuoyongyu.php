<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
    $a = 300;
    function fun() {
        global $a;
        echo $a;
    }
    fun();
?>
</body>
</html>