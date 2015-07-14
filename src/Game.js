var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

var Game_instance = null;
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
	
	_oldTouchPos : null,
	
	_moveTouchPos : null,
	
	_isDown : false,
	
	_winSize : null,
	
	_addET : 0,
	
	_drawNode : null,
	
	ctor:function () {
		
		this._super();
		
		Game_instance = this;
		
		this._winSize = new cc.size(cc.winSize.width, cc.winSize.height);
		
		http.post("http://192.168.1.111/test","ant=asdasd&pwd=hahaha", this.httpSuc, this.httpErr);
		
		_drawNode = new cc.DrawNode();

		this.addChild(_drawNode, 110);
		
//		var test = new SpriteManage();
//		this.addChild(test, 100);
//		
//		
//		for (var i = 0; i < 100; i++) {
//			var tests = new Sprite(res.CloseNormal_png);
//			tests.setPosition(100+i*10, 300);
//			test.addSprite(tests);
//		}
//		cc.loader.register("csb", loader);
//		var loader = new Loader();
//		cc.log(""+loader.retrieve());
		
		ccs.armatureDataManager.addArmatureFileInfo(res.bullet_1_csb);
		ccs.armatureDataManager.addArmatureFileInfo(res.actor_1_csb);
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
		
		
		this._backGround = new BackGround();
		
		this.addChild(this._backGround, this.BG_Z);
		
		this._foreGround = new ForeGround();
		
		this.addChild(this._foreGround, this.FG_Z);
		
		
		
		this._player = new PlayerManage();
		
		this.addChild(this._player, this.PLAYER_Z);
		
		for(var i = 0;i<6;++i){
			var actor =  new Player("actor_1");
			this._player.addPlayer(actor,i);
		}
		
//		this._player.drawBodyRect();
		
		this._bullet = new BulletManage();
		
		this.addChild(this._bullet, this.BULLET_Z);
		
		this._enemy = new EnemyManage();
		this.addChild(this._enemy, this.ENEMY_Z);
		
		this._block = new BlockManage();
		this.addChild(this._block, this.BLOCK_Z);
		
		this._item = new ItemManage();
		this.addChild(this._item, this.ITEM_Z);
		
		
		this.addKey();
		
		this.addMouse();
		
		this.addTouches();
		
		this.scheduleUpdate();
//		this.addSceneData();
		
		
		return true;
	},
	
	getBullet : function() {
		return this._bullet;
	},
	
	getPlayer : function() {
		return this._player;
	},
	
	addTouches : function() {
		if( 'touches' in cc.sys.capabilities ) {
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: this.onTouchBegan,
				onTouchMoved: this.onTouchMoved,
				onTouchEnded: this.onTouchEnded,
				onTouchCancelled: this.onTouchCancelled
			}, this);
		} else {
			cc.log("TOUCH-ONE-BY-ONE test is not supported on desktop");
		}
	},

	onTouchBegan:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchBegan at: " + pos.x + " " + pos.y + " Id:" + id );

		return true;

	},
	onTouchMoved:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchMoved at: " + pos.x + " " + pos.y + " Id:" + id );

	},
	onTouchEnded:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchEnded at: " + pos.x + " " + pos.y + " Id:" + id );

	},
	onTouchCancelled:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchCancelled at: " + pos.x + " " + pos.y + " Id:" + id );

	},
	
	addMouse : function() {
		if( 'mouse' in cc.sys.capabilities ) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: function(event){
					var pos = event.getLocation(), target = event.getCurrentTarget();
					if(event.getButton() === cc.EventMouse.BUTTON_RIGHT){
//						cc.log("onRightMouseDown at: " + pos.x + " " + pos.y );
					} else if(event.getButton() === cc.EventMouse.BUTTON_LEFT){
//						cc.log("onLeftMouseDown at: " + pos.x + " " + pos.y );
//						target.sprite.x = pos.x;
//						target.sprite.y = pos.y;
						target._isDown = true;
						
						target._oldTouchPos = pos;
					}
				},
				onMouseMove: function(event){
					var pos = event.getLocation(), target = event.getCurrentTarget();
//					cc.log("onMouseMove at: " + pos.x + " " + pos.y );
//					target._player.x = pos.x;
//					target._player.y = pos.y;
					if (target._isDown) {
						_moveTouchPos = cc.pSub(pos, target._oldTouchPos);
						target._player.x += _moveTouchPos.x; 
						
						if (target._player.x + cc.rectGetMinX(target._player.getBodyRect())<=0) {
							target._player.x -= target._player.x + cc.rectGetMinX(target._player.getBodyRect());
						}
						
						else if(target._player.x + cc.rectGetMaxX(target._player.getBodyRect())>=target._winSize.width){
							target._player.x += target._winSize.width-(cc.rectGetMaxX(target._player.getBodyRect())+target._player.x);
						}
					}
					target._oldTouchPos = pos;
				},
				onMouseUp: function(event){
					var pos = event.getLocation(), target = event.getCurrentTarget();
//					target.sprite.x = pos.x;
//					target.sprite.y = pos.y;
//					cc.log("onMouseUp at: " + pos.x + " " + pos.y );
					
					target._isDown = false;
				}
			}, this);
		} else {
			cc.log("MOUSE Not supported");
		}
	},
	
	addKey:function(){
		var self = this;
		if ('keyboard' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed: function (key, event) {
					var strTemp = "Key down:" + key;
					var keyStr = self.getKeyStr(key);
					if (keyStr.length > 0)
					{
						strTemp += " the key name is:" + keyStr;

						if(keyStr == "s"){

						}else if(keyStr == "a"){

						
						}else if(keyStr == "w"){
							
						}else if(keyStr == "d"){
							
						}else if(keyStr == "j"){

						}else if(keyStr == "k"){
							
						}
					}
//					cc.log(strTemp);
				},
				onKeyReleased: function (key, event) {
					var strTemp = "Key up:" + key;
					var keyStr = self.getKeyStr(key);
					if (keyStr.length > 0)
					{
						strTemp += " the key name is:" + keyStr;

						if(keyStr == "s"){
							
						}else if(keyStr == "a"){

							
						}else if(keyStr == "w"){
							
						}else if(keyStr == "d"){
							
						}else if(keyStr == "j"){

						}else if(keyStr == "k"){

						}
					}
//					cc.log(strTemp);
				}
			}, this);
		} else {
			cc.log("KEYBOARD Not supported");
		}
	},

	getKeyStr: function (keycode)
	{
		if (keycode == cc.KEY.none)
		{
			return "";
		}

		for (var keyTemp in cc.KEY)
		{
			if (cc.KEY[keyTemp] == keycode)
			{
				return keyTemp;
			}
		}
		return "";
	},


	// this callback is only available on JSB + OS X
	// Not supported on cocos2d-html5
	onKeyFlagsChanged:function(key) {
		cc.log("Key flags changed:" + key);
	},

	update:function (dt) {
		
		this._backGround.cycle(dt);
		this._foreGround.cycle(dt);
		
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
//			this._enemy.addEnemy("enemy_201", Enemy_const.TYPE_BIG_STAR, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height),cc.p(0, BG_SPEED));
//			this._block.addBlock("rock_1", Block_const.TYPE_1, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height));
//			this._item.addItem("item_10", Item_const.TYPE_GOLD, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height));
//			this._item.addItem("item_1", Item_const.TYPE_HELP, cc.p(Tools_Random(0,cc.winSize.width), cc.winSize.height));

		}
//		cc.log("yes 1 "+this._bullet.getActor().length);
//			cc.log("x : "+this.actor1.getBone("test2").getWorldInfo().x);
	},
	
	playerCycle : function(dt){
		var playerSet = this._player.getActor();
		var blockSet = this._block.getActor();
		var enemySet = this._enemy.getActor();
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
//					player.toDead();
//				}
				
				if(cc.rectIntersectsRect(playerRect, enemySet[j].getBodyRect())){
					player.toDead();
				}
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
	
	httpSuc : function(data) {
		
		cc.log("httpSuc get response : "+data);
	},
	
	httpErr : function() {
		cc.log("fail");
	},
});