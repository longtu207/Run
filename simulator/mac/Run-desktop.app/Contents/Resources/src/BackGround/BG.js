var BG = cc.Layer.extend({

	_bg : null,
	_bg1 : null,
	_bg2 : null,

	_bgH : null,



	ctor:function () {

		this._super();
		
		this._bg = new cc.Node();
		
		this.addChild(this._bg);
		
		this._bg1 = new BackGround3D(1);
		
		this._bg.addChild(this._bg1);
		
		
		this._bg2 = new BackGround3D(1);
		this._bg2.setPosition3D(this._bg1.getChildByTag(52).getPosition3D());
		
//		cc.log("this._bg2.z:"+this._bg2.getPosition3D().z);
		this._bgH = -this._bg2.getPosition3D().z;
		this._bg.addChild(this._bg2);
		
		return true;
	},
	
	getCamera : function(indext) {
		return this._bg1.getCamera(indext);
	},
	
	cycle:function(dt){
//		this._bg1.z+=BG_SPEED;
//		this._bg2.z+=BG_SPEED;
		
//		cc.log("this._bg2.z:"+this._bg2.z);
		
//		this._bg1.setPosition3D(cc.math.vec3(0, 0, this._bg1.getPosition3D().z+0.1));
//		this._bg2.setPosition3D(cc.math.vec3(0, 0, this._bg2.getPosition3D().z+0.1));
		
//		if(this._bg1.getPosition3D().z<-this._bgH){
//			this._bg1.setPosition3D(cc.math.vec3(0, 0, 0));
//		}
		
		
		this._bg.setPosition3D(cc.math.vec3(0, 0, this._bg.getPosition3D().z+0.5));
//		cc.log("z: "+this._bg.getPosition3D().z+"_bgH :"+this._bgH);
		if(this._bg.getPosition3D().z>this._bgH){
			this._bg.setPosition3D(cc.math.vec3(0, 0, this._bg.getPosition3D().z-this._bgH));
		}
	}
});