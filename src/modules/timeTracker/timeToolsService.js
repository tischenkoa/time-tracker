timeToolsService.$inject = ['moment'];

export default function timeToolsService (moment) {
	return {
		getFormatTimer: function (startTime, currentTime) {
			var startTimeMoment = moment(startTime);
			var diffTime = moment(currentTime).diff(startTimeMoment);
			var durationTask = moment.duration(diffTime);

			if (durationTask.minutes() < 1 && Math.floor(durationTask.asHours()) < 1) {
				return durationTask.seconds() + ' sec';
			}

			if (durationTask.minutes() >= 1 && Math.floor(durationTask.asHours()) < 1) {
				return durationTask.minutes() + ' min';
			}

			if (Math.floor(durationTask.asHours()) >= 1) {
				return Math.floor(durationTask.asHours()) + 'h' + durationTask.minutes() + ' min';
			}
		}
	}
}