const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//console.log(pool);
//创建路由器对象
const r=express.Router();

//查询所有相关联系人信息 result_get  phone_list    ok
r.get("/phone_list",(req,res)=>{
var sql="SELECT*FROM  phone_detail";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		/* console.log(result); */
		res.send(result);
	});
});

//1.1用户查询，根据用户名pusername注册之前先查询验证 get /search/:pusername
 r.get("/search/:pusername",(req,res)=>{
	 let obj=req.params;
	  /* console.log(obj); */
	 //查询数据库
	 var sql ="SELECT * FROM phone_detail WHERE pusername=?";
	 pool.query(sql,[obj.pusername],(err,result)=>{
		 if(err) throw err;
		/* console.log(result); */
		 if(result.length>0){
			 res.send("1");
		 }else{
			  res.send("0");
		 }
	 });
 });
//1.2用户注册  post  res_reg		
r.post("/res_reg",(req,res)=>{
	 let obj=req.body;
	pool.query('INSERT INTO phone_detail SET?',[obj],(err,result)=>{
		if(err) throw err;
		/* console.log(result); */
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});

 //2用户登录  res_login		ok
 r.get("/res_login/:pusername&:pwd",(req,res)=>{
	 let obj=req.params;
	  console.log(obj); 
	 //查询数据库
	 var sql ="SELECT * FROM phone_detail WHERE pusername=? AND pwd=?";
	 pool.query(sql,[obj.pusername,obj.pwd],(err,result)=>{
		 if(err) throw err;
		/* console.log(result); */
		 if(result.length>0){
			 res.send("1");
		 }else{
			  res.send("0");
		 }
	 });
 });

//3.根据pid删除联系人 "delete",`/ajax/delphone/${_pid}
r.delete("/delphone/:pid",(req,res)=>{
	 let obj=req.params;
	/* console.log(obj.pid); */
	 var sql ="DELETE FROM phone_detail WHERE pid=?";
	 pool.query(sql,[obj.pid],(err,result)=>{
	 	if(err) throw err;
	 	/* console.log(result); */
	 	if(result.affectedRows>0){
	 		res.send("1");
	 	}else{
	 		res.send("0");
	 	}
	 });
});

//4.根据pid修改联系人信息 put       /update     
r.put("/update",(req,res)=>{
	let obj=req.body;
	console.log(obj);
	var sql="UPDATE phone_detail SET? WHERE pid=?";
	pool.query(sql,[obj,obj.pid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//5.根据pid查询联系人信息 get  find
r.get("/find/:pid",(req,res)=>{
	let obj=req.params;
	 /* console.log(obj); */
	//查询数据库
	var sql ="SELECT * FROM phone_detail WHERE pid=?";
	pool.query(sql,[obj.pid],(err,result)=>{
		if(err) throw err;
		/* console.log(result); */
		if(result.length<0){
			res.send("0");
		}else{
			res.send(result);
		 }
	});
});
//6.添加联系人 post add  
r.post("/add",(req,res)=>{
	let obj=req.body;
	console.log(obj);
	pool.query('INSERT INTO phone_detail SET?',[obj],(err,result)=>{
	  if(err) throw err;
	  console.log(result);
	  if(result.affectedRows>0){
	  	res.send("1");
	  }else{
	  	res.send("0");
	  }
	});
});

//7.按照姓名快速模糊查询 get find_pname
r.get("/find_pname/:pname",(req,res)=>{
	let obj=req.params;
	 /* console.log(obj); */
	 let _pname='%'+obj.pname+'%';
	//查询数据库
	var sql ="SELECT *FROM phone_detail WHERE pname LIKE ?";
	pool.query(sql,[_pname],(err,result)=>{
		if(err) throw err;
		/* console.log(result.length); */
		if(result.length==0){
			res.send("0");
		}else{
			res.send(result);
		 }
	});
});

//8.按照电话快速模糊查询 get find_phone
r.get("/find_phone/:phone",(req,res)=>{
	let obj=req.params;
	console.log(obj); 
	let _phone='%'+obj.phone+'%';
	//查询数据库
	var sql ="SELECT *FROM phone_detail WHERE phone LIKE ?";
	pool.query(sql,[_phone],(err,result)=>{
		if(err) throw err;
		 console.log(result.length); 
		if(result.length==0){
			res.send("0");
		}else{
			res.send(result);
		}
	});
});

//导出路由器对象
module.exports=r;