var DEBUG_DRAW = true;


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



