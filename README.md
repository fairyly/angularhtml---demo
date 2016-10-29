# angularhtml---demo
>
#demo1.  
整体使用yeoman+angular+bootstrap做的移动端单页面demo，里面用到angular路由，angular表单验证，angular轮播图以及使用swiper切换页面；  
[点击预览demo1](https://fairyly.github.io/angularhtml---demo/app/)

还有codepen上见到的两个小测试demo:[demo-1](https://fairyly.github.io/angularhtml---demo/app/test1)  [demo-2](https://fairyly.github.io/angularhtml---demo/app/test2)

# study1:
报错1：
```
angular.min.js:118 Error: [ng:areq] http://errors.angularjs.org/1.5.8/ng/areq?p0=HomeCtroller&p1=not%20aNaNunction%2C%20got%20undefined
    at Error (native)
    at http://localhost/ag-demo/angulartest/js/angular.min.js:6:412
    at sb (http://localhost/ag-demo/angulartest/js/angular.min.js:23:18)
    at Pa (http://localhost/ag-demo/angulartest/js/angular.min.js:23:105)
    at http://localhost/ag-demo/angulartest/js/angular.min.js:89:310
    at Object.link (http://localhost/ag-demo/angulartest/js/angular-route.js:1010:26)
    at http://localhost/ag-demo/angulartest/js/angular.min.js:16:71
    at la (http://localhost/ag-demo/angulartest/js/angular.min.js:81:90)
    at p (http://localhost/ag-demo/angulartest/js/angular.min.js:66:341)
    at g (http://localhost/ag-demo/angulartest/js/angular.min.js:58:481)
```
如下面:
```
var app=angular.module("myApp",['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
		    $routeProvider
		        .when('/home',{
		        	templateUrl:'./home.html',
		        	controller:'HomeCtroller'
		        })
		        .when('/about',{
		        	templateUrl:'./about.html',
		        	controller:'AboutCtroller'
		        })
		        .when('/login',{
		        	templateUrl:'./login.html',
		        	controller:'LoginCtroller'
		        })
		        .when('/reg',{
		        	templateUrl:'./reg.html',
		        	controller:'RegCtroller'
		        })
		        .otherwise({redirectTo:'/home'});
		}]);
```
在angular中，如果路由中的controller没有去使用下面这些控制器
```
    	app.controller('HomeCtroller',function($scope){

	});
	app.controller('AboutCtroller',function($scope){

	});
	app.controller('LoginCtroller',function($scope){

	});
	app.controller('RegCtroller',function($scope){

	});
```
在点击到各个路由的时候控制台都会报一个错误；加上就OK了。
