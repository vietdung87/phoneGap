 function getAllImage() {
	img = [];

	for ( var i = 0; i < 18; i++) {
		img[i] = i + ".png";

	}
	img.shuffle();
	return img;

}
//function shuffe array 

Array.prototype.shuffle = function() {
	var s = [];
	while (this.length)
		s.push(this.splice(Math.random() * this.length, 1)[0]);
	while (s.length)
		this.push(s.pop());
	return this;
};// end function  shuffe


function loadPicture(box) {
	var Array = [];
	for ( var i = 0; i < box / 2; i++) {
		Array[i * 2] = Array[i * 2 + 1] = i;
	}
	return Array.shuffle();

}
// function draw game and check card is match or not

function Game(lv,w, h) {

	var html = [];
	var W = w;
	var H = h;
	var allPictureUrl = getAllImage();
	var picture = loadPicture(W * H);
	var score = 0;
	var click = 0;
	var timeLimit = 9;
	var level=lv;

	

	 var Time = new countTime();

	// function draw card
	this.Draw = function() {
		
		for ( var i = 0; i < H * W; i++) {
			var div = "<div  id='card_" + (i) + "' class='card' data-img='"
					+ picture[i]
					+ "' ><img  class='face front' src='images/cardFont.png' "
					+ " /><img class='face back'  src='images/"
					+ allPictureUrl[picture[i]] + "' /></div>";
			html.push(div);
		}
		$("#tableGame").html(html.join(""));

	}
	// function when player select card
	
	this.selectCard = function() {
		if ($(".flip").size() > 1) {
			return;
		}
		if ($(this).hasClass("match") == true) {
			return;
		}
		click++;

		$(this).addClass("flip");
		if ($(".flip").size() == 2) {
			setTimeout(function() {
				var cards = $(".flip");
				var card1 = $(cards[0]).data("img");

				var card2 = $(cards[1]).data("img");

				if (card1 == card2) {
					
						$(".flip").removeClass("flip").addClass("match");		
				} else {
					$(".flip").removeClass("flip");
					

				}
				var num = $(".match").size();

				if (num == W * H) {
					
					var timePlay = Time.getMinut() * 60 + Time.getSecond();
					score = countScore(W * H, timePlay, click);
					Time.stopTime();
				//	showScore(score)
					var _minute= timeLimit - Time.getMinut();
					var _second=60-Time.getSecond();
					addLevelAndScore(level,score)
					setTimeout(showScore(score,Time.getMinut() ,Time.getSecond()),3000);		
					//setTimeout(Animation(),2000);	
					
					
				}
			}, 700);
		}
	}
}// end function game


// function set position for card base on level
function cardPosition(w,h){
	var deviceWidth=window.innerWidth ;
	var deviceHeight=window.innerHeight; ;
	var height=h;
	var width=w;
	var leng_box;
	var left ;
	var top ;
	var leng1=(deviceWidth * 95 / 100)/width;
	var leng2=(deviceHeight * 80 / 100 )/height;
	
	if(leng1<leng2){
		 leng_box = Math.floor(leng1);
		 left=(deviceWidth-( leng_box*width))/2;
		 top =Math.floor(((deviceHeight * 80 / 100)-(leng_box*height))/2) ;
		 
		
	}else{
		 leng_box = Math.floor(leng2);
		 left = (deviceWidth - (leng_box) * width) / 2;
		 top = Math.floor(((deviceHeight * 80 / 100)-(leng_box*height))/2) ;
		
		
		
	}

	for(var i=0;i<height;i++){
		for(var k=0;k<width;k++){
			var num=i*width+k;
			var id="#card_"+num;
			$(id).css({
				'width' : leng_box,
				'height' : leng_box,
				'left' : left + (leng_box * k),
				'top' : top+ (leng_box * i),
			})
			
		}
	}
	
	
}// end function 



function countTime() {
	var second = 0;
	var minute = 0;

	var time = setInterval(upDateTime, 1000)
	function upDateTime() {
		var _second;
		var _minute;
		
		second++;

		if (second == 60) {
			minute++;
			second = 0;
		}
		if (minute < 10) {
			_minute = "0" + minute;
		} else {
			_minute = minute;
		}

		if (second < 10) {
			_second = "0" + second;
		} else {
			_second = second;
		}
		$("#clock").html(_minute + ":" + _second);
		//if (minute == 0 && second == 1) {
		//	clearInterval(time);
	//		$("#clock").html("00:00");
		//	//playAgain();
		//	playAgain();
			
			
		//}
	}
	this.stopTime = function() {
		clearInterval(time);
	}
	this.getMinut = function() {
		return minute;
	}
	this.getSecond = function() {
		return second;
	}
	this.resetTime = function() {
		second = 60;
		minute = 15;
	}
}// End function*/

// function count score for player
function countScore(level, time, numberClick) {
	var score = (level * 10000) - (time * 20) - (numberClick * 100);
	return score;
}
// function show score

function showScore(score,minute,second){
	var _minute,_second;
	if(minute<10){
		 _minute="0"+minute;
	}else{
		_minute=minute;
	} 
	if(second<10){
		_second="0"+second;
	}else {
		_second=second;
	}
	var html="<h1 class='fit' >ONNEA!</h1><h2 class='fit' >Aika :"+ _minute +":"+ _second +"</h2><h2 class='fit'>Tulos :"+score+"</h2>";
	
	 setTimeout(function(){
		
		 $("#show_score").append(html);
	 $("#show_score .fit").css({
		 "display":"block-inline",
			 "width":"100%",
			 "height":"20%",
		 })
		
		  $("#show_score .fit").fitText(1,{ minFontSize: '18px', maxFontSize: '36px' });
		 $( "#show_score" ).show();
		 $( "#show_score" ).addClass("drop");
		 setTimeout(function(){ 	// window.location.href="'choseLevel.html?"+';
			$("#show_score").removeClass("drop");
			$("#show_score").addClass("disapear");
			 Animation();
		 
		 }, 3000);
	 },800); 
	 
	
	
}
// function play-again

function playAgain(){
	$("#tableGame").empty();
	var html="<h1>Peli ohi</h1><p id='btPlayAgain'><img src='images/playAgainBt_03.png'/></p>"
	$('#play_again').append(html);
	 $( "#play_again" ).show();
	 $( "#play_again" ).addClass("drop");
	 
	 $("#btPlayAgain").click(function(){
		 location.reload();
	 })
}



function onDeviceReady() {
	$(function() {
		$("#topGame p").fitText();
		document.addEventListener("backbutton", onBackKeyDown, false);
		var width;
		var height;
		var level=location.href.substring(location.href.lastIndexOf("?")+1);
		var numLevel=Number(level);	
		switch(numLevel){
		case 1:
			 width=2;
			 height=2;
			 break;
		case 2:
			 width=3;
			 height=2;
			 break;
		case 3:
			 width=4;
			 height=2;
			 break;
		case 4:
			 width=5;
			 height=2;
			 break;
		case 5:
			 width=4;
			 height=3;
			 break;	 
		case 6:
			 width=6;
			 height=3;
			 break;
		case 7:
			 width=5;
			 height=4;
			 break;	
		case 8:
			 width=8;
			height=3;
			break;
		case 9:
			width=8;
			height=4;
			break;
		case 10:
			width=9;
			height=4;
			break;
		
		}
		$("#show_level").html("Level : "+numLevel);

		var game = new Game(numLevel,width,height);
		game.Draw();
		
		cardPosition(width,height)
		$('#tableGame').children().each(function(index) {

			$(this).bind(tap,game.selectCard);
		});
		
		
		
	});
		
}//end function onDeviceReady()
function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

// function database

function addLevelAndScore(level,score){
	db=window.openDatabase("gameDb","1.0","Game database",1000000);
	db.transaction(function(tx){
		ensureTableExit(tx);
		var sql='INSERT INTO LevelAndScore(level,score) VALUES ("'+level+'","'+score+'")';
		tx.executeSql(sql);
	}, transaction_error,populateDB_success);
	
}
function populateDB_success() {
	console.log("insert thanh cong");
}
function onBackKeyDown() {
	window.location.href='choseLevel.html';
}

//Function animation
function Animation(){
	//var reqAnimFrame= window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    //window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var reqAnimFrame=0;
	var x =  0;
	var speed = 2;
	var numberImg=0;
	var deviceHeight=window.innerHeight; 
	var deviceWidth=window.innerWidth ;
	var leng=deviceHeight/2;
	frameRequest();
	function frameRequest(){
		//reqAnimFrame =  window.webkitRequestAnimationFrame ;
		 			//	window.webkitRequestAnimationFrame(frameRequest)
		
	//	window.mozRequestAnimationFrame    ||
	  //  window.webkitRequestAnimationFrame ||
	   // window.msRequestAnimationFrame     ||
	   // window.oRequestAnimationFrame
	   // ;
	//reqAnimFrame= window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	  //  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	//	reqAnimFrame(frameRequest);
		
		requestAnimationFrame( frameRequest );

		 x += speed;
		    numberImg+=1;

		    if(x <= - leng || x >=deviceWidth){
		    	window.location.href='choseLevel.html';
		    }
		    if(numberImg==40){
		    	numberImg=1;
		    }

		    draw();
	}
	function draw() {
		
		
	    var canvas  = document.getElementById("animation");
	    canvas.style.position = "absolute";
		canvas.setAttribute("width", deviceWidth);
		canvas.setAttribute("height", deviceHeight/2);
		canvas.style.top = (deviceHeight / 4);
	    var context = canvas.getContext("2d");	
	    context.clearRect(x-speed,0,leng,leng);     
	     var img= new Image();
	    
	     img.src='images/a'+numberImg+'.png';
	     context.drawImage(img,x,0,leng,leng);
	   
	}

	
}
