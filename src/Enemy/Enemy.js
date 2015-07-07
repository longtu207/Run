var Enemy_const = {
		
		STATE_BEGAIN : 0,
		
		
		TYPE_0 : 0,
		TYPE_1 : 1,//正常小兵
		
		TYPE_STAR : 11,//流星
		TYPE_BIG_STAR : 21,//跟踪流星
	
};

var Enemy = Actor.extend({

	
	_type : Enemy_const.TYPE_1,
	_atk : 1,

	_hp : 0,
	_speedX : 0,
	_speedY : 10,

	ctor:function (name,type) {

		this._super(name);

		this._type = type;
		
		if (this._type == Enemy_const.TYPE_STAR||this._type == Enemy_const.TYPE_BIG_STAR) {
			this.setState(Enemy_const.STATE_BEGAIN);
		}

		return true;
	},
	
	cycle : function(dt) {
		
		
		
		if (this.getState() == Enemy_const.STATE_BEGAIN) {
			
			
			
			if(this.y > cc.winSize.height){
				
				this.setVisible(false);
				
				this.y += this._speedY;
				
				if(this.y <= cc.winSize.height){
					this.playWithIndex(0);
					this.setVisible(true);
				}
				
			}else{
				if (this.getAnimation().isPause()) {

				}

				if (this.getAnimation().isComplete()) {
					this._speedY = BG_SPEED*2;
					this.setState(Actor_const.STATE_NORMAL);
					this.playWithIndex(1);
					if (this.getType() == Enemy_const.TYPE_BIG_STAR) {
						this._time = -1;
					}
				}

				if (this._type == Enemy_const.TYPE_BIG_STAR) {
					this.x = Game_instance.getPlayer().getActor()[0].x+Game_instance.getPlayer().x;
				}
			}
			
		}else if(this.getState() == Actor_const.STATE_NORMAL){
			
			if(!cc.rectIntersectsRect(this.getBodyRect(), screenRect)){
				this.setState(Actor_const.STATE_DEAD);
				return;
			}
			
			this.y+=this._speedY;
			
			if (this._type == Enemy_const.TYPE_1) {
				if(this.getAnimation().getMovementID() == "Animation2"&&this.getAnimation().isComplete()){
					this.playWithIndex(0);
				}
			}else{
				if (this._type == Enemy_const.TYPE_BIG_STAR) {
					this._time--;
					if (this._time>0) {
						this.x = Game_instance.getPlayer().getActor()[0].x+Game_instance.getPlayer().x;
					}
				}
			}
		}
	},
	
	getType : function() {
		return this._type;
	},
	
	subHp : function(){
		this.subHp(1);
	},
	subHp : function(hp) {
		this._hp -= hp;
	},
	setHp : function(hp) {
		this._hp = hp;
	},
	setSpeed : function(speed){
		this._speedX = speed.x;
		this._speedY = speed.y;
		
	},
});