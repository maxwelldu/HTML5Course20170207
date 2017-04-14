/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

  var table = document.getElementById("table");
  var tds = []; //二维数组的地图
  /**
   * [1,2,3,4]
   * [
   *  [1,2,3],
   *  [4,5,6],
   *  [7,8,9]
   * ] * */
  //两层for循环干了两件事：
  //1)创建了DOM对象，创建了400个td, 20个tr, 追加到table里面
  //2)将400个td放到tds数组里面，tds是一个二维数组，存放着td的DOM元素
  for (var i = 0; i < 20; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var thisrowtd = [];//存放当前行的td的数组，存放的是DOM对象
    for (var j = 0; j < 20; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);
      thisrowtd.push(td);
    }
    tds.push(thisrowtd);
  }
  console.log(tds);

  //蛇类
  function Snake() {
    //移动方向
    this.direction = "right"; //合理值 top left right down
    //身体上的各个格子
    this.bodyArr = [
//        [1,1],
//        [1,2],
      {x:3,y:9},
      {x:3,y:8},
      {x:3,y:7},
      {x:3,y:6}
    ];
    //渲染方法
    this.render();
    //绑定事件
    this.bindEvent();
  }
  //蛇的渲染方法
  Snake.prototype.render = function(){
    //重置画布上所有的元素，都没有类名
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        tds[i][j].className = "";
      }
    }
    //让自己的细胞这些小格加上snake类
    for (var i = 0; i < this.bodyArr.length; i++) {
      tds[this.bodyArr[i].x][this.bodyArr[i].y].className = "snake";
    }
  };
  //蛇的更新，相当于更新蛇的身体信号量
  Snake.prototype.update = function(){
    this.bodyArr.pop(); //删除尾巴
    this.add();// 在头部插入一个，根据不同的方向，加不同的坐标的元素

    //检查自己有没有碰到食物
    if (this.bodyArr[0].x == food.x && this.bodyArr[0].y == food.y) {
      food.change();
      this.growup();
    }
  };
  Snake.prototype.bindEvent = function(){
    //备份this
    var self = this;
    //页面的键盘按下事件
    document.onkeydown = function(e){
      e = e || window.event;
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 37:
          if (self.direction == "right") return;
          self.direction = "left";
          break;
        case 38:
          if (self.direction == "down") return;
          self.direction = "top";
          break;
        case 39:
          if (self.direction == "left") return;
          self.direction = "right";
          break;
        case 40:
          if (self.direction == "top") return;
          self.direction = "down";
          break;
      }
    }
  };
  //长大方法
  Snake.prototype.growup = function(){
    this.add();
  };
  //公共方法，给长大方法和更新方法调用
  Snake.prototype.add = function(){
    switch (this.direction) {
      case "right":
        //在头部添加一项
        this.bodyArr.unshift({x:this.bodyArr[0].x,
          y:this.bodyArr[0].y + 1});
        break;
      case "top":
        this.bodyArr.unshift({x:this.bodyArr[0].x - 1,
          y:this.bodyArr[0].y});
        break;
      case "down":
        this.bodyArr.unshift({x:this.bodyArr[0].x + 1,
          y:this.bodyArr[0].y});
        break;
      case "left":
        this.bodyArr.unshift({x:this.bodyArr[0].x,
          y:this.bodyArr[0].y - 1});
        break;
    }
  };

  //食物类
  function Food() {
    this.x = null;
    this.y = null;
    this.change();
  }
  //渲染
  Food.prototype.render = function(){
    tds[this.x][this.y].className = "food";
  }
  //改变位置
  Food.prototype.change = function(){
    this.x = parseInt(Math.random() * 20);
    this.y = parseInt(Math.random() * 20);

    for (var i = 0; i < snake.bodyArr.length; i++) {
      if (this.x == snake.bodyArr[i].x && this.y == snake.bodyArr[i].y)  {
        this.change();
        return;
      }
    }
  };

  var snake = new Snake();
  var food = new Food();
  setInterval(function () {
    //每秒蛇都在更新，每秒蛇都在渲染
    snake.update();
    snake.render();

    //食物也要产生
    food.render();
  },500);

  /**
   * 概要分析
   * 蛇，食物，背景图片，背景音乐，
   * 地图（蛇和食物只能在这个地图上移动或显示）
   * 地图该如何存储
   * 蛇的属性：方向，身体，
   * 蛇如何移动，从1-4格子移动到2-5的格子；把1挪到5
   * 蛇的身体用定位（x,y)合成的一个数组
   * 蛇移动行为，蛇成长的行为
   * 蛇的显示
   * 添加键盘按下事件，改变蛇的方向；方向不能相反
   *
   * 食物的随机出现（需要随机出一个不在蛇的身体上的位置 ）
   *
   * 游戏规则：
   * 一条蛇，一个食物
   * 定时器定时 蛇的移动，蛇的渲染，食物的显示
   */


    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();