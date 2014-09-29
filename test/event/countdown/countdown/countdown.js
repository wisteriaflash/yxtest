/**
 * 倒计时
 * @example
 * 引入样式及JS
 * 	<link rel="stylesheet" type="text/css" href="countdown/countdown.css"/>
 * 	<script type="text/javascript" src="countdown/countdown.js"></script>
	<!-- 半透明背景 -->
        <div class="countdown_bg"></div>
        <!-- 样式可以自己定义 J_countdown必须 data-time 表示结束时间 -->
        <div class="countdown J_countdown" data-time="2014-9-20 0:0:0">
        距离特卖结束还有：
        	<div>
        		<!-- J_day .. 是必须的，代码会变更这些地方的时间 -->
	        	<span class="J_day">00</span>天
	        	<span class="J_hour">00</span>时
	        	<span class="J_min">00</span>分
	        	<span class='J_sec'>00</span>秒
        	</div>
        </div>
 * @return 
 */
(function(){
	var elCountdown = document.querySelector('.J_countdown'),
	elDay = document.querySelector('.J_day'),
	elHour = document.querySelector('.J_hour'),
	elMin = document.querySelector('.J_min'),
	elSec = document.querySelector('.J_sec');
	if (elCountdown.getAttribute('data-time')) {
		var s = elCountdown.getAttribute('data-time');
		var date = new   Date(Date.parse(s.replace(/-/g,   "/"))); 
		if (!date) {
			alert('时间格式不正确');
			return;
		}
	} else {
		alert('请指定时间');
		return;
	}

	var end = date;
	var offset = 0;
	var countdownTimer = '';

	function finish(e) {
		//alert('活动结束');
		return;
	}

	function _timer() {
		try {
			var ret = {},
				now = self.now = new Date().getTime() - offset,
				distance = parseInt(end - now, 10);

			if (distance <= 0) {
				clearInterval(countdownTimer);
				finish.call(self);
				return;
			}
			var _time_config = ['mill', 'second', 'minute', 'hour'];
			for (var i in _time_config) {
				var unit = (i == 0 ? 1000 : (i == 3 ? 24 : 60));
				ret[_time_config[i]] = distance % unit;
				distance = parseInt(distance / unit, 10);
				var time = ret[_time_config[i]].toString();
				if (i == 1) {
					if (time.length > 1) {
						elHour.innerHTML = time;
						elSec.innerHTML = time;
					} else {
						elHour.innerHTML = '0'+time;
						elSec.innerHTML = '0'+time;
					}
					
				}
				if (i == 2) {
					if (time.length > 1) {
						elMin.innerHTML = time;
					} else {
						elMin.innerHTML = '0'+time;

					}
				}
				if (i == 3) {
					if (time.length > 1) {
						elHour.innerHTML = time;
					} else {
						elHour.innerHTML = '0'+time;
					}
					time = (parseInt(time) + (distance * 24)).toString();

					elHour.innerHTML = time;
	
				}

			}
			distance = distance.toString();
			var tmpHour = time-(distance*24);
			if(tmpHour<10){
				tmpHour = '0'+ tmpHour;
			}
			elHour.innerHTML = tmpHour;

			if (distance.length > 1) {
				elDay.innerHTML = distance;
			} else {
				elDay.innerHTML = '0' + distance;
			}
			_time_config[4] = 'day';
			ret[_time_config[4]] = distance;
		} catch (e1) {
			throw e1;
		}
	}
	countdownTimer = setInterval(_timer, 1000);
})();