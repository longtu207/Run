
var Player_const = {
		TYPE_0 : 0,//普通子弹
		TYPE_1 : 1,//炸弹
		TYPE_2 : 2,
    
        ANIM_NO : -1,
		ANIM_STAND : 0,
		ANIM_TO_LEFT : 1,
		ANIM_LEFT_TO : 10,
		ANIM_LEFT : 2,
		ANIM_TO_RIGHT : 3,
		ANIM_RIGHT_TO : 11,
		ANIM_RIGHT : 4,
		ANIM_SKILL1 : 5,
};

var Player = Actor3D.extend({
	
	_indext : 0,
	_type : Player_const.TYPE_0,
	_fireTime : 0,
	_fireTimeMax : FPS,
	
	_anim_state : Player_const.ANIM_NO,
	
	_player_anim_stand:[10,58],
	_player_anim_to_left:[58,65],
	_player_anim_left:[65,113],
	_player_anim_to_right:[117,120],
	_player_anim_right:[120,168],
	_player_anim_skill_1:[175,210],
	
	_skill_Time : 0,
	
	ctor:function (name) {
		
		this._super(name);
		
		if (this._type == Player_const.TYPE_0) {
			this._fireTimeMax = 0.2*FPS;
		}else if (this._type == Player_const.TYPE_1) {
			this._fireTimeMax = 5*FPS;
		}
		
		_skill_Time = Tools_Random(0, 100);
		
		return true;
	},
	
	cycle:function(dt){
		
//		this._fireTime--;
		if (this._fireTime <= 0) {
			this.setFireTime();
//			var firePos = this.getBone("fire").getPos();
			var firePos = cc.p(0, 0);
			
			if (this._type == Player_const.TYPE_0) {
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y, 0, 50);
			}else if(this._type == this.TYPE_1){
				
			}
		}
		
		if(this._anim_state == Player_const.ANIM_TO_LEFT&&this.getNumberOfRunningActions()==0){
			this._anim_state = Player_const.ANIM_LEFT;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_left[0], this._player_anim_left[1], true);

		}
		
		if(this._anim_state == Player_const.ANIM_TO_RIGHT&&this.getNumberOfRunningActions()==0){
			this._anim_state = Player_const.ANIM_RIGHT;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_right[0], this._player_anim_right[1], true);

		}
		
		if(this._anim_state == Player_const.ANIM_RIGHT_TO&&this.getNumberOfRunningActions()==0){
			this.playStand();
		}
		if(this._anim_state == Player_const.ANIM_LEFT_TO&&this.getNumberOfRunningActions()==0){
			this.playStand();
		}
		
		if(this._anim_state != Player_const.ANIM_TO_RIGHT){
			_skill_Time--;
			if(_skill_Time<0){

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
		
//		Game_instance.getPlayer().setBodyRect();
	},
	
	playStand : function() {
		if(this._anim_state != Player_const.ANIM_STAND){
			this._anim_state = Player_const.ANIM_STAND;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_stand[0], this._player_anim_stand[1], true);

		}
	},
	
	playToLeft : function() {
		if(this._anim_state != Player_const.ANIM_TO_LEFT&&this._anim_state != Player_const.ANIM_LEFT){
			this._anim_state = Player_const.ANIM_TO_LEFT;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_to_left[0], this._player_anim_to_left[1], false);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,-40)));
//			this.runAction(seq);
		}
	},
	
	playLeftTo : function() {
		if(this._anim_state != Player_const.ANIM_LEFT_TO&&this._anim_state != Player_const.ANIM_STAND){
			this._anim_state = Player_const.ANIM_LEFT_TO;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_to_left[0], this._player_anim_to_left[1], false,-1);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,-40)));
//			this.runAction(seq);
		}
	},
	
	playToStand : function() {
		if(this._anim_state == Player_const.ANIM_LEFT||this._anim_state == Player_const.ANIM_LEFT_TO){
			this.playLeftTo();
		}else if(this._anim_state == Player_const.ANIM_RIGHT||this._anim_state == Player_const.ANIM_RIGHT_TO){
			this.playRightTo();
		}else{
			this.playStand();
		}
	},
	
	playToRight : function() {
		if(this._anim_state != Player_const.ANIM_TO_RIGHT&&this._anim_state != Player_const.ANIM_RIGHT){
			this._anim_state = Player_const.ANIM_TO_RIGHT;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_to_right[0], this._player_anim_to_right[1], false);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,40)));
//			this.runAction(seq);
		}
	},
	
	playRightTo : function() {
		if(this._anim_state != Player_const.ANIM_RIGHT_TO&&this._anim_state != Player_const.ANIM_STAND){
			this._anim_state = Player_const.ANIM_RIGHT_TO;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_to_right[0], this._player_anim_to_right[1], false,-1);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,-40)));
//			this.runAction(seq);
		}
	},
});