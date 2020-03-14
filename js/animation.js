//通过动画显示数字
function showNumberWithAnimation(i,j,num,arr){
	var numberCell = arr[i][j].children();
	numberCell.css({
		"background-color":getNumberBackgroundColor(num),
		"color":getNumberColor(num),
		"font-size":cellWidth*0.5+'px'
	}).text(num).animate({
		'top':'0px',
		'left':'0px',
		'width':cellWidth+'px',
		'height':cellWidth+'px',
	},500);
};


function showMoveAnimation(fromX,fromY,toX,toY,arr){
	var numberCell = arr[fromX][fromY].children();
	numberCell.css('z-index','1');
	numberCell.animate({
		"top":distanceTop(fromX,fromY,toX,toY),
		"left":distanceLeft(fromX,fromY,toX,toY)
	},200);
}
