#SVG基础教程
SVG 指可伸缩矢量图形 (Scalable Vector Graphics) SVG是一个XML文件，用于XML编程的两种模型DOM和SAX也适用于它。因为SVG是被设计用于互联网，所以通过Javascript和DOM访问它就是最重要的应用模式。通过Javascript和DOM可以动态地修改HTML，同样也可以在浏览器中动态地创建、修改和删除图片。

## 课程介绍
  - 什么是svg
    - 在网页中绘制复杂的矢量图形
    - 跟canvas的区别(位图)
  - 学习方式
    - 通过实例来学习svg
- 实例：兴趣图谱
  - http://top.baidu.com/

##引入SVG
  - svg是基于xml的技术
  - svg文件
    - <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
    - svg根标签
    - xmlns="http://www.w3.org/2000/svg"
  - 图片、背景、框架等
  - 直接在html页面中添加svg

##基本图形
  - circle
    - cx cy r
    - fill stroke stroke-width transparent
    - style方式
  - rect
    - width height x y
    - rx ry
  - line
    - x1 y1 x2 y2
    - stroke-opacity
  - ellipse : 椭圆
  - polyine : 拆线
  - ploygon : 多边形
  - path : 路径
