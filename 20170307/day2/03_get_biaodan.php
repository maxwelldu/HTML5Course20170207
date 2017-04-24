<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form method="get" action="04_insert.php">
    <p>
        请输入标题 ：
        <input type="text" name="title">
    </p>
    <p>
        请输入内容 ：
        <input type="text" name="content">
    </p>
    <p>
        请输入日期 ：
        <input type="text" name="date">
    </p>
    <p>
        <input type="submit">
    </p>
</form>


你的状态是：
<input type="radio" name="timu1" value="非常明白"> 非常明白
<input type="radio" name="timu1" value="比较明白"> 非常明白
<input type="radio" name="timu1" value="一般"> 非常明白
<input type="radio" name="timu1" value="懵逼"> 非常明白
你觉得老师应该：
<input type="radio" name="timu2" value="再快一点"> 非常明白
<input type="radio" name="timu2" value="刚刚好"> 非常明白
<input type="radio" name="timu2" value="再慢一点"> 非常明白
意见和建议：
<textarea name="timu3" id="" cols="30" rows="10"></textarea>
<input type="submit">

</body>
</html>