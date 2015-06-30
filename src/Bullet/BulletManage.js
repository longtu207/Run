var BulletManage = ActorManage.extend({
	ctor:function () {
		this._super();
		return true;
	},
	
	addBullet : function(type,x,y,sx,sy) {
		var bullet = new Bullet("bullet_1",type);
		
		bullet.setPosition(x, y);
		
		bullet.setSpeed(sx, sy);
		
		this.addActor(bullet);
	},
});