- 打开wamp环境，主要是把mysql给运行起来
- 打开phpmyadmin或者其他的mysql客户端工具，新建一个mysecretary数据库
- 运行SQL语句：
  ```
  CREATE TABLE `recoder` (`recoder_id` bigint(255) NOT NULL PRIMARY KEY,`user_id` bigint(255) NOT NULL,`is_remove` int(10) NOT NULL DEFAULT '0',`is_public` int(10) NOT NULL DEFAULT '0',`is_finish` int(10) NOT NULL DEFAULT '0',`title` varchar(255) NOT NULL,`des` varchar(255) NOT NULL,`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,`alert_time` bigint(255) NOT NULL DEFAULT '0',`status` int(10) NOT NULL DEFAULT '0',`lat` bigint(255) NOT NULL DEFAULT '0',`lng` bigint(255) NOT NULL DEFAULT '0',`address` varchar(255) NOT NULL);
  CREATE TABLE `user` (`user_id` bigint(20) NOT NULL PRIMARY KEY,`username` varchar(100) NOT NULL UNIQUE,`password` varchar(50) NOT NULL DEFAULT '000000',`phone` bigint(11) NOT NULL UNIQUE,`uuid` bigint(20) NOT NULL UNIQUE,`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP)
  ```
- 安装依赖  
- rm -rf node_modules
- cnpm i -S mysql
- cnpm i
- 程序运行
- cnpm run start
