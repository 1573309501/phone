#必须要有（id、姓名、年龄、性别、手机、邮箱）--相关字段
#---用户表（id/用户名/密码）
SET NAMES utf8;
DROP DATABASE IF EXISTS	telphoneBook;
CREATE DATABASE telphoneBook CHARSET=utf8;
USE telphoneBook;
#创建表phone_detail
CREATE TABLE  phone_detail(
pid INT PRIMARY KEY AUTO_INCREMENT,
pusername VARCHAR(20) UNIQUE , #201
pname VARCHAR(20) ,     #202
pwd  VARCHAR(20),      #203
page  INT ,      #204
psex  TINYINT ,#1男  #205
phone VARCHAR(11) ,          #206
pemail  VARCHAR(20)     #207 #208此用户已被注册 #209注册成功#300登录成功#301用户名或者密码错误#302该联系人不存在#303修改失败
#304修改成功#305联系人已存在#306联系人添加成功 #307删除成功#308电话或姓名不能为空
);
#向表中插入具体信息
INSERT INTO phone_detail VALUES(1,'老头','陈卓','1513359501',50,1,'13896837825','1513359501@qq.com');
INSERT INTO phone_detail VALUES(2,'多多','李松韬','1526659801',18,1,'15685742135','1526659801@qq.com');
INSERT INTO phone_detail VALUES(3,'别过','孙菲菲','sff158',19,0,'15685782135','1456328@qq.com');
INSERT INTO phone_detail VALUES(4,'梦话西游','杨非梦','r14562',24,1,'15685748135','1512338514@qq.com');
INSERT INTO phone_detail VALUES(5,'传奇世界','徐青','xu18745',20,0,'15183642841','1592248421@qq.com');
INSERT INTO phone_detail VALUES(6,'乐多派','刘亚鑫','lyx58964',21,0,'13898526782','1572208514@qq.com');
INSERT INTO phone_detail VALUES(7,'享乐多','任乐乐','rllrll',18,0,'15178933524','1573309501@qq.com');
INSERT INTO phone_detail VALUES(8,'小菲睡醒了','李路一','llylly',80,1,'15178953527','1571308579@qq.com');
INSERT INTO phone_detail VALUES(9,'闭嘴','王立玲','rllrll',18,0,'15867952733','1553379231@qq.com');
INSERT INTO phone_detail VALUES(10,'嫦娥妹妹','高芙蓉','gfrgfr',21,0,'15767942612','1543179251@qq.com');


