
var Player_const = {
		B_TYPE_0 : 0,//普通子弹
		B_TYPE_1 : 1,//四散弹
		B_TYPE_2 : 2,//炸弹
		B_TYPE_3 : 3,//跟踪
		B_TYPE_4 : 4,//闪电
		B_TYPE_5 : 5,//穿透
    
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
	_bullet_type : Player_const.B_TYPE_0,
	_fireTime : 0,
	_fireTimeMax : FPS,
	
	_anim_state : Player_const.ANIM_NO,
	
	_player_anim_stand:[10,58],
	_player_anim_to_left:[232,244],
	_player_anim_left_to:[252,264],
	_player_anim_left:[65,113],
	_player_anim_to_right:[272,284],
	_player_anim_right_to:[292,304],
	_player_anim_right:[120,168],
	_player_anim_skill_1:[175,210],
	
	_skill_Time : 0,
	
	_buttle_speed : 20,
	
	_atk : 1,
	
	_skill_Atk : 10,
	
	ctor:function (name,bullet_type) {
		
		this._super(name);
		this._bullet_type = bullet_type;
		if (this._bullet_type == Player_const.B_TYPE_0) {
			this._fireTimeMax = 0.2*FPS;
		}else if (this._bullet_type == Player_const.B_TYPE_1) {
			this._fireTimeMax = 0.5*FPS;
		}else if (this._bullet_type == Player_const.B_TYPE_2) {
			this._fireTimeMax = 1*FPS;
		}
		
		this._skill_Time = Tools_Random(0, 100);
		
		return true;
	},
	
	cycle:function(dt){
		
		this._fireTime--;
		if (this._fireTime <= 0) {
			this.setFireTime();
//			var firePos = this.getBone("fire").getPos();
//			var firePos = cc.p( this.getAttachNode("Bip001 R Hand").getPosition3D().x,this.getAttachNode("Bip001 R Hand").getPosition3D().y);
//			
//			cc.log("x:"+firePos.x+"firePos.y"+firePos.y);
			
			var firePos = cc.p(30,0);
			
			if (this._bullet_type == Player_const.B_TYPE_0) {
				
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y,this._buttle_speed,0);
			}else if(this._bullet_type == Player_const.B_TYPE_1){
				
//				cc.log("30 : " + Math.sin(Tools_DEGREES_TO_RADIANS(30))+"cos : "+ Math.cos(Tools_DEGREES_TO_RADIANS(30)));
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y, this._buttle_speed,-25);
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y, this._buttle_speed,-45);
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y, this._buttle_speed,25);
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y, this._buttle_speed,45);
			}else if(this._bullet_type == Player_const.B_TYPE_2){
				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_1,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y,this._buttle_speed,0);
			}else 
				
			if (this._bullet_type == Player_const.B_TYPE_3) {

				
					var bullet = new Bullet("bullet_1",Bullet_const.TYPE_2);

					bullet.setPosition(firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y);
					bullet.setAtk(this._atk);
					bullet.makeSpeedAndRotation(this._buttle_speed,0);
					
					
					bullet.setEnemy(GameLayer_instance.getNearEnemy());
					
					
					
					GameLayer_instance.getBullet().addAtBullet(bullet);
			}
			
			else if(this._bullet_type == Player_const.B_TYPE_4){
				var enemy = GameLayer_instance.getNearEnemy();
				if(enemy!=null&&enemy.y<cc.winSize.height*0.6){
					enemy.setDeadTime(5);
					var bullet = new Bullet("bullet_2",Bullet_const.TYPE_3);
					bullet.setPosition(firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y);
					var r = bullet.getAngleDegrees(enemy.x,enemy.y);
					
					bullet.setRotation(r);
					bullet.setSpeed(0, 0);
					bullet.setIsCollideDie(false);
					
					var pd = cc.pDistance(enemy.getPosition(),bullet.getPosition());
					
//					cc.log("pd: "+pd);
					bullet.setScaleY(pd/bullet.getBodyRect().height);
					bullet.setAtk(0);
					
					
					GameLayer_instance.getBullet().addAtBullet(bullet);
				}
				
			}
			else
			if(this._bullet_type == Player_const.B_TYPE_5){
				
//				GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y,this._buttle_speed,0);
				
				var bullet = new Bullet("bullet_1",Bullet_const.TYPE_0);
				bullet.setAtk(10);
				bullet.setPosition(firePos.x+this.x+GameLayer_instance.getPlayer().x, firePos.y+this.y+GameLayer_instance.getPlayer().y);
				bullet.makeSpeedAndRotation(this._buttle_speed,0);
				bullet.setIsCollideDie(false);
				bullet.setEffect([Bullet_const.EFFECT_DOWN_SPEED,1.5,1*FPS]);
				GameLayer_instance.getBullet().addAtBullet(bullet);
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
			this._skill_Time--;
			if(this._skill_Time<0){

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
			this.playWithFrames(this._animateName, this._player_anim_left_to[0], this._player_anim_left_to[1], false,-1);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,-40)));
//			this.runAction(seq);
		}
	},
	
	playLeftTo : function() {
		if(this._anim_state != Player_const.ANIM_LEFT_TO&&this._anim_state != Player_const.ANIM_STAND){
			this._anim_state = Player_const.ANIM_LEFT_TO;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_left_to[0], this._player_anim_left_to[1], false);
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
			this.playWithFrames(this._animateName, this._player_anim_right_to[0], this._player_anim_right_to[1], false,-1);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,40)));
//			this.runAction(seq);
		}
	},
	
	playRightTo : function() {
		if(this._anim_state != Player_const.ANIM_RIGHT_TO&&this._anim_state != Player_const.ANIM_STAND){
			this._anim_state = Player_const.ANIM_RIGHT_TO;
			this.stopAllActions();
			this.playWithFrames(this._animateName, this._player_anim_right_to[0], this._player_anim_right_to[1], false);
//			var seq = cc.sequence(cc.rotateBy(1, cc.math.vec3(0,0,-40)));
//			this.runAction(seq);
		}
	},
});