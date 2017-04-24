<?php

/**
 * 响应类
 * Class Response
 */
class Response {
	const JSON = "json";
	/**
	 * 按综合方式输出通信数据
	 * @param integer $code 状态码
	 * @param string $message 提示信息
	 * @param array $data 数据
	 * @return string
	 */
	public static function show($code, $message = '', $data = array()) {
		if(!is_numeric($code)) {
			return '';
		}

		$type = isset($_GET['format']) ? $_GET['format'] : self::JSON;

		$result = array(
			'code' => $code,
			'message' => $message,
			'data' => $data,
		);

		if($type == 'json') {
			self::json($result);
			exit;
		} elseif($type == 'array') {
			var_dump($result);
		} elseif($type == 'xml') {
			self::xmlEncode($result);
			exit;
		} elseif($type == 'jsonp'){
			self::jsonp($result);
			exit;
		} else {

		}
	}


	/**
	 * @param $result
	 */
	public static function jsonp($result) {
		$callback = isset($_GET['callback']) ? $_GET['callback'] : '';
		if (empty($callback)) {
			return Response::json(array(CODE_PARAM_ERR, 'jsonp方式调用，请传统callback参数'));
		}

		header('Content-Type:application/json');
		echo $callback.'('.json_encode($result).')';
		exit;
	}
	/**
	 * 按json方式输出通信数据
	 * @param $result
	 * return string
	 */
	public static function json($result) {
		echo json_encode($result);
		exit;
	}

	/**
	* 按xml方式输出通信数据
	* @param $result
    * return string
	*/
	public static function xmlEncode($result) {

		header("Content-Type:text/xml");
		$xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
		$xml .= "<root>\n";

		$xml .= self::xmlToEncode($result);

		$xml .= "</root>";
		echo $xml;
	}

	public static function xmlToEncode($data) {
		$xml = $attr = "";
		foreach($data as $key => $value) {
			if(is_numeric($key)) {
				$attr = " id='{$key}'";
				$key = "item";
			}
			$xml .= "<{$key}{$attr}>";
			$xml .= is_array($value) ? self::xmlToEncode($value) : $value;
			$xml .= "</{$key}>\n";
		}
		return $xml;
	}

}
