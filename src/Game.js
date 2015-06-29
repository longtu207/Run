var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

var GameLayer = cc.Layer.extend({
	
	BG_Z : -100,
	PLAYER_Z : -20,
	FG_Z : 0,
	
	_backGround : null,
	_foreGround : null,
	
	_player : null,
	
	_oldTouchPos : null,
	
	_moveTouchPos : null,
	
	_isDown : false,
	
	_winSize : null,
	
	ctor:function () {
		
		this._super();
		
		this._winSize = new cc.size(cc.winSize.width, cc.winSize.height);
		
		var test = new SpriteManage();
		this.addChild(test, 100);
		
		
		for (var i = 0; i < 100; i++) {
			var tests = new Sprite(res.CloseNormal_png);
			tests.setPosition(100+i*10, 300);
			test.addSprite(tests);
		}
		
		ccs.armatureDataManager.addArmatureFileInfo(res.actor_1_csb);
		
//		var _actorNode = new ccs.BatchNode();
		
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
		
		this.addKey();
		
		this.addMouse();
		
		this.addTouches();
		
		this.scheduleUpdate();
		
		return true;
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
			
//			cc.log("x : "+this.actor1.getBone("test2").getWorldInfo().x);
	},
});