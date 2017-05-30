/*
* @Author: whuzxq
* @Date:   2016-11-10 17:15:18
* @Last Modified by:   whuzxq
* @Last Modified time: 2016-11-16 21:54:17
*/
$(function(){
	window.requestAnimationFrame= window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    //var TEXT=aj('GMAXYUZHI');
});
function aj( id ){   //选择id元素
	return document.getElementById(id);
}
window.onload=function(){
	var genetic=new Genetic();
	genetic.init();
	var px=genetic.px;
	genetic.randCreatePop(this.curchromo);	//初始化
}

$("#daxin").on("click",function(){
   //TEXT.innerHTML='<span style="font-size:12px;">正在计算中...(请勿移动鼠标)</span>';
   window.requestAnimationFrame(draw,3000);
});

function draw(){
	genetic.accute();
	var target=genetic.cmax;
	for(var i=0;i<px.data.length;i+=4){
				if(px.data[i]<=target){
					px.data[i]=0;px.data[i+1]=0;px.data[i+2]=0;px.data[i+3]=255;
				}else{
					px.data[i]=255;px.data[i+1]=255;px.data[i+2]=255;px.data[i+3]=255;
				}
		}
	genetic.ctx.putImageData(px,0,0); 		
}
// function main3(){
// 	var oBtn=aj('dajin');
// 	var canvas=aj('can'),
// 		ctx=canvas.getContext('2d');
// 	var img=new Image();
	
// 	img.src='img/ss.jpg';
// 	oBtn.onclick=function (){
// 		// var M=222,N=269;
// 		// ctx.drawImage(img,0,0,M,N);
// 		// px=ctx.getImageData(0,0,M,N);
// 		// 
// 		// var arr=new Array();
// 		// var GMAXYUZHI;                 //G最大时的阈值
// 		// var Gold=0;
// 		// for(var i=0;i<256;i++){
// 		// 	arr[i]=i;
// 		// }
		
// 		setTimeout(function(){
// 			for(var xx in arr){          //遍历0-255的每个灰度值下的G值，求出最佳分割点
// 				var W0=0,W1=0,NUM0=0,NUM1=0,U0=0,U1=0,U,Gnow=0;
// 				var T=xx;				//NUM0，小于阈值灰度的总和；U0平均灰度
// 				var N0=0,N1=0;         //N0小于阈值的像素个数
// 				for(var i=0;i<LENGTH;i+=4){
// 					if(px.data[i]<=T){
// 						N0+=1;
// 						NUM0+=px.data[i];
// 					}else{
// 						N1+=1;
// 						NUM1+=px.data[i];
// 					}
// 				}
// 				W0=numberFormat(N0/(M*N),2);//前景像素点站整幅图的比例
// 				//W1=numberFormat(N1/(M*N),2);
// 				W1=numberFormat(1-W0,2);//后经像素点占整幅图的比例
// 				U0=(N0==0)?0:(NUM0/N0);//前景平均灰度
// 				U1=(N1==0)?0:(NUM1/N1);//后经平均灰度
// 				U=NUM0/(M*N)+NUM1/(M*N);//总平均灰度
// 				Gnow=W0*Math.pow((U0-U),2)+W1*Math.pow((U1-U),2);//g=ω0ω1(μ0-μ1)^2      
// 				if(Gnow>Gold){//找到最大值
// 					Gold=Gnow;
// 					GMAXYUZHI=T;//得到分割点
// 				}
// 			}
// 			TEXT.innerHTML=GMAXYUZHI;
// 			for(var i=0;i<LENGTH;i+=4){
// 				if(px.data[i]<=GMAXYUZHI){
// 					px.data[i]=0;px.data[i+1]=0;px.data[i+2]=0;px.data[i+3]=255;
// 				}else{
// 					px.data[i]=255;px.data[i+1]=255;px.data[i+2]=255;px.data[i+3]=255;
// 				}
// 			}
// 			ctx.putImageData(px,0,0); 		
// 		},3);
// 	}
// }

