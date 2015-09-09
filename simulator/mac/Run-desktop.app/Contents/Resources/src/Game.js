var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new Game();
		this.addChild(layer);
	}
});

var Game_instance = null;
var Game = cc.Layer.extend({
	
	_gameLayer : null,
	
	_oldTouchPos : null,

	_moveTouchPos : null,

	_isDown : false,
	
	_winSize : null,
	
	ctor:function () {
		
		this._super();
		
		Game_instance = this;
		
		this._winSize = new cc.size(cc.winSize.width, cc.winSize.height);
		
		this._gameLayer = new GameLayer();
		
		this.addChild(this._gameLayer);
		
//		this.addMouse();
		
		this.scheduleUpdate();
		
		return true;
	},
	
	getGameLayer : function() {
		return this._gameLayer;
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
//					target.getGameLayer()._player.x = pos.x;
//					target.getGameLayer()._player.y = pos.y;
					if (target._isDown) {
					
						target._moveTouchPos = cc.pSub(pos, target._oldTouchPos);
						target.getGameLayer()._player.x += target._moveTouchPos.x; 
						
						if (target.getGameLayer()._player.x + cc.rectGetMinX(target.getGameLayer()._player.getBodyRect())<=0) {
							target.getGameLayer()._player.x -= target.getGameLayer()._player.x + cc.rectGetMinX(target.getGameLayer()._player.getBodyRect());
						}
						
						else if(target.getGameLayer()._player.x + cc.rectGetMaxX(target.getGameLayer()._player.getBodyRect())>=target._winSize.width){
							target.getGameLayer()._player.x += target._winSize.width-(cc.rectGetMaxX(target.getGameLayer()._player.getBodyRect())+target.getGameLayer()._player.x);
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
		this._gameLayer.cycle(dt);
		
		
	},
	
	
	
	httpSuc : function(data) {
		
		cc.log("httpSuc get response : "+data);
	},
	
	httpErr : function() {
		cc.log("fail");
	},
});