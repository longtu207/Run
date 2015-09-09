var BackGround = cc.Layer.extend({
	
	_bg : null,
	_bg1 : null,
	_bg2 : null,
	
	_bgH : null,
	
	
	
	ctor:function () {

		this._super();
		
		var win = cc.winSize;
		
		this._bg = new cc.Layer();
		this.addChild(this._bg);
		
		this._bg1 = new cc.Sprite(res.bg1_1_png);
		this._bg1.setGlobalZOrder(-1);
		this._bg1.setPosition(cc.p(win.width*0.5, win.height*0.5));

		this._bg.addChild(this._bg1);
		
		this._bgH = this._bg1._getHeight();
		
		this._bg2 = new cc.Sprite(res.bg1_1_png);
		this._bg2.setGlobalZOrder(-1);
		this._bg2.setPosition(cc.p(win.width*0.5, win.height*0.5+this._bgH));
		
		this._bg.addChild(this._bg2);

		return true;
	},

	cycle:function(dt){
		this._bg.y+=BG_SPEED;
		
		if (this._bg.y<-this._bgH) {
			this._bg.y+=this._bgH;
		}

	},
});