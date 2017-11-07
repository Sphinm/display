//浏览器兼容
var eventUtil={
	//添加句柄
	//怎么给一个元素添加事件
	addHandler:function(element,type,handler){
		if (element.addEventListener) { //支持DOM2
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){  //IE8以下
			element.attachEvent('on'+type,handler);
		}else{ 							//更低版本的
			element['on'+type]=handler;
		}
	},
	//删除句柄
	//怎么给一个元素删除事件
	removeHandler:function(element,type,handler){
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	},
	//怎么来获取一个兼容不同浏览器的事件对象
	getEvent:function(event){
		return event?event:window.event;	//ie支持window.event
	},
	//怎么获取事件类型
	getType:function(event){
		return event.type;
	},
	//怎么获取事件的目标元素
	getElement:function(event){
		return event.target || event.srcElement; ///ie支持event.srcElement
	},
	//怎么阻止取消事件的默认行为
	preventDefault:function(event){
		if (event.preventDefault) {
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	//怎么阻止事件冒泡
	stopPropagation:function(event){
		if (event.stopPropagation) {
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}		
}