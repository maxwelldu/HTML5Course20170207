<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
for ($i = 0; $i < 20; $i++) {
    for ($j = 1; $j <= 6; $j++) {
        echo "<h{$j}>付荣萌了</h{$j}>";
    }
}
?>
</body>
</html>