
//快速获取ID、Class、TagName
var G = {
	gId:function(obj){
		return document.getElementById(obj);
	},
	gTag:function(parent,obj){
		return document.getElementById(parent).getElementsByTagName(obj);
	},
	gClass:function(obj){
		return document.getElementsByClassName(obj);
	}
};
//监听器
var listener = {
	addEvt:function(obj,evt,func){
		return obj.addEventListener(evt,func);
	}
}
var myApp = {
	//公共变量
	container:function(){
		return G.gId('container');
	},
	offsetY : null,
	list:function(){
		return G.gId('list');
	},
	triangle:function(){
		return G.gId('toBottom');
	},
	page:function(){
		return G.gClass('page');
	},
	oHeight:function(){
		return document.documentElement.clientHeight || document.body.clientHeight;
	},
	len:function(){
		return this.page().length;
	},
	btns:function(){
		return G.gTag('btns','span');
	},
	idx : 0, 
	menu : function(){
		return G.gTag('menu','a');
	},
	header:function(){
		return G.gId('header');
	},
	boundary:function(){
		return myApp.oHeight()/6;
	},
	skill:function(){
		return G.gTag('skill','a')
	},
	tag:function(){
		return G.gTag('skill','p')
	},

	//方法
	//渲染
	render:function(){
		this.container().style.height = this.oHeight() + 'px';
		this.list().style.height = this.oHeight() * 5 + 'px';
		for (var i = 0;i<this.len();i++){
			this.page()[i].style.webkitTransform = 'translate3d(0,'+ i * this.oHeight() +'px,0)';
			this.page()[i].style.transform = 'translate3d(0,'+ i * this.oHeight() +'px,0)';
		}
	},
	//按钮点击
	btnClick:function(){
		for (var i = 0;i<this.len();i++){
			this.btns()[i].id = i;
			listener.addEvt(this.btns()[i],'click',function(){
				that = parseInt(this.id);
				myApp.idx = that;
				myApp.change();
			})
		}
	},
	//方向键切换
	arrow:function(){
		listener.addEvt(window,'keydown',function(event){
			var key = event.keyCode;
			if (key === 40){
				myApp.idx += 1;
				if (myApp.idx > 4){
					myApp.idx = 4
				}
					//更改位置
					myApp.change();
			}
				if (key === 38){
				myApp.idx -= 1;
				if (myApp.idx < 0){
					myApp.idx = 0
				}
					myApp.change();
			}
		})
	},
	//箭头切换
	toBottom:function(){
		listener.addEvt(myApp.triangle(),'click',function(){
			if (myApp.idx > 3) {
				myApp.idx = 4
			} else {
				myApp.idx += 1;
			}
			myApp.change();
		})
	},
	//移动端touch
	touchStart:function(){
		listener.addEvt(myApp.container(),'touchstart',function(e){
			e = e || window.event;
			myApp.startY = e.touches[0].clientY;
			myApp.offsetY = 0;
		})
	},
	touchMove:function(){
		listener.addEvt(myApp.container(),'touchmove',function(e){
			e = e || window.event;
			e.preventDefault;
			myApp.offsetY = e.touches[0].pageY - myApp.startY * 1;
		})
	},
	touchEnd:function(){
		listener.addEvt(myApp.container(),'touchend',function(e){
			e = e || window.event;
			if (myApp.offsetY < -myApp.boundary()){
				if (myApp.idx > 3) {
					myApp.idx = 4;
				} else {
					myApp.idx += 1;
				}
				myApp.change();
			} else if(myApp.offsetY >= myApp.boundary()){
				if (myApp.idx < 1){
					myApp.idx = 0;
				} else {
					myApp.idx -= 1;
				}
				myApp.change();
			} else {
				return;
			}
		})
	},
	//提示框
	alertTag:function(e){
		for (var i = 0;i<myApp.skill().length;i++){
			myApp.skill()[i].id = i;
			listener.addEvt(myApp.skill()[i],'mouseover',function(){
				for (var j = 0;j<myApp.tag().length;j++){
					myApp.tag()[j].style.display = 'none';
				}
				myApp.tag()[this.id].style.display = 'block';
			})
			listener.addEvt(myApp.skill()[i],'mousemove',function(e){
				e = e || window.event;
				var tagLeft = e.clientX - myApp.skill()[this.id].offsetLeft;
				var tagTop = e.clientY - myApp.skill()[this.id].offsetTop;
				myApp.tag()[this.id].style.left = tagLeft + 1 + 'px';
				myApp.tag()[this.id].style.top = tagTop + 1 + 'px';
			})
			listener.addEvt(myApp.skill()[i],'mouseout',function(){
				for (var j = 0;j<myApp.tag().length;j++){
					myApp.tag()[j].style.display = 'none';
				}
			})
		}
	},
	change:function(){
					for (var i = 0;i<5;i++){
						myApp.btns()[i].style.backgroundColor = '';
						myApp.page()[i].style.zIndex = 0;
						myApp.menu()[i].style.opacity = 0;
					}
					myApp.menu()[myApp.idx].style.opacity = 1;
					myApp.btns()[myApp.idx].style.backgroundColor = '#44adfb';
					myApp.page()[myApp.idx].style.zIndex = 1;
					//过渡效果
					myApp.page()[myApp.idx].style.webkitTransition = 'transform 0.3s';
					myApp.page()[myApp.idx].style.transition = 'transform 0.3s';
					myApp.page()[myApp.idx + 1] && (myApp.page()[myApp.idx + 1].style.webkitTransition = 'transform 0.3s');
					myApp.page()[myApp.idx + 1] && (myApp.page()[myApp.idx + 1].style.transform = 'transform 0.3s');
					myApp.page()[myApp.idx - 1] && (myApp.page()[myApp.idx - 1].style.webkitTransition = 'transform 0.3s)');
					myApp.page()[myApp.idx - 1] && (myApp.page()[myApp.idx - 1].style.transition = 'transform 0.3s');
					//更改位置
					myApp.page()[myApp.idx].style.webkitTransform = 'translate3d(0,0,0)';
					myApp.page()[myApp.idx].style.transform = 'translate3d(0,0,0)';
					myApp.page()[myApp.idx + 1] && (myApp.page()[myApp.idx + 1].style.webkitTransform = 'translate3d(0,' + myApp.oHeight() + 'px,0)');
					myApp.page()[myApp.idx + 1] && (myApp.page()[myApp.idx + 1].style.transform = 'translate3d(0,' + myApp.oHeight() + 'px,0)');
					myApp.page()[myApp.idx - 1] && (myApp.page()[myApp.idx - 1].style.webkitTransform = 'translate3d(0,-' + myApp.oHeight() + 'px,0)');
					myApp.page()[myApp.idx - 1] && (myApp.page()[myApp.idx - 1].style.transform = 'translate3d(0,-' + myApp.oHeight() + 'px,0)');
					myApp.page()[myApp.idx + 2] && (myApp.page()[myApp.idx + 2].style.webkitTransform = 'translate3d(0,' + myApp.oHeight()*2 + 'px,0)');
					myApp.page()[myApp.idx + 2] && (myApp.page()[myApp.idx + 2].style.transform = 'translate3d(0,' + myApp.oHeight()*2 + 'px,0)');
					myApp.page()[myApp.idx - 2] && (myApp.page()[myApp.idx - 2].style.webkitTransform = 'translate3d(0,-' + myApp.oHeight()*2 + 'px,0)');
					myApp.page()[myApp.idx - 2] && (myApp.page()[myApp.idx - 2].style.transform = 'translate3d(0,-' + myApp.oHeight()*2 + 'px,0)');
					myApp.page()[myApp.idx + 3] && (myApp.page()[myApp.idx + 3].style.webkitTransform = 'translate3d(0,' + myApp.oHeight()*3 + 'px,0)');
					myApp.page()[myApp.idx + 3] && (myApp.page()[myApp.idx + 3].style.transform = 'translate3d(0,' + myApp.oHeight()*3 + 'px,0)');
					myApp.page()[myApp.idx - 3] && (myApp.page()[myApp.idx - 3].style.webkitTransform = 'translate3d(0,-' + myApp.oHeight()*3 + 'px,0)');
					myApp.page()[myApp.idx - 3] && (myApp.page()[myApp.idx - 3].style.transform = 'translate3d(0,-' + myApp.oHeight()*3 + 'px,0)');
					myApp.page()[myApp.idx + 4] && (myApp.page()[myApp.idx + 4].style.webkitTransform = 'translate3d(0,' + myApp.oHeight()*4 + 'px,0)');
					myApp.page()[myApp.idx + 4] && (myApp.page()[myApp.idx + 4].style.transform = 'translate3d(0,' + myApp.oHeight()*4 + 'px,0)');
					myApp.page()[myApp.idx - 4] && (myApp.page()[myApp.idx - 4].style.webkitTransform = 'translate3d(0,-' + myApp.oHeight()*4 + 'px,0)');
					myApp.page()[myApp.idx - 4] && (myApp.page()[myApp.idx - 4].style.transform = 'translate3d(0,-' + myApp.oHeight()*4 + 'px,0)');
					if (myApp.idx === 4){
						myApp.triangle().className = 'triangleOff';
						myApp.triangle().style.cursor = 'default';
					} else {
						myApp.triangle().className = 'triangleOn';
						myApp.triangle().style.cursor = '';
					}
					if (myApp.idx !== 0) {
						myApp.header().style.left = 0;
						myApp.header().style.opacity = 1;
					} else {
						myApp.header().style.left = -25 + 'px';
						myApp.header().style.opacity = 0;
					}
					if (myApp.idx === 1) {
						myApp.skill()[0].style.width = '80%';
						myApp.skill()[1].style.width = '60%';
						myApp.skill()[2].style.width = '40%';
					}
	}
};

window.onload = function(){
	myApp.render();
	myApp.btnClick();
	myApp.arrow();
	myApp.toBottom();
	myApp.touchStart();
	myApp.touchMove();
	myApp.touchEnd();
	myApp.alertTag();
}