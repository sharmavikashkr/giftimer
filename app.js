var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var Canvas = require('canvas');
var GIFEncoder = require('gifencoder');
var GifEncoder = require('gif-encoder');
var GoogleUrl = require('google-url');
var moment = require('moment-timezone');
var format1 = require('./format/format1.js');
var format2 = require('./format/format3.js');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.get("/submission", function (req, res) {
    var submitUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var generateUrl = submitUrl.replace('submission', 'generate');
    var googleUrl = new GoogleUrl({ key: 'AIzaSyC1lcsSUDIiIUmLo-8LyJySGLmK1Sveogk' });

    console.log(submitUrl);
    console.log(generateUrl);
    googleUrl.shorten(generateUrl, function (err, shortUrl) {
        console.log(shortUrl);
        res.send({ shortUrl: shortUrl});
    });
});
app.get('/generate', function (req, res) {
    console.log('start : ' + moment().format());
    var timezone = req.query.timezone;
    var targetDate = moment.tz(req.query.targetDate, "YYYY-MM-DD HH:mm", timezone);
    var current = moment().tz(timezone);
    console.log('Target Date : ' + targetDate);
    console.log('Current Date : ' + current);

    var dayDiff = targetDate.diff(current, 'days');
    var dateDiff = targetDate.diff(current);
    var diff = moment.duration(dateDiff);
    var hourDiff = diff._data.hours;
    var minDiff = diff._data.minutes;
    var secDiff = diff._data.seconds;

    var pcolor = "#" + req.query.pcolor;
    var bgcolor = "#" + req.query.bgcolor;
    var color = "#" + req.query.color;
    var width = Number(req.query.width);
    var height = Number(req.query.height);
    var transparent = req.query.transparent;
    var format = req.query.format;

    if (transparent == 'true') {
        transparent = true;
    } else {
        transparent = false;
    }

    // Create canvas
    var currentYear = current.format('YYYY');
    var currentMonth = current.format('MM');
    var currentDay = current.format('DD');

    // If temporary directory does not exist on server, create it
    var baseDir = process.cwd() + '/tmp/';
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }
    let tmpDir = process.cwd() + '/tmp/' + currentYear + "-" + currentMonth + "-" + currentDay + "/";
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

    // Set file path for the created gif file
    let filePath = tmpDir + dayDiff + "-" +hourDiff + "-" + minDiff + "-" + secDiff + 'countdown.gif';

    /*
    // Start listening to the encoder, when it is finished encoding, send the encoded gif to a browser download
    var encoder = new GIFEncoder(width, height);
    let imageStream = encoder.createReadStream().pipe(fs.createWriteStream(filePath));
    imageStream.on('finish', function () {
        res.download(filePath);
    });

    // Start encoder and settings
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1000);
    encoder.setQuality(10);
    if (transparent) {
        encoder.setTransparent(bgcolor);
    }
    */

    var gif = new GifEncoder(width, height, { 'highWaterMark': 11256000 });
    let gifStream = gif.pipe(fs.createWriteStream(filePath));
    gifStream.on('finish', function () {
        res.download(filePath);
    });
    // Start encoder and settings
    gif.writeHeader();
    if (transparent) {
        gif.setTransparent(bgcolor);
        gif.setQuality(1);
    }
    gif.setDelay(1000);

    // add 40 frames
    for (var i = 40; i > 0; i--) {
        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');
        current.add(1, 'seconds');
        dateDiff = targetDate.diff(current);
        dayDiff = targetDate.diff(current, 'days');
        diff = moment.duration(dateDiff);
        hourDiff = diff._data.hours;
        minDiff = diff._data.minutes;
        secDiff = diff._data.seconds;

        if (dayDiff < 0 || hourDiff < 0 || minDiff < 0 || secDiff < 0) {
            dayDiff = 0;
            hourDiff = 0;
            minDiff = 0;
            secDiff = 0;
        }

        if (dayDiff.toString().length < 2) {
            dayDiff = '0' + dayDiff.toString();
        }
        if (hourDiff.toString().length < 2) {
            hourDiff = '0' + hourDiff.toString();
        }
        if (minDiff.toString().length < 2) {
            minDiff = '0' + minDiff.toString();
        }
        if (secDiff.toString().length < 2) {
            secDiff = '0' + secDiff.toString();
        }

        if (!transparent) {
            ctx.fillStyle = bgcolor;
        }
        ctx.fillRect(0, 0, width, height);

        if (format == undefined) {
            ctx = format1.draw(ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff);
        } else if (format == '1') {
            ctx = format1.draw(ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff);
        } else if (format == '2') {
            ctx = format2.draw(ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff);
        } else {
            ctx = format1.draw(ctx, width, height, bgcolor, color, pcolor, dayDiff, hourDiff, minDiff, secDiff);
        }
        
        // Encode frame to gif
        //encoder.addFrame(ctx);
        gif.addFrame(ctx.getImageData(0, 0, width, height).data);
    }
    //encoder.finish();
    gif.finish();
    console.log('end : ' + moment().format() + "\n");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function() {
  console.log('TMCountdown listening on port 3000.');
})

module.exports = app;
