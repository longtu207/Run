var Enemy3DManage = Actor3DManage.extend({
	ctor:function () {
		this._super();
		return true;
	},

	addEnemy : function(name,type,pos,speed) {
		var enemy = new Enemy3D(name,type);
//		cc.log("pos.z",pos.z);
		enemy.setPosition3D(pos);
		enemy.setSpeed(speed);
		
		
		var rootps = jsb.PUParticleSystem3D.create("fire2.pu", "test2.material");
		rootps.setKeepLocal(true);
		rootps.setPosition3D({x : 0, y : -10, z: 0});
		rootps.setRotation3D({x : 90, y : 0, z: 0});
		rootps.setScale(90);
		rootps.startParticleSystem();
		enemy.addChild(rootps);
		
		enemy.setScale(0.1);
		
		enemy.setCameraMask(cc.CameraFlag.USER1);
		
		this.addActor3D(enemy);
	},
});