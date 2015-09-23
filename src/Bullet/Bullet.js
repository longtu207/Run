var Bullet_const = {
		TYPE_0 : 0,//匀速移动
		TYPE_1 : 1,//炸开
		TYPE_2 : 2,//追踪子弹
		TYPE_3 : 3,//播放动画
		
		EFFECT_DOWN_SPEED : 0, //减速特效
		
};

var Bullet = Actor.extend({

	_id : 0,
	_type : Bullet_const.TYPE_0,
	_atk : 1,
	
	_speedX : 0,
	_speedY : 0,
	
	_enemy : null,
	
	_speed : 10,
	
	_isCollideDie : true,
	
	_isAtkOnce : true,
	
	_atkEnemy : [],
	
	_effect : null,

	ctor:function (name,type) {

		this._super(name);

		this._id = BULLET_ID;
		BULLET_ID++;
		this._type = type;
		
		this._atkEnemy = new Array();

		return true;
	},
	
	setEffect : function (effect){
		this._effect = effect;
	},
	
	getEffect : function (){
		return this._effect;
	},
	
	cycle : function(dt){
		
		if (!cc.rectIntersectsRect(this.getBodyRect(),screenRect)) {
			this.toDead();
			return;
		}
		
		this.x += this._speedX;
		this.y += this._speedY;
		
		if (this._type == Bullet_const.TYPE_1) {
			
			if(this.y>cc.winSize.height*0.8){
				this.toDead();
			}

		}else if(this._type == Bullet_const.TYPE_2){
			
			if(this._enemy != null){
				
				if(!this._enemy.isCanDamage()){
					
					this._enemy = GameLayer_instance.getNearEnemy();
					
					if(this._enemy == null){
						this._speedX = 0;
						this._speedY = this._speed;
						this.setRotation(0);
					}
					
				}else{
				
//					var angleRadians = Math.atan((this._enemy.x-this.x)/(this._enemy.y-this.y));

					var angleDegrees = this.getAngleDegrees(this._enemy.x,this._enemy.y);

					this.makeSpeedAndRotation(this._speed,angleDegrees);

//					this.x += this._speedX;
//					this.y += this._speedY;

//					this.setPosition(
//					ccpAdd(enemySnake->getPosition(),
//					ccp(cos(angleDegrees)*iEnemySpeed,sin(angleDegrees)*iEnemySpeed)
//					)


				}
				
			}else{
				
				this._enemy = GameLayer_instance.getNearEnemy();
			}
			
		}else if(this._type == Bullet_const.TYPE_3){
			if(this.getAnimation().isComplete()){
//				cc.log("dead");
				this.toDead();
			}
		}
			
		
		
		
	},
	
	toDead : function(){
		this.setState(Actor_const.STATE_DEAD);
		
		if (this._type == Bullet_const.TYPE_1) {
			GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, this.x, this.y, this._speedY,-90);
			GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, this.x, this.y, this._speedY,90);
			
			GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, this.x, this.y, this._speedY,-45);
			GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, this.x, this.y, this._speedY,45);
			GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, this.x, this.y, this._speedY,-135);
			GameLayer_instance.getBullet().addBullet(Bullet_const.TYPE_0,this._atk, this.x, this.y, this._speedY,135);
			
		}
	},
	
	makeSpeedAndRotation : function (s , r){
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
		this.setSpeed(sx, sy);
	},
	
	setIsCollideDie : function (is){
		this._isCollideDie = is;
	},
	
	getIsCollideDie : function(){
		return this._isCollideDie;
	},
	
	setSpeed : function(sx,sy) {
		this._speedX = sx;
		this._speedY = sy;
	},
	
	setEnemy : function(enemy){
		
		if(enemy == undefined){
			return;
		}
		
		if(enemy.isCanDamage()){
			this._enemy = enemy;
		}
	},
	
	setAtk : function(atk){
		this._atk = atk;
	},
	
	getAtk : function(){
		return this._atk;
	},
	
	atkEnemy : function(enemy){
		
		
		
		if(enemy.isCanDamage()){
			
			var isAtk = true;
			
			if(this.getIsCollideDie()){
				this.toDead();
			}else{
				if(this._isAtkOnce){
					if(this._atkEnemy.length==0){
						this._atkEnemy.push(enemy);
					}else{
						
						for(var i = 0;i<this._atkEnemy.length;++i){
						
							if(this._atkEnemy[i]==enemy){
								isAtk = false;
							}
						}
						
						if(isAtk){
							this._atkEnemy.push(enemy);
						}
					}
					
					
				}
			}
			
			if(isAtk){
				
				if(this._effect != null){
					enemy.setEffe(this._effect);
				}
				
				enemy.subHp(this.getAtk());
			}
		
		}
	},
});