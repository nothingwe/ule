//获取当前地址栏中的参数信息
var search = location.search
//获取大盒子对象
var box1 = document.querySelector(".container")
var dt;
var cartList = localStorage.getItem("cartList3")
if(cartList){
	cartList = JSON.parse(cartList)
}
//判断当前search对象中是否有值
if (search) {
	//分割search字符串
	var id = search.split('=')[1];
	(async function() {
		dt = await promiseAjax({
			url: '../php/details.php',
			data: 'id=' + id,
			datatype: 'json'
		})
		//创建拼接所有内容的字符串
		var str =
			`
        <div class="storeHeader">
        	<div class="storeHeader1">
        		<div class="storeHead">
        			<div class="storeHeadInfo">
        				<a href="javascript:;" class="fl"><span class="storeName">${dt.store}</span></a>
        				<span class="storeRate"><i></i><em></em></span>
        				<div class="storedHeadDetailInfo">
        					<div class="infoMain">
        						<div class="storepingfen">
        							<h4><span>${dt.pingfen}</span></h4>
        							<dl class="storeDescription">
        								<dt>${dt.descripe}</dt>
 
        							</dl>
        							<dl class="storeDescription">
        								<dt>${dt.service}</dt>
        								
        							</dl>
        							<dl class="storeDescription">
        								<dt>${dt.fahuo}</dt>
        							</dl>
        						</div>
        						<div class="storeView">
        							<a class="gotoStore" href="">浏览店铺</a>
        							<span id="addStoreFav2">收藏店铺</span>
        						</div>
        					</div>
        				</div>
        			</div>
        			<div class="kefu fl">
        				<em class="online"></em>
        			</div>
        			<div class="storehead-baseinfo">
        				<div class="storehead-fastlink">
        					<div class="store2d">
        						<span>收藏店铺</span>
        					</div>
        				</div>
        				<div class="head-shopcart fl">
        					<span class="shopcart-sum"><a href="cart.html">购物车</a><span class="shopcart-num">${cartList?cartList.length:0}</span></span>
        				</div>
        			</div>
        		</div>
        
        	</div>
        </div>
        <div class="wrapper">
        	<div class="wrapperHeader">
        		<a href="">首页</a> >
        		<a href="">特色美食</a> >
        		<a href="">新鲜水果</a> >
        		<a href="">${dt.category}</a> >
        		<span>${dt.title}</span>
        	</div>
        	<div class="innerWrapper clearfix">
        		<div class="preview clearfix">
        			<div class="jqzoom"><img src="${dt.img1}" class="proImg"><div class="mark"></div></div>
        			<div class="mirror"><img src="${dt.img1}" alt=""></div>
        			<div class="imgList">
        				<ul class="imgItems">
        					<li><img class="active "src="${dt.img1}" alt=""></li>
        					<li><img src="${dt.img2}" alt=""></li>
        					<li><img src="${dt.img3}" alt=""></li>
        					<li><img src="${dt.img4}" alt=""></li>
        					<li><img src="${dt.img5}" alt=""></li>
        				</ul>
        			</div>
        		</div>
        		<div class="productInfo">
        			<h1>${dt.title}</h1>
        			<div class="proDetails">
        				<div class="productDetail">
        					<dl class="proItemId clearfix">
        						<dt class="fl">销量 </dt>
        						<dd id="itemId fl">${dt.sale_num}</dd>
        					</dl>
        					<dl class="proPrice clearfix">
        						<dt class="fl">价格</dt>
        						<dd class="price fl">
        							<span>￥</span><strong id="priceId">${dt.price}</strong>
        							<del>${dt.pre_price}</del>
        						</dd>
        					</dl>
        					<dl class="proService clearfix">
        						<dt class="fl">服务 </dt>
        						<dd>本商品由邮乐网<a href="1"><span>${dt.store}</span></a>提供<br>并进行相关配送和售后等服务。</dd>
        					</dl>
        					<div class="weixin">
        						<img src="../images/generate.jpg" alt="">
        					</div>
        				</div>
        				<div class="proDetail-spec">
        					<dl class="spec-color clearfix">
        						<dt>颜色</dt>
        						<dd>
        							<ul class="clearfix">
        								<li>
        									<a href="" class="active">
        										<img src="${dt.img1}" alt="">
        									</a>
        								</li>
        							</ul>
        						</dd>
        					</dl>
        					<dl class="spec-attr clearfix">
        						<dt>规格</dt>
        						<dd>
        							<ul class="clearfix">
        								<li><a href="javascript://" class="active" style="display:${dt.title1?"block":"none"}">${dt.title1}</a></li>
        								<li><a href="javascript://" style="display:${dt.title1?"block":"none"}">${dt.title2}</a></li>
        								<li><a href="javascript://" style="display:${dt.title1?"block":"none"}">${dt.title3}</a></li>
        								
        							</ul>
        						</dd>
        					</dl>
        					<dl class="spec-quantity clearfix">
        						<dt>数量</dt>
        						<dd>
        							<span class="reduce-quantity">-</span>
        							<input type="text" name="quantity" value="1">
        							<span class="add-quantity">+</span>
        						</dd>
        					</dl>
        					<dl class="spec-select clearfix">
        						<dt>已选择</dt>
        						<dd>
        							<span class="attrCubetext">3斤装大果【脆甜好吃】</span>
        							<span class="pCounttext">1件</span>
        						</dd>
        					</dl>
        				</div>
        				<div class="proDetail-purchase">
        					<div class="addToCart clearfix">
        						<a href="javascript:;" class="buy">立即购买</a>
        						<a href="javascript:;" class="cart">加入购物车</a>
        						<a href="" class="favor"></a>
        					</div>
        				</div>
        				<div class="goods-info-bottom">
        					<p>本商品支持邮乐卡支付</p>
        					<p>服务承诺 <span>不支持七天无理由退货</span></p>
        				</div>
        			</div>
        		</div>
        		<div class="storeHots">
        			${dt.detail1}
        		</div>
        	</div>
        	<div class="bottomWrapper clearfix">
        		<div class="leftWrapper">
        			<div class="storeGuide">
        				<h3>商家信息</h3>
        				<div class="storeCon">
        					<div class="storeInfo">
        						<h4>
        							<a href="javascript:;">${dt.store}</a>
        							<span><em class="online"></em></span>
        						</h4>
        					</div>
        					<div class="storeClass">
        						<h4>${dt.pingfen}</h4>
        						<ul>
        							<li>${dt.descripe}</li>
        							<li>${dt.service}</li>
        							<li>${dt.fahuo}</li>
        						</ul>
        					</div>
        					<div class="viewStore clearfix">
        						<a href="" class="gotoStore">浏览店铺</a>
        						<span id="addStoreFav">收藏店铺</span>
        					</div>
        				</div>
        			</div>
        		</div>
        		<div class="mainWrapper">
        			<div id="hotRec">
        				${dt.related1}
        			</div>
        			<div class="tabHolder_Menu_div">
        				<ul class="tabHolder_Menu clearfix">
        					<li class="selected"><a href="#id1">商品详情</a></li>
        					<li><a href="#id2">商品评论(<em>112</em>)</a></li>
        					<li><a href="#id3">商品咨询</a></li>
        					<li><a href="#id4">声明与提醒</a></li>
        				</ul>
        			</div>
        			<div class="tabHolder-content">
        				<div class="goods_property">
        					<h3>商品属性</h3>
        					<ul class="clearfix">
        						<li>
        							<span>重量：
        								<font color="#333333;">
        									1.1-2.5kg</font>
        							</span>
        						</li>
        						<li class="widthLest">
        							<span>水果品种：
        								<font color="#333333;">
        									${dt.category}</font>
        							</span>
        						</li>
        						<li>
        							<span>包装方式：
        								<font color="#333333;">
        									简装</font>
        							</span>
        						</li>
        					</ul>
        				</div>
        			    <div id="listDesc_div">
        					<p style="text-align: center;">
        						<img src="${dt.detail2}" alt="">
        					</p>
        				</div>
        			</div>
					<div class="tabHolder-content" id="id2">
					    <div id="listDesc_div">
							<p style="text-align: center;">
								<img src="${dt.img2}" alt="">
							</p>
						</div>
					</div>
					<div class="tabHolder-content" id="id3">
					    <div id="listDesc_div">
							<p style="text-align: center;">
								<img src="${dt.img3}" alt="">
							</p>
						</div>
					</div>
					<div class="tabHolder-content" id="id4">
					    <div id="listDesc_div">
							<p style="text-align: center;">
								<img src="${dt.img4}" alt="">
							</p>
						</div>
					</div>
        		</div>
        	</div>
        </div>
        `
		//把当前内容添加到大盒子中
		box1.innerHTML = str;
		//获取账号cookie
		var name1 = getCookie("user")
		var reduce = document.querySelector(".reduce-quantity")
		var infoQuantity = document.querySelector(".pCounttext")
		var infoChoose = document.querySelector(".attrCubetext")
		var quantity=document.getElementsByName("quantity")
		var price=document.getElementById("priceId")
		//给大盒子对象绑定点击事件
		box1.onclick = function(e) {
			var e = e || window.event
			//获取点击对象
			var target = e.target || e.srcElement
			//数量加减
			if (target.innerHTML == "-") {
				var num = target.nextElementSibling.value
				num--
				if (num <= 1) {
					num = 1
					target.style.backgroundColor = "rgb(241, 241, 241)"
				}

				target.nextElementSibling.value = num
				var str = `${num}件`
				infoQuantity.innerHTML = str
			}
			if (target.innerHTML == "+") {
				var num = target.previousElementSibling.value
				num++
				if (num > 1) {
					reduce.style.backgroundColor = "rgb(255,255,255)"
				}
				target.previousElementSibling.value = num
				var str = `${num}件`
				infoQuantity.innerHTML = str
			}
			if (target.name == "quantity") {
				target.onblur = function() {
					var val = this.value
					var reg = /^[1-9]\d{0,4}$/
					if (reg.test(val)) {
						this.value = val
					} else {
						this.value = 1
					}
					var str = `${this.value}件`
					infoQuantity.innerHTML = str
					if (this.value > 1) {
						reduce.style.backgroundColor = "rgb(255,255,255)"
					} else {
						reduce.style.backgroundColor = "rgb(241, 241, 241)"
					}
				}
			}
			var url2="./list.html"
			//判断点击的对象是否为加入购物车按钮
			if (target.innerHTML == "加入购物车") {
				if (name1) {
					//获取localStorage中的cartList3
					var cartList = localStorage.getItem("cartList3")
					//判断当前获取的cartList是否存在
					if (cartList) {
						//把localStorage中获取的内容转为数组对象
						cartList = JSON.parse(cartList)
						var a = 0 //判断当前添加的商品是否在localStorage中存在
						//遍历数组中所有元素啊
						var num=quantity[0].value
						cartList.forEach(item => {
							//判断当前遍历的商品是否等于要添加的商品
							if (item.id == dt.id) {
								a++
								item.cart_number+=parseInt(num)
							}
						})
						//判断a变量是否等于0
						if (a == 0) {
							//修改商品数量
							dt.cart_number = 1
							//把当前对象追加到数组中
							cartList.push(dt)
						}
						//把当前商品添加到localStorage中
						localStorage.setItem("cartList3", JSON.stringify(cartList))
					} else {
						//修改当前商品数量
						dt['cart_number'] = 1
						//把当前商品添加到localStorage中
						localStorage.setItem("cartList3", JSON.stringify([dt]))
					}

				} else {
					alert("你还没登录，登录后才能加入购物车")
					location.href = "./login.html?pathUrl=" + url2
				}
			}
		if(target.innerHTML=="立即购买"){
			if(name1){
				if(confirm("你确定要购买")){
					if(confirm("你需要支付"+(parseFloat(price.innerHTML)*parseInt(quantity[0].value))+"元")){
						alert("支付成功")
						location="./list.html"
					}
				}
			}else{
				alert("你还没登录，登录后才能购买")
				location.href = "./login.html?pathUrl=" + url2
			}
		}
		}
		var box = document.querySelector(".jqzoom")
		var boxImg = box.querySelector("img")
		var mark = document.querySelector(".mark")
		var imgs = document.querySelector(".imgList").querySelectorAll("img")
		var boxright = document.querySelector(".mirror")
		var rightImg = boxright.querySelector("img")
		var guige = document.querySelector(".spec-attr").querySelectorAll("a")
        var innerWrapper=document.querySelector(".innerWrapper")
		function guige1() {
			for (let i = 0; i < guige.length; i++) {
				guige[i].onclick = function() {
					for (let j = 0; j < guige.length; j++) {
						guige[j].className = ""
					}
					guige[i].className = "active"
					var info = guige[i].innerHTML
					infoChoose.innerHTML = info
				}
			}
		}
		guige1()
		box.onmouseover = function(e) {
			//让隐藏的内容显示
			boxright.style.display = 'block'
			mark.style.display = 'block'
		}
		//移动
		box.onmousemove = function(e) {
			var e = e || window.event
			move(e)
		}
		//移出
		box.onmouseout = function() {
			//让显示的内容隐藏
			boxright.style.display = 'none'
			mark.style.display = 'none'
		}
		//移动函数
		function move(e) {
			//获取当前移动距离
			var x1 = e.pageX - box.offsetLeft-innerWrapper.offsetLeft - parseInt(mark.offsetWidth / 2)
			var y1 = e.pageY - box.offsetTop -innerWrapper.offsetTop- parseInt(mark.offsetHeight / 2)
			//设置移动范围
			var maxX = box.offsetWidth - mark.offsetWidth
			var maxY = box.offsetHeight - mark.offsetHeight
			//右边图片的移动
			var rightX, rightY
			//水平判断
			if (x1 <= 0) {
				mark.style.left = "0px"
				rightX = 0
			} else if (x1 >= maxX) {
				mark.style.left = maxX + "px"
				rightX = maxX
			} else {
				mark.style.left = x1 + "px"
				rightX = x1
			}
			//垂直方式
			if (y1 <= 0) {
				mark.style.top = "0px"
				rightY = 0
			} else if (y1 >= maxY) {
				mark.style.top = maxY + 'px'
				rightY = maxY
			} else {
				mark.style.top = y1 + 'px'
				rightY = y1
			}
			//让右边图片进行移动
			rightImg.style.top = -2 * rightY + 'px'
			rightImg.style.left = -2 * rightX + 'px'
		}
		//给下面五张小图片绑定点击事件
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].onclick = function() {
				//先把所有的图片边框去掉
				for (var j = 0; j < imgs.length; j++) {
					imgs[j].className = ''
				}
				//给当前选中对象添加边框
				this.className = 'active'
				//获取当前点击的图片地址
				var url1 = this.getAttribute("src")
				//分别修改左右两个盒子中的图片路径
				boxImg.setAttribute('src', url1)
				rightImg.setAttribute('src', url1)
			}
		}
		var storeHots=document.querySelector(".storeHots")
		var goodsUl=storeHots.querySelector(".goodsUl")
		var uls=goodsUl.querySelectorAll("ul")
		var left1=document.querySelector(".p_l")
		var right1=document.querySelector(".p_r")
		var center1=document.querySelector(".page_box").querySelector("span")
		var ulIndex=0
		var timer = null
		if (timer) {
		    clearInterval(timer)
		    timer = null
		}
		timer = setInterval(autoPlay, 3000)
		function autoPlay() {
		    ulIndex++
		    if (ulIndex >= uls.length) {
		        ulIndex = 0
		    }
		    changeImg(ulIndex)
		}
		// 切换图片
		function changeImg(a) {
		    for (var j = 0; j < uls.length; j++) {
		        uls[j].className = ""
		    }
		    // 改变当前显示索引
		    uls[a].className = "current"
		    ulIndex = a
			center1.innerHTML=(ulIndex+1)+"/"+(uls.length)
		}
		storeHots.onmouseover = function() {
		    clearInterval(timer)
		}
		storeHots.onmouseout = function() {
		    timer = setInterval(autoPlay, 3000)
		}
		right1.onclick=function(){
			autoPlay()
		}
		left1.onclick=function(){
			if(ulIndex<=0){
				ulIndex=uls.length-1
			}else{
				ulIndex--
				
			}
			changeImg(ulIndex)
		}
	})()

} else {
	alert("你还没选中商品")
	location = "./list.html"
}
