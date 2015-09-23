var Boss3DManage = Actor3DManage.extend({
	ctor:function () {
		this._super();
		return true;
	},

	addBoss : function (name,type,btype,speed,pos){
		var boss = new Boss3D(name,type);

		boss.setBegin(btype,pos);

		boss.setSpeed(speed);

		this.addEnemyObject(boss);
	},

	addBossObject : function(boss){
		this.addActor3D(boss);
	},
});