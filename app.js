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
    var qParam = request.query.q;
    var dParam = request.query.d;

    switch(qParam)
    {
        case "Ping":
	response.send("OK");
	break;
	
	case "Name":
	response.send("Sze Ming Chan");
	break;
	
	case "Phone":
	response.send("646-269-7616");
	break;

	case "Position":
	response.send("Integration Engineer");
	break;

	case "Degree":
	response.send("Masters of Science and Bachelors in Computer Science");
	break;

	case "Years":
	response.send("6 Years Experience in Software Development");
	break;

	case "Referrer":
	response.send("Kenrick Guie");
	break;

	case "Resume":
	response.send("https://github.com/hellosze/emxdigital-programming-exercise/blob/master/SzeChan_EMX_Resume_CoverLetter_2019.pdf");
	break;
	
	case "Source":
	response.send("https://github.com/hellosze/emxdigital-programming-exercise");
	break;

	case "Status":
	response.send("I can provide proof of work eligibility, I am a US Citizen");
	break;

	case "Email Address":
	response.send("sze.chan@acm.org");
	break;
	
        case "Puzzle":
	question = dParam.split("\n").slice(1,6).join(" ");
	results = puzzleSolver(question.trim());

	response.write(results[0]+"\n");
	response.write(results[1]+"\n");
	response.write(results[2]+"\n");
	response.write(results[3]+"\n");
	response.write(results[4]+"\n");	

	response.end();
	break;
	
	default:
	response.send(request.query.q);
	break;
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
