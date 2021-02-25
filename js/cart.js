//获取账号cookie
var name1=getCookie("user")
//获取大盒子对象
var box=document.querySelector(".wrapper1")
//获取地址栏中的地址
var url=location.href
//获取localStorage中的cartList3
var cartList=localStorage.getItem("cartList3")
//把当前cartList字符串转为数组对象
cartList=JSON.parse(cartList)||[]
//判断当前cookie是否存在
if(name1){
    show()
}else{
    alert("你还没登录，请登录再进入")
    location="./login.html?pathUrl="+url
}
function show(){
    //判断当前localStorage中是否有内容
    if(cartList.length>0){
        //获取全选框是否被选中
        var aa=cartList.every(item=>{
            //判断当前商品是否被选中
            return item.is_select==1
        })
		var bb=cartList.some(item=>{
			return item.is_select==1
		})
		if(bb==1){
			bb="btn-ordernow"
		}else{
			bb="btn-ordernow disabled"
		}
		(async function(){
			dt = await promiseAjax({
				url: '../php/cart.php',
				data: '',
				datatype: 'json'
			})
			console.log()
			//获取当前被选中商品的种类和价格
			 var sum=total()
			 var str2=`
			<div class="wrapper fullWrapper">
				<div class="myCart">
					<div class="cart-title clearfix">
						<p class="fl">邮乐商品</p>
						<p class="fr"><a href="">我的收藏夹</a></p>
					</div>
					<div class="cart-head">
						<ul class="clearfix">
							<li class="item-check"><input type="checkbox" class="checkAll" ${aa?"checked":''}></li>
							<li class="item-name">商品信息</li>
							<li class="item-price">单价</li>
							<li class="item-count">商品数量</li>
							<li class="item-total">价格合计</li>
							<li class="item-action">操作</li>
						</ul>
					</div>
					<div class="cart-main">
			 `
			 //遍历数组中所有商品
			 cartList.forEach(item=>{
			     str2+=`
			     <div class="cart-store">
			     	<div class="store-items">
			     		<ul class="store-item first clearfix">
			     			<li class="item-check"><input type="checkbox" class="checkItem" ${item.is_select==1?"checked":''} data-id="${item.id}"></li>
			     			<li class="item-name">
			     				<div class="prodinfo">
			     					<a href=""><img src="${item.img1}" alt=""></a>
			     					<a href="">${item.title}</a>
			     				</div>
			     			</li>
			     			<li class="item-price">￥<em>${item.price}</em></li>
			     			<li class="item-count">
			     				<div class="prodCount">
			     					<button class="btn-minus ${item.cart_number<=1?"disabled":''}" data-id="${item.id}"></button>
			     					<input type="text" value="${item.cart_number}" name="txt" data-id="${item.id}" disabled>
			     					<span class="btn-plus" data-id="${item.id}"></span>
			     				</div>
			     			</li>
			     			<li class="item-total">￥<em>${(item.price*item.cart_number).toFixed(2)}</em></li>
			     			<li class="item-action"><p>收藏</p><p data-id="${item.id}">删除</p></li>
			     		</ul>
			     	</div>
			     </div>
			     `
			 })
			 //给当前字符串拼接结束的标签
			 str2+=`
					</div>
							<div class="cart-foot">
								<span class="item-check"><input type="checkbox" class="checkAll" ${aa?"checked":''}>全选</span>
								<a href="" class="btn-delsel">批量删除</a>
								<a href="" class="btn-clear">清空购物车</a>
							</div>
						</div>
						<div class="myCart-bar">
							<div class="cart-total clearfix">
								<dl class="prod-count">
									<dt>商品数量</dt>
									<dd><strong>${sum[0]}</strong>件</dd>
								</dl>
								<dl class="prod-price">
									<dt>价格合计</dt>
									<dd><strong>￥<em>${(sum[1])}</em></strong></dd>
								</dl>
								<dl class="prod-discount">
									<dt>促销抵扣</dt>
									<dd>- <strong>￥<em>0.00</em></strong></dd>
								</dl>
								<dl class="prod-totalPrice">
									<dt class="fl">商品总价：<br><span>不含运费</span></dt>
									<dd class="fl">￥<em>${(sum[1])}</em></dd>
								</dl>
								<p class="fr">
									<a href="list.html" class="btn-continue">继续购物</a>
									<a class="${bb}">去结账</a>
								</p>
							</div>
						</div>
						<div class="l-product">
							<div class="l-link clearfix">
								<div class="l-link-item l-curr">热销商品</div>
								<div class="l-link-item">最近浏览过的</div>
							</div>
							<div class="l-con">
								<div class="tabCon clearfix">
									<div class="l-con-link clearfix">
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="${dt[0].img1}" alt="">
												<span class="l-title">${dt[0].title}</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>${dt[0].price}</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="${dt[1].img1}" alt="">
												<span class="l-title">${dt[1].title}</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>${dt[1].price}</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="${dt[2].img1}" alt="">
												<span class="l-title">${dt[2].title}</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>${dt[2].price}</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="${dt[3].img1}" alt="">
												<span class="l-title">${dt[3].title}</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>${dt[3].price}</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="${dt[4].img1}" alt="">
												<span class="l-title">${dt[4].title}</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>${dt[4].price}</font></div>
										</div>
									</div>
								</div>
								<div class="tabCon clearfix">
									<div class="l-con-link clearfix">
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="https://pic.ulecdn.com/pic/user_800114393/product/prd20191205/9e581b49dfa9a262_p740x742_sl.jpg" alt="">
												<span class="l-title">【2瓶】泊泉雅（BIOAOUA）凡士林保湿霜170g*2瓶 保湿补水滋养</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>19.90</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="https://pic.ulecdn.com/pic/user_800142433/product/prd20210131/f8924fdd8cef5e6e_p800x800_sl.jpg" alt="">
												<span class="l-title">【【全程冷链 领券立减20元】猴哥出品阿粮工坊大黄米汤圆400gＸ4袋芝麻馅花生馅包邮</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>54.80</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="https://pic.ulecdn.com/pic/user_800116664/product/prd20210201/e9b4ba391eec5925_p800x800_sl.jpg" alt="">
												<span class="l-title">【平阳馆 特惠价】山西翼城红富士苹果 脆甜多汁 10斤装</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>8.90</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="https://pic.ulecdn.com/pic/user_800114393/product/prd20191205/9e581b49dfa9a262_p740x742_sl.jpg" alt="">
												<span class="l-title">【2瓶】泊泉雅（BIOAOUA）凡士林保湿霜170g*2瓶 保湿补水滋养</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>19.90</font></div>
										</div>
										<div class="l-content-item">
											<a href="javascript:;" class="l-img">
												<img src="https://pic.ulecdn.com/pic/user_800142433/product/prd20210131/f8924fdd8cef5e6e_p800x800_sl.jpg" alt="">
												<span class="l-title">【龙泉】 常山胡柚8斤装礼盒装</span>
												</a>
												<div class="l-minPrice"><span>￥</span><font>31.00</font></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`
			 //最后把拼接好的内容添加到box大盒子中
			 box.innerHTML=str2
			 var jiesuan=document.querySelector(".btn-ordernow")
			 //给box大盒子对象绑定点击事件
			 box.onclick=function(e){
			     var e = e || window.event
			     //获取点击对象
			     var target=e.target || e.srcElement
			 
			     //判断当前点击的是否为+
			     if(target.className=="btn-plus"){
			         //获取当前对象中的id属性
			         var id=target.getAttribute("data-id")
			         //遍历cartList数组对象
			         cartList.forEach(item=>{
			             //判断遍历出来的商品是否为当前操作商品
			             if(item.id==id){
			                 item.cart_number++
			             }
			         })
			         //重新把当前操作完毕的数组添加到localStorage中
			         localStorage.setItem("cartList3",JSON.stringify(cartList))
			         //调用show方法，重新把页面再次渲染
			         show()
			     }
			     //判断当前点击的是否为减法按钮
			     if(target.className=='btn-minus '){
			         //获取当前对象中的id属性
			         var id=target.getAttribute("data-id")
			         //遍历cartList数组对象
			         cartList.forEach(item=>{
			             //判断遍历出来的商品是否为当前操作商品
			             if(item.id==id){
			                 item.cart_number--
			             }
			         })
			         //重新把当前操作完毕的数组添加到localStorage中
			         localStorage.setItem("cartList3",JSON.stringify(cartList))
			         //调用show方法，重新把页面再次渲染
			         show()
			     }
			     //删除
			     if(target.innerHTML=="删除"){
			         //获取当前点击对象的id
			         var id=target.getAttribute("data-id")
			         cartList=cartList.filter(item=>{
			             //过滤被删除的商品
			             return item.id!=id
			         })
			         //重新把当前操作完毕的数组添加到localStorage中
			         localStorage.setItem("cartList3",JSON.stringify(cartList))
			         //调用show方法，重新把页面再次渲染
			         show()
			     }
			     //全选
			     if(target.className=="checkAll"){
			     //     // 遍历所有商品
			         cartList.forEach(item=>{
			             //判断当前全选框是否被选中
			             if(target.checked){
			                 item.is_select=1
			             }else{
			 				item.is_select=0
			             }
			         })
			         // 重新把当前操作完毕的数组添加到localStorage中
			         localStorage.setItem("cartList3",JSON.stringify(cartList))
			         //调用show方法，重新把页面再次渲染
			         show()
			     }
			     //选中框
			     if(target.className=="checkItem"){
			         //获取当前商品对应的id 
			         var id=target.getAttribute("data-id")
			         //遍历数组中所有的商品对象
			         cartList.forEach(item=>{
			            if(item.id==id){
			             item.is_select=item.is_select==1?"0":"1"
			            }
			        })
			         localStorage.setItem("cartList3",JSON.stringify(cartList))
			         show()
			 		
			     }
			 	//批量删除
			 	if(target.innerHTML=="批量删除"){
			 		cartList=cartList.filter(item=>{
			 			return item.is_select==0
			 		})
			 		localStorage.setItem("cartList3",JSON.stringify(cartList))
			 		show()
			 	}
			     //去结算
			     if(target.innerHTML=="去结账"){
			         //添加确认框
			 		var bb=cartList.some(item=>{
			 			return item.is_select==1
			 		})
			 		if(bb==1){
			 			if(confirm("你确定要购买吗？")){
			 			    alert("你需要支付：￥"+total()[1])
			 			    cartList=cartList.filter(item=>{
			 			        return item.is_select!=1
			 			    })
			 			    //重新把当前操作完毕的数组添加到localStorage中
			 			    localStorage.setItem("cartList3",JSON.stringify(cartList))
			 			    //调用show方法，重新把页面再次渲染
			 			    show()
			 			}
			 		}
			         
			     }
			     //清空购物车
			     if(target.innerHTML=="清空购物车"){
			         //重新把当前操作完毕的数组添加到localStorage中
			         localStorage.setItem("cartList3",JSON.stringify([]))
			         //调用show方法，重新把页面再次渲染
			         show()
			     }
			 
			 }
			 var tab=document.querySelectorAll(".l-link-item")
			 var con=document.querySelectorAll(".tabCon")
			 for(let i=0;i<con.length;i++){
			 	tab[i].onclick=function(){
			 		for(let j=0;j<con.length;j++){
			 			tab[j].className="l-link-item"
			 			con[j].style.display="none"
			 		}
			 		tab[i].className="l-link-item l-curr"
			 		con[i].style.display="block"
			 	}
			 }
			 //统计所选商品种类和价格
			 function total(){
			     var num=0 //所选商品种类
			     var price=0 //所选商品总价格
			     //遍历cartList数组对象
			     cartList.forEach(item=>{
			         //判断当前商品是否被选中
			         if(item.is_select==1){
			             num+=item.cart_number
			             price+=(item.cart_number*item.price)
			         }
			     })
			 	price=price.toFixed(2)
			     return [num,price]
			 }
		})()

    }else{
        var str1=`
          <div class="wrapper empty-wrapper">
          			<div class="myCart">
          				<div class="cart-title clearfix">
          					<h3>购物车</h3>
          					<p class="fr"><a href="">我的收藏夹</a></p>
          				</div>
          				<div class="cart-empty">
          					<p>您的购物车暂无商品，立即去挑选商品吧！</p>
          					<a class="btn-cart-toshopping" href="list.html">去购物&gt;&gt;</a>
          				</div>
          			</div>
          		</div>
        ` 
        //把当前内容添加到box盒子中
        box.innerHTML=str1
    }
}
