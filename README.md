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





# Vue

## 钩子函数

* 主要是在Vue的生命周期中的几个阶段,详情见Vue官网
* 针对不同的生命周期阶段可以进行不同的处理,主要是created,mounted,beforeUpdate,updated



### beforeCreated

* 调用此方法时页面中的data数据,方法未加载,页面也还没有渲染



### created

* 此时页面中的data数据和方法都已经加载了,但是html页面还未渲染



### beforeMount

* 此时的生命周期和created差不多,html页面仍未渲染,详见官网



### mounted

* 此时页面已经渲染完成



### beforeUpdate

* 当页面中有数据变化时,会重新对需要监听的数据,方法和html页面修改,但是html还没渲染



### updated

* 此时数据,方法,页面都已经渲染完成



## 过滤器

* 在页面中使用时,需要先定义在Vue的filters组件中,也可以定义成全局过滤器
* filters是一个对象,可以定义多个方法,每个方法都可以接收参数,对参数进行过滤,需要返回值
* 在页面使用,如{{user.sex | filterName}},将user.sex的值传入到filterName中判断

