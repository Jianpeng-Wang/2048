//获取移动端屏幕宽高度
var documentWidth = document.documentElement.clientWidth;	//页面DOM宽度
var containerWidth = documentWidth*0.92;	//容器宽度
var cellWidth = documentWidth*0.18;		//单元格宽度
var cellSpace = documentWidth*0.04;		//单元格间距

//获取距离上边的位置
function getPosTop(i,j){
	return cellSpace*(i+1)+cellWidth*i;
};

//获取距离左边的位置
function getPosLeft(i,j){
	return cellSpace*(j+1)+cellWidth*j;
};

//获取数字背景颜色
function getNumberBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//获取数字颜色
function getNumberColor(num){
	return num>4?'#fff':'#776e65';
};

//判断是否没有空间
function noSpace(nums){
	var arr = [];
	for (var i = 0; i < 4; ++i) {
		for (var j = 0; j < 4; ++j) {
			if (nums[i][j] == 0) {
				arr.push(i*4+j);
			}
		}
	}
	return arr;
};

//判断是否可以向左移动
function canMoveLeft(arr){
	for (var i = 0; i < 4; ++i) {
		for (var j = 1; j < 4; ++j) {
			if (arr[i][j] != 0) {
				if (arr[i][j-1] == 0 || arr[i][j-1] == arr[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
};

//判断是否可以向上移动
function canMoveUp(arr){
	for (var j = 0; j < 4; ++j) {
		for (var i = 1; i < 4; ++i) {
			if (arr[i][j] != 0) {
				if (arr[i-1][j] == 0 || arr[i-1][j] == arr[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
};

//判断是否可以向右移动
function canMoveRight(arr){
	for (var i = 0; i < 4; ++i) {
		for (var j = 2; j >= 0; j--) {
			if (arr[i][j] != 0) {
				if (arr[i][j+1] == 0 || arr[i][j+1] == arr[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
};

//判断是否可以向下移动
function canMoveDown(arr){
	for (var j = 0; j < 4; ++j) {
		for (var i = 2; i >= 0; --i) {
			if (arr[i][j] != 0) {
				if (arr[i+1][j] == 0 || arr[i+1][j] == arr[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
};

//判断水平方向有无障碍物
function noHorizontalBarrier(row,col1,col2,arr){
	for (var i = col1+1; i < col2; ++i) {
		if (arr[row][i] != 0) {
			return false;
		}
	}
	return true;
};

//判断竖直方向有无障碍物
function noVerticalBarrier(row1,row2,col,arr){
	for (var i = row1+1; i < row2; ++i) {
		if (arr[i][col] != 0) {
			return false;
		}
	}
	return true;
};

//横向移动距离
function distanceLeft(fromX,fromY,toX,toY){
	return (toY-fromY)*(cellSpace+cellWidth);
};

//纵向移动距离
function distanceTop(fromX,fromY,toX,toY){
	return (toX-fromX)*(cellSpace+cellWidth);
};

//更新分数
function updateScore(score){
	$('#score').text(score);
};

//判断是否不能移动
function noMove(arr){
	if (canMoveLeft(arr) || canMoveDown(arr) || canMoveRight(arr) || canMoveUp(arr)) {
		return false;
	}
	return true;
};

//判断游戏是否结束
function isGameOver(arr){
	if (noSpace(arr).length == 0 && noMove(arr)) {
		alert('Game Over');
	}
};
