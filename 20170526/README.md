1.下载PHPCMS
2.将PHPCMS的安装文件放到网站根目录
3.设置公司域名指向本机
4.访问域名测试
5.熟悉phpcms产品的前后台
6.模块（介绍路由和MVC)  Module > controller > Model > View
m = module
c = contorller
a = action
7.管理栏目
8.模型管理
9.推荐位管理
10.碎片管理（首页与频道，列表，内容无关的就是碎片）
11.模板风格（可视化编辑）
12.模板引擎(pc标签)

后台--模板--风格--默认模板 -- 详情列表-content
/caches/config/system.php -- tpl_edit=1
后台--模板--风格--默认模板 -- 详情列表--content--可视化

复制default模板--重命为taobao
修改phpcms/templates/taobao/config.php
将default替换为taobao,最好使用正则替换，或者手动挨个替换

设置--站点管理--默认站点--修改--模板风格配置--选择淘宝模板--作为默认模板

修改首页
phpcms/templates/taobao/content/index.html
在statics/css/ 新建一个taobao文件夹
把我们自己的index.css放进去
引用：

{pc:content action="null"}
        {/pc}


        {pc:content  action="category" siteid="1" catid="0"}
              {loop $data $k $v}
      				<li><a href="{$v[url]}">{$v[catname]}</a>
                <ul>
                {pc:content action="category" catid="$k" num="10" siteid="1" order="listorder ASC"}
                    {loop $data $r}  <li><a href="{$r[url]}">{$r[catname]}</a></li> {/loop}
                 {/pc}
               </ul>
               </li>
              {/loop}
              {/pc}



- 表单向导
  后台 -- 模块 -- 表单向导
  新建之后把js代码放到前面需要用到的地方
  修改 phpcms/templates/taobao/formguide/show_js.html

- 碎片管理
- 数据调取
- 单页管理
- 二级菜单
