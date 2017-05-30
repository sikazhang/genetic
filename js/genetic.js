/*
* @Author: whuzxq
* @Date:   2016-11-10 11:29:49
* @Last Modified by:   whuzxq
* @Last Modified time: 2016-11-11 18:12:41
*/

$(function(){
	window.requestAnimationFrame= window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
});
var Genetic=function(src){
	this.count=1000;//迭代次数
	this.curchromo=new Array();//初始种群
	this.nextchromo=new Array();//更新后种群
	this.popnum=4;//初始化种群个数
	this.genenum=8;//基因位数
	this.crossrate=1;
	this.muterate=1;
	this.mymax=-1;
	this.xmymax=-1;
	this.canvas=document.getElementById("can");
	this.ctx=this.canvas.getContext('2d');
	this.px=new Array();
	//this.initpx=null;//初始值存储
	//this.img=new Image();
 
   this.init=function(){
   	 var img=new Image();
   	 img.src='img/ss.jpg';
	 this.ctx.drawImage(img,0,0,222,269);
	 var initpx=this.ctx.getImageData(0,0,222,269);
	 for(var i=0;i<initpx.data.length;i++){
	 	this.px.push(initpx.data[i]);
	 }
	 this.randCreatePop(this.curchromo);
   }
    this.accute=function(){
    	//this.randCreatePop(this.curchromo);
    	this.updatePop(this.curchromo,this.nextchromo);
    	this.selection(this.nextchromo);
    	this.crossover(this.nextchromo);
    	this.mutation(this.nextchromo);
    	this.updatePop(this.nextchromo,this.curchromo);
    	this.xmymax=this.cmax(this.curchromo);
    }
    this.cmax=function(curchromo){
       for (var i = 0; i <this.popnum; i++) {
       	  //var maxval=(curchromo[i].fitValue>this.mymax)?curchromo[i].fitValue:this.mymax;
       	  if(curchromo[i].fitValue>this.mymax){
       	  	this.mymax=curchromo[i].fitValue;
       	  	this.xmymax=this.binToDec(curchromo[i]);
       	  }

       }
       return this.xmymax;
    }
	//创建初始种群
	this.randCreatePop=function(curchromo){
		for(var i=0;i<this.popnum;i++){
			var chromo=new Chromo();
			chromo.geneBit.length=0;//初始化
			for(var j=0;j<this.genenum;j++){
				var randvalue=random();	
				chromo.geneBit.push(randvalue);
			}
			var value=this.binToDec(chromo);
		    chromo.fitValue=this.calFitValue(value);//计算染色体的适应度值
			this.curchromo.push(chromo);//生成实验组

		}

	}
    //选择优良的个体
	this.selection=function(curchromo){
		//冒泡排序
		for(var s=this.popnum;s>0;s--){
			for(var m=0;m<s-1;m++){
				if(curchromo[m+1].fitValue>curchromo[m].fitValue){
					var tem=curchromo[m+1];
					curchromo[m+1]=curchromo[m];
					curchromo[m]=tem;
				}
			}
		}//排序
		var sumFitValue=0;
		for(var i=0;i<this.popnum;i++){
			sumFitValue+=curchromo[i].fitValue;
		}
		var avFitValue=sumFitValue/this.popnum;
		var choicePro=new Array(this.popnum);
		for(var j=0;j<this.popnum;j++){
           choicePro[j]=(curchromo[j].fitValue/sumFitValue)/(avFitValue/sumFitValue);
		}
        //根据选择概率来繁殖优良个体
        for(var t=0;t<this.popnum;t++){
        	if(Math.floor((choicePro[t]+0.55))==0)
        		curchromo[this.popnum-1]=curchromo[0];
        }
	}
//交叉染色体的片段
	this.crossover=function(curchromo){
       if(Math.random()>this.crossrate){
       	      return;                     
       }
       for(var i=0;i<this.popnum;i+=2){
       	var randPos=Math.round(Math.random()*(this.genenum-1));
       	var s=i+1;
       	for(var j=0;j<randPos;j++){
       		var tmp=curchromo[i].geneBit[j];
       		curchromo[i].geneBit[j]=curchromo[s].geneBit[j];
       		curchromo[s].geneBit[j]=tmp;
       	}
       }

       for(i=0;i<this.popnum;i++){
       	curchromo[i].fitValue=this.calFitValue(this.binToDec(curchromo[i]));
       }
	}

//变异：随机改变染色体片段的值
    this.mutation=function(curchromo){
        var rndvalue=Math.round(Math.random()*100);
        if(rndvalue>=this.muterate*100){
        	return;
        }
        var randgene=Math.round(Math.random()*(this.genenum-1));
        var randchromo=Math.round(Math.random()*(this.popnum-1));

   		curchromo[randchromo].geneBit[randgene]=(curchromo[randchromo].geneBit[randgene]=='0')?'1':'0';
   		curchromo[randchromo].fitValue=this.calFitValue(this.binToDec(curchromo[randchromo]));
    }
    this.updatePop=function(newcur,oldcur){
    	for(var i=0;i<this.popnum;i++){
    		oldcur[i]=newcur[i];
    	}

    }
	this.binToDec=function(chromo){
		var result=0;
		var radix=1;
	     for(var i=0;i<this.genenum;i++){
	     	result+=chromo.geneBit[i]*radix;
	     	radix*=2;
	      }
	      return result;
    }
    this.calFitValue=function(target){

        var W0=0,W1=0,NUM0=0,NUM1=0,U0=0,U1=0,U,Gnow=0;
        var N0=0,N1=0; 
        var M=222,N=269;
        for(var i=0;i<this.px.length;i+=4){
					if(this.px[i]<=target){
						N0+=1;
						NUM0+=this.px[i];
					}else{
						N1+=1;
						NUM1+=this.px[i];
					}
				}
				W0=N0/(M*N);//前景像素点站整幅图的比例
				//W1=numberFormat(N1/(M*N),2);
				W1=1-W0;//后经像素点占整幅图的比例
				U0=(N0==0)?0:(NUM0/N0);//前景平均灰度
				U1=(N1==0)?0:(NUM1/N1);//后经平均灰度
				U=NUM0/(M*N)+NUM1/(M*N);//总平均灰度
				Gnow=W0*Math.pow((U0-U),2)+W1*Math.pow((U1-U),2);//g=ω0ω1(μ0-μ1)^2  //写入函数
				return Gnow;
    }

}

//染色体数据结构
var Chromo=function(){
	this.geneBit=new Array();
	this.fitValue=null;
}
var random=function(){
	return Math.round(Math.random());
}
