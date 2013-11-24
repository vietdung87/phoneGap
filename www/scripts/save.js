 function getAllImage() {
	img = [];

	for ( var i = 0; i < 10; i++) {
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
					$(".flip").addClass("match").removeClass("flip");
					
					
					console.log("math")
				} else {
					$(".flip").removeClass("flip");
					console.log("not match")

				}
				var num = $(".match").size();

				if (num == W * H) {
					
					var timePlay = Time.getMinut() * 60 + Time.getSecond();
					score = countScore(W * H, timePlay, click);
					Time.stopTime();
				//	showScore(score)
					var _minute=timeLimit - Time.getMinut();
					var _second=60-Time.getSecond();
					showScore(score,_minute,_second);
					addLevelAndScore(level,score)
					
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
		 left=Math.floor((deviceWidth-( leng_box*width))/2);
		 top =Math.floor(((deviceHeight * 80 / 100)-(leng_box*height))/2) ;
		 
		
	}else{
		 leng_box = Math.floor(leng2);
		 left = Math.floor((deviceWidth - (leng_box) * width) / 2);
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
	var second = 60;
	var minute = 9;

	var time = setInterval(upDateTime, 1000)
	function upDateTime() {
		var _second;
		var _minute;
		
		second--;

		if (second == 0) {
			minute--;
			second = 59;
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
		if (minute == 0 && second == 1) {
			clearInterval(time);
			$("#clock").html("00:00");
			//playAgain();
			
		}
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
	var score = (level * 500) + (time * 20) - (numberClick * 100);
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
	var html="<h1>CONGRATULATIONS</h1><p>Time :"+ _minute +":"+ _second +"</p><p>Score :"+score+"</p><p><a href='choseLevel.html'>Continue</a></p><p><a href='Score.html'>Show score</a></p>";
	$("#show_score").append(html);
	 $( "#show_score" ).slideDown( 1000 );
	
}



function onDeviceReady() {
	$(function() {
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
			 width=4;
			 height=4;
			 break;
		case 7:
			 width=5;
			 height=4;
			 break;	
		default:
			 width=5;
			height=4;
		
		}
	

		var game = new Game(numLevel,width,height)
		game.Draw();
		
		cardPosition(width,height)
		$('#tableGame').children().each(function(index) {

			$(this).click(game.selectCard);
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


/// Save Chose Level

<!DOCTYPE HTML>
<html>
<header>
<title>main</title>
<meta name="viewport" content="width=device-width,height=device-height , user-scalable=no" />
<style>
html{
	width:100%;
	height:100%;
	background-image: url("images/background2_03.png") ;
	background-size: 100% 100%;
    background-repeat: no-repeat;	
}
#chose_level{



}
.none{
display: none;
}
.animation{
top:0%; 
display:block;
width:90%;
height:70%;
-webkit-animation: dropAnimation 0.7s ;
-webkit-animation-iteration-count:1; 
}
#canvas1{
	position:absolute;
	top:50%;
	left:0px;
	height:50%;
	width:18%;
	
	
}
@-webkit-keyframes dropAnimation {
    0% { top:100%;}
    20%{ top:80%}
    40% {top:60%;}
    60% {top:40%}
    80%{top:20%}
    1000%{top:0%}
    
}
div,a{

position: absolute;
}

.lock-level{
opacity:0;
}

.lock  a.num_level{
display: none;
}
.unlock a.lock-icon {
	display: none;
} 




</style>
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="scripts/jquery.js"></script>

<script type="text/javascript" src="scripts/database.js"></script>

<script type="text/javascript">
var lock=[];
var x =  0;
var y = 5;
var speed = 1;
var numberImg=0;

var deviceHeight=window.innerHeight; 
var deviceWidth=window.innerWidth ;
var leng=deviceHeight/2;
function onDeviceReady() {
	$(function() {
		Animation();
		document.addEventListener("backbutton", onBackKeyDown, false);
		lock[0]="unlock"
	for(var i=0;i<10;i++){
		lock[i+1]="lock";
	}
		unLockLevel();
		setTimeout(function(){
			$("#chose_level").removeClass("none");
			$("#chose_level").addClass("animation");
		},300)
		
		
	})
}

function unLockLevel(){
	db=window.openDatabase("gameDb","1.0","Game database",1000000);
	db.transaction(function(tx){
		ensureTableExit(tx);
		var sql='SELECT MAX(level)  maxLevel FROM LevelAndScore';
		tx.executeSql(sql,[],function(tx,results){
		var maxLv=	results.rows.item(0).maxLevel;
		var numMaxLevel=parseInt(maxLv)
	
		
		for(var i=0;i<= numMaxLevel;i++){
			lock[i]="unlock";
		}
		
		drawLevel();
			
		});
	}, transaction_error);
	
}
function drawLevel(){
	//var deviceWidth=window.innerWidth ;
	//var deviceHeight=window.innerHeight; 
	var leng=deviceHeight/5;
	var padding=deviceHeight*5/100;
	var left=(deviceWidth-(5*leng+4*padding))/2;
	for(var i=0;i<2;i++){
		for(k=0;k<5;k++){
			var z=i*5+k;
		$("#chose_level").append("<div  class='"+lock[z]+"' id='number_"+(i*5+k)+"'><a  class='num_level' href='play.html?"+((i*5+k)+1)+"'><img class='img_numb' src='images/numbers"+((i*5+k)+1)+".png'/></a><a class='lock-icon'><img src='images/Lock-icon.png'/></a></div>");
		var num="#number_"+(i*5+k);
		$(num).css({
			'width':leng,
			'height':leng,
			'left':left+leng*k+padding,
			'top':leng+padding*i+leng*i,
			
		});
		$(num).bind(tap,function(){
			setTimeout(function(){	window.location.href='choseLevel.html';},300)
		})
		}
		
	}
	$("img").css({
		
		'width':leng,
		'height':leng,	
	});
	
}

function choseLevel(){
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onBackKeyDown() {
	window.location.href='index.html';
}

function Animation(){
	 var number=0;
	 var left=deviceWidth/20;
     function Move(){
       number++;
       if(number==4){
         number=1;}
       var imageUrl='"images/b'+number+'.png"';
       
       
       $("#canvas1").css({
         'left': left,
        	
         'background-image' : 'url(' + imageUrl + ')',
         'background-size':'100% 100%',
         'background-repeat':'no-repeat'
       });                
     }
     var setMove=setInterval(Move, 1500)


}
function draw() {
	//var deviceHeight=window.innerHeight; 

	 var left=deviceWidth/20;
    var canvas  = document.getElementById("canvas1");
    var context = canvas.getContext("2d");	
  
     context.clearRect(left,0,leng,leng);     
	var img= new Image();
 	var imageUrl='"images/a'+numberImg+'.png"';
	img.src='images/b'+numberImg+'.png';
	 
  	context.drawImage(img,left,0,leng,leng);
}

</script>

</header>
<body onLoad="choseLevel()" >
	
	<div id="chose_level" class="none">
	
	</div>
	<div id="canvas1">
	
	</div>
	
	
</body>
</html>
