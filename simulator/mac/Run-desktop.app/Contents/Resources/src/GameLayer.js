var GameLayer_instance = null;

var GameLayer = cc.Layer.extend({
	
	BG_Z : -100,

	PLAYER_Z : -50,

	ENEMY_Z : -40,

	ITEM_Z : -30,

	BLOCK_Z : -20,

	BULLET_Z : -10,
	FG_Z : 0,


	_backGround : null,
	_foreGround : null,

	_player : null,
	_bullet : null,
	_enemy : null,
	_block : null,
	_item : null,


	_winSize : null,

	_addET : 0,

	_drawNode : null,
	
	_camera:null,
	
//	bodyCube : null,
//	draw3D : null,
//	_sprite : null,
	ctor:function () {

		this._super();
		GameLayer_instance = this;
		this._winSize = new cc.size(cc.winSize.width, cc.winSize.height);
		jsb.fileUtils.addSearchPath("res/effect");
//		http.post("http://192.168.1.111/test","ant=asdasd&pwd=hahaha", this.httpSuc, this.httpErr);
//		for (var i = 0; i < 100; i++) {
//		http.post("http://192.168.1.205/","", this.httpSuc, this.httpErr);
//		}
        
		this._camera = cc.Camera.createPerspective(60, cc.winSize.width/cc.winSize.height, 1, 1000); 
		this._camera.setCameraFlag(cc.CameraFlag.USER1);
		this._camera.setPosition3D(cc.math.vec3(0, 0, 0));
		this._camera.setRotation3D(cc.math.vec3(0, 0, 0));
		this.addChild(this._camera);
		
		_drawNode = new cc.DrawNode();
		
		this.addChild(_drawNode, 110);

//		var test = new SpriteManage();
//		this.addChild(test, 100);


//		for (var i = 0; i < 100; i++) {
//		var tests = new Sprite(res.CloseNormal_png);
//		tests.setPosition(100+i*10, 300);
//		test.addSprite(tests);
//		}
//		cc.loader.register("csb", loader);
//		var loader = new Loader();
//		cc.log(""+loader.retrieve());
		ccs.armatureDataManager.addArmatureFileInfo(res.effe_test_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.bullet_1_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.enemy_1_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.enemy_200_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.enemy_201_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.rock_1_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.gold_1_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.help_1_csb);
//		var zs = ccs.CSLoader.createNode(res.scene_1_csb);
//		var zs = ccs.csLoader.createNode(res.scene_1_csb);
//		var zs = json.node;
//		var zs = ccs.sceneReader.createNodeWithSceneFile(res.scene_1_csb);
//		cc.log("zs : "+zs);
//		cc.log("gogogogo");
//		this.addChild(zs);


//		this._backGround = new BackGround();
////		this._backGround.setGlobalZOrder(-1);
//		this.addChild(this._backGround, this.BG_Z);
		
//		this._backGround = new BackGround3D(1);
		
		this._backGround = new BG();
		
		this.addChild(this._backGround);
		
		
//		cc.log("UC : "+this._backGround.getCamera("UserCamera_0"));
		
		this._camera.setPosition3D(this._backGround.getCamera("UserCamera_0").getPosition3D());
		
		this._camera.setRotation3D(this._backGround.getCamera("UserCamera_0").getRotation3D());
		
		this._camera.setRotation3D(cc.math.vec3(20,0,0));
		
//		camera.setPosition3D( cc.math.vec3(0,60,0));
//		camera.setRotation3D( cc.math.vec3(-60,0,0));
		
//		var a = new cc.DrawNode3D();
		var seq = cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(3, cc.math.vec3(0,60,0)),cc.rotateTo(3, cc.math.vec3(-60,0,0))));
	
		this._camera.runAction(seq);
                                
        
//		var node3d = new cc.Node();
//		node3d.setPosition3D(this._backGround.getCamera(0).getPosition3D());
//		cc.log(node3d.getPositionX());
//		this._foreGround = new ForeGround();
//		this._foreGround.setCameraMask(cc.CameraFlag.DEFAULT);
//		this.addChild(this._foreGround, this.FG_Z);

		this._player = new PlayerManage();

		this.addChild(this._player);

		for(var i = 0;i<6;++i){
			
			var player = new Player(res.actor3D_1_c3b);
			
			player.playStand();
                                
			this._player.addPlayer(player, i);
			
//			var bill1 = new jsb.BillBoard();
//			
//			var huo = new Actor("test1");
//			bill1.addChild(huo);
//			bill1.setPosition3D(cc.math.vec3(12,0,10));
//			bill1.setScale(0.4);
//			bill1.setRotation3D(cc.math.vec3(90,0,0));
//			
//			actor.addChild(bill1);
			
			
//			var test1 =  jsb.PUParticleSystem3D.create("tianma_wuqi.pu", "tianma_wuqi.material");
//			test1.setPosition3D(cc.math.vec3(12,0,22));
//			test1.setRotation3D(cc.math.vec3(0,0,0));
//			test1.setScale(10);
//			test1.startParticleSystem();
//			actor.addChild(test1);
			
		}
		
		
		
//		var test1 =  jsb.PUParticleSystem3D.create("tianma_wuqi.pu", "tianma_wuqi.material");
//		test1.setPosition3D(cc.math.vec3(100,100,22));
//		test1.setRotation3D(cc.math.vec3(0,0,0));
//		test1.setScale(10);
//		test1.startParticleSystem();
//		this.addChild(test1);
		

//		this._player.drawBodyRect();

		this._bullet = new BulletManage();

		this.addChild(this._bullet, this.BULLET_Z);

		this._enemy = new Enemy3DManage();
		this.addChild(this._enemy, this.ENEMY_Z);                        

		this._block = new BlockManage();
		this.addChild(this._block, this.BLOCK_Z);

		this._item = new ItemManage();
		this.addChild(this._item, this.ITEM_Z);


//		cc.moveBy(duration, deltaPos, deltaY)
//
//		var test = new Actor3D("res/3d/test.c3b");
//		test.setPosition3D(cc.math.vec3(200,200,0));
//		test.setRotation3D(cc.math.vec3(0,0,0));
//
//		var animation = jsb.Animation3D.create("res/3d/test.c3b");
//		
//		if(animation){
//			var animate = jsb.Animate3D.create(animation);
//			test.runAction(cc.repeatForever(animate));
//		}
//
////		this.addChild(test);
		
//		this.draw3D =new cc.DrawNode3D();
//		this.addChild(this.draw3D);
//		
//		cc.log(this.draw3D);
//		
//		var sprite = new jsb.Sprite3D("res/3d/bobo.c3b");
//		
//		
//		sprite.setPosition3D({x : 0, y : 0, z: 0});
////		sprite.setRotation3D({x : -45, y : 0, z: 0});
//
////		sprite.runAction(cc.moveBy(3, {x : 0, y : -360, z: 0}).repeatForever());
//
//		this.addChild(sprite);
//		
//		this._sprite = sprite;
//		
//		var aabb = sprite.getAABB();
//		this.bodyCube = cc.math.obb(aabb);
		
		
		
//
//		
//
//		var rootps = jsb.PUParticleSystem3D.create("fire2.pu", "test2.material");
//		rootps.setPosition3D({x : 0, y : -10, z: 0});
//		rootps.setRotation3D({x : 90, y : 0, z: 0});
//		rootps.setScale(90);
//
////		rootps.setScaleX(100);
//		rootps.startParticleSystem();
//		sprite.addChild(rootps, 0);
		
		
//		var scene = ccs.csLoader.createNode(res.bg3D_1);
////		scene.setPosition3D(cc.math.vec3(220, 220, 0));
////		var scene = ccs.load(res.bg3D_1);
//		
////		var camera = scene.getChildByName("UserCamera_0");
////		camera.setPosition3D(cc.math.vec3(200, 220, -100));
////		camera.setCameraFlag(cc.CameraFlag.USER1);
//		scene.setScale(50);
//		scene.setPosition3D(cc.math.vec3(20,20,20));
//		this.addChild(scene);
////		this.setCameraMask(cc.CameraFlag.USER1);
		
//		this.addSceneData();
		
//		var camera = this._backGround.getCamera(1);
//		this._backGround.setRotation3D({x : 20, y : 5, z: 0});
//		this._backGround.setPosition3D(cc.math.vec3(0,0,0));
//		this._backGround.getCamera(1).setPosition3D(cc.math.vec3(0,0,0));
//		this._backGround.getCamera(1).setRotation3D({x : 0, y : 0, z: 0});
//		this.setCameraMask(this._backGround.getCamera(1).getCameraFlag());
		
//		this.setCameraMask(2);
		
		var textureCube = jsb.TextureCube.create("res/back/Sunny1_left.jpg","res/back/Sunny1_right.jpg", "res/back/Sunny1_up.jpg", "res/back/Sunny1_down.jpg", "res/back/Sunny1_front.jpg", "res/back/Sunny1_back.jpg");

		//set the texture parameters
		textureCube.setTexParameters(gl.LINEAR, gl.LINEAR, gl.MIRRORED_REPEAT, gl.MIRRORED_REPEAT);
		
		var skybox = jsb.Skybox.create();
		skybox.setTexture(textureCube);
		this.addChild(skybox);
		skybox.setScale(700);
//		skybox.setCameraMask(30);
		this.setCameraMask(cc.CameraFlag.USER1);
		return true;
	},
	
	getCamera : function() {
		return this._camera;
	},
	
	getBullet : function() {
		return this._bullet;
	},

	getPlayer : function() {
		return this._player;
	},
	
	cycle : function(dt){
		
//		this.draw3D.clear();
//		
//		var mat = this._sprite.getNodeToWorldTransform3D();
//
//		this.bodyCube.xAxis.x = mat[0];
//		this.bodyCube.xAxis.y = mat[1];
//		this.bodyCube.xAxis.z = mat[2];
//		this.bodyCube.xAxis.normalize();
//
//		this.bodyCube.yAxis.x = mat[4];
//		this.bodyCube.yAxis.y = mat[5];
//		this.bodyCube.yAxis.z = mat[6];
//		this.bodyCube.yAxis.normalize();
//
//		this.bodyCube.zAxis.x = -mat[8];
//		this.bodyCube.zAxis.y = -mat[9];
//		this.bodyCube.zAxis.z = -mat[10];
//		this.bodyCube.zAxis.normalize();
//		this.bodyCube.center = this._sprite.getPosition3D();
//		var corners = cc.math.obbGetCorners(this.bodyCube);
//		this.draw3D.drawCube(corners, cc.color(0, 255, 0));
		
		this._backGround.cycle(dt);
//		this._foreGround.cycle(dt);

		this._player.cycle(dt);
		this._bullet.cycle(dt);
		this._enemy.cycle(dt);
		this._block.cycle(dt);
		this._item.cycle(dt);

		this.playerCycle(dt);

		this._addET--;
//		cc.log("ran : "+Tools_Random(0,100));
		if(this._addET<0){
			this._addET=60;
                                
//            this._enemy.addEnemy("res/3d/bobo.c3b", Enemy_const.TYPE_BIG_STAR, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height),cc.p(0, BG_SPEED));
                                
			this._enemy.addEnemy("res/3d/bobo.c3b", Enemy3D_const.TYPE_1, cc.math.vec3(1,20.1,-80),[0,0,BG_SPEED]);
                                
//			this._enemy.addEnemy("enemy_201", Enemy_const.TYPE_BIG_STAR, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height),cc.p(0, BG_SPEED));
//			this._block.addBlock("rock_1", Block_const.TYPE_1, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height));
//			this._item.addItem("item_10", Item_const.TYPE_GOLD, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height));
//			this._item.addItem("item_1", Item_const.TYPE_HELP, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height));

		}
//		cc.log("yes 1 "+this._bullet.getActor().length);
//		cc.log("x : "+this.actor1.getBone("test2").getWorldInfo().x);
	},
	
	playerCycle : function(dt){
		var playerSet = this._player.getActor3D();
		var blockSet = this._block.getActor();
		var enemySet = this._enemy.getActor3D();
		var itemSet = this._item.getActor();

		for (var i = 0; i < playerSet.length; i++) {
			var player = playerSet[i];

			var playerRect = new cc.rect(player.getBodyRect().x+this._player.x, player.getBodyRect().y+this._player.y, player.getBodyRect().width, player.getBodyRect().height);

			for (var j = 0; j < itemSet.length; j++) {
				if (itemSet[j].getState() == Actor_const.STATE_NORMAL) {
					if (cc.rectIntersectsRect(playerRect, itemSet[j].getBodyRect())) {
						if (itemSet[j].getType() == Item_const.TYPE_HELP) {
							if (!this._player.getIsAddAll()&&this._player.addHelp("actor_1")) {
								itemSet[j].toDead();
							}
						}else{
							itemSet[j].toDead();
						}

					}
				}
			}

			for (var j = 0; j < blockSet.length; j++) {

				if (cc.rectIntersectsRect(playerRect, blockSet[j].getBodyRect())) {
					player.toDead();
				}
			}
			for (var j = 0; j < enemySet.length; j++) {
//				if(player.isCollisionBodyRect(enemySet[j].getBodyRect())){
//				player.toDead();
//				}

//				if(cc.rectIntersectsRect(playerRect, enemySet[j].getBodyRect())){
//					player.toDead();
//				}
			}
		}
	},

	addSceneData : function() {
		var data = cc.BinaryReadUtil.create(res.scene_1_data);
		var num = data.readInt();

		for (var i = 0; i < num; i++) {

			cc.log(data.readUtf());
			cc.log(data.readBool());
			cc.log(data.readUtf());
			cc.log(data.readInt());
			cc.log(data.readInt());
			cc.log(data.readFloat());
			cc.log(data.readFloat());
			cc.log(data.readFloat());
			cc.log(data.readBool());
			cc.log(data.readUtf());
			cc.log(data.readInt());
			cc.log(data.readUtf());

		}

		var endY = cc.log(data.readInt());

	},
	
	addPlayerPos : function(posX) {
		
		this._player.x += posX;
		
		var playerSet = this._player.getActor3D();
		
		if(posX>0){
			
			for (var i = 0; i < playerSet.length; i++) {
				playerSet[i].playToRight();
			}
		}else if(posX<0){
			for (var i = 0; i < playerSet.length; i++) {
				playerSet[i].playToLeft();
			
			}
		}
		
		if(this._player.x>13){
			this._player.x = 13;
		}else if(this._player.x<-13){
			this._player.x = -13;
		}
	},
                                
    playerStand : function() {
	    	var playerSet = this._player.getActor3D();
	
	    	for (var i = 0; i < playerSet.length; i++) {
	    		playerSet[i].playToStand();
	    	}
	}
});