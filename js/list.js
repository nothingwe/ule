//获取操作对象
var goodsList = document.querySelector('.goodsList').querySelector("ul");
var pagination1 = document.querySelector('.pagination');
var box = document.querySelector(".main");
var listSort = box.querySelector(".listSort").querySelectorAll("a");
(async function() {
	var dt = await promiseAjax({
		url: '../php/list.php',
		datatype: 'json'
	})
	//创建分页器对象
	new Pagination(pagination1, {
		pageInfo: {
			pagenum: 1,
			pagesize: 40,
			totalsize: dt.length,
			totalpage: Math.ceil(dt.length / 40)
		},
		textInfo: {
			first: '首页',
			prev: "上一页",
			next: "下一页",
			last: "尾页"
		},
		cb(m) {
			//获取当前页需要显示的数据
			var ar1 = dt.slice((m - 1) * 40, m * 40)
			//遍历当前ar1数组中所有的数据
			show(ar1)

			function show(ar1) {
				//创建拼接所有数据的字符串
				var str = ''
				if(ar1.length!=0){
					ar1.forEach(item => {
						str +=
							`
							<li>
								<p class="uleImg">
									<a href="details.html?id=${item.id}"><img src="${item.img1}" alt=""></a>
								</p>
								<p class="goodsName">
									<a href="">${item.title}</a>
								</p>
								<p class="ulePrice">
									<span>￥<i>${item.price}</i></span>
									<span><em>${item.pre_price}</em></span>
								</p>
								<p class="shopArea">
									<a href="">${item.store}</a>
									<em></em>
									<a href="" class="area">${item.address}</a>
								</p>
								<p class="pingfen">
									<a href="">
										<span class="tit">${item.pingfen}</span>
										<span>${item.descripe}</span>
										<span>${item.service}</span>
										<span>${item.fahuo}</span>
									</a>
								</p>
							</li>    
							`
					})
				}else{
					str=
					`<div class="fail_content">
					    <div class="fail1">
					        <h3>很抱歉，没有找到任何商品</h3>
					        <p>试试下面几种方法吧：</p>
					        <p>1、更改搜索关键字。（例：将“时尚女箱包”改为“箱包”后重新搜索）</p>
					        <p class="line_bottom">2、看看下面邮乐给您推荐的物品吧</p>          
					    </div>  
					</div>`
					
				}
				
				
				//把当前拼接好的字符串，添加到row盒子中
				goodsList.innerHTML = str
			}
			for (let i = 0; i < listSort.length; i++) {
				listSort[i].onclick = function() {
					for (var j = 0; j < listSort.length; j++) {
						listSort[j].className = ""
					}
					listSort[i].className = "active"
				}
			}
			async function show1(){
				var s1 = document.querySelector(".searchBrand").querySelector(".show").innerHTML
				var s2 = document.querySelector(".searchCategory").querySelector(".show").innerHTML
				var s3=document.querySelector(".listSort").querySelector(".active").innerHTML
				// var s4=document.querySelector(".listSort").querySelector(".active").firstElementChild.innerHTML
				var reg = new RegExp('[\u4e00-\u9fa5]+$','g');
				s3=s3.match(/[\u4e00-\u9fa5]/g).join("");
				dt = await promiseAjax({
					url: '../php/search1.php',
					data: `brand=${s1}&category=${s2}`,
					datatype: 'json'
				})
				if (dt.length > 0) {
					new Pagination(pagination1, {
						pageInfo: {
							pagenum: 1,
							pagesize: 40,
							totalsize: dt.length,
							totalpage: Math.ceil(dt.length / 40)
						},
						textInfo: {
							first: '首页',
							prev: "上一页",
							next: "下一页",
							last: "尾页"
						},
						cb(m) {
							var ar1 = dt.slice((m - 1) * 40, m * 40)
							show(ar1)
							if(s3=="最新"){
								var dt3 = dt.concat().reverse()
								var ar3 = dt3.slice((m - 1) * 40, m * 40)
								show(ar3)
							}
							if(s3=="默认"){
								var dt1 = dt.concat().sort(function(a, b) {
									return a.id - b.id
								})
								var ar1 = dt.concat().slice((m - 1) * 40, m * 40)
								show(ar1)
							}
							if(s3=="价格"){
								var dt1 = dt.concat().sort(function(a, b) {
									return a.price - b.price
								})
								var ar1 = dt1.slice((m - 1) * 40, m * 40)
								show(ar1)
							}
						}
					})
				} else {
					str =
						`<div class="fail_content">
					    <div class="fail1">
					        <h3>很抱歉，没有找到任何商品</h3>
					        <p>试试下面几种方法吧：</p>
					        <p>1、更改搜索关键字。（例：将“时尚女箱包”改为“箱包”后重新搜索）</p>
					        <p class="line_bottom">2、看看下面邮乐给您推荐的物品吧</p>          
					    </div>  
					</div>`
					goodsList.innerHTML = str
				}
			}
			var search=location.search
			if(search){
				var category = search.split('=')[1];
				category=decodeURIComponent(category)
				for(let i=0;i<dt.length;i++){
					if(dt[i].category.indexOf(category)!=-1){
						var lis=document.querySelector(".ul2").querySelectorAll("li")
						var a=0
						for(let j=0; j<lis.length;j++){
							if(lis[j].innerHTML.indexOf(category)!=-1){
								lis[j].className="show"
							}else{
								a++
								lis[j].className=""
							}
						}
						if(a==lis.length){
							lis[0].className="show"
						}
						show1()
					}else if(dt[i].store.indexOf(category)!=-1 && dt[i].category.indexOf(category)==-1){
						var lis=document.querySelector(".ul1").querySelectorAll("li")
						var b=0
						for(let j=0; j<lis.length;j++){
							if(lis[j].innerHTML.indexOf(category)!=-1){
								lis[j].className="show"
							}else{
								lis[j].className=""
								b++
							}
						}
						if(b==lis.length){
							lis[0].className="show"
						}
						show1()
					}
				}	
			}
			box.onclick = async function(e) {
				var e = e || window.event
				var target = e.target || e.srcElement
				if (target.innerHTML == "默认") {
					var dt1 = dt.concat().sort(function(a, b) {
						return a.id - b.id
					})
					var ar1 = dt.slice((m - 1) * 40, m * 40)
					show(ar1)
				}
				if (target.innerHTML == "价格") {
					var dt1 = dt.concat().sort(function(a, b) {
						return a.price - b.price
					})
					var ar1 = dt1.slice((m - 1) * 40, m * 40)
					show(ar1)
				}
				if (target.innerHTML == "月销量") {
					var dt2 = dt.concat().sort(function(a, b) {
						return b.sale_num - a.sale_num
					})
					var ar2 = dt2.slice((m - 1) * 40, m * 40)
					show(ar2)
				}
				if (target.innerHTML == "最新") {
					var dt3 = dt.concat().reverse()
					var ar3 = dt3.slice((m - 1) * 40, m * 40)
					show(ar3)
				}
				if(target.className=="store1"){
					target.onblur=function(){
						var val=target.value
						var dt1=dt.filter(item=>{
							return item.address=val
						})
						var ar1=dt1.slice((m - 1) * 40, m * 40)
						show(ar1)
					}
				}
				if (target.getAttribute('name') == "index") {
					var ar = target.parentNode.children
					for (let i = 0; i < ar.length; i++) {
						ar[i].className = ""
					}
					target.className = "show"
					show1()
				}
			}
		}
	})
})()
