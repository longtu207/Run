var ForeGround = cc.Layer.extend({
	
	_fg : null,
	_fg1 : null,
	_fg2 : null,

	_fgH : null,
	
	ctor:function () {

		this._super();

		var win = cc.winSize;
		
		this._fg = new cc.Layer();
		this.addChild(this._fg);

		this._fg1 = new cc.Sprite(res.bg1_2_png);

		this._fg1.setPosition(cc.p(win.width*0.5, win.height*0.5));

		this._fg.addChild(this._fg1);
		
		this._fgH = this._fg1._getHeight();
		
		this._fg2 = new cc.Sprite(res.bg1_2_png);

		this._fg2.setPosition(cc.p(win.width*0.5, win.height*0.5+this._fgH));

		this._fg.addChild(this._fg2);
		
		return true;
	},

	cycle:function(dt){
		this._fg.y+=FG_SPEED;

		if (this._fg.y<-this._fgH) {
			this._fg.y+=this._fgH;
		}
	},
});