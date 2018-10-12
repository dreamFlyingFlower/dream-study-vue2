# package.json依赖配置说明,使用脚手架vue init webpack安装,jslint选否
-------------------------

# name
-------------------------
	项目名称,不能有大写字母

# main
-------------------------
	项目入口文件,默认index.js/index.html

# scripts
	其中key值可由npm run key来启动命令,value为需要启动的js文件

# npm install --save vuex
-------------------------
	vue专用的存储管理,实际上用户不是特别大,页面整体刷新的时候就全部没了,可结果session和cookie代替

# npm install --save-dev webpack webpack-dev-server
-------------------------
	一个小型的Node.js Express服务器

# npm install --save-dev url-loader file-loader
-------------------------
	用于打包文件和图片

# npm install --save-dev sass-loader node-sass
-------------------------
	用于编译sass

# npm install --save-dev xlsx filesave
-------------------------
	安装xlsx和filesave组件,通常用来处理exlcl文件,主要来导出数据,配置element-ui的el-table组件

# npm install --save-dev axios
-------------------------
	vue中比较流行的前端ajax框架,可对ajax进行统一处理,传参为data或params,为params时无法更改contentType

# npm install --save-dev element-ui
-------------------------
	vue中比较流行的前端ui框架.封装了各种组件,并配有详细的说明文档

# npm install --save-dev svg-sprite-loader
-------------------------
	vue中使用svg作为图片的替代,矢量图,自由伸缩;需要注意的是要在webpack.base.conf.js中加入处理svg的代码
	同时vue也自己处理了svg的文件,需要在原处理svg里剔除exclude: [resolve('src/icons')],详见文件

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
	
