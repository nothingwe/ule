<?php
header("content-type:text/html;charset=utf-8");
//连接数据库
$brand=$_GET['brand'];
$category=$_GET['category'];
$link=mysqli_connect("localhost",'root','123456','ule');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
$sql="select * from goods";
$sql1="select * from goods where store='$brand'";
$sql2="select * from goods where category ='$category'";
$sql3="select * from goods where category ='$category' and store='$brand'";
if($brand=='全部' && $category=='全部'){
	//执行SQL语句，并返回结果集
	$result=mysqli_query($link,$sql);
}else if($category=='全部'){
	$result=mysqli_query($link,$sql1);
}else if($brand=='全部'){
	$result=mysqli_query($link,$sql2);
}else{
	$result=mysqli_query($link,$sql3);
}
//创建存储所有数据的数组
$arr=[];
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    //把遍历出来的数据追加到数组中
    array_push($arr,$row);
}
//把当前数组转为字符串，并响应给浏览器
echo json_encode($arr);
//关闭连接
mysqli_close($link);

?>