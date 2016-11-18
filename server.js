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
app.use('/node_modules',express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
router.post("/simpan_data",function(req,res){
	db.bukutamu.insert(req.body,function(){
		res.end();
	})
})
router.get("/ambil_bukutamu",function(req,res){
	db.bukutamu.find(function(err,docs){
		res.json(docs);
	})
})
router.post("/ubah_data",function(req,res){

	db.bukutamu.update({_id:mongojs.ObjectId(req.body.id)},{$set:{
		nama:req.body.nama,
		jeniskelamin:req.body.jeniskelamin,
		alamat:req.body.alamat,
		nomortelpon:req.body.nomortelpon
	}},function(err,docs){
		res.end();
	});
});
router.post("/hapus_data",function(req,res){
	db.bukutamu.remove({_id:mongojs.ObjectId(req.body.id)},function(err,docs){
		res.end()
	})
})
app.use('/',router);
http.listen(3000)