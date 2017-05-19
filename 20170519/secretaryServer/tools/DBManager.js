/**
 * Created by liuyujing on 2017/4/6.
 */

//mysql这个模块中 提供了  数据库操作的方法
//引入mysql模块
var mysql = require("mysql");

function DBManager(dbConfig) {
    this.connection = null; //数据库连接对象
    this.connectDB(dbConfig); //进行数据库连接
}
//连接数据库
DBManager.prototype.connectDB = function (dbConfig) {
    this.connection = mysql.createConnection(dbConfig);//创建数据库连接
    this.connection.connect();//连接数据库
};
//数据库操作的方法
DBManager.prototype.opretation = function (sql) {
    return new Promise(function (res,rej) {
        this.connection.query(sql,function (error,result) {
            if (error){
                rej(error);
            }else {
                res(result);
            }
        });
    }.bind(this));
};

module.exports = DBManager;
