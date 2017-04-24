<?php

/**
 * 数据库类
 * Class Db
 */
class Db {
	/**
	 * @var DB单例对象
	 */
	static private $_instance;
	/**
	 * @var 数据库连接资源
	 */
	static private $_connectSource;
	/**
	 * @var array 数据库的配置
	 */
	static private $_dbConfig = array(
		'host'          => '127.0.0.1',//MySQL数据库服务器的地址
		'user'          => 'duchengj_web6',//数据库服务器用户名
		'password'      => '123456',//数据库服务器密码
		'database'      => 'duchengj_web6'//数据库名称
	);

	/**
	 * 获取实例对象
	 * @return Db|DB单例对象
	 */
	static public function getInstance() {
		if(!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * 连接数据库
	 * @return mysqli|数据库连接资源
	 */
	public function connect() {
		if(!self::$_connectSource) {
			// 设置正确的报错模式
			mysqli_report(MYSQLI_REPORT_STRICT);

			//异常捕获
			try{
                self::$_connectSource = new mysqli(
					self::$_dbConfig['host'],
					self::$_dbConfig['user'],
					self::$_dbConfig['password'],
					self::$_dbConfig['database']
				);
			} catch(mysqli_sql_exception $e) {
				throw $e;//抛出异常
			}

			self::$_connectSource->set_charset('UTF8');//设置字符集
		}
		return self::$_connectSource;
	}
}

