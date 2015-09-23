var Enemy3D_const = {
		
		BEGIN_TYPE_BEGAIN : 0,
		
		BEGIN_TYPE_1 : 0,//侧面 左 上行
		BEGIN_TYPE_2 : 1,//侧面 右 上行
		
		
		BEGIN_TYPE_PART_LEFT : 100,//分裂左
		BEGIN_TYPE_PART_RIGHT : 101,//分裂右
		
		BEGIN_TYPE_END : 2,
		
		STATE_BEGAIN : 0,//登场
		
		
		TYPE_0 : 0,
		TYPE_1 : 1,//正常小兵
		TYPE_FIRE : 2,//火焰
		TYPE_DEAD_FIRE : 3,//死亡留下火焰TYPE_FIRE的小兵
		TYPE_DEAD_PART : 4,//死亡分裂
		
		TYPE_STAR : 11,//流星
		TYPE_BIG_STAR : 21,//跟踪流星
	
};

var Enemy3D = Actor3D.extend({

	_enemy_id : 0,
	
	_type : Enemy3D_const.TYPE_1,
	_atk : 1,

	_hp : 1,
	
	_rotation : 0,
	_speed : 0,
	_speedX : 0,
	_speedY : 0,
	_speedZ : 0,

	_deadTime : 9999,
	
	_effe : null,
	
	ctor:function (name,type) {
		
		ENEMY_ID++;
		this._enemy_id = ENEMY_ID;
		
		this._super(name);

		this.setType(type);
		
		
		return true;
	},
	
	setBegin : function(type,pos){
		if(type == Enemy3D_const.BEGIN_TYPE_1){
			this.setPosition3D(cc.math.vec3(-20, cc.winSize.height*0.5, 50));
			this.setRotation3D({x : -40, y : 180, z: 0});
			
			this.runAction(cc.spawn(cc.rotateTo(1, cc.math.vec3(-40,0,0)),cc.moveTo(1,cc.math.vec3(Tools_Random(20,cc.winSize.width*0.5),Tools_Random(cc.winSize.height*0.6,cc.winSize.height*0.9),0))));
		
		}else if(type == Enemy3D_const.BEGIN_TYPE_2){
			this.setPosition3D(cc.math.vec3(cc.winSize.width+20, cc.winSize.height*0.5, 50));
			this.setRotation3D({x : -40, y : -180, z: 0});

			this.runAction(cc.spawn(cc.rotateTo(1, cc.math.vec3(-40,0,0)),cc.moveTo(1,cc.math.vec3(Tools_Random(cc.winSize.width*0.5,cc.winSize.width-20),Tools_Random(cc.winSize.height*0.6,cc.winSize.height*0.9),0))));

		}else if(type == Enemy3D_const.BEGIN_TYPE_PART_LEFT){
			this.setPosition3D(pos);
			this.setRotation3D({x : -40, y : 0, z: 0});
			
			this.runAction(cc.spawn(cc.rotateBy(1, cc.math.vec3(360,-360,0)),cc.moveTo(1,cc.math.vec3(pos.x-100,pos.y,0))));

		}else if(type == Enemy3D_const.BEGIN_TYPE_PART_RIGHT){
			this.setPosition3D(pos);
			this.setRotation3D({x : -40, y : 0, z: 0});

			this.runAction(cc.spawn(cc.rotateBy(1, cc.math.vec3(360,360,0)),cc.moveTo(1,cc.math.vec3(pos.x+100,pos.y,0))));

		}
		
		this.setState(Enemy3D_const.STATE_BEGAIN);
	},
	
	cycle : function(dt) {
		
		if(this._deadTime!=9999){
			this._deadTime--;
			if(this._deadTime<=0){
				this.toDead();
				return;
			}
		}
		
		
		
		if(this.getState() == Enemy3D_const.STATE_BEGAIN){
			if(this.getNumberOfRunningActions()==0){
				this.setState(Actor3D_const.STATE_NORMAL);
			}
			
		}else
		
		if(this.getState() == Actor3D_const.STATE_NORMAL){
			
			var sx = this._speedX;
			var sy = this._speedY;
			var sz = this._speedZ;
			
			if(this._effe != null){
				this._effe[2]--;
				
				if(this._effe[0] == Bullet_const.EFFECT_DOWN_SPEED){
					
//					this.setColor(cc.color(0, 200, 20));
					sy += this._effe[1];
					
					if(sy >0){
						sy=0;
					}
					
				}
				
				if(this._effe[2]<=0){
//					this.setColor(cc.color(0, 0, 0));
					this._effe = null;
				}
			}
			
			this.setPosition3D(cc.math.vec3(this.getPosition3D().x+sx, this.getPosition3D().y+sy, this.getPosition3D().z+sz));

			
			
			if (this._type == Enemy3D_const.TYPE_1) {
			}
            
			if (!cc.rectIntersectsRect(this.get2DBodyRect(),screenRect)) {
				cc.log("dead");
				this.toDead();
				return;
			}
			
			
		}
		
//		if (this.getState() == Enemy_const.STATE_BEGAIN) {
//			
//			
//			
//			if(this.y > cc.winSize.height){
//				
//				this.setVisible(false);
//				
//				this.y += this._speedY;
//				
//				if(this.y <= cc.winSize.height){
//					this.playWithIndex(0);
//					this.setVisible(true);
//				}
//				
//			}else{
//				if (this.getAnimation().isPause()) {
//
//				}
//
//				if (this.getAnimation().isComplete()) {
//					this._speedY = BG_SPEED*2;
//					this.setState(Actor_const.STATE_NORMAL);
//					this.playWithIndex(1);
//					if (this.getType() == Enemy_const.TYPE_BIG_STAR) {
//						this._time = -1;
//					}
//				}
//
//				if (this._type == Enemy_const.TYPE_BIG_STAR) {
//					this.x = Game_instance.getPlayer().getActor()[0].x+Game_instance.getPlayer().x;
//				}
//			}
//			
//		}else if(this.getState() == Actor_const.STATE_NORMAL){
//			
//			if(!cc.rectIntersectsRect(this.getBodyRect(), screenRect)){
//				this.setState(Actor_const.STATE_DEAD);
//				return;
//			}
//			
//			this.y+=this._speedY;
//			
//			if (this._type == Enemy_const.TYPE_1) {
//				if(this.getAnimation().getMovementID() == "Animation2"&&this.getAnimation().isComplete()){
//					this.playWithIndex(0);
//				}
//			}else{
//				if (this._type == Enemy_const.TYPE_BIG_STAR) {
//					this._time--;
//					if (this._time>0) {
//						this.x = Game_instance.getPlayer().getActor()[0].x+Game_instance.getPlayer().x;
//					}
//				}
//			}
//		}
	},
	
	makeSpeedAndRotation : function (s , r){
		
		this._rotation = r;
		
		this.setRotation(r);

		var sx = 0;
		var sy = 0;

		if(r%360==0){
			sy = s;
		}else{
			var d = Tools_DEGREES_TO_RADIANS(r);
			sx = s*Math.sin(d);
			sy = s*Math.cos(d);
		}
		this._speed = s;
		this.setSpeed(cc.p(sx, sy));
	},
	
	setType : function(type){
		this._type = type;
		if(this._type == Enemy3D_const.TYPE_FIRE){
			this.set2DBody(cc.rect(-38,-40,80,80));
		}
	},
	
	getType : function() {
		return this._type;
	},
	
	subHp : function(hp) {
		this._hp -= hp;
		
		if(this._hp<=0){
			this.toDead();
		}
	},
	setHp : function(hp) {
		this._hp = hp;
	},
	setSpeed : function(speed){
		this._speedX = speed[0];
		this._speedY = speed[1];
		this._speedZ = speed[2];
	},
	
	toDead : function(){
		if(this._type == Enemy3D_const.TYPE_DEAD_FIRE){
			this.setType(Enemy3D_const.TYPE_FIRE);
			this.setSpeed([0,BG_SPEED,0]);
			this.getMesh().setVisible(false);
		}else{
			
			if(this._type == Enemy3D_const.TYPE_DEAD_PART){
				GameLayer_instance.getEnemy().addEnemyWithBegin("res/3d/bobo.c3b", Enemy3D_const.TYPE_1,Enemy3D_const.BEGIN_TYPE_PART_LEFT,[0,this._speedY,0],this.getPosition3D());             
				GameLayer_instance.getEnemy().addEnemyWithBegin("res/3d/bobo.c3b", Enemy3D_const.TYPE_1,Enemy3D_const.BEGIN_TYPE_PART_RIGHT,[0,this._speedY,0],this.getPosition3D());
			}
			
			this.setState(Actor3D_const.STATE_DEAD);
		}
		
	},
	
	setDeadTime : function(time){
		this._deadTime = time;
	},
	
	setEffe : function(effe){
		this._effe = null;
		this._effe = effe;
	},
	
	isCanDamage : function (){
		return this.getState() != Enemy3D_const.STATE_BEGAIN&&this.getState() !=Actor3D_const.STATE_DEAD&&this._type != Enemy3D_const.TYPE_FIRE;
	},
});