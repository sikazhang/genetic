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

var Sepr=function(){
	this.count=0;
	this.targets=new Array();
    this.isLoop=false;
    this.intervalnumber=-1;
    this.myChart=null;
    this.threshold=document.getElementById("thresholdnum");
	//this.changedata=function(myChart){  
 	  //   window.setInterval(function () {
    // //var data = [30, 5, 10, 40, 20, 10];
    //     //genetic.refreshData(this.targets,myChart);},6000);
    // }
    this.draw=function (){
	//randCreatePop(this.curchromo);
    this.count++;
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
	this.threshold.innerHTML=target;
	if(this.count<6){
    	this.targets.push(target);
    }
    else{
    	genetic.refreshData(this.targets,this.myChart);
    	this.count=1;
    	this.targets.length=0;
    	this.targets.push(target);
    }
}


    
}
function aj( id ){   //选择id元素
	return document.getElementById(id);
}
window.onload=function(){
	
	genetic.init();
	 
	//genetic.randCreatePop(this.curchromo);	//初始化
}




$(function(){
	genetic=new Genetic();
});

 