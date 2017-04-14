<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .box{
            width:700px;
            height: 500px;
            border: 1px solid #ccc;
            overflow-x:hidden;
        }
        .hua{
            border-bottom:1px solid #ccc;
            background-color: #ccc;
        }
        .hua:nth-child(2n) {
            background-color:skyblue;
        }
    </style>
</head>
<?php
if(!isset($_SESSION['username'])){
    echo "你还没起名字！休想黑我！！请去<a href='index.html'>登录</a>";
    exit;
}
?>
<body>
<!--div.box>div.hua-->
<div class="box" id="box">
    <div class="hua">正在读取...</div>
</div>
<div class="fayan">
    <?php echo $_SESSION['username']; ?> 你好，请发言：
    <input type="text" style="width:700px" id="kk" placeholder="按回车发布" />
    <input type="button" value="发送" id="btn">
</div>


<script src="js/json2.js"></script>
<script src="js/myajax.js"></script>
<script>
/**
读取聊天室内容API：
请求地址：http://duchengjiu.top/ucai_classmates/6qi/duchengjiu/chat/api/read.php
请求方式：GET
返回结果：{
       "result": [
         {
           "0": "2",
           "1": "maxwelldu",
           "2": "你是谁",
           "3": "0",
           "id": "2",
           "username": "maxwelldu",
           "content": "你是谁",
           "create_time": "0"
         },
         {
           "0": "1",
           "1": "maxwelldu",
           "2": "",
           "3": "0",
           "id": "1",
           "username": "maxwelldu",
           "content": "",
           "create_time": "0"
         }
       ]
     }

发送聊天内容API：
请求地址：http://duchengjiu.top/ucai_classmates/6qi/duchengjiu/chat/api/write.php
请求方式：POST
请求参数：content
返回内容：
    {
       "result": "ok"  //ok表示发送成功，wrong表示发送失败
     }
*/
    var oBox = document.getElementById("box");
    setInterval(function(){
        //ajax请求读取聊天内容
        myajax.get("http://duchengjiu.top/ucai_classmates/6qi/duchengjiu/chat/api/read.php",
        {}, function(err, data){
            oBox.innerHTML = "";
            var obj = JSON.parse(data);
            //console.log(obj);
            var avatars = obj.avatars;
            console.log(avatars);
            for(var i = 0; i < obj.result.length; i++){
                var o = obj.result[i];
                oBox.innerHTML += "<div class='hua'><b>" + o.username + "</b> 在 " + o.create_time + "说：<br />" + o.content + "</div>";
                //oBox.innerHTML += "<img src='" + avatars[0] + "' />";
            }
        });
    }, 1000);

    var kk = document.getElementById("kk");
    kk.onkeydown = function(e){
        e = e || window.event;
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            sendMessage();
        }
    }
    var oBtn = document.getElementById("btn");
    oBtn.onclick = sendMessage;

    function sendMessage() {
        var content = kk.value;
        //使用ajax发送post请求，将聊天内容提交到服务器上
        myajax.post("http://duchengjiu.top/ucai_classmates/6qi/duchengjiu/chat/api/write.php",
        {"content":content}, function(err,data){
            kk.value = "";
        });
    }
</script>
</body>
</html>