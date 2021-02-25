var inps = document.querySelectorAll("input")
var spans = document.querySelectorAll("span")
var phone
//输入手机号
inps[0].onblur = function() {
	var val = this.value
	var reg = /^(1|\+861)[3-8]{1}\d{9}$/
	if (reg.test(val)) {
		spans[0].innerHTML = "输入手机号格式正确"
		phone = true
	} else {
		spans[0].innerHTML = "请输入正确手机号码"
		phone = false
		this.focus()
		
	}
}
var user
//输入用户名
inps[1].onblur = function() {
	var val = this.value
	var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{5,12}$/
	if (reg.test(val)) {
		spans[1].innerHTML = "用户名设置成功"
		user = true
	} else {
		spans[1].innerHTML = "请输入含数字字母下划线汉字的6-12字符"
		user = false
		this.focus()
		
	}
}
//设置密码
var pwd
inps[2].onblur = function() {
	var val = this.value
	var reg = /^\w{6,16}$/
	if (reg.test(val)) {
		var a = 0 //数字
		var b = 0 //小写字母
		var c = 0 //大写字母
		var d = 0 //下划线
		//遍历当前字符串
		for (var i = 0; i < val.length; i++) {
			//判断当前字符是否为数字
			if ("0" <= val[i] && val[i] <= "9") {
				a = 1
			} else if ('a' <= val[i] && val[i] <= 'z') {
				b = 1
			} else if ('A' <= val[i] && val[i] <= "Z") {
				c = 1
			} else {
				d = 1
			}
		}
		//判断当前出现了多少中字符
		if (a + b + c + d == 1) {
			spans[2].innerHTML = "您设置的密码强度弱"
		} else if (a + b + c + d == 2) {
			spans[2].innerHTML = "您设置的密码强度中"
		} else {
			spans[2].innerHTML = "您设置的密码强度强"
		}
		pwd = true
	} else {
		spans[2].innerHTML = "请输入含数字大小写字母的6-16密码"
		pwd = false
		this.focus()
		
	}
}
//再次输入密码
var repwd
inps[3].onblur=function(){
	var val=this.value
	if(val==inps[2].value){
		spans[3].innerHTML="两次密码输入一致"
		repwd=true
	}else{
		spans[3].innerHTML="两次密码输入不一致"
		repwd=false
		this.focus()
	}
}
//接受条款
var jieshou
inps[4].onclick=function(){
	if(inps[4].checked!=true){
		jieshou=false
		
		inps[5].disabled=true
	}else{
		jieshou=true
		inps[5].disabled=false
	}
}
//注册
inps[5].onclick=function(){
	if(phone && user && pwd && repwd && jieshou){
		var p1=inps[0].value
		var u1=inps[1].value
		var d1=inps[2].value
	Ajax({
	    url:'../php/register.php',
	    data:`phone=${p1}&username=${u1}&password=${d1}`,
	    success:function(dt){
	        //判断当前返回值是否等于1
			console.log(dt)
	        if(dt==1){
	            location.href="./login.html"
	        }else{
	            alert("你的用户名或手机号已经注册过了")
	        }
	    }
	})
	
}
return false
}
$(":input").blur(function() { //注册blur的事件
		$(this).each(function() { //遍历input元素对象 
				if ("" == $(this).val()) { //判断元素对象的value值
					$(this).addClass("blur"); //添加css样式
				}else{
				    $(this).removeClass("blur");
				}
			});
	});
