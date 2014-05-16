/*! 
	author: 李进
	email: tjuking@gmail.com
	blog: tjuking.iteye.com
	time: 2012-12-06
*/
(function(win, doc){
	//变量
	var compatMode = doc.compatMode,
		isChrome = win.navigator.userAgent.indexOf("Chrome") === -1 ? false : true,
		scrollEle = compatMode === "BackCompat" || isChrome ? doc.body : doc.documentElement,
		clientEle = compatMode === "BackCompat" ? doc.body : doc.documentElement,
		toTopImg = doc.getElementById("toTop"),
		rate = 0.6,
		timeGap = 10;
	//返回顶部图标的点击响应
	toTopImg.onclick = function(){
		var moveInterval = setInterval(moveScroll, timeGap);
		function moveScroll(){
			var scrollTop = scrollEle.scrollTop;
			if(scrollTop === 0){
				clearInterval(moveInterval);
				return ;
			}
			scrollEle.scrollTop = scrollTop * rate;
		}
	};
	//滚动时判断是否显示返回顶部图标
	win.onscroll = function(){
		var display = toTopImg.style.display;
		if(scrollEle.scrollTop > clientEle.clientHeight){
			if(display !== "block"){
				toTopImg.style.display = "block";
			}
		}else{
			if(display !== "none"){
				toTopImg.style.display = "none";
			}
		}
	};
})(window, document);