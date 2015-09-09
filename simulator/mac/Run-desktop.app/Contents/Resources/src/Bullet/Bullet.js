var Bullet_const = {
		TYPE_0 : 0,//匀速移动
		TYPE_1 : 1,//炸开
};

var Bullet = Actor.extend({

	_id : 0,
	_type : Bullet_const.TYPE_0,
	_atk : 1,
	
	_speedX : 0,
	_speedY : 10,

	ctor:function (name,type) {

		this._super(name);

		this._id = BULLET_ID;
		BULLET_ID++;
		this._type = type;

		return true;
	},
	
	cycle : function(dt){
		this.x += this._speedX;
		this.y += this._speedY;
		
		if (this._type == Bullet_const.TYPE_1) {

		}else{
			if (!cc.rectIntersectsRect(this.getBodyRect(),screenRect)) {
				
				this.toDead();
			}
		}
	},
	
	toDead : function(){
		this.setState(Actor_const.STATE_DEAD);
		
		if (this._type == Bullet_const.TYPE_1) {
			
		}
	},
	
	setSpeed : function(sx,sy) {
		this._speedX = sx;
		this._speedY = sy;
	},
});