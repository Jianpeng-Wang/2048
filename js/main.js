var nums = new Array();
var gridCells = new Array();
var score = 0;
var hasConflict = new Array(); 
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function(){
	newgame();
	$('#newgame').click(function(){
		newgame();
	});
});

//开始新游戏
function newgame(){
	console.log('ok');
	if (documentWidth > 500) {
		containerWidth = 500;
		cellSpace = 20;
		cellWidth = 100;
	} else{
		//设置移动端布局
		setingForMobile();
	}
	
	if (nums.length>0) {
		nums.splice(0);
	}
	init();
	
	//随机生成两个数据
	generataOneNumber();
	generataOneNumber();
};

//设置移动端布局
function setingForMobile(){
	$('#header .wrapper').css('width',containerWidth);
	
	$('#grid-container').css('width',containerWidth-cellSpace*2);
	$('#grid-container').css('height',containerWidth-cellSpace*2);
	$('#grid-container').css('padding',cellSpace);
	
	$('#grid-container .grid-cell').css('width',cellWidth);
	$('#grid-container .grid-cell').css('height',cellWidth);
	
};

//初始化页面
function init(){
	//初始化单元格位置
	for (var i = 0; i < 4; ++i) {
		var lsgridcells = new Array();
		for (var j = 0; j < 4; ++j) {
			var gridCell = $('#grid-' + i + '-' + j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
			lsgridcells.push(gridCell);
		}
		gridCells.push(lsgridcells);
	}
	
	//初始化数组
	for (var i = 0; i < 4; ++i) {
		var arr = new Array();
		var arr2 = new Array();
		for (var j = 0; j < 4; ++j) {
			arr.push(0);
			arr2.push(false);
		}
		nums.push(arr);
		hasConflict.push(arr2);
	}
	
	//动态创建上层单元格并初始化
	updateView();
	
	//重置分数
	updateScore(0);
};

//更新上层单元格视图
function updateView(){
	//将显示层格式清空
	$('.number-cell').remove();
	
	for (var i = 0; i < 4; ++i) {
		for (var j = 0; j < 4; ++j) {
			var n = nums[i][j];
			var numberCell = $('<div class="number-cell" id="number-'+i+'-'+j+'"></div>');
			gridCells[i][j].append(numberCell);
			if (n==0) {
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',cellWidth/2+'px');
				numberCell.css('left',cellWidth/2+'px');
				numberCell.css('line-height',cellWidth+'px');
			} else{
				numberCell.text(n);
				numberCell.css('background-color',getNumberBackgroundColor(n));
				numberCell.css('color',getNumberColor());
				numberCell.css('width',cellWidth+'px');
				numberCell.css('height',cellWidth+'px');
				numberCell.css('top','0px');
				numberCell.css('left','0px');
				numberCell.css('line-height',cellWidth+'px');
				numberCell.css('font-size',cellWidth*0.5+'px');
			}
			hasConflict[i][j] = false;
		}
	}
};

//在空余单元格中随机选两个生成2/4
function generataOneNumber(){
	var posArr = noSpace(nums);
	//判断是否还有空间，如果没有直接停止
	if (posArr.length == 0) {
		return;
	}
	
	//随机找一个位置
	var pos = Math.floor(Math.random()*posArr.length);
	var randx = Math.floor(posArr[pos]/4);
	var randy = Math.floor(posArr[pos]%4);
	
	//随机一个数字
	var randNum = Math.random()<0.5?2:4;
	
	//在随机位置上显示随机数字
	nums[randx][randy] = randNum;
	
	//显示方法
	showNumberWithAnimation(randx,randy,randNum,gridCells);
};

//上下左右移动
$(document).keydown(function(event){
	//阻止键盘按键事件的默认动作
	event.preventDefault();
	
	switch (event.keyCode){
		case 37:	//左键
			//判断是否可以向左移动
			if (canMoveLeft(nums)) {
				moveLeft();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
			break;
		case 38:	//上键
			if (canMoveUp(nums)) {
				moveUp();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
			break;
		case 39:	//右键
			if (canMoveRight(nums)) {
				moveRight();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
			break;
		case 40:	//下键
			if (canMoveDown(nums)) {
				moveDown();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
			break;
	}
});

//触摸事件
document.addEventListener('touchstart',function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	
	//判断滑动方向
	var deltaX = endX-startX;
	var deltaY = endY-startY;
	
	//判断滑动距离，以免误触
	if (Math.abs(deltaX) < documentWidth*0.08 && Math.abs(deltaY) < documentWidth*0.08) {
		return;
	}
	
	if (Math.abs(deltaX) >= Math.abs(deltaY)) { //水平滑动
		if (deltaX > 0) {	//向右
			if (canMoveRight(nums)) {
				moveRight();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
		} else{	//向左
			if (canMoveLeft(nums)) {
				moveLeft();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
		}
	} else{	//垂直滑动
		if (deltaY < 0) {	//向上
			if (canMoveUp(nums)) {
				moveUp();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
		} else{	//向下
			if (canMoveDown(nums)) {
				moveDown();
				setTimeout(generataOneNumber,200);
				setTimeout('isGameOver(nums)',550)
			}
		}
	}
});

//向左移动
function moveLeft(){
	for (var i = 0; i < 4; ++i) {
		for (var j = 1; j < 4; ++j) {
			if (nums[i][j] != 0) {
				for (var k = 0; k < j; ++k) {
					if (nums[i][k] == 0 && noHorizontalBarrier(i,k,j,nums)) {
						showMoveAnimation(i,j,i,k,gridCells);
						nums[i][k] = nums[i][j];
						nums[i][j] = 0;
						break;
					}else if (nums[i][k] == nums[i][j] && noHorizontalBarrier(i,k,j,nums) && !hasConflict[i][k]){
						showMoveAnimation(i,j,i,k,gridCells);
						nums[i][k] += nums[i][j];
						nums[i][j] = 0;
						score += nums[i][k];
						updateScore(score);
						hasConflict[i][k] = true;
						break;
					}
				}
			}
		}
	}
	//更新上层数据
	setTimeout('updateView()',200);
};

//向上移动
function moveUp(){
	for (var j = 0; j < 4; ++j) {
		for (var i = 1; i < 4; ++i) {
			if (nums[i][j] != 0) {
				for (var k = 0; k < i; ++k) {
					if (nums[k][j] == 0 && noVerticalBarrier(k,i,j,nums)) {
						showMoveAnimation(i,j,k,j,gridCells);
						nums[k][j] = nums[i][j];
						nums[i][j] = 0;
						break;
					} else if (nums[k][j] == nums[i][j] && noVerticalBarrier(k,i,j,nums) && !hasConflict[k][j]){
						showMoveAnimation(i,j,k,j,gridCells);
						nums[k][j] += nums[i][j];
						nums[i][j] = 0;
						score += nums[k][j];
						updateScore(score);
						hasConflict[k][j] = true;
						break;
					}
				}
			}
		}
	}
	//更新上层数据
	setTimeout('updateView()',200);
};

//向右移动
function moveRight(){
	for (var i = 0; i < 4; ++i) {
		for (var j = 2; j >= 0; j--) {
			if (nums[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (nums[i][k] == 0 && noHorizontalBarrier(i,j,k,nums)) {
						showMoveAnimation(i,j,i,k,gridCells);
						nums[i][k] = nums[i][j];
						nums[i][j] = 0;
						break;
					}else if (nums[i][k] == nums[i][j] && noHorizontalBarrier(i,j,k,nums) && !hasConflict[i][k]){
						showMoveAnimation(i,j,i,k,gridCells);
						nums[i][k] += nums[i][j];
						nums[i][j] = 0;
						score += nums[i][k];
						updateScore(score);
						hasConflict[i][k] = true;
						break;
					}
				}
			}
		}
	}
	//更新上层数据
	setTimeout('updateView()',200);
};

//向下移动
function moveDown(){
	for (var j = 0; j < 4; ++j) {
		for (var i = 2; i >= 0; --i) {
			if (nums[i][j] != 0) {
				for (var k = 3; k > i; --k) {
					if (nums[k][j] == 0 && noVerticalBarrier(i,k,j,nums)) {
						showMoveAnimation(i,j,k,j,gridCells);
						nums[k][j] = nums[i][j];
						nums[i][j] = 0;
						break;
					} else if (nums[k][j] == nums[i][j] && noVerticalBarrier(i,k,j,nums) && !hasConflict[k][j]){
						showMoveAnimation(i,j,k,j,gridCells);
						nums[k][j] += nums[i][j];
						nums[i][j] = 0;
						score += nums[k][j];
						updateScore(score);
						hasConflict[k][j] = true;
						break;
					}
				}
			}
		}
	}
	//更新上层数据
	setTimeout('updateView()',200);
};
