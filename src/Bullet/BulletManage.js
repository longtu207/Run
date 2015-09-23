var BulletManage = ActorManage.extend({
	ctor:function () {
		this._super();
		return true;
	},
	
	addBullet : function(type,atk,x,y,s,r) {
		var bullet = new Bullet("bullet_1",type);
		
		bullet.setPosition(x, y);
		bullet.setAtk(atk);
		bullet.makeSpeedAndRotation(s,r);
		this.addAtBullet(bullet);
	},
	
	addAtBullet : function(bullet){
		bullet.playWithIndex(0);

//		bullet.getAnimation().setSpeedScale(0.5);

		this.addActor(bullet);
	},
});