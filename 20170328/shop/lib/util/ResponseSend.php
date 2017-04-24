<?php

class ResponseSend {
	private $body;
	
	public function __construct($body = null) {
		$this->body = $body;
	}
	public function body() {
		return $this->body;
	}
}