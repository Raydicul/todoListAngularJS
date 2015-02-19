var app = angular.module('todo', []);

app.directive('ngBlur', function(){
	return function(scope, elem, attrs){
		console.log(elem);
		console.log(attrs);
	}

})

app.controller('TodoCtrl', function($scope, filterFilter, $http){

	$scope.todos = [];
	$scope.placeholder = "Chargement...";

	$http.get('todo.php').success(function(data){
		$scope.todos = data;
		$scope.placeholder = "Ajouter une nouvelle tâche";
	})

	$scope.$watch('todos', function(){
		$scope.remaining = filterFilter($scope.todos, {completed:false}).length;
		$scope.allchecked != $scope.remaining;
	}, true)

	$scope.removeTodo = function(index){
		$scope.todos.splice(index, 1);
	}

	$scope.addTodo = function(){
		$scope.todos.push({
			name : $scope.newtodo,
			completed : false
		});
		$scope.newtodo = '';
	}

	$scope.editTodo = function(todo){
		todo.editing = false
	}

	$scope.checkAllTodo = function(allchecked){
		$scope.todos.forEach(function(todo){
			todo.completed = allchecked;
		})
	}
});