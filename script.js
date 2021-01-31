$(document).ready(function() {
	$('svg').width((MAX_DATE.valueOf() - MIN_DATE.valueOf()) / MS_PIXEL)
	$('svg').height(HEIGHT)

	RENDER()
})
