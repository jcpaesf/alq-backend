function secondsToHour(seconds: number) {
    var h = Math.floor(seconds / 60);
    var m = Math.floor(seconds % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2);
}