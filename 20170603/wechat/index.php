<?php
// 面向过程版本
/*
define('TOKEN', 'todayisahotday');
$signature = $_GET['signature'];
$timestamp = $_GET['timestamp'];
$nonce = $_GET['nonce'];
$echostr = $_GET['echostr'];
$token = TOKEN;

$tmpArr = array($token, $timestamp, $nonce);
// use SORT_STRING rule
sort($tmpArr, SORT_STRING);
$tmpStr = implode($tmpArr);
$tmpStr = sha1($tmpStr);
if ($tmpStr == $signature) {
  echo $echostr;
  exit;
} else {
  echo 'valid fail';
}
*/
// 引入slog文件
include './php/slog.function.php';
slog('hello world');
slog(array(
'enable'=>true,//是否打印日志的开关
'host'=>'localhost',//websocket服务器地址，默认localhost
'optimize'=>false,//是否显示利于优化的参数，如果运行时间，消耗内存等，默认为false
'show_included_files'=>false,//是否显示本次程序运行加载了哪些文件，默认为false
'error_handler'=>true,//是否接管程序错误，将程序错误显示在console中，默认为false
'force_client_id'=>'todayisahotday',//日志强制记录到配置的client_id,默认为空
'allow_client_ids'=>array()////限制允许读取日志的client_id，默认为空,表示所有人都可以获得日志。
)
,'config');

// 面向对象版本
define('TOKEN', 'todayisahotday');
$obj = new Weixin();
if (isset($_GET['echostr'])) {
  $obj->checkSignature();
} else {
  $obj->receive();
}

class Weixin {
  private $textXml = "<xml>
            <ToUserName><![CDATA[%s]]></ToUserName>
            <FromUserName><![CDATA[%s]]></FromUserName>
            <CreateTime>%s</CreateTime>
            <MsgType><![CDATA[%s]]></MsgType>
            <Content><![CDATA[%s]]></Content>
            </xml>";
  private $imageXml = "<xml>
          <ToUserName><![CDATA[%s]]></ToUserName>
          <FromUserName><![CDATA[%s]]></FromUserName>
          <CreateTime>%s</CreateTime>
          <MsgType><![CDATA[image]]></MsgType>
          <Image>
          <MediaId><![CDATA[%s]]></MediaId>
          </Image>
          </xml>";
  /**
  * 接收用户的消息
  */
  public function receive() {
    $obj = file_get_contents('php://input');
    $post = simplexml_load_string($obj, 'SimpleXMLElement', LIBXML_NOCDATA);

    if (empty($post)) {
      echo sprintf($this->textXml, $post->FromUserName, $post->ToUserName, time(), "text", '无法处理你的内容:'.$post->Content);
    }
    switch(trim($post->MsgType)) {
      case 'text':
        $result = $this->receiveText($post);
        if (!empty($result)) {
          echo $result;exit;
        }
        slog('bug');
        slog($post);
        echo sprintf($this->textXml, $post->FromUserName, $post->ToUserName, time(), "text", '没有这条消息:'.$post->Content);
        break;
      case 'image':
        echo sprintf($this->imageXml, $post->FromUserName, $post->ToUserName, time(), $post->MediaId);
        break;
      case 'event':
        if ($post->Event == 'subscribe') {
          echo sprintf($this->textXml, $post->FromUserName, $post->ToUserName, time(), "text", "欢迎来到250的空间，请回复250获取好玩的内容\n1.250\n2.380");
        }
        break;
    }
  }
  /**
  * 接收文本消息的处理
  */
  private function receiveText($post) {
    $content = trim($post->Content);
    if (strstr($content, "你好")) {
      return sprintf($this->textXml, $post->FromUserName, $post->ToUserName, time(), $post->MsgType, 'Hello');
    }
  }
  /**
  * 接口接入验证
  */
	public function checkSignature() {
    $signature = $_GET["signature"];   //加密签名
    $timestamp = $_GET["timestamp"]; //时间戳
    $nonce = $_GET["nonce"];	//随机数
		$token = TOKEN; //token

		$tmpArr = array($token, $timestamp, $nonce);//组成新数组
		sort($tmpArr, SORT_STRING);//重新排序
		$tmpStr = implode( $tmpArr );//转换成字符串
		$tmpStr = sha1( $tmpStr );  //再将字符串进行加密
		if( $tmpStr == $signature ){
			echo  $_GET['echostr'];
		}else{
			return false;
		}
	}
}
