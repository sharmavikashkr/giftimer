module.exports.draw = function (ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff) {

    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var fontSize = Math.trunc(Math.sqrt((width * height)/33000) * 32);

    var dayDiffArr = dayDiff.toString().split('');
    var divWidth = dayDiffArr.length * (width / 16) + (dayDiffArr.length - 1) * (width / 32);
    var divStart = width / 8 - divWidth / 2;
    for (var i = 0; i < dayDiffArr.length; i++) {
        var thisCharStart = divStart + i * (width / 16) + i * (width / 32);
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, width / 16, height / 3);

        ctx.lineWidth = 2;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(dayDiffArr[i], thisCharStart + (width / 32), halfHeight);
    }
    ctx.fillStyle = color;
    ctx.fillText(":", width / 4, halfHeight);

    var hourDiffArr = hourDiff.toString().split('');
    divWidth = hourDiffArr.length * (width / 16) + (hourDiffArr.length - 1) * (width / 32);
    divStart = width / 4 + width / 8 - divWidth / 2;
    for (var i = 0; i < hourDiffArr.length; i++) {
        var thisCharStart = divStart + i * (width / 16) + i * (width / 32);
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, width / 16, height / 3);

        ctx.lineWidth = 2;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(hourDiffArr[i], thisCharStart + (width / 32), halfHeight);
    }
    ctx.fillStyle = color;
    ctx.fillText(":", width / 2, halfHeight);

    var minDiffArr = minDiff.toString().split('');
    divWidth = minDiffArr.length * (width / 16) + (minDiffArr.length - 1) * (width / 32);
    divStart = width / 2 + width / 8 - divWidth / 2;
    for (var i = 0; i < minDiffArr.length; i++) {
        var thisCharStart = divStart + i * (width / 16) + i * (width / 32);
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, width / 16, height / 3);

        ctx.lineWidth = 2;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(minDiffArr[i], thisCharStart + (width / 32), halfHeight);
    }
    ctx.fillStyle = color;
    ctx.fillText(":", halfWidth + width / 4, halfHeight);

    var secDiffArr = secDiff.toString().split('');
    divWidth = secDiffArr.length * (width / 16) + (secDiffArr.length - 1) * (width / 32);
    divStart = width / 2 + width / 4 + width / 8 - divWidth / 2;
    for (var i = 0; i < secDiffArr.length; i++) {
        var thisCharStart = divStart + i * (width / 16) + i * (width / 32);
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, width / 16, height / 3);

        ctx.lineWidth = 2;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(secDiffArr[i], thisCharStart + (width / 32), halfHeight);
    }

    ctx.lineWidth = 5;
    ctx.font = Math.trunc(fontSize / 2.5) + 'px Calibri';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('DAYS', width / 8, halfHeight + height / 4);
    ctx.fillText('HOURS', width / 8 + width / 4, halfHeight + height / 4);
    ctx.fillText('MINUTES', width / 8 + width / 2, halfHeight + height / 4);
    ctx.fillText('SECONDS', width - width / 8, halfHeight + height / 4);
    return ctx;
}