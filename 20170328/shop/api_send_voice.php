<?php
require_once './lib/SendCloudSMS.php';
require_once './lib/util/SMS.php';
function sendVoice(){
	$SMS_USER = "***";
	$SMS_KEY = "***";
	$sendSms=new SendCloudSMS($SMS_USER, $SMS_KEY);
	$voiceMsg=new VoiceMsg();
	$voiceMsg->setCode("1234");
	$voiceMsg->setPhone("13871506390");
	//$voiceMsg->setTimestamp(time());
	$resonse=$sendSms->sendVoice($voiceMsg);
	echo $resonse->body();

}


sendVoice();