// const SECOND =  1000
// const MINUTE =    60 * SECOND
// const HOUR   =    60 * MINUTE
// const DAY    =    24 * HOUR
// const WEEK   =     7 * DAY
// const GREG   = 20871 * WEEK // A full cycle of the Gregorian Calendar
// const YEAR   =  GREG / 400
// const MONTH  =  YEAR /  12

// const GRIDLINE = 1 * YEAR

if (YEAR_LINES) {
	for (var year = MIN_YEAR; year <= MAX_YEAR; year += INC_YEAR) {
		yeardate = new Date(year,0,1)
		yearX = DatePoint.convert(yeardate)
		new VerticalLine(yearX,0,HEIGHT-20,{'stroke':'gray','stroke-width':0.5})
		new Text(year,new DatePoint(yeardate-(-2500000000), HEIGHT-10),{"fill":"gray"})
	}
}

class Event {
	constructor(start,end,base,height,title,options={}) {
		// console.log(arguments)
		this.start   = start
		this.end     = end
		this.base    = base
		this.height  = height
		this.title   = title
		this.options = options
		if (!options.rectangle) {
			options.rectangle = {}
		}
		if (!options.text) {
			options.text = {'fill':'white'}
		}
		// this.options.text['text-anchor'] = 'start'
		this.rectangle = this.get_rectangle()
		this.text = this.get_text()
	}
	get_rectangle() {
		var x1 = DatePoint.convert(this.start)
		var x2 = DatePoint.convert(this.end)
		var y1 = HEIGHT - GUTTER - this.base
		var y2 = y1 - this.height
		return new Rectangle(x1, x2, y1, y2, this.options.rectangle)
	}
	get_text() {
		var y = HEIGHT - GUTTER - this.base - (this.height / 2)
		if (this.options.text.align == 'bottom') {
			y = HEIGHT - GUTTER - this.base - (this.height / 4)
		}
		var content = this.title
		var position = new DatePoint(this.start,y)
		position.shift(15)
		if (this.options.align == 'right') {
			var position = new DatePoint(this.end,y)
			position.shift(-30)
			if (!this.options.text['text-anchor']) {
				this.options.text['text-anchor'] = 'end'
			}
		} else if (this.options.align == 'center') {
			var position = new DatePoint((this.start.valueOf()+this.end.valueOf())/2,y)
			if (!this.options.text['text-anchor']) {
				this.options.text['text-anchor'] = 'middle'
			}
			position.shift(10)	
		}
		return new Text(content, position, this.options.text)
	}
	render() {
		this.rectangle.render()
		this.text.render()
	}
}

function csv_to_object(data) {
	data = data.split(newline)
	for (var r = 0; r < data.length; r++) {
		var line = data[r]
		line = line.split(',')
		data[r] = line
	}
	headers = data[0]
	// console.log(headers)
	for (var r = 0; r < data.length; r++) {
		var row = {}
		for (var c = 0; c < data[r].length; c++) {
			row[headers[c]] = data[r][c]
		}
		data[r] = row
	}
	return data
}



