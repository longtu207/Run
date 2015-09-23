var Enemy3DManage = Actor3DManage.extend({
	ctor:function () {
		this._super();
		return true;
	},

	addEnemyWithBegin : function (name,type,btype,speed,pos){
		var enemy = new Enemy3D(name,type);
		
		enemy.setBegin(btype,pos);
		
		enemy.setSpeed(speed);

		var rootps = jsb.PUParticleSystem3D.create("fire2.pu", "test2.material");
		rootps.setKeepLocal(true);
		rootps.setPosition3D({x : 0, y : -12, z: 0});
		rootps.setRotation3D({x : 90, y : 0, z: 0});
		rootps.setScale(90);
		rootps.startParticleSystem();
		enemy.addChild(rootps);

		enemy.setScale(2);
		enemy.setHp(Tools_Random(5,20));
//		enemy.setCameraMask(cc.CameraFlag.USER1);

		this.addEnemyObject(enemy);
	},
	
	addEnemy : function(name,type,pos,speed) {
		var enemy = new Enemy3D(name,type);
//		cc.log("pos.z",pos.z);
		enemy.setPosition3D(pos);
		enemy.setRotation3D({x : -40, y : 0, z: 0});
		
		enemy.setSpeed(speed);
		
		if(type == Enemy3D_const.TYPE_2){
			enemy.getMesh().setVisible(false);
		}
		
		var rootps = jsb.PUParticleSystem3D.create("fire2.pu", "test2.material");
		rootps.setKeepLocal(true);
		rootps.setPosition3D({x : 0, y : -12, z: 0});
		rootps.setRotation3D({x : 90, y : 0, z: 0});
		rootps.setScale(90);
		rootps.startParticleSystem();
		enemy.addChild(rootps);
		
		enemy.setScale(2);
		enemy.setHp(Tools_Random(30,80));
//		enemy.setCameraMask(cc.CameraFlag.USER1);
		
		this.addEnemyObject(enemy);
	},
	
	addEnemyObject : function(enemy){
		this.addActor3D(enemy);
	},
});