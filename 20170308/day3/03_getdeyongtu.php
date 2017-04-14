<?php
//得到GET传参的值
    $zhuangtai = $_GET['zhuangtai'];
    //连接数据库
    $con = mysqli_connect('localhost','duchengj_web6','123456', "duchengj_web6");
//    $con = mysqli_connect('localhost','root','', "mydb");
    //设置字符集
    mysqli_query($con, "SET NAMES UTF8");
    //写查询SQL语句
//    $sql = "SELECT * FROM quest WHERE `class` = '{$zhuangtai}'";
    $sql = "SELECT * FROM quest ";
//    $sql = "SELECT * FROM xinwen WHERE  title = '{$zhuangtai}'";
//    $sql = "SELECT * FROM xinwen";
//echo $sql;
    //进行查询
    $result = mysqli_query($con, $sql);
//    print_r($result);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<script>
    /**
     * 根据不同满意程度显示出调查问卷对应的内容
     * 1.写一个页面，显示出某个满意程度的问卷内容
     * 2.满意程度用GET传参的形式传递
     * 3.选择框里面被选择的内容是当前满意程度
     * 4.选择框里的内容更新后，页面跳转
     */
</script>

<h1>本页面要求有zhuangtai的get参数</h1>
<select name="" id="">
<!--    <option --><?php //if($zhuangtai=="满意"){echo "selected";} ?><!-- value="满意">满意</option>-->
<!--    <option --><?php //if($zhuangtai=="一般"){echo "selected";} ?><!-- value="一般">一般</option>-->
<!--    <option --><?php //if($zhuangtai=="不满意"){echo "selected";} ?><!-- value="不满意">不满意</option>-->
        <option <?php if($zhuangtai=="非常不满意"){echo "selected";} ?> value="非常不满意">非常不满意</option>
        <option <?php if($zhuangtai=="非常好"){echo "selected";} ?> value="非常好">非常好</option>
</select>
<script>
    var oSelect = document.getElementsByTagName("select")[0];
    oSelect.onchange = function(){
//        alert(this.value);
        //改变网址
        window.location = "03_getdeyongtu.php?zhuangtai=" + this.value;
    }
</script>

<!--table>tr*2>td*3-->
<table>
    <tr>
        <td>选项1</td>
        <td>选项2</td>
        <td>选项3</td>
    </tr>
    <?php
    while($row = mysqli_fetch_array($result)){
    ?>
    <tr>
        <td><?php echo $row['title'] ?></td>
        <td><?php echo $row['content'] ?></td>
        <td><?php echo $row['date'] ?></td>
    </tr>
    <?php
    }
    mysqli_close($con);
    ?>
</table>
</body>
</html>