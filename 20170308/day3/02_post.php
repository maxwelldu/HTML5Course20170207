<?php
print_r($_POST);
$title = $_POST['title'];
$content = $_POST['content'];
$date = $_POST['date'];

echo "我们已经收到您的表单";
echo $title . $content . $date;

?>
