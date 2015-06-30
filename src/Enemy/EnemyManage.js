var EnemyManage = ActorManage.extend({
	ctor:function () {
		this._super();
		return true;
	},

	addEnemy : function(name,type,pos,speed) {
		var enemy = new Enemy(name,type);
		
		enemy.setPosition(pos);
		enemy.setSpeed(speed);
		this.addActor(enemy);
	},
});