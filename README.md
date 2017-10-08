# VueWebpack
一个vue+webpack打包的项目

# 项目要求
需要先安装nodejs,安装完成后打开控制台,选择一个目录

# npm install
-----------------------
	安装package.json中的依赖,安装之前可将npm换成淘宝镜像,加快依赖安装速度
	淘宝cnpm镜像地址:npm install -g cnpm --registry=https://registry.npm.taobao.org
	安装好淘宝镜像后可使用cnpm install安装依赖

# npm init或者cnpm init webpack(推荐)
-----------------------
	初始化该文件夹,会在该目录下新建一个package.json文件,需要填写name,不能有中文和大写字母,一直默认或自己填
-----------------------
	package.json生成后直接打开该文件编辑,写入依赖
	package.json各个配置项目可上网查找,依赖配置在dependencies和devDependencies中,这两个的区别暂时不明白
----------------------
	
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
	
##使用脚手架vue-cli新建一个vue项目
---------------------------------
直接到新建项目的文件夹
cnpm install -g vue
cnpm install -g vue-cli
---------------------------------
上面2个安装过了就不用再安装
---------------------------------
#cnpm init webpack------y
---------------------------------
接下来的只有use eslint to your code要选择no,否则会被语法的错误和不规范烦死

#使用cnpm init webpack安装之后的命令

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

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
