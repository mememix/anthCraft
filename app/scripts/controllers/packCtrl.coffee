
mod = angular.module('anthCraftApp')

mod.controller 'packCtrl', [
	'$scope', '$timeout', '$cookies', 'themeService'
	(
		$scope, $timeout, $cookies, themeService
	)->
		$scope.curThumb = 0

		themeService.themeModel.userId = $cookies.userid
		themeService.themeModel.author = $cookies.username

		$scope.theme = themeService.themeModel

		themeService.previewTheme (newTheme)->
			$scope.thumblist = newTheme.preview
			$scope.previewing = false

		$scope.prev = -> $scope.curThumb = Math.abs(($scope.curThumb - 1) % $scope.thumblist.length)
		$scope.next = -> $scope.curThumb = Math.abs(($scope.curThumb + 1) % $scope.thumblist.length)
		$scope.check = (n)-> $scope.curThumb is n

		$scope.savePack = ()->
			$scope.packing = true
			themeService.packageTheme (theme)->
				console.log "PackTheme: ", arguments
				$scope.packing = false
]
