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
	
	actor1 : null,
	
	ctor:function () {
		
		
		
		this._super();
		
		this._backGround = new BackGround();
		
		this.addChild(this._backGround, this.BG_Z);
		
		this._foreGround = new ForeGround();
		
		this.addChild(this._foreGround, this.FG_Z);
		
		ccs.armatureDataManager.addArmatureFileInfo(res.actor_1_csb);
		this.actor1 =  new Actor("actor_1");
		this.actor1.setPosition(200, 200);
		this.actor1.getAnimation().playWithIndex(0);
		
		this.addChild(this.actor1,this.PLAYER_Z);
		
		this.addKey();
		
		this.scheduleUpdate();
		
		return true;
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
			
//			cc.log("x : "+this.actor1.getBone("test2").getWorldInfo().x);
	},
});