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
	
	_animateName : "",
	_bodyCube:null,
	
	ctor:function (name) {

		this._super(name);
		this._animateName = name;
        var aabb = this.getAABB();
        this._bodyCube = cc.math.obb(aabb);
     
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
	
	setAnimName : function(name) {
		this._animateName = name;
	},
	
	getAnimName : function() {
	   return this._animateName;
	},
	
	cycle:function(dt){
		
		
	},
       
	
	
	playWithFrames:function(name,begin,end,isForever,speed){
		
		var animation = jsb.Animation3D.create(name);
		
		if(animation){

			var animate = jsb.Animate3D.createWithFrames(animation,begin,end);
			
			
			this.playAnimate(animate,isForever,speed);

		}else{
			cc.log("play "+name+" is null");
		}
	},
                                  
	
	playWithTime:function(name,begin,end,isForever,speed){
		var animation = jsb.Animation3D.create(name);

		if(animation){

			var animate = jsb.Animate3D.create(animation,begin,end);

			this.playAnimate(animate,isForever,speed);

		}else{
			cc.log("play "+name+" is null");
		}
	},
	
	play:function(name,isForever,speed){
		var animation = jsb.Animation3D.create(name);

		if(animation){
			
			var animate = jsb.Animate3D.create(animation);
			
			this.playAnimate(animate,isForever,speed);
			
		}else{
			cc.log("play "+name+" is null");
		}
	},
	
	playAnimate : function(animate,isForever,speed) {
		
		if(speed){
			animate.setSpeed(speed);
		}
		
		if(isForever){
			this.runAction(cc.repeatForever(animate));
		}else{
			this.runAction(animate);
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
	
	
	getDrawCube:function(){

//		this._darwNode.clear();
//
//		this._darwNode.drawRect(cc.p(this.getBodyRect().x, this.getBodyRect().y), cc.p(this.getBodyRect().x+this.getBodyRect().width, this.getBodyRect().y+this.getBodyRect().height), cc.color(255, 0, 0, 180), 2, cc.color(0, 0, 0, 180));
//
//		this._darwNode.drawCircle(cc.p(this.getBodyRect().x, this.getBodyRect().y), 10, 360, 10, true, 5, cc.color(255, 255, 255, 100));
		
		var mat = this.getNodeToWorldTransform3D();
        
		this._bodyCube.xAxis.x = mat[0];
		this._bodyCube.xAxis.y = mat[1];
		this._bodyCube.xAxis.z = mat[2];
		this._bodyCube.xAxis.normalize();

		this._bodyCube.yAxis.x = mat[4];
		this._bodyCube.yAxis.y = mat[5];
		this._bodyCube.yAxis.z = mat[6];
		this._bodyCube.yAxis.normalize();

		this._bodyCube.zAxis.x = -mat[8];
		this._bodyCube.zAxis.y = -mat[9];
		this._bodyCube.zAxis.z = -mat[10];
		this._bodyCube.zAxis.normalize();

		this._bodyCube.center = this.getPosition3D();

		var corners = cc.math.obbGetCorners(this._bodyCube);
		
		return this.corners;
		
	},
});