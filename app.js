var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var puzzleSolver = require('./puzzle_solver');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/service',function(request, response){
    //response.send('OK');
    var qParam = request.query.q;
    var dParam = request.query.d;

    if(qParam == "Ping"){
	response.send("OK");
    }
    else if(qParam == "Puzzle"){

	question = dParam.split("\n").slice(1,6).join(" ");
	console.log("question: "+question);
	results = puzzleSolver(question.trim());

	response.write(results[0]+"\n");
	response.write(results[1]+"\n");
	response.write(results[2]+"\n");
	response.write(results[3]+"\n");
	response.write(results[4]+"\n");	

	response.end();
    }
    else {
	response.send(request.query.q);
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
