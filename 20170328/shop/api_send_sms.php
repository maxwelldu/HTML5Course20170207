<?php
require_once './lib/SendCloudSMS.php';
require_once './lib/util/SMS.php';

function sendsms(){
	$SMS_USER = "***";
	$SMS_KEY = "***";
	$smsTemplateId = 1;
	$sendSms=new SendCloudSMS($SMS_USER, $SMS_KEY);
	$smsMsg=new SmsMsg();
	$smsMsg->addPhoneList(array("13871506390"));
	$smsMsg->addVars("code", "1234");
	$smsMsg->setTemplateId($smsTemplateId);
	$smsMsg->setTimestamp(time());
	$resonse= $sendSms->send($smsMsg);
	echo $resonse->body();
	
}


function sendMms(){
	$SMS_USER = "***";
	$SMS_KEY = "***";
	$mmsTemplateId = 320;
	$sendSms=new SendCloudSMS($SMS_USER, $SMS_KEY);
	$smsMsg=new SmsMsg();
	$smsMsg->addPhoneList(array("13871506390"));
	$smsMsg->addVars("code", "1234");
	$smsMsg->setMsgType(MsgType::MMS);
	
	$smsMsg->addMapVars(array("name"=>'xiao'));
	$smsMsg->setTemplateId($mmsTemplateId);
	$smsMsg->setTimestamp(time());
	$resonse=$sendSms->send($smsMsg);
	echo $resonse->body();
		
}







sendsms();
 
//sendMms();
 
 

