var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser=require("body-parser");
var mongojs = require("mongojs");
var router = express.Router();
var db = mongojs("belajarmean",["bukutamu"]);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/views'));
app.use('/public',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
router.post("/simpan_data",function(req,res){
	db.bukutamu.insert(req.body,function(){
		res.end();
	})
})
app.use('/',router);
http.listen(3000)