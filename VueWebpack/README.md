# VueWebpack
一个vue+webpack打包的项目

# 项目要求
需要先安装nodejs,安装完成后打开控制台,选择一个目录

# npm init
-----------------------
	初始化该文件夹,会在该目录下新建一个package.json文件,需要填写name,不能有中文和大写字母,一直默认或自己填
-----------------------
	package.json生成后直接打开该文件编辑,写入依赖
	package.json各个配置项目可上网查找,依赖配置在dependencies和devDependencies中,这两个的区别暂时不明白
----------------------

# npm install
-----------------------
	安装package.json中的依赖,安装之前可将npm换成淘宝镜像,加快依赖安装速度
	淘宝cnpm镜像地址:npm install -g cnpm --registry=https://registry.npm.taobao.org
	安装好淘宝镜像后可使用cnpm install安装依赖
	
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
	
