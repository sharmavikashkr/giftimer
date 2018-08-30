module.exports.draw = function (ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff) {

    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var fontSize = Math.trunc(Math.sqrt((width * height) / 33000) * 28);
    var fontDist = Math.trunc(Math.sqrt((width * height) / 33000) * 5);

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc((width / 8), halfHeight, (width / 9), - (Math.PI / 2), 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = pcolor;
    ctx.arc((width / 8), halfHeight, (width / 9), - (Math.PI / 2), ((30 - dayDiff) / 30) * 2 * Math.PI - (Math.PI / 2), true);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc((width / 8) + (width / 4), halfHeight, (width / 9), - (Math.PI / 2), 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = pcolor;
    ctx.arc((width / 8) + (width / 4), halfHeight, (width / 9), - (Math.PI / 2), ((24 - hourDiff) / 24) * 2 * Math.PI - (Math.PI / 2), true);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc((width / 8) + (width / 2), halfHeight, (width / 9), - (Math.PI / 2), 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = pcolor;
    ctx.arc((width / 8) + (width / 2), halfHeight, (width / 9), - (Math.PI / 2), ((60 - minDiff) / 60) * 2 * Math.PI - (Math.PI / 2), true);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(width - (width / 8), halfHeight, (width / 9), - (Math.PI / 2), 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = pcolor;
    ctx.arc(width - (width / 8), halfHeight, (width / 9), - (Math.PI / 2), ((60 - secDiff) / 60) * 2 * Math.PI - (Math.PI / 2), true);
    ctx.stroke();

    ctx.font = fontSize + 'px Calibri';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(dayDiff, (width / 8), halfHeight - fontDist);
    ctx.fillText(hourDiff, (width / 8) + (width / 4), halfHeight - fontDist);
    ctx.fillText(minDiff, (width / 8) + (width / 2), halfHeight - fontDist);
    ctx.fillText(secDiff, width - (width / 8), halfHeight - fontDist);

    ctx.lineWidth = 2;
    ctx.font = Math.trunc(fontSize / 2.5) + 'px Calibri';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText('DAYS', (width / 8), halfHeight + fontDist * 3);
    ctx.fillText('HOURS', (width / 8) + (width / 4), halfHeight + fontDist * 3);
    ctx.fillText('MINUTES', (width / 8) + (width / 2), halfHeight + fontDist * 3);
    ctx.fillText('SECONDS', width - (width / 8), halfHeight + fontDist * 3);
    return ctx;
}