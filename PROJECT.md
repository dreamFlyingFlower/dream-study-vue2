#三主力
-------
餐馆->不看电影
图书馆:不吃甜点,参加庆典
训练中心:看电影

# 召唤师
--------
餐厅:不兜风

#阿丝耐
-----
餐厅:没胃口,不去海边

#狂珊
图书馆:不兜风


-# 项目要求
需要先安装nodejs,安装完成后打开控制台,选择一个目录

# npm install
-----------------------
	安装package.json中的依赖,安装之前可将npm换成淘宝镜像,加快依赖安装速度
	淘宝cnpm镜像地址:npm install -g cnpm --registry=https://registry.npm.taobao.org
	安装好淘宝镜像后可使用cnpm install安装依赖


##使用脚手架vue-cli新建一个vue项目
---------------------------------
直接到新建项目的文件夹
cnpm install -g vue
cnpm install -g vue-cli
---------------------------------
上面2个安装过了就不用再安装
---------------------------------
# vue init webpack
-----------------------
	初始化该文件夹,会在该目录下新建一个package.json文件,需要填写name,不能有中文和大写字母,一直默认或自己填
	接下来的只有use eslint to your code要选择no,否则会被语法的错误和不规范烦死
-----------------------
	package.json生成后直接打开该文件编辑,写入依赖
	package.json各个配置项目可上网查找,依赖配置在dependencies和devDependencies中,这两个的区别暂时不明白

# cnpm install --save-dev name
------------------------
	后续单独安装依赖后并写入到package.json的devDependencies中

# cnpm install --save name
------------------------
	后续单独安装依赖后并写入到package.json的dependencies中

# npm run dev
------------------------------
	将项目跑起来

# npm run build
------------------------------
	项目打包

#使用vue init webpack安装之后的命令
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run all tests
npm test

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##tomcat部署
------------------------------------
	修改config/index.js文件中的所有的assetsPublicPath为"./",其他不变
	在src/router/index.js文件的Router对象中添加base:"/dist/";
	其中dist为你部署在tomcat的webapps中的文件夹名,里面放static和index.html

##配置文件,在build打包之后仍可执行
------------------------------------
	在static文件中新建一个json文件,如config.json,在其他文件中以ajax的方式直接调用到此文件
	此ajax调用必须是同步切要不可需要cache:false,否则需要强制刷新浏览器缓存
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 项目模块说明
-------------------------

# build
-------------------------
	项目名称,不能有大写字母

# config
-------------------------
	cofnig/index.js文件,启动端口在此配置文件中

# scripts
	其中key值可由npm run key来启动命令,value为需要启动的js文件

# npm install --save-dev webpack webpack-dev-server
-------------------------
	一个小型的Node.js Express服务器

# npm install --save-dev babel-core babel-loader babel-preset-es2015
-------------------------
	babel的作用是将es6的语法编译成浏览器认识的语法es5

# npm install --save-dev vue-loader vue-template-compiler
-------------------------
	用来解析vue的组件，.vue后缀的文件

# npm install --save-dev css-loader style-loader
-------------------------
	用来解析css,css-loader 和 style-loader，二者处理的任务不同，
	css-loader使你能够使用类似@import 和 url(…)的方法实现 require()的功能,
	style-loader将所有的计算后的样式加入页面中,二者组合使你能够把样式表嵌入webpack打包后的JS文件中。

# npm install --save-dev url-loader file-loader
-------------------------
	用于打包文件和图片

# npm install --save-dev sass-loader node-sass
-------------------------
	用于编译sass

# npm install --save-dev vue-router
-------------------------
	 安装vue路由

# npm install --save-dev sass-loader node-sass
-------------------------
	用于编译sass

# npm install --save-dev sass-loader node-sass
-------------------------
	用于编译sass

# npm install --save-dev crypto
-------------------------
	无需安装该模块,npm自带crypto模块,可直接require调用

# npm install --save-dev axios
-------------------------
vue中比较流行的ajax框架,但是有个缺点,不带jessionid以及token

#npm install --save-dev element-ui
-------------------------
vue中比较流行的ui框架,封装了各种组件,可省去相当多的ui书写时间
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
-------------------------
	
