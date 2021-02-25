var inps=document.querySelectorAll("input")
//获取地址栏中的参数
var search=location.search
//给当前按钮对象绑定点击事件
inps[2].onclick=function(){
    //判断当前选项是否被选中
    if(this.checked){
        //取消登录按钮的禁用
        inps[3].disabled=false
    }else{
        inps[3].disabled=true
    }
}

//给能被点击的登录按钮绑定点击事件
inps[3].onclick=function(){
    //获取账号输入框中的value
    var u1=inps[0].value
    var d1=inps[1].value
    //调用ajax发送请求
   Ajax({
       url:'../php/login.php',
       data:`username=${u1}&password=${d1}`,
       success:function(dt){
		   console.log(dt)
           //判断当前返回值是否等于1
           if(dt==1){
			   if(search){
				   var new_url=search.split("=")[1]
				   location.href=new_url
			   }else{
				   location.href="./index1.html"
			   }  
			   setCookie("user",u1)
           }else{
               alert("登录失败")
           }
       }
   })
    return false
}