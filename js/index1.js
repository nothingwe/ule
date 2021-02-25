import {move} from './move.js'
var ul1=document.querySelector(".mod-topslide>.slide-items")
var lis=ul1.querySelectorAll("li")
console.log(lis[0])
var spans=document.querySelectorAll(".slide-index>span")
var index=0
var timer
var timer2
var arr=['rgb(173, 16, 11)','rgb(183, 26, 23)','rgb(167, 15, 14)','rgb(174, 0, 1);',"rgb(200, 7, 8)",'rgb(226, 27, 24)','rgb(0, 149, 190)','rgb(26, 76, 219)','rgb(212, 17, 202)','rgb(108, 17, 212)']
move(lis[index],{"opacity":100})
ul1.style.backgroundColor=arr[index]
move(ul1,{"opacity":100})
autoMove()
function fn1(){
	lis[index].style.zIndex=1
	lis[index].style.opacity=0.1
	ul1.style.opacity=0.1
	spans[index].className=""
}
function fn2(){
	spans[index].className="active"
	lis[index].style.zIndex=2
	ul1.style.backgroundColor=arr[index]
}
function autoMove(){
	timer2=setInterval(function(){
		fn1()
		index++
		if(index>lis.length-1){
			index=0
		}
		fn2()
		move(lis[index],{"opacity":100})
		move(ul1,{"opacity":100})
	},4000)
}
for(let i=0;i<spans.length;i++){
	spans[i].onclick=function(){
		clearInterval(time2)
		fn1()
		index=i
		fn2()
		move1(lis[index],{"opacity":100})
		move1(ul1,{"opacity":100})
		autoMove()
	}
}
ul1.onmouseover=function(){
	clearInterval(timer2)
}
ul1.onmouseout=function(){
	autoMove()
}

