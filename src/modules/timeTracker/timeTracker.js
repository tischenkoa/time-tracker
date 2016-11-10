import timeTrackerTmpl from './timeTrackerTmpl.html';
import timeTrackerCtrl from './timeTrackerCtrl';

export default function timeTracker () {
	return {
		scope: {},
		restrict: 'E',
		replace: true,
		template: timeTrackerTmpl,
		controller: timeTrackerCtrl,
		controllerAs: 'timeTrackerCtrl'
	}
}