
var Player_const = {
		TYPE_0 : 0,//普通子弹
		TYPE_1 : 1,//炸弹
		TYPE_2 : 2,
};

var Player = Actor.extend({
	
	_indext : 0,
	_type : Player_const.TYPE_0,
	_fireTime : 0,
	_fireTimeMax : FPS,
	
	ctor:function (name) {
		
		this._super(name);
		
		if (this._type == Player_const.TYPE_0) {
			this._fireTimeMax = 0.2*FPS;
		}else if (this._type == Player_const.TYPE_1) {
			this._fireTimeMax = 5*FPS;
		}
		
		return true;
	},
	
	cycle:function(dt){
		
//		this._fireTime--;
		if (this._fireTime <= 0) {
			this.setFireTime();
			var firePos = this.getBone("fire").getPos();
			
			if (this._type == Player_const.TYPE_0) {
				Game_instance.getBullet().addBullet(Bullet_const.TYPE_0, firePos.x+this.x+Game_instance.getPlayer().x, firePos.y+this.y+Game_instance.getPlayer().y, 0, 50);
			}else if(this._type == this.TYPE_1){
				
			}
		}
	},
	
	setFireTime : function() {
		this._fireTime = this._fireTimeMax;
	},
	
	setIndext : function(indext){
		this._indext = indext;
	},
	
	getIndext : function() {
		return this._indext;
	},
	
	setType : function(type) {
		this._type =type;
	},
	
	getType : function() {
		return this._type
	},
	
	toDead : function() {
		this.setState(Actor_const.STATE_DEAD);
		
		if (this._indext > 5) {
			Game_instance.getPlayer().setAddInfo(false, this._indext-6);
			Game_instance.getPlayer().setIsAddAll(false);
		}
		
		Game_instance.getPlayer().setBodyRect();
	}
});