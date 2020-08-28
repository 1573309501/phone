//引入
const express=require('express');
const bodyParser=require('body-parser');
//创建web服务器,设置端口8080
const app=express();
app.listen(8080);
//应用body-parser
app.use(bodyParser.urlencoded({
extended:false
}));
//引入路由
const router=require('./router/user.js');
const ajax=require('./router/ajax.js');
//托管静态资源
app.use(express.static('./public'));
//挂载并设置前缀为/user
app.use('/puser',router);
app.use('/ajax',ajax);