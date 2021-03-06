# Vue


# Node



* 使用Node对ES6语法进行编译,使用Webpack对Vue代码进行管理
* 安装nodejs,直接在官网上下载最新稳定版即可,将node加入到环境变量

* 替换淘宝镜像,可以加速依赖下载

  ```shell
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```

* 替换完成之后可以使用cnpm替代npm使用

* 使用淘宝源:npm config set registry https://registry.npm.taobao.org/



# vue-cli,webpack



* vue-cli:脚手架,可以在新建vue项目的时候使用命令自动生成一个完整的vue项目

* webpack:打包工具,可以快速将项目打包

  ```shell
  npm install -g vue vue-cli webpack # 全局安装,-g表示全局
  ```



# Ngrok



* 内网穿透软件
* 双击快速运行 ngrok.exe 应用程序
* 随机生成三级域名(自动防止重名问题),其中80代表要向外暴露的端口号:ngrok http [80]
* 或者人为指定三级域名(存在重名问题):ngrok http -subdomain=[inconshreveable] [80]



# 开发



## 快速开始



* 新建一个空目录,进入之后使用**vue init webpack**,会从远程仓库中下载开发vue的必要资源,安装时有一系列的安装提示,可自定填写
* use eslint to your code该选项选择no,选择yes可自行体会,该依赖作用是语法校验
* 在项目新建完成之后会在根目录下生成多个目录以及package.json



## package.json



* 该文件是项目相关配置的配置文件,如依赖,运行命令,运行环境等
* 在项目生成完之后,package.json中就已经有部分依赖,这些依赖如果不能满足开发需求,可以自行安装
* scripts:key代表npm运行时的快捷键,value是具体运行的命令,如:`dev: webpack-dev-server --inline --port 8888...`:
  * inline表示自动刷新
  * hot表示热加载
  * port指定端口,若不指定,使用配置文件中的端口
  * open是否自动在默认浏览器中打开,若不指定,使用配置文件中的配置
  * host可以指定服务器的ip,不指定则使用配置文件中的ip
  * config指定配置文件地址




## 相关命令



* npm install:安装依赖,该命令会根据package.json中的依赖进行全部安装,已经安装过的会跳过
* npm install --save-dev name:单独将name依赖安装到package.json的devDependencies对象中
* npm install --save name:单独将依赖name安装到package.json的dependencies对象中
* npm uninstall --save/--save-dev name:卸载依赖,save参数需要根据安装时的定义而定义
* npm run dev:开发环境下运行vue项目,即使一个刚生成的项目也可以跑起来.实际上是运行package.json中的scripts定义
* npm run build:将开发好的项目进行打包,打包之后会进行混淆,一般打包好的项目会放在根目录下的dist目录中,该目录中所有的文件都是正式运行需要的,部署时需要将整个dist目录部署
* npm run build --report:打包项目,并且查看项目的报告



# 部署



## tomcat



* 需要修改confg/index.js中的所有assetsPublicPath为"./",其他不变
* 在router.js中添加base:"/dist",dist为你部署在webapps下的目录名称



## nginx



* 最简单的方法,直接将整个dist中的文件都复制到ngxin目录的html目录中,运行nginx即可,不是将dist整个复制到html中,只复制dist中的内容即可



# 目录说明



## build



项目名称,不能有大写字母



## config



config/index.js文件,启动端口等配置文件



## scripts



其中key可由npm run key启动,value为需要启动的js文件



# 依赖



* 除了新建项目时的固定依赖,其他依赖可以根据开发需求进行安装和卸载
* webpack webpack-dev-server:一个小型的Node.js Express服务器,主要用于热部署.webpack-dev-server需要依赖webpack
* webpack-dev-server --open --port 3333 --hot --contentBase src:利用webpack-dev-server启动时可指定参数,也可以在配置文件中配置,见webpack.dev.conf.js的devServer参数.命令的优先级更高
  * open:自动打开浏览器
  * port:指定打开的端口
  * hot:实现浏览器的异步刷新重载
  * contentBase:指定启动时的根目录

* babel-core babel-loader babel-preset-es2015:babel的作用是将es6的语法编译成浏览器认识的语法es5
* vue-loader vue-template-compiler:用来加载以及解析vue模板的组件,解析.vue后缀的文件
* css-loader style-loader:都是解析css
  * css-loader使你能够使用类似@import和url(…)的方法实现require()的功能
  * style-loader将所有计算后的样式加入页面中,二者组合使你能够把样式表嵌入webpack打包后的JS文件
* sass-loader node-sass:用于编译sass,无需其他配置,只需要在使用sass或scss的时候将style的lang属性改为sass或scss即可,注意这2个依赖可能会出现版本过高而导致编译失败,最好使用如下版本:sass-loader@7.3.1,node-sass@4.13.1
* url-loader file-loader:解析url和文件路径
* vue-router:vue中的路由组件,基本是必须的组件
* vuex:vue专用的存储管理,该插件是将key-value的值存如到内存中,且刷新整个页面的时候会直接清空该内存,需要结合cookie或session使用,也可以直接使用cookie或session
* axios:vue中比较流行的ajax框架,但是有个缺点,不带jessionid和token,需要自定义添加到头中
* element-ui:比较流行的样式组件,但是对自定义样式极其不友好
* filesave xlsx srcipt-loader:前端导出excel文件,需要在src下新建一个vendor(自定义)目录,然后下载Blob.js和Export2Excel.js文件放入到vendor目录中,更改webpack.base.conf.js里的resolve的alias里的配置,加上vendor:path(__dirname,"../src/vendor"),之后的调用方法可参考common/utils/jsutils里的exportExcelObj和exportExcelArr方法
* svg-sprite-loader:vue中使用svg作为图片的替代,svg为矢量图,会根据页面的伸缩而伸缩.需要在webpack.base.conf.js中加入处理svg的代码,由于vue也自己处理了svg的文件,需要在原svg配置里剔除exclude: [resolve('src/icons')]
* normalize.css:更好的兼容浏览器样式的插件
* fuse.js:一个轻量级搜索插件,能搜到更多期望数据,最新版可能编译错误,可使用fuse.js@3.4.5版本
* vue-count-to:自动判断计数或倒数,用于验证码倒计时类似场景
* babel-plugin-syntax-dynamic-import:在vue-router中动态使用import注入组件,并且需要修改webpack.base.conf.js中的js配置
* particle:动态粒子效果

* vue-preview:图片预览插件



# Babelrc



* presets:预设.配置package.json中以babel-presets开头的依赖,不需要写babel-presets
* plugins:插件.配置package.json中以babel-plugins开头的依赖,不需要写babel-plugins



# 特性



* vue开发的网页不利于seo搜索,可以结合nxut.js使用(asyncData),同类的react也是一样,可以结合next.js
* 尽量使用v-text代替{{}},在网速比较慢的时候,若使用{{}}可能会出现闪烁的情况
* vue中不能动态加载配置文件,即必须修改了文件之后重新打包才可以访问.static目录中的文件虽然可以修改可以刷新访问,但是在vue环境中无法直接调用,需要通过Ajax调用才行.若需要动态加载配置,可以如下
* 利用jq的ajax将main.js的new App整个放入到success中,同时需要设置cache为false,需要安装jq插件
* 利用axios将main.js的new App整个放入到成功放回的回调中,需要安装axios插件



# 跨域



使用http-proxy-middleware插件,是node自带

1. 在vue项目的config目录下新建一个proxyConfig.js文件,名称可自定义

   ```js
   module.exports = {
     proxyList: {
       '/*': { // 需要代理的api,*表示所有的
         target: "http://localhost:8080", // 需要代理的url
         changeOrigin: true, // 是否跨域
         pathRewrite: { // 给api设置别名
           '^/userinfo': 'user'
         }
       }
     }
   }
   ```

2. 在config/index.js中引入proxyConfig.js,或者也不可以引入,直接将proxyConfig中的proxyList搬过来即可

   ```js
   const proxyConfig = require("./proxyConfig")
   dev:{
   	proxyTable: proxyConfig.proxyList,
   }
   ```

3. 无需在配置其他文件,当调用符合的api时,会自动被该插件代理



# 钩子函数



* 主要是在Vue的生命周期中的几个阶段,详情见Vue官网
* 针对不同的生命周期阶段可以进行不同的处理,主要是created,mounted,beforeUpdate,updated



## beforeCreated



* 调用此方法时页面中的data数据,方法未加载,页面也还没有渲染



## created



* 此时页面中的data数据和方法都已经加载了,但是html页面还未渲染



## beforeMount



* 此时的生命周期和created差不多,html页面仍未渲染,详见官网



## mounted



* 此时页面已经渲染完成



## beforeUpdate



* 当页面中有数据变化时,会重新对需要监听的数据,方法和html页面修改,但是html还没渲染




## updated



* 此时数据,方法,页面都已经渲染完成



# 过滤器



* 在页面中使用时,需要先定义在Vue的filters组件中,也可以定义成全局过滤器
* filters是一个对象,可以定义多个方法,每个方法都可以接收参数,对参数进行过滤,需要返回值
* 在页面使用,如{{user.sex | filterName}},将user.sex的值传入到filterName中判断



# ES6




## 对象



### ...

* 该方法可以将多个参数对象中所有属性都赋值到目标对象中,且每个对象的改变不会影响其他对象
* 不同于assign方法,参数对象赋值到一个已经有值的对象时,会先整个覆盖原有对象,之后再赋值

* 可以同时将多个对象赋值到一个对象中,所有属性叠加,同属性靠后对象覆盖靠前的对象

  ```javascript
  let a={sss:"ddd",23:334};
  let b = {...a};
  let c ={sss:"dfddd"};
  c = {...a};
  a.ss33="dfs";
  let d = {sss:"ddddd","fdsfds":"3r3"}
  let e = {...a,...d}
  console.log(a); // {23: 334, sss: "ddd", ss33: "dfs"}
  console.log(b); // {sss:"ddd",23:334};
  console.log(c); // {sss:"ddd",23:334};
  console.log(e); // {23: 334, sss: "ddddd", ss33: "dfs", fdsfds: "3r3"}
  ```

