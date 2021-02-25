<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$p=$_GET['phone'];
$u=$_GET['username'];
$d=$_GET['password'];
//连接数据库
$link=mysqli_connect("localhost",'root','123456','ule');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
$sql="insert into user(phone,username,password) values('$p','$u','$d')";
$sql1="select * from user where phone='$p' or username='$u'";
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql1);
//判断当前结果集中是否存在数据
if(mysqli_fetch_assoc($result)){
    echo '0';
}else{	
	$result1=mysqli_query($link,$sql);
    echo '1';
}
//关闭连接
mysqli_close($link);

?>