function move(ele,target,cb){
    //创建对象，存放每个参数对应的定时器
    var obj={}
    //遍历target对象
    for(let attr in target){
        //给对象添加键值对
        obj[attr]=setInterval(function(){
            var startStyle //当前对象的起始值
            //判断当前属性是否为透明度
            if(attr=="opacity"){
                //获取非行间样式
                if(ele.currentStyle){
                    startStyle=ele.currentStyle[attr]*100
                }else{
                    startStyle=window.getComputedStyle(ele)[attr]*100
                }
            }else{
                //获取非行间样式
                if(ele.currentStyle){
                    startStyle=parseFloat(ele.currentStyle[attr])
                }else{
                    startStyle=parseFloat(window.getComputedStyle(ele)[attr])
                }
            }
            //设置步长
            var speed=(target[attr]-startStyle)/10
            //判断步长是否大于0
            speed=speed>0?Math.ceil(speed):Math.floor(speed)
            //判断剩余的运动量是否小于等于步长
            if(Math.abs(target[attr]-startStyle)<=Math.abs(speed)){
                //清除定时器
                clearInterval(obj[attr])
                //判断是否为透明度运动
                if(attr=="opacity"){
                    ele.style[attr]=target[attr]/100
                }else{
                    ele.style[attr]=target[attr]+"px"
                }
                //删除对象中的该键值对
                delete obj[attr]
                var num=0 //键值对的个数
                //遍历当前对象中还有多少个键值对
                for(var i in obj){
                    num++
                }
                //判断num是否为0
                if(num==0){
                    if(cb){
                        cb()
                    }
                }
            }else{
                //判断是否为透明度运动
                if(attr=="opacity"){
                    ele.style[attr]=(startStyle+speed)/100
                }else{
                    ele.style[attr]=startStyle+speed+"px"
                }
            }
        },30)
        
    }
}
export{move}