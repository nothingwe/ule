var fixedBox = document.querySelector(".fixed-box")
var goTop = document.querySelector(".jui-ubar-tab-gotop>.jui-ubar-tab-logo")
var cart = document.querySelector(".jui-ubar-tab-mycart>.jui-ubar-tab-logo").querySelector("em")
var cart1 = document.querySelector(".shopcart-num")
var bottom1 = document.querySelector(".jui-ubar-tabs-bottom")
var login = document.querySelector(".login")
var clientHeight = document.documentElement.clientHeight
var timer = null
var isTop = true
var login = document.querySelector(".login")
var name1 = getCookie("user")
var newFruit = document.querySelector(".newFruit")
var btn = document.querySelector(".btn-search")
$(".licate").hover(function() {
		$(".allCategory").slideDown(1000, "linear")
	},
	function() {
		$(".allCategory").hover(function() {}, function() {
			$(".allCategory").slideUp(1000, "linear")
		})
	})
if (name1) {
	var str = `${name1}用户`
	login.innerHTML = str
}
var cartList = localStorage.getItem("cartList3")
if (cartList) {
	cartList = JSON.parse(cartList)
	cart.innerHTML = cartList ? cartList.length : 0
	cart1.innerHTML = cartList ? cartList.length : 0
}
(async function() {
	var dt = await promiseAjax({
		url: '../php/list.php',
		datatype: 'json'
	})
	btn.onclick = function() {
		var aa = 0
		var bb = 0
		if (btn.previousElementSibling.value) {
			var str = btn.previousElementSibling.value
			btn.previousElementSibling.value = ""
			for (let i = 0; i < dt.length; i++) {
				if (dt[i].category.indexOf(str) != -1 && dt[i].store.indexOf(str) != -1) {
					aa++
				} else if (dt[i].category.indexOf(str) == -1 && dt[i].store.indexOf(str) == -1) {
					bb++
				}
			}
			if (aa != dt.length && bb != dt.length) {
				location = `./list.html?keywords=${str}`
			} else {
				location = "index1.html"
				alert("不明白您要搜索的内容，请重新组织语言")
			}
		}
	}
})()
window.onscroll = function() {
	if (document.documentElement.scrollTop > 650) {
		fixedBox.style.display = "block"
		goTop.style.display = "block"
	} else {
		fixedBox.style.display = "none"
		goTop.style.display = "none"
	}
	if (!isTop) {

		clearInterval(timer);
	}
	isTop = false;
}
bottom1.onclick = function() {
	//设置一个定时器
	timer = setInterval(function() {
		//获取滚动条的滚动高度
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		//用于设置速度差，产生缓动的效果
		var speed = Math.floor(-osTop / 6);
		document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
		isTop = true; //用于阻止滚动事件清除定时器
		if (osTop == 0) {
			clearInterval(timer);
		}
	}, 30);
}
newFruit.onclick = function(e) {
	var e = e || window.event
	var target = e.target || e.srcElement
	if (target.className = "fruit") {
		var str = target.innerHTML
		location = `./list.html?category=${str}`
	}
}
