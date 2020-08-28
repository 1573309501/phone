//引入express 
const express=require('express');
//引入mysql连接池
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();
//添加路由

//1.用户注册post /puser/reg
r.post('/reg',(req,res)=>{
//获取post请求的数据
let obj=req.body;
if(!obj.pusername){
     res.send({code:201,msg:'pusername required'});
     return;
  } 
if(!obj.pwd){
     res.send({code:203,msg:'pwd required'});
     return;
  } 
if(!obj.phone){
     res.send({code:206,msg:'phone required'});
     return;
  }
if(!obj.pemail){
     res.send({code:207,msg:'pemail required'});
     return;
  }
pool.query('SELECT *FROM phone_detail WHERE pusername=?',[obj.pusername],(err1,result1)=>{
if(err1) throw err1;
console.log(result1);
if (result1.length>0){
   res.send({code:208,msg:'该用户已注册'});
   return;
}else{
  pool.query('INSERT INTO phone_detail SET?',[obj],(err2,result2)=>{
  if(err2) throw err2;
  console.log(result2);
  res.send({code:209,msg:'reg suc'});
  });
 }
});
});

//2.用户登录 post /puser/login

r.post('/login',(req,res)=>{
let obj=req.body;
if(!obj.phone){
     res.send({code:206,msg:'phone required'});
     return;
    }
if(!obj.pwd){
     res.send({code:203,msg:'pwd required'});
     return;
   }
pool.query('SELECT * FROM phone_detail WHERE pusername=? AND pwd=?',[obj.pusername,obj.pwd],(err,result)=>{
if(err) throw err;
console.log(result);
if(result.length>0){
   res.send({code:300,msg:'login suc'});
   }else{
   res.send({code:301,msg:'用户名或者密码错误'});
   }      
 });
});


//3.增加联系人 post add
r.post('/add',(req,res)=>{
//获取post请求的数据
let obj=req.body;
console.log(obj);
pool.query('INSERT INTO phone_detail SET?',[obj],(err,result)=>{
  if(err) throw err;
  console.log(result);
  res.send({code:306,msg:'add suc'});
  });
});


//4.删除联系人 post delete
r.post('/delete',(req,res)=>{
//获取post请求的数据
let obj=req.body;
if(!obj.pname){
     res.send({code:201,msg:'pname required'});
     return;
    }
pool.query('SELECT * FROM phone_detail WHERE pname=?',[obj.pname],(err1,result1)=>{
if(err1) throw err1;
console.log(result1);

if (result1.length===0){
   res.send({code:302,msg:'该联系人不存在'});
   return;
}else{
  pool.query('DELETE FROM phone_detail WHERE pname=?',[obj.pname],(err2,result2)=>{
  if(err2) throw err2;
  console.log(result2);
  res.send({code:307,msg:'delete suc'});
  });
 }
});
});


//5.修改联系人资料 post  update
r.post('/update',(req,res)=>{
let obj=req.body;
console.log(obj);
let i=201;
for (let key in obj){
if(!obj[key]){
    //每循环一次加1
	i++;
	res.send({code:i,msg:key+'required'});
	return;
   }
 }
//pool.query('SELECT *FROM phone_detail WHERE pname=?',[obj.pname],(err1,result1)=>{
//if(err1) throw err1;
//console.log(result1);
//if(result1.length===0){
 //  res.send({code:302,msg:'该联系人不存在'});
 //  return;
 // }else{
	   pool.query('UPDATE phone_detail SET ? WHERE pid=?',[obj,obj.pid],(err,result)=>{
	   if(err) throw err;
       console.log(result);
	   if(result.affectedRows===0){
           res.send({code:303,msg:'update err'});
       }else{
          res.send({code:304,msg:'update suc'});
       }
	 });
	//}
 //});

});

//6.模糊查找联系人 post find 按姓名和电话模糊查询
r.post('/find',(req,res)=>{
let obj=req.body;
let a='%'+obj.pname+'%';
let b='%'+obj.phone+'%';
console.log(a,b);
if(!obj.pname||!obj.phone){
     res.send({code:308,msg:'pname or phone  required'});
     return;
    }
pool.query("SELECT *FROM phone_detail WHERE pname LIKE ? AND phone LIKE ? ",[a,b],(err,result)=>{
if(err) throw err;
console.log(result);
    res.send(result);
  });
});

//导出路由器对象
module.exports=r;