var Bullet_const = {
		TYPE_0 : 0,//匀速移动
		TYPE_1 : 1,//炸开
};

var Bullet = Actor.extend({

	_id : 0,
	_type : TYPE_0,
	_atk : 1,
	
	_speedX : 0,
	_speedY : 10,

	ctor:function (name,id,type) {

		this._super(name);

		this._id = id;
		this._type = type;

		return true;
	},
	
	cycle : function(dt){
		this.x += this._speedX;
		this.y += this._speedY;
		
		if (this._type == Bullet_const.TYPE_1) {

		}else{
//			if (cc.c) {
//				
//			}
		}
	},
	
	toDead : function(){
		this.setState(Actor_const.STATE_DEAD);
		
		if (this._type == Bullet_const.TYPE_1) {
			
		}
	},
});