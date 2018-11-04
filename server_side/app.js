var express = require("express");
var mongoose = require("mongoose");
var app = express();
var url = require("url");
var path = require("path");
var formidable = require("formidable");
var gm = require('gm');
var fs = require('fs');
var crypto = require("crypto");
var session = require('express-session')


//链接数据库
mongoose.connect("mongodb://127.0.0.1/esc");

//这是mongoose必须写的模型
var Car = mongoose.model("Car" , {
	id : Number,
	type : String,
	seat: Number,
	brand: String,
	series: String,
	color: String,
	price: Number,
	km: Number,
	engine: String,
	buydate: Number,
	license:Boolean,
	exhaust: String,
	gearbox: String,
	fuel: String,
	avatar: String,
	images:Object
});

var User = mongoose.model("User" , {
	username : String,
	password : String,
	nickname : String,
	avatar : String,
	mobile : String,
	sex : String
});

//配置session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false 
}));

//静态化
app.use(express.static("./"));

//查询某一个车的信息，包括images、price、km等
app.get("/car/:id" , (req,res)=>{
	//得到id
	var id = req.params.id;
	//找车
	Car.find({"id" : id} , (err , docs)=>{
		res.json({"result" : docs[0]});
	});
});

//查询符合条件的车
app.get("/findcar" , (req,res)=>{
	//本接口过于敏感，需要验证是否登陆
	if(!req.session.login){
		res.json({"results" : []});
		return;
	}
	//查询对象
	var CHAXUNDUIXIANG = {};

	//得到查询条件
	if(url.parse(req.url , true).query.color){
		CHAXUNDUIXIANG.color = url.parse(req.url , true).query.color.split("v");
	}

	if(url.parse(req.url , true).query.brand){
		CHAXUNDUIXIANG.brand = url.parse(req.url , true).query.brand.split("v");
	}

	if(url.parse(req.url , true).query.series){
		CHAXUNDUIXIANG.series = url.parse(req.url , true).query.series.split("v");
	}

	if(url.parse(req.url , true).query.type){
		CHAXUNDUIXIANG.type = url.parse(req.url , true).query.type.split("v");
	}

	if(url.parse(req.url , true).query.engine){
		CHAXUNDUIXIANG.engine = url.parse(req.url , true).query.engine.split("v");
	}

	if(url.parse(req.url , true).query.exhaust){
		CHAXUNDUIXIANG.exhaust = url.parse(req.url , true).query.exhaust.split("v");
	}

	if(url.parse(req.url , true).query.gearbox){
		CHAXUNDUIXIANG.gearbox = url.parse(req.url , true).query.gearbox.split("v");
	}

	if(url.parse(req.url , true).query.seat){
		CHAXUNDUIXIANG.seat = url.parse(req.url , true).query.seat.split("v");
	}

	if(url.parse(req.url , true).query.fuel){
		CHAXUNDUIXIANG.fuel = url.parse(req.url , true).query.fuel.split("v");
	}

	if(url.parse(req.url , true).query.price){
		var min = url.parse(req.url , true).query.price.split("to")[0];
		var max = url.parse(req.url , true).query.price.split("to")[1];

		CHAXUNDUIXIANG.price = {"$lte" : max , "$gte" : min};
	}

	if(url.parse(req.url , true).query.km){
		var min = url.parse(req.url , true).query.km.split("to")[0];
		var max = url.parse(req.url , true).query.km.split("to")[1];

		CHAXUNDUIXIANG.km = {"$lte" : max , "$gte" : min};
	}

	if(url.parse(req.url , true).query.buydate){
		var min = url.parse(req.url , true).query.buydate.split("to")[0];
		var max = url.parse(req.url , true).query.buydate.split("to")[1];

		CHAXUNDUIXIANG.buydate = {"$lte" : max , "$gte" : min};
	}

	if(url.parse(req.url , true).query.license && url.parse(req.url , true).query.license != "-1"){
		CHAXUNDUIXIANG.license = url.parse(req.url , true).query.license == 1;
	}



	//页码
	var page = url.parse(req.url , true).query.page;
	//每页条数
	var pagesize = url.parse(req.url , true).query.pagesize;
	//按谁排序
	var sortby = url.parse(req.url , true).query.sortby;
	//按谁排序
	var sortdirection = url.parse(req.url , true).query.sortdirection;
 
 	
 	//统计数量
 	Car.count(CHAXUNDUIXIANG , (err , count) => {
 		//exec表示执行
		Car.find(CHAXUNDUIXIANG).sort({[sortby] : sortdirection}).skip(pagesize * (page - 1)).limit(pagesize).exec((err , docs) => {
			res.json({
				"count" : count,
				"results" : docs
			});
		});
 	});
});


//验证是否合法
app.get("/check" , (req,res)=>{
	var word = url.parse(req.url , true).query.word;

	res.json({"result" : word != "小白兔"});
});

app.post("/upload" , (req,res)=>{
	//本接口过于敏感，需要验证是否登陆
	if(!req.session.login){
		res.json({"results" : []});
		return;
	}
	var form = new formidable.IncomingForm();
	//上传文件夹
	form.uploadDir = path.resolve(__dirname , "./uploads");
	//保留扩展名
	form.keepExtensions = true;
	//处理post请求
	form.parse(req, function(err, fields, files) {
	    res.send({
	    	"result" : 200,
	    	"filename" : path.basename(files.file.path)
	    });
    });
});


//提交按钮的接口
app.post("/tijiao" , (req,res)=>{
	//本接口过于敏感，需要验证是否登陆
	if(!req.session.login){
		res.json({"results" : []});
		return;
	}

	//查询数据库，看看当前id最大值是几
	Car.find().sort({id:-1}).limit(1).exec((err , docs)=>{
		//当前数据中的最大id
		var maxid = docs[0].id;
		var form = new formidable.IncomingForm();
		//处理post请求
		form.parse(req, function(err, fields, files) {
		    //创建文件夹，Sync表示同步，这样就TMD不用写回调函数里面了！！
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages/" + (maxid + 1)));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/view"));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/inner"));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/engine"));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/more"));

		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1)));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/view"));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/inner"));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/engine"));
		    fs.mkdirSync(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/more"));
		   	
             //因为前段提交的数据是  form  和 images 两个数据。所以需要解构,用起来方便
		   	const {view , inner , more , engine} = fields.images;
 		    

		    //移动文件
		    //遍历view数组
		    for(let i = 0 ; i < view.length ; i++){
		    	//缩略文件，缩略文件不影响原图片
	    		gm(path.resolve(__dirname , "./uploads/" + view[i]))
				.resize(100, 100)
				.noProfile()
				.write(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/view" + "/" +  view[i]), function (err) {
				 	 if (!err) console.log('done');
				 	 //移动文件
		    		fs.renameSync(path.resolve(__dirname , "./uploads/" + view[i]) , path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/view/" + view[i]));
				});
		    }

		    for(let i = 0 ; i < inner.length ; i++){
		    	//缩略文件，缩略文件不影响原图片
	    		gm(path.resolve(__dirname , "./uploads/" + inner[i]))
				.resize(100, 100)
				.noProfile()
				.write(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/inner" + "/" +  inner[i]), function (err) {
				 	 if (!err) console.log('done');
				 	 //移动文件
		    		fs.renameSync(path.resolve(__dirname , "./uploads/" + inner[i]) , path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/inner/" + inner[i]));
				});
		    }

		    for(let i = 0 ; i < engine.length ; i++){
		    	//缩略文件，缩略文件不影响原图片
	    		gm(path.resolve(__dirname , "./uploads/" + engine[i]))
				.resize(100, 100)
				.noProfile()
				.write(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/engine" + "/" +  engine[i]), function (err) {
				 	 if (!err) console.log('done');
				 	 //移动文件
		    		fs.renameSync(path.resolve(__dirname , "./uploads/" + engine[i]) , path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/engine/" + engine[i]));
				});
		    }

		    for(let i = 0 ; i < more.length ; i++){
		    	//缩略文件，缩略文件不影响原图片
	    		gm(path.resolve(__dirname , "./uploads/" + more[i]))
				.resize(100, 100)
				.noProfile()
				.write(path.resolve(__dirname , "./images/carimages_small/" + (maxid + 1) + "/more" + "/" +  more[i]), function (err) {
				 	 if (!err) console.log('done');
				 	 //移动文件
		    		fs.renameSync(path.resolve(__dirname , "./uploads/" + more[i]) , path.resolve(__dirname , "./images/carimages/" + (maxid + 1) + "/more/" + more[i]));
				});
		    }

		    //存入数据库
		    Car.create({
		    	id : maxid + 1,
		    	price : fields.form.price,
		    	brand : fields.form.bAnds[1],
		    	series : fields.form.bAnds[2],
		    	km : fields.form.km,
		    	images : {
		    		inner,more,engine,view
		    	},
		    	avatar : view[0]
		    },function(err){
		    	res.send("ok");
		    });
	    });
	});
});


//返回已经登陆的用户信息
app.get("/me" , (req,res)=>{

	if(req.session.login){
		User.find({
			"username" : req.session.username
		} , (err , docs) => {
			res.json({
				"login" : true,
				"username" : req.session.username,
				"nickname" : docs[0].nickname,
				"avatar" : docs[0].avatar,
				"mobile" : docs[0].mobile,
				"sex" : docs[0].sex
			});
		})
		
	}else{
		res.json({
			"login" : false
		});
	}
	
});


//登陆
app.post("/login" , (req,res)=>{
	//处理post请求
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//判定是否正确登陆   密码明文是  123123
		//数据库加密密码为 sha256（123123哈哈）= 947967b46166946377c9378ced7110ff011246341d408acfac0697130cb15ceb
		User.find({
			"username" : fields.username , 
			"password" : crypto.createHash("sha256").update(fields.password + "哈哈").digest('hex')
		}).exec((err,docs)=>{
			if(docs.length > 0){
				//登陆成功
				req.session.login = true;
				req.session.username = docs[0].username;
				res.json({"result" : 1});
			}else{
				res.json({"result" : -1});
			}
		});
	});
});

	//处理post请求
app.post("/changeuserinfo" , (req,res)=>{

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		console.log(fields)
		User.find({
			"username" : req.session.username
		} , (err , docs)=>{
			console.log(docs);
			docs[0].nickname = fields.nickname;
			docs[0].mobile = fields.mobile;
			docs[0].sex = fields.sex;

			//持久
			docs[0].save((err)=>{
				res.json({"result" : 1});
			})
		})
	});
});


app.post("/tijiaotouxiang" , (req,res)=>{
	var form = new formidable.IncomingForm();
	//上传文件夹
	form.uploadDir = path.resolve(__dirname , "./uploads");
	//保留扩展名
	form.keepExtensions = true;
	//处理post请求
	form.parse(req, function(err, fields, files) {
		gm(files.tupian.path).size(function (err, size) {
			res.json({
				status : 200,
				width : size.width ,
				height : size.height,
				filename : path.basename(files.tupian.path)
			});
		});
    });
});


app.get("/docut" , function(req,res){
	var filename = url.parse(req.url , true).query.filename;
	var width = url.parse(req.url , true).query.width;
	var height = url.parse(req.url , true).query.height;
	var left = url.parse(req.url , true).query.left;
	var top = url.parse(req.url , true).query.top;
	var xianshigaodu = url.parse(req.url , true).query.xianshigaodu;
	var xianshikuandu = url.parse(req.url , true).query.xianshikuandu;

	gm(path.resolve(__dirname , "./uploads/" + filename)).size(function (err, size) {
		var rate = size.height / xianshigaodu;
		gm(path.resolve(__dirname , "./uploads/" + filename))
			.crop(width * rate , height * rate , left * rate , top * rate)
			.resize(140, 140, '!')
			.write(path.resolve(__dirname , "./uploads/" + filename), function (err) {
				if (!err) console.log('done');
				//改变数据库
				User.find({"username" : req.session.username} , (err , docs)=>{
					docs[0].avatar = filename;
					docs[0].save((err)=>{
						res.json({"result" : 1});
					});
				})
			});
	});
});

 
app.listen(3000);