import timeTracker from './timeTracker';

import timeToolsService from './timeToolsService'
import toolsService from './toolsService';

import uniqueDateLogFilter from './uniqueDateLogFilter';
import customFilter from './customFilter';

import './timeTracker.less';

angular.module('timeTrackerModule', ['angularMoment', 'ngStorage'])
	.directive('timeTracker', timeTracker)
	.factory('timeToolsService', timeToolsService)
	.factory('toolsService', toolsService)
	.filter('uniqueDateLogFilter', uniqueDateLogFilter)
	.filter('customFilter', customFilter);