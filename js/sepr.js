/*
* @Author: whuzxq
* @Date:   2016-11-10 17:15:18
* @Last Modified by:   whuzxq
* @Last Modified time: 2016-11-12 20:57:24
*/
$(function(){
	window.requestAnimationFrame= window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    //var genetic=new Genetic();
   
});
function aj( id ){   //选择id元素
	return document.getElementById(id);
}
window.onload=function(){
	
	genetic.init();
	 
	//genetic.randCreatePop(this.curchromo);	//初始化
}

$("#dajin").on("click",function(){
   var text=aj("GMAXYUZHI");
   text.innerHTML='<span style="font-size:12px;">正在计算中...(请勿移动鼠标)</span>';
   // genetic.randCreatePop();
   window.setInterval(function(){draw()},1000);
   //window.requestAnimationFrame(draw,3000);
});

function draw(){
	//randCreatePop(this.curchromo);
	genetic.accute();
	var target=genetic.xmymax;
	var initpx=genetic.ctx.getImageData(0,0,222,269);
	for(var i=0;i<genetic.px.length;i+=4){
				if(genetic.px[i]<=target){

					initpx.data[i]=0;initpx.data[i+1]=0;initpx.data[i+2]=0;initpx.data[i+3]=255;
				}else{
					initpx.data[i]=255;initpx.data[i+1]=255;initpx.data[i+2]=255;initpx.data[i+3]=255;
				}
		}
	genetic.ctx.putImageData(initpx,0,0); 
	console.log(target);	
}
$(function(){
	genetic=new Genetic();
});