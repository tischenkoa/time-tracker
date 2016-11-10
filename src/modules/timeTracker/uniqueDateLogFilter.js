export default function uniqueDateLogFilter () {
	return function (items, prop) {
		var res = {};
		var _date;
		for (var item in items) {
			_date = items[item][prop];
			if (_date) {
				res[_date] = true;
			}
		}
		return res;
	}
}