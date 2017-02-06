angular.module("myApp.create", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $http, config) {
	  $routeProvider.when('/create', {
	    templateUrl: 'create/create.html',
	    controller: 'CreateCtrl'
	  });
	}])



	//http://jsfiddle.net/timriley/GVCP2/
	.controller('CreateCtrl',['$scope', '$http', 'questionAPI', 'config',function($scope,$http, questionAPI, 
		config, idGenerator) {


			var begin =  function(){

				
				$scope.questions = [];	

				$scope.tipoResposta = ["TEXTO", "MULTIPLA_ESCOLHA", "SELECAO"];
				loadQuestion();
				
			}

			var loadQuestion = function() {
				questionAPI.getQuestions().success(function(data, status) {
					$scope.questions = data;

				});
			}


			$scope.addQuestion = function(question){

				saveQuestion(question).success(function(data) {

					delete $scope.question;
					loadQuestion();
				});
			}	


			$scope.isQuestionSelected = function (questions){
					return questions.some(function (question){
						return question.selected;
				});
			}


			$scope.deleteQuestion = function(questions){

				console.log(questions);

				questions.forEach(function(single_question) {

					$http.delete(config.baseUrl + "/question" + single_question.id, {params: single_question}).success(function(data) {

						$scope.questions = questions.filter(function(question){
							if (!question.selected){
								return question;
							}	

						});	

					});

				});

			}

			$scope.enableEditQuestion = function(question){

				$scope.questionBeEdit = question; 
				$scope.editEnable = true;

			}

			$scope.saveEditQuestion = function(question) {

				$scope.questions.forEach(function(quest) {
					if(quest.enunciado == $scope.questionBeEdit.enunciado){

						quest.enunciado = question.msg;
						$scope.editEnable = false;
					}

				});
				question.msg = null;
			}

			begin();


	}])


