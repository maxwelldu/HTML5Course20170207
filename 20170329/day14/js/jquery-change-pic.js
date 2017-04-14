/**
 * date: 2017/3/29 11:27
 * author: maxwell
 * email: dcj3sjt@126.com
 * example:
 *  html_code:
 *  <img id="changepic" src="lunbo/1.jpeg" alt="">
 *  jquery_code:
 *     $(function(){
        $.changepic($("#changepic"), [
            "lunbo/1.jpeg",
            "lunbo/2.jpeg",
            "lunbo/3.jpeg",
            "lunbo/4.jpeg",
            "lunbo/5.jpeg"
        ], {time:500});
      });
 */
/**
 *  function changepic(图片元素, 图片数组){
 * @param elem jQuery选中的元素
 * @param images 需要切换的图片数组
 * @param options 选项，里面可以传一个time属性，用来设置切换的时间
 */
$.changepic = function(elem, images, options){
  //参数检查
  if (!isArray(images) || images.length<2) {
    console.log("请传递一个至少有两项的图片数组");
    return;
  }

  var idx = 0;
  var interval = options && options.time ? parseInt(options.time) : 1000;
  setInterval(function(){
    idx++;
    if (idx>images.length-1){ idx = 0; }
    elem.attr("src", images[idx]);
  }, interval);
};