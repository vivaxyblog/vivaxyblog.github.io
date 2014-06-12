var menuBtn = document.getElementById("menuBtn");
var topBtn = document.getElementById("menuBtnTop");
var backBtn = document.getElementById("menuBtnBack");
var btnFlag = false;
menuBtn.onclick = function(){
	if (btnFlag){
		menuBtn.classList.remove("menuBtnOpen");
		topBtn.classList.remove("menuBtnTop");
		backBtn.classList.remove("menuBtnBack");
	}else{
		menuBtn.classList.add("menuBtnOpen");
		topBtn.classList.add("menuBtnTop");
		backBtn.classList.add("menuBtnBack");
	}
	btnFlag = !btnFlag;
};
backBtn.onclick = function(){
	menuBtn.classList.remove("menuBtnOpen");
	topBtn.classList.remove("menuBtnTop");
	backBtn.classList.remove("menuBtnBack");
	btnFlag = false;
	document.location = "/";
};
topBtn.onclick = function(){
	menuBtn.classList.remove("menuBtnOpen");
	topBtn.classList.remove("menuBtnTop");
	backBtn.classList.remove("menuBtnBack");
	btnFlag = false;
	document.location = "#";
};
