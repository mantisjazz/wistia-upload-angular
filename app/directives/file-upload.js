'use strict';

angular.module('wistiaProjectApp').directive('fileUpload', function(WISTIA_TOKEN, $timeout, $interval, $http){
	var uploadUrl = 'https://upload.wistia.com/?access_token=' + WISTIA_TOKEN;
	var oembedUrl = 'http://fast.wistia.net/oembed';
	
	return {
		restrict: 'E',
		templateUrl: 'directives/file-upload.html',
		link: function($scope, element, attrs){
			$scope.uploading = false;
			$scope.progress = 0;
			$scope.videoProcessing = false;
			
			angular.element('.fileinput-button').fileupload({
				url: uploadUrl,
				dataType: 'json',
				start: function(){
					$timeout(function(){
						$scope.uploading = true;
					});
				},
				progress: function(e, data){
					$timeout(function(){
						$scope.progress = Math.floor(data.loaded / data.total * 100);
					});
				},
				done: function(e, data){
					$timeout(function(){
						$scope.videoProcessing = true;
						$scope.uploading = false;
						$scope.progress = 0;
						$scope.videoId = data.result.hashed_id;
						
						function checkStatus(){
							$http.get(oembedUrl, {
								params: {
									url: 'http://home.wistia.com/medias/' + data.result.hashed_id + '?embedType=api'
								}
							}).then(function(videoData){
								$interval.cancel(reloadInterval);
								$scope.videoProcessing = false;
								
								$timeout(function(){
									Wistia.embed($scope.videoId, {
										videoFoam: true
									});
								});
							}, function(error){
								//not processed yet
								//console.error(error);
							});
						}
						
						checkStatus();
						var reloadInterval = $interval(checkStatus, 500);
					});
				}
			});
		}
	};
});