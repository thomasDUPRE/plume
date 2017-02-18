var express		=	require('express');
var session		=	require('express-session');
var bodyParser  = 	require('body-parser');
var twig = require("twig"),
    express = require('express'),
    app = express();


app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

 app.set('view engine', 'twig');
 app.set("view options", { layout: false });
 app.set("twig options", {  strict_variables: false});
 //app.engine('html', require('ejs').renderFile);

//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
	sess=req.session;

	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
		res.render('layout.twig');
	}
});

app.get('/calendarConge',function(req,res){
	sess=req.session;

	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
		res.render('calendar.twig');
	}
});

app.get('/detailConge',function(req,res){
	sess=req.session;

	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
		res.render('conges.twig');
	}
});

app.get('/demandeConge',function(req,res){
	sess=req.session;

	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
		res.render('demandeConge.twig');
	}
});

app.get('/demandeNoteFrais',function(req,res){
	sess=req.session;

	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
		res.render('demandeNFrais.twig');
	}
});

app.get('/notesDetails',function(req,res){
	sess=req.session;

	if(sess.email)
	{
		res.redirect('/admin');
	}
	else{
		res.render('notes_de_frais.twig',{mois:"janvier 2017"});
	}
});


app.post('/login',function(req,res){
	sess = req.session;	
	sess.email = req.body.email;
	console.log("email:"+req.body.email);
	res.end('done');
});

app.get('/admin',function(req,res){
	sess=req.session;
	if(sess.email)	
	{
		res.write('<h1>Hello'+sess.email+'</h1><br>');
		res.end('<a href='+'/logout'+'>Logout</a>');
	}
	else
	{
		res.write('<h1>Please login first.</h1>');
		res.end('<a href='+'/'+'>Login</a>');
	}

});

app.get('/logout',function(req,res){
	
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});
app.listen(3000,function(){
	console.log("App Started on PORT 3000");
});

