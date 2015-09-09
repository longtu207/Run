var Actor3D_const = {
		STATE_NORMAL : 100,
		STATE_DEAD : 101,
};

var Actor3D = jsb.Sprite3D.extend({
	
	_type : 0,
	
	_state : Actor3D_const.STATE_NORMAL,
	
	_proState : this._state,
	
	_isAutoDead : true,
	
	_darwNode : null,
	
	_name : "noName",
	_obbt:null,
	ctor:function (name) {

		this._super(name);
		
		if(DEBUG_DRAW){
			this._darwNode =new cc.DrawNode3D();
			this.addChild(this._darwNode);
		}
		
		return true;
	},
	
	setType : function(type) {
		this._type = type;
	},
	
	getType : function() {
		return this._type;
	},
	
	setName : function(name) {
		this._name = name;
	},
	
	getName : function(){
		return this._name;
	},
	
	cycle:function(dt){
		
		if(DEBUG_DRAW){
			cc.log("draw");
			this.debugDraw();
		}
	},
	
	play:function(name,isForever){
		var animation = jsb.Animation3D.create(name);

		if(animation){
			
			var animate = jsb.Animate3D.create(animation);
			
			if(isForever){
				this.runAction(cc.repeatForever(animate));
			}
			
		}else{
			cc.log("play "+name+" is null");
		}
	},
	
	getState : function() {
		return this._state;
	},

	setState : function(state) {
		this._state = state;
	},

	setProState : function(state){
		this._proState = state;
	},

	getProState : function() {
		return this._proState;
	},
	
	setBody:function(){
	},
	
	getBodyRect:function(){
		
		return this.getBoundingBox();
	},
	
	
	debugDraw:function(){

		this._darwNode.clear();

//		this._darwNode.drawRect(cc.p(this.getBodyRect().x, this.getBodyRect().y), cc.p(this.getBodyRect().x+this.getBodyRect().width, this.getBodyRect().y+this.getBodyRect().height), cc.color(255, 0, 0, 180), 2, cc.color(0, 0, 0, 180));
//
//		this._darwNode.drawCircle(cc.p(this.getBodyRect().x, this.getBodyRect().y), 10, 360, 10, true, 5, cc.color(255, 255, 255, 100));
		
		var mat = this.getNodeToWorldTransform3D();
		this._obbt.xAxis.x = mat[0];
		this._obbt.xAxis.y = mat[1];
		this._obbt.xAxis.z = mat[2];
		this._obbt.xAxis.normalize();

		this._obbt.yAxis.x = mat[4];
		this._obbt.yAxis.y = mat[5];
		this._obbt.yAxis.z = mat[6];
		this._obbt.yAxis.normalize();

		this._obbt.zAxis.x = -mat[8];
		this._obbt.zAxis.y = -mat[9];
		this._obbt.zAxis.z = -mat[10];
		this._obbt.zAxis.normalize();

		this._obbt.center = this.getPosition3D();

		var corners = cc.math.obbGetCorners(this._obbt);
		this._darwNode.drawCube(corners, cc.color(0, 0, 255));
		
	},
});