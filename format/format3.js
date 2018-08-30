module.exports.draw = function (ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff) {

    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var fontSize = Math.trunc(Math.sqrt((width * height) / 33000) * 30);
    var textFontSize = Math.trunc(Math.sqrt((width * height) / 33500) * 13);

    var dayDiffArr = dayDiff.toString().split('');
    var spaceWidth = width / (2 * (dayDiffArr.length + 6) + dayDiffArr.length + 10);
    var divWidth = spaceWidth * 2;
    var thisCharStart = 0;
    var textStart = thisCharStart;
    thisCharStart = thisCharStart + spaceWidth;
    for (var i = 0; i < dayDiffArr.length; i++) {
        if (i > 0) {
            thisCharStart = thisCharStart + divWidth + spaceWidth;
        }
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, divWidth, height / 3);

        ctx.lineWidth = 5;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(dayDiffArr[i], thisCharStart + spaceWidth, halfHeight);
    }
    thisCharStart = thisCharStart + spaceWidth + divWidth;
    ctx.fillStyle = color;
    ctx.fillText(":", thisCharStart, halfHeight);
    var textEnd = thisCharStart;
    var textPos = textStart + (textEnd - textStart) / 2;

    ctx.lineWidth = 5;
    ctx.font = textFontSize + 'px Cambirela Medium';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('DAYS', textPos, halfHeight + height / 4);

    textStart = thisCharStart;
    thisCharStart = thisCharStart + spaceWidth;
    var hourDiffArr = hourDiff.toString().split('');
    for (var i = 0; i < hourDiffArr.length; i++) {
        if (i > 0) {
            thisCharStart = thisCharStart + divWidth + spaceWidth;
        }
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, divWidth, height / 3);

        ctx.lineWidth = 5;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(hourDiffArr[i], thisCharStart + spaceWidth, halfHeight);
    }
    thisCharStart = thisCharStart + spaceWidth + divWidth;
    ctx.fillStyle = color;
    ctx.fillText(":", thisCharStart, halfHeight);
    var textEnd = thisCharStart;
    var textPos = textStart + (textEnd - textStart) / 2;

    ctx.lineWidth = 5;
    ctx.font = textFontSize + 'px Cambirela Medium';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('HOURS', textPos, halfHeight + height / 4);

    textStart = thisCharStart;
    thisCharStart = thisCharStart + spaceWidth;
    var minDiffArr = minDiff.toString().split('');
    for (var i = 0; i < minDiffArr.length; i++) {
        if (i > 0) {
            thisCharStart = thisCharStart + divWidth + spaceWidth;
        }
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, divWidth, height / 3);

        ctx.lineWidth = 5;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(minDiffArr[i], thisCharStart + spaceWidth, halfHeight);
    }
    thisCharStart = thisCharStart + spaceWidth + divWidth;
    ctx.fillStyle = color;
    ctx.fillText(":", thisCharStart, halfHeight);
    var textEnd = thisCharStart;
    var textPos = textStart + (textEnd - textStart) / 2;

    ctx.lineWidth = 5;
    ctx.font = textFontSize + 'px Cambirela Medium';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('MINUTES', textPos, halfHeight + height / 4);

    textStart = thisCharStart;
    thisCharStart = thisCharStart + spaceWidth;
    var secDiffArr = secDiff.toString().split('');
    for (var i = 0; i < secDiffArr.length; i++) {
        if (i > 0) {
            thisCharStart = thisCharStart + divWidth + spaceWidth;
        }
        ctx.fillStyle = color;
        ctx.fillRect(thisCharStart, halfHeight - height / 6, divWidth, height / 3);

        ctx.lineWidth = 5;
        ctx.font = fontSize + 'px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.fillText(secDiffArr[i], thisCharStart + spaceWidth, halfHeight);
    }
    thisCharStart = thisCharStart + spaceWidth + divWidth;
    var textEnd = thisCharStart;
    var textPos = textStart + (textEnd - textStart) / 2;

    ctx.lineWidth = 5;
    ctx.font = textFontSize + 'px Cambirela Medium';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('SECONDS', textPos, halfHeight + height / 4);

    return ctx;
}