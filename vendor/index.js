/* global $, SsImageList, SsAnimation, SsSprite */
'use strict';
var screen_width = 0;
var screen_height = 0;

var spr_x = 0;
var spr_y = 0;
var sprite = null;
var data = null;
var data_index = 0;
$(document).ready(function () {
	document.getElementById("dScreen1").innerHTML = "STEP 1";

	$.getJSON('./datas/animetest.json', function (jsonData) {

		document.getElementById("dScreen1").innerHTML = "STEP 2";

		data = jsonData;

		var a_canvas = document.getElementById("a_canvas");
		var ctx = a_canvas.getContext("2d");

		data_index = 0;

		var imageList = new SsImageList(data[data_index].images, "./datas/", true);
		var animation = new SsAnimation(data[data_index].animation, imageList);
		screen_width = a_canvas.width;
		screen_height = a_canvas.height;

		var sp1 = new SsSprite(animation);
		//位置の設定
		sp1.x = spr_x + screen_width/2;
		sp1.y = spr_y + screen_height/2;
		//全体のスケールを設定
		sp1.rootScaleX = 1.0;
		sp1.rootScaleY = 1.0;
		//アニメーションの再生速度を設定
		//sp1.setStep(2.0);

		sprite = sp1;

		setInterval(function () {
			var t = new Date().getTime();

			ctx.save();

			ctx.clearRect(0, 0, (screen_width) , (screen_height) );
			sprite.draw(ctx, t);
			ctx.restore();

			//基準枠線の描画（テスト用）
			ctx.beginPath();
			ctx.moveTo( 0 , 0 );
			ctx.lineTo(screen_width, 0);
			ctx.lineTo(screen_width, screen_height);
			ctx.lineTo(0, screen_height);
			ctx.lineTo(0, 0);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo( screen_width/2 , 0 );
			ctx.lineTo( screen_width/2 , screen_height);
			ctx.moveTo( 0 , screen_height/2 );
			ctx.lineTo( screen_width,  screen_height/2);
			ctx.stroke();

			//再生フレーム、再生中のアニメ名称、ループカウントの表示

			document.getElementById("dScreen2").innerHTML= "[" + data_index + "]" + data[data_index].name + "<br>" + sprite.getFrameNo() + "<br>loop count = " + sprite.getLoopCount();

			//document.getElementById("dScreen2").innerHTML+= "<br>x = " + (sprite.x - w/2);
			//document.getElementById("dScreen2").innerHTML+= "<br>y = " + (sprite.y - h/2);
			document.getElementById("dScreen2").innerHTML+= "<br>x = " + sprite.x;
			document.getElementById("dScreen2").innerHTML+= "<br>y = " + sprite.y;

		}, 30);

	});

});

/*
function  OnButtonClick1()
{
	data_index = data_index - 1;
	if ( data_index < 0 ) data_index = 0;

	var imageList = new SsImageList(data[data_index].images, "./datas/", true);
	var animation = new SsAnimation(data[data_index].animation, imageList);		
	sprite = new SsSprite(animation);
	sprite.x = spr_x + screen_width/2;
	sprite.y = spr_y + screen_height/2;
}

function  OnButtonClick2()
{
	data_index = data_index + 1;
	
	if ( data_index > data.length ) data_index = data.length;
	
	var imageList = new SsImageList(data[data_index].images, "./datas/", true);
	var animation = new SsAnimation(data[data_index].animation, imageList);		
	sprite = new SsSprite(animation);
	sprite.x = spr_x + screen_width/2;
	sprite.y = spr_y + screen_height/2;
}

function  OnButtonClick3()
{
	spr_x = Number(document.js.txtx.value);
	spr_y = Number(document.js.txty.value);

	sprite.x = spr_x + 400;
	sprite.y = spr_y + 300;
}
*/

