# vue01

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

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
修改config/index.js文件中的所有的assetsPublicPath为"./",其他不变
在router/index.js文件的Router对象中添加base:"/dist/";其中dist为你部署在tomcat中的文件夹名,里面放static和index.html
动态配置文件:在static文件夹新建一个json文件,然后在js中利用ajax同步调用此文件,去除cache,可相当于配置文件,除了启动端口无法修改
