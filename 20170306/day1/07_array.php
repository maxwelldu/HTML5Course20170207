<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
    $a = array("付荣", "亚倩", "养龙");
?>
<ul>
    <?php
        //for($i = 0; $i < count($a); $i++) {
            ?>
<!--            <li>--><?php //echo $a[$i]; ?><!--</li>-->
            <?php
        //}
    ?>

    <?php
        for($i = 0; $i < count($a); $i++) {
            echo "<li>" . $a[$i] . "</li>";
        }
    ?>
<!--    <li>付荣</li>-->
<!--    <li>亚倩</li>-->
<!--    <li>养龙</li>-->
</ul>
</body>
</html>