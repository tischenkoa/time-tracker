import {projectsNames} from './config';

timeTrackerCtrl.$inject = ['$interval', '$localStorage', 'moment', 'timeToolsService', 'toolsService'];

export default function timeTrackerCtrl ($interval, $localStorage, moment, timeToolsService, toolsService) {
	var vm = this;
	var stopInterval;

	vm.$storage = $localStorage;
	console.log(vm.$storage);
	vm.currentTask = vm.$storage.currentTask || {};
	vm.taskLogList = vm.$storage.taskLogList || {};

	vm.projectsNamesList = projectsNames;

	vm.startStopNewTask = function () {
		if (vm.currentTask.runTask) {
			var diffTime;
			var durationTask;

			$interval.cancel(stopInterval);

			vm.currentTask.stopTime = moment().format();

			diffTime = moment(vm.currentTask.stopTime).diff(vm.currentTask.startTime);
			durationTask = moment.duration(diffTime);

			vm.currentTask.spentTime = Math.floor(durationTask.asHours()) + moment.utc(durationTask.asMilliseconds()).format(":mm:ss");

			vm.currentTask.formatDateTask = moment(vm.currentTask.startTime).format('ddd, DD MMM');

			vm.taskLogList[vm.currentTask.startTime] = angular.copy(vm.currentTask);

			vm.$storage.taskLogList = vm.taskLogList;

			vm.currentTask = {};
			vm.$storage.currentTask ={};

		} else {
			vm.currentTask.runTask = true;

			if(!vm.currentTask.startTime) {
				vm.currentTask.startTime = moment().format();
			}

			vm.$storage.currentTask = vm.currentTask;
			
			stopInterval = $interval(function () {
				vm.currentTask.timer = timeToolsService.getFormatTimer(vm.currentTask.startTime, Date.now());
			}, 1000);
		}
	};

	vm.continueTask = function (startTime) {
		vm.currentTask.name = vm.taskLogList[startTime].name;
		vm.currentTask.project = vm.taskLogList[startTime].project;
		vm.startStopNewTask();
	};

	vm.clearLogList = function () {
		vm.taskLogList = {};
		vm.$storage.taskLogList = {};
	};

	vm.checkEmptyLogList = function () {
		return (toolsService.lengthObject(vm.taskLogList) > 0) ? false : true;
	};

	if(vm.currentTask.startTime) {
		vm.currentTask.runTask = false;
		vm.startStopNewTask();
	}
}