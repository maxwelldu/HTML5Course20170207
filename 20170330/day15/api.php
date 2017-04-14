<?php
/**
 * Created by PhpStorm.
 * User: maxwelldu
 * Date: 2017/3/30
 * Time: 14:28
API是应用程序接口
写一个API对应的PHP文件
1、接收前端的参数
2、参数校验
3、SQL语句组装
4、PHP执行SQL语句查询
5、响应数据处理（JSON）

API需求：
1.添加栏目
2.查询所有栏目数据（状态是显示）
3.添加新闻
4.查询特定栏目的新闻列表
5.查询某条新闻
6.更新新闻的阅读数
7.添加评论
8.查询评论
 */

//通用处理
//设置响应的数据类型
header('Content-Type:application/json');
//设置时区
date_default_timezone_set('PRC');
//定义数据库信息
define('DB_HOST', 'localhost');
define('DB_NAME', 'web6cms');
define('DB_USER', 'root');
define('DB_PASS', '');
//数据库连接
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (mysqli_connect_errno($conn)) {
    return response(2,'数据库连接失败');
}
mysqli_set_charset($conn, "utf8");


/**
 * 处理增删改查的函数
 * @param string $sql 需要执行的SQL语句
 * @return array|bool|int|string
 */
function DB($sql = '') {
    global $conn;
    if ($sql == '') return false;
    $result = mysqli_query($conn, $sql);
    if (!$result) return array();
    $sql = strtolower($sql);
    if(substr_count($sql, 'select')) {
        $rows = array();
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $rows[] = $row;
        }
        return $rows;
    } elseif (substr_count($sql, 'insert')) {
        return mysqli_insert_id($conn);
    } else {
        $affected_rows = mysqli_affected_rows($conn);
        return $affected_rows > 0 ? $affected_rows : 0;
    }
}

/**
 * 返回API数据
 * @param int $code 错误码 0表示成功  1表示失败
 * @param string $message 返回信息
 * @param array $data 返回的数据
 */
function response($code, $message = '', $data = array()) {
    $result = array(
        'code' => $code,
        'message' => $message,
        'data' => $data
    );
    echo json_encode($result);
    exit;
}
/**
 * 新闻资讯API
 * Class Api
 */
class Api {
    /**
     * 添加栏目
     */
    public function addCategory(){
        $cat_name = isset($_POST['cat_name']) ? $_POST['cat_name'] : "";
        $cat_desc = isset($_POST['cat_desc']) ? $_POST['cat_desc'] : "";
        if ($cat_name == "") {
            response(2,'分类名称必须要有');
        }

        //组装SQL语句
        $sql = "INSERT INTO cms_category(`cat_name`,`cat_desc`)
            VALUES('".$cat_name."','".$cat_desc."')";
//        echo $sql;
        $result = DB($sql);
        if ($result) {
            response(0, 'ok');
        } else {
            response(1, 'fail');
        }
    }

    /**
     * 显示栏目
     */
    public function showCategory() {
        $sql = "SELECT * FROM `cms_category` WHERE `cat_status` = 1";
        $result = DB($sql);
        if ($result) {
            response(0, 'ok', $result);
        } else {
            response(1, 'fail');
        }
    }

    /**
     * 添加新闻
     */
    public function addNews() {

    }

    /**
     * @param int $cat_id 新闻栏目编号
     */
    public function showNewsByCatId($cat_id) {

    }

    /**
     * 根据新闻编号查询新闻
     * @param int $news_id 新闻编号
     */
    public function showNewsById($news_id) {

    }

    /**
     * 更新新闻的阅读数
     * @param int $news_id 新闻编号
     */
    public function updateNewsReadCount($news_id) {

    }

    /**
     * 添加评论
     * @param array $comment 评论
     */
    public function addComment($comment) {

    }

    /**
     * 查询某条新闻的评论
     * @param int $news_id 新闻编号
     */
    public function showCommentsByNewsId($news_id) {

    }

}
//1.接受前端的参数
$a = isset($_GET['a']) ? $_GET['a'] : ""; //a表示action，具体的动作
//2.参数校验
if (!in_array($a, array(
    'addCategory',
    'showCategory',
    'addNews',
    'showNewsByCatId',
    'showNewsById',
    'updateNewsReadCount',
    'addComment',
    'showCommentsByNewsId'
))) {
    return response(1, '参数传错咯, 参数只能是（addCategory, showCategory, addNews, showNewsByCatId, showNewsById, updateNewsReadCount, addComment, showCommentsByNewsId）');
}
//3.调用对应的API
$api = new Api();
switch($a) {
    case 'addCategory': {
        $api->addCategory();
        break;
    }
    case 'showCategory': {
        $api->showCategory();
        break;
    }
    case 'addNews': {
        $api->addNews();
        break;
    }
    case 'showNewsByCatId': {
        $cat_id = isset($_GET['cat_id']) ? intval($_GET['cat_id']) : 0;
        $api->showNewsByCatId($cat_id);
        break;
    }
    case 'showNewsById': {
        $news_id = isset($_GET['news_id']) ? intval($_GET['news_id']) : 0;
        $api->showNewsById($news_id);
        break;
    }
    case 'updateNewsReadCountByNewsId': {
        $news_id = isset($_GET['news_id']) ? intval($_GET['news_id']) : 0;
        $api->updateNewsReadCount($news_id);
        break;
    }
    case 'addComment': {
        $api->addComment();
        break;
    }
    case 'showCommentsByNewsId':
    {
        $api->showCommentsByNewsId();
        break;
    }
}


