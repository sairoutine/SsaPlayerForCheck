/* global $, SsImageList, SsAnimation, SsSprite */
'use strict';

// Ssa Player に、画像バイナリを直接読み込む関数を追加する
SsImageList.prototype.setImageBySrc = function (index, src) {
	if (index < 0) return null;
	this._imagePaths[index] = null;
	this._images[index] = new Image();
	this._images[index].src = src;
};

var screen_width = 0;
var screen_height = 0;

var spr_x = 0;
var spr_y = 0;
var sprite = null;
var data = null;
var data_index = 0;

var intervalID = null;

var imageList = new SsImageList([], "");
var jsonData = null;

var canvas = window.document.getElementById("a_canvas");
var ctx = canvas.getContext("2d");

function addImage(ele) {
	if (!ele.files.length) return;  // ファイル未選択

	for (var i = 0, len = ele.files.length; i < len; i++) {
		var file = ele.files[i];
		if (/^image\/(png|jpeg|gif)$/.test(file.type)) { // typeプロパティでMIMEタイプを参照

			(function (i) {
				var fr = new FileReader();
				fr.onload = function() {
					imageList.setImageBySrc(i, fr.result);  // 読み込んだ画像データをsrcにセット
				};
				fr.readAsDataURL(file);  // 画像読み込み

			})(i);

		}
	}
}

function addJSON(ele) {
	if (!ele.files.length) return;  // ファイル未選択

	var file = ele.files[0];
	if (!/json/.test(file.type)) return; // typeプロパティでMIMEタイプを参照

	var fr = new FileReader();
	fr.onload = function() {
		jsonData = JSON.parse(fr.result);
	};
	fr.readAsText(file);  // JSONテキスト読み込み
}

function renderSS() {
	document.getElementById("dScreen1").innerHTML = "STEP 1";

	if(!(imageList._images.length && jsonData)) {
		window.alert("画像とJSONファイルを読み込んでください");
		return;
	}


	document.getElementById("dScreen1").innerHTML = "STEP 2";

	data = jsonData;

	data_index = 0;
	var animation = new SsAnimation(data[data_index].animation, imageList);
	screen_width = canvas.width;
	screen_height = canvas.height;

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

	if (intervalID) {
		window.clearInterval(intervalID);
	}

	intervalID = window.setInterval(function () {
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

}


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

