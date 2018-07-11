var express=require('express');
var hbs=require('hbs');
var fs=require('fs');

const port=env.process.PORT||3000;
var exp=express();


exp.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');


exp.use((req,res,next)=>{
	var log=`${req.new Date().toString()} ${req.method} ${req.url}`
	fs.appendFile('server.log',log,(err)=>{
		if(err)=>{
			console.log(err);
		}
		
	});
	next();
});



hbs.registerHelper('Title',(text)=>{
	return text.upperCase();
})

hbs.registerHelper('getCurrentYear',()=>
{
	return new Date().getFullYear();
	
	
});


exp.get('/',(req,res)=>{
	res.render('homepage.hbs',{
		pageTitle:'This is HomePage',
		welcomeMessage:'Welcome to My Site'
		
	});
});
exp.use(express.static(__dirname+'/public'));


exp.get('/bad',(req,res)=>{
	res.send(console.log('Bad Page'));
	
	
	
});




exp.get('/about',(req,res)=>{
	
	res.render('about.hbs',{
		pageTitle:'This is HomePage',
		welcomeMessage:'Welcome to My Site'
		
	});
	
	
});


exp.listen(port,()=>{
	console.log('Welcome to '+port+' port');
	
});