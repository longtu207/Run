var DEBUG_DRAW = true;

var ENEMY_ID = 0;

Tools_RectMix = function(rect1,rect2){
	
	var x1 = Math.min(cc.rectGetMinX(rect1),cc.rectGetMinX(rect2));
	var y1 = Math.min(cc.rectGetMinY(rect1),cc.rectGetMinY(rect2));
	var x2 = Math.max(cc.rectGetMaxX(rect1),cc.rectGetMaxX(rect2));
	var y2 = Math.max(cc.rectGetMaxY(rect1),cc.rectGetMaxY(rect2));
	
//	cc.log("ry1 : " +cc.rectGetMinY(rect1) +"ry2 : "+cc.rectGetMinY(rect2));
	
//	cc.log("ry1 : " +cc.rectGetMaxY(rect1) +"ry2 : "+cc.rectGetMaxY(rect2));
//	
//	cc.log("y1 : " +y1 +"h : "+(y1-y2));
	
	return new cc.rect(x1, y1, x2-x1, y2-y1);
};

Tools_Random = function(minInclusive,  maxInclusive){
	
	return minInclusive + (Math.random() * (maxInclusive - minInclusive));
};

Tools_Int_Random = function(minInclusive,  maxInclusive){

	return parseInt(minInclusive + (Math.random() * (maxInclusive - minInclusive)));
};

//角度转换成弧度
Tools_DEGREES_TO_RADIANS = function(angle){
	return angle* 0.01745329252;
};

//弧度转换成角度
Tools_RADIANS_TO_DEGREES = function(angle){
	return angle* 57.29577951;
};

