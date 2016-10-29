'use strict';

/**
 * @ngdoc function
 * @name angularYeomanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularYeomanApp
 */
 

angular.module('angularYeomanApp')
  .controller('AboutCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var local = true; //是否是本地环境 ,后端环境改成 false
	var method = 'get';

	if (local) {
		var
		// masterPopularRank = 'm/masterPopularRank.action',
			masterPopularRank = './json/masterPopularRank.json', //人气榜接口
			// masterCharmRank = 'm/getMasterCharmRank.action',
			masterCharmRank = './json/masterCharmRank.json', //魅力榜接口
			// getRoomUserInfo = 'm/getRoomUserInfo.action',
			getRoomUserInfo = './json/info.json', //主播信息接口
			// getFocusAction = '/m/focus.action',
			getFocusAction = './json/focus.json'; //关注接口
	} else {
		var
		// masterPopularRank = 'm/masterPopularRank.action',
			masterPopularRank = 'm/masterPopularRank.action', //人气榜接口
			// masterCharmRank = 'm/getMasterCharmRank.action',
			masterCharmRank = 'm/getMasterCharmRank.action', //魅力榜接口
			// getRoomUserInfo = 'm/getRoomUserInfo.action',
			getRoomUserInfo = 'm/getRoomUserInfo.action', //主播信息接口
			// getFocusAction = '/m/focus.action',
			getFocusAction = '/m/focus.action'; //关注接口
	}
	
    $scope.failureHide = true; //关注失败弹出框
	$scope.infoHide = true; //信息弹出框
	$scope.loading = true;

	$scope.unmove = function(event) {
		event.preventDefault();
	}

	$scope.close = function() {
			$scope.infoHide = true;
			document.removeEventListener("touchmove", $scope.unmove, false);
		}
		//封装ajax请求
	var ajax = function(action, data, callback) {

		$http[method](action, data)
			.success(function(req) {
				if (req.code === '000000') {
					callback(req.data);
				} else {
					$scope.failureHide = false;
					$scope.infoHide = true; //退出弹出框
					$scope.failureMsg = req.msg;

				}
			})
			.error(function() {
				$scope.failureHide = false;
				$scope.infoHide = true; //退出弹出框
				$scope.failureMsg = '网络错误请重试';
			});
	};

	// 直播人气榜
	ajax(masterPopularRank, {}, function(data) {
		// console.log(data);
		$scope.loading = false;
		$scope.masterPopularRank = data.masterPopularRank; //人气主播列表

	});

	// 直播魅力榜
	ajax(masterCharmRank, {}, function(data) {
		$scope.loading = false;
		$scope.masterCharmRank = data.masterCharmRank; //魅力主播列表

	});

	// 获取直播个人信息 index当前索引,type = 0 人气，type = 1 魅力
	$scope.getUserInfo = function(master) {
		//获取主播而信息
		ajax(getRoomUserInfo, {
			userId: master.masterId
		}, function(data) {
			$scope.infoHide = false;
			$scope.master = data;
			document.addEventListener("touchmove", $scope.unmove, false);
		})
	};

	// 关注主播
	$scope.getFocus = function(master) {
		//关注请求
		ajax(getFocusAction, {
			masterId: master.masterId
		}, function(data) {
			master.subStatus = 1;
		});
	}	
}).filter('company', function() {
		return function(input) {
			var output = input;

			//小于10000 显示原始数据
			if (input < 10000) {
				output = input;
				//小于100000 大于 10000	
			} else if (input >= 10000 && input < 100000) {
				output = (input / 10000 + "").substring(0, 3) + "万";
				// 大于 100000	
			} else {
				output = Math.floor(input / 10000) + "万";
			}
			return output;
		}
	});

