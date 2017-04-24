<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
for ($i = 0; $i < 100; $i++) {
?>
<p><input type="<?php echo ($i % 5 == 0) ? 'radio' : 'text'  ?>"></p>
<?php
}
?>
</body>
</html>