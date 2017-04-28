/**
 * Created by sks on 2017/4/26.
 */
//类的定义
class Animal {
  //ES6中新型构造器
  constructor(name) { // var a = new Animal('panda')
    this.name = name;
  }
  //实例方法
  sayName() {
    console.log('My name is '+this.name);
  }
}
//类的继承
class Programmer extends Animal {
  constructor(name) {
    //直接调用父类构造器进行初始化
    super(name);
  }
  program() {
    console.log("I'm coding...");
  }
}

//测试我们的类
var animal=new Animal('dummy'),
    zf=new Programmer('zf');

animal.sayName();//输出 ‘My name is dummy’
zf.sayName();//输出 ‘My name is zf’
zf.program();//输出 ‘I'm coding...’