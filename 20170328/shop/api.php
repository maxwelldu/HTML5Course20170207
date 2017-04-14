<?php
require_once('./common.php');

/**
 * 通用API(涉及到需要用户登录才能操作的接口继承自这个类,进行了TOKEN验证)
 * Class Api
 */
class Api extends Common {
    protected $token;//用户的TOKEN
    protected $user_id;//用户的ID

    /**
     * 验证用户Token是否过期,是否合法
     * Api constructor.
     */
    public function __construct()
    {
        parent::__construct();

        //如果请求方式是OPTIONS, 则直接返回
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            return Response::show(CODE_SUCCESS, 'ok');
        }

        //获取header中的token
        $this->token = isset($_SERVER['HTTP_TOKEN']) ? $_SERVER['HTTP_TOKEN'] : '';
        $this->user_id = $this->getUserIdByToken($this->token);
        if (empty($this->token)) {
            return Response::show(CODE_TOKEN_EMPTY,'调用API请在header中传递TOKEN参数');
        }

        $user_id = $this->getUserIdByToken($this->token);
        if (!$user_id) {
            return Response::show(CODE_TOKEN_ERR, '用户Token无效');
        }
    }
}
