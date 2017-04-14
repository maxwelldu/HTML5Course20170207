<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
    print_r($_GET);
    $age = $_GET['age'];

    if ($age >= 22) {
        echo "你可以结婚, 老男人";
    } else {
        echo "你这个小男孩还不能结婚呢";
    }

?>
</body>
</html>