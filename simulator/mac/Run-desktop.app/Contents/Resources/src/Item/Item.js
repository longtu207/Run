var Item_const = {

		TYPE_HELP : 0,//被解救的
		TYPE_GOLD : 1,//金币

		TYPE_ENERGY : 2,//能量
		
		STATE_READY : 0,//被解救预警
		STATE_SHOW : 1,//被解救错过
		STATE_GET : 2,//金币飞走

};

var Item = Actor.extend({


	_type : Item_const.TYPE_GOLD,
	
	_time : 0,
	
	_timeMax : 120,
	
	ctor:function (name,type) {

		this._super(name);

		this._type = type;

		if (this._type == Item_const.TYPE_HELP) {
			this.setState(Item_const.STATE_READY);
		}

		return true;
	},
	
	setTimeMax : function (time) {
		this._timeMax = time
	},
	
	cycle : function(dt) {
		if (this.getState() == Item_const.STATE_READY) {
			this._time++;
			if (this._time>this._timeMax) {
				this._time = 0;
				this.y = cc.winSize.height;
				this.playWithIndex(1);
				this.setState(Actor_const.STATE_NORMAL);
				
			}
		}else if(this.getState() == Actor_const.STATE_NORMAL){
			this.y += BG_SPEED;
			
			if(cc.rectGetMaxY(this.getBodyRect())<0){
				if(this._type == Item_const.TYPE_HELP){
					this.setState(Item_const.STATE_SHOW);
					this._time = 0;
					this.playWithIndex(2);
					this.y = this.getBodyRect().height;
				}else{
					this.setState(Actor_const.STATE_DEAD);
				}
			}
		}else if(this.getState() == Item_const.STATE_SHOW){
			
			this._time++;
			if(this._time>this._timeMax){
				this.setState(Actor_const.STATE_DEAD);
			}
			
		}else if(this.getState() == Item_const.STATE_GET){
			if(this.getNumberOfRunningActions()==0){
				this.setState(Actor_const.STATE_DEAD);
			}
		}
	},
	
	toDead : function() {
		if (this._type == Item_const.TYPE_GOLD) {
			this.setState(Item_const.STATE_GET);
			
			var mov= new cc.moveTo(cc.pDistance(this.getPosition(), cc.p(0, cc.winSize.height))*0.001,cc.p(0, cc.winSize.height));

			this.runAction(mov);
		}else{
			this.setState(Actor_const.STATE_DEAD);
		}
	},
	
	getType : function() {
		return this._type;
	},
});