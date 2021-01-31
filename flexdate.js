class FlexDate extends Date {
	inc(delta_ms) {
		this.setTime(this.getTime() + delta_ms.valueOf())
	}
	format() {
		return String(this).substring(0,15)
	}
}