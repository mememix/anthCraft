mod = angular.module("uploadApp")
mod.controller "dWallpaperFormCtrl", [
	"$scope", "$http",
	($scope, $http)->
		$scope.dWallpaper = {}
		$scope.uploadSuccess = false
		$scope.categoryList = []
		# Get Category List
		$http.get("/api/category", {
			params: {
				type: 3
				sort: "orderNum"
			}
		}).success( (list)->
			$scope.categoryList = list
			if list.length > 0
				$scope.dWallpaper.category_raw = list[0]._id + "|" + list[0].name
		).error( ->
			# todo...
		)
		$scope.submit = (event)->
			event.preventDefault()
			data = $scope.dWallpaper
			$scope.uploading = true

			temp = data.category_raw.split("|")
			categoryJson = {}
			categoryJson[temp[0]] = temp[1]

			data.category = JSON.stringify(categoryJson)

			# TODO: Validate
			formData = new FormData()
			formData.append 'apkFile', data.apkFile, data.apkFile.name
			formData.append 'iconFile', data.iconFile
			formData.append 'thumbnailFile', data.thumbnailFile

			formData.append 'dWallpaper', JSON.stringify(data)

			$http.post(UPLOAD_URL + "/dwallpaper", formData, {
				transformRequest: angular.identity
				headers: {
					'content-type': undefined
				}
			}).success( (data)->
				$scope.uploading = false
				$scope.uploadSuccess = true
			)

]
