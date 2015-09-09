var Block_const = {
		TYPE_1 : 1,//正常不动
};

var Block = Actor.extend({

	
	_type : Block_const.TYPE_0,
	
	
	ctor:function (name,type) {

		this._super(name);
		
		this._type = type;

		return true;
	},
	cycle : function(dt) {
		switch(this.getState()){
			case Actor_const.STATE_NORMAL:
				this.y+=BG_SPEED;
				if (!cc.rectIntersectsRect(this.getBodyRect(), screenRect)) {
					
					this.setState(Actor_const.STATE_DEAD);
				}
				break;
		}
	}
});