-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-05-19 10:06:00
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mysecretary`
--

-- --------------------------------------------------------

--
-- 表的结构 `recoder`
--

CREATE TABLE IF NOT EXISTS `recoder` (
  `recoder_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '备忘录编号',
  `user_id` int(11) NOT NULL COMMENT '用户编号',
  `is_remove` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否回收站 1回收站 0正常',
  `is_public` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否公开 1公开 0隐私',
  `is_finish` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否完成 1完成 0未完成',
  `title` varchar(100) NOT NULL COMMENT '备忘录标题',
  `des` varchar(255) NOT NULL COMMENT '备忘录描述',
  `date` int(11) NOT NULL COMMENT '备忘录添加时间',
  `alert_time` int(11) NOT NULL DEFAULT '0' COMMENT '备忘录提醒时间',
  `status` int(10) NOT NULL DEFAULT '0' COMMENT '状态',
  `lat` bigint(255) NOT NULL DEFAULT '0' COMMENT '纬度',
  `lng` bigint(255) NOT NULL DEFAULT '0' COMMENT '经度',
  `address` varchar(255) NOT NULL COMMENT '地址',
  PRIMARY KEY (`recoder_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `recoder`
--

INSERT INTO `recoder` (`recoder_id`, `user_id`, `is_remove`, `is_public`, `is_finish`, `title`, `des`, `date`, `alert_time`, `status`, `lat`, `lng`, `address`) VALUES
(3, 2, 0, 1, 0, '今天中午要吃好的', '没钱还想吃好的', 2147483647, 0, 1, 116, 39, 'undefined'),
(4, 2, 0, 1, 0, '今天中午要吃好的', '没钱还想吃好的', 2147483647, 1495165540, 1, 116, 39, '石景山'),
(6, 6, 1, 0, 0, 'aaaa', 'bbb', 0, 0, 1, 0, 0, '定位'),
(7, 6, 1, 0, 0, 'qqq', 'qqq', 0, 0, 2, 40, 116, '北京市 北京市 东城区 中华路 甲10号'),
(8, 6, 0, 0, 0, 'a', 'aa', 0, 0, 1, 0, 0, '定位');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(65) NOT NULL COMMENT '密码',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `uuid` varchar(20) NOT NULL COMMENT '设备编号',
  `date` int(11) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `phone`, `uuid`, `date`) VALUES
(6, 'maxwelldu', '75931c9f161313b8689fdafb8eb99f50', '13835548451', 'undefined', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
