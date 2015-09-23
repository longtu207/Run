

var PlayerManage = Actor3DManage.extend({

	_bodyRect : null,
	
	setBodyRectC : 0,
	
	_isAddAll : false,
	
	_pos_begain : [],
	_pos1 : [],
	_add : [false,false,false,false,false],
	
	_pos : [],
	
	ctor:function () {
		this._super();
		
		var win = cc.winSize;
		
		
		var pos = [0,0,0];

		var jx = 2;
		var jy = 4;
		var jz = 0;

		this._pos_begain.push(pos);

		this._pos_begain.push([pos[0]-jx,pos[1]-jy,pos[2]]);

		this._pos_begain.push([pos[0]+jx,pos[1]-jy,pos[2]]);

		this._pos_begain.push([pos[0]-jx*2,pos[1]-jy*2,pos[2]]);

		this._pos_begain.push([pos[0],pos[1]-jy*2,pos[2]]);

		this._pos_begain.push([pos[0]+jx*2,pos[1]-jy*2,pos[2]]);

		this._pos1.push([pos[0]-jx,pos[1]+jy]);
		this._pos1.push([pos[0]+jx,pos[1]+jy]);
		this._pos1.push([pos[0]-jx*2,pos[1]+jy*2]);

		this._pos1.push([pos[0],pos[1]+jy*2]);

		this._pos1.push([pos[0]+jx*2,pos[1]+jy*2]);

//		this._bodyRect = new cc.rect(0,0,0,0);

		var pos = [win.width*0.5,250,0];

		var jx = 40;
		var jy = 100;
		var jz = 0;

		this._pos.push(pos);

		this._pos.push([pos[0]-jx,pos[1]-jy,pos[2]-jz]);

		this._pos.push([pos[0]+jx,pos[1]-jy,pos[2]-jz]);

		this._pos.push([pos[0]-jx*2,pos[1]-jy*2,pos[2]-jz*2]);

		this._pos.push([pos[0],pos[1]-jy*2,pos[2]-jz*2]);

		this._pos.push([pos[0]+jx*2,pos[1]-jy*2,pos[2]-jz*2]);
		
		
//		var pos = [0,10,-5];
//		
//		var jx = 2;
//		var jy = 4;
//		var jz = 6;
//		
//		this._pos_begain.push(pos);
//		
//		this._pos_begain.push([pos[0]-jx,pos[1]-jy,pos[2]]);
//		
//		this._pos_begain.push([pos[0]+jx,pos[1]-jy,pos[2]]);
//		
//		this._pos_begain.push([pos[0]-jx*2,pos[1]-jy*2,pos[2]]);
//		
//		this._pos_begain.push([pos[0],pos[1]-jy*2,pos[2]]);
//		
//		this._pos_begain.push([pos[0]+jx*2,pos[1]-jy*2,pos[2]]);
//		
//		this._pos1.push([pos[0]-jx,pos[1]+jy]);
//		this._pos1.push([pos[0]+jx,pos[1]+jy]);
//		this._pos1.push([pos[0]-jx*2,pos[1]+jy*2]);
//
//		this._pos1.push([pos[0],pos[1]+jy*2]);
//
//		this._pos1.push([pos[0]+jx*2,pos[1]+jy*2]);
//		
////		this._bodyRect = new cc.rect(0,0,0,0);
//		
//		var pos = [0,20,-10];
//
//		var jx = 1.5;
//		var jy = 4;
//		var jz = -4;
//
//		this._pos.push(pos);
//
//		this._pos.push([pos[0]-jx,pos[1],pos[2]-jz]);
//
//		this._pos.push([pos[0]+jx,pos[1],pos[2]-jz]);
//
//		this._pos.push([pos[0]-jx*2,pos[1],pos[2]-jz*2]);
//
//		this._pos.push([pos[0],pos[1],pos[2]-jz*2]);
//
//		this._pos.push([pos[0]+jx*2,pos[1],pos[2]-jz*2]);
		
		
		return true;
	},
	
	addPlayer : function(player , indext) {
		
		
		
		player.setRotation3D(cc.math.vec3(-60,180,0));
		player.setPosition3D(cc.math.vec3(this._pos[indext][0],this._pos[indext][1],this._pos[indext][2]));
		player.setScale(2.5);
        
//		player.setRotation3D(cc.math.vec3(-40,180,0));
//		
//		player.setScale(0.1);
//		player.setPosition3D(cc.math.vec3(this._pos_begain[indext][0],this._pos_begain[indext][1]-17,this._pos_begain[indext][2]));
////		player.setPosition3D(cc.math.vec3(this._pos_begain[indext][0],this._pos_begain[indext][1],this._pos_begain[indext][2]));
		
		var test1 =  jsb.PUParticleSystem3D.create("star.pu", "star.material");
//		test1.setPosition3D(cc.math.vec3(0,0,0));
		test1.setKeepLocal(true);
		test1.setRotation3D(cc.math.vec3(0,0,60));
		test1.setScale(10);
		test1.startParticleSystem();
		player.getAttachNode("Bip001 R Hand").addChild(test1);

		
//		var seq = cc.sequence(cc.spawn(cc.moveTo(1, cc.math.vec3(this._pos_begain[indext][0],this._pos_begain[indext][1],this._pos_begain[indext][2])),cc.rotateBy(1, cc.math.vec3(0,720,0))),
//				cc.spawn(cc.moveTo(3, cc.math.vec3(this._pos[indext][0],this._pos[indext][1],this._pos[indext][2])),cc.rotateBy(3, cc.math.vec3(60,0,0))));
//
//		player.runAction(seq);
		
//		player.setPosition3D(cc.math.vec3(this._pos[indext][0],this._pos[indext][1]-20,-5));
		
//		player.setRotation3D(cc.math.vec3(-90,180,0));
//		player.setPosition3D(cc.math.vec3(this._pos_begain[indext][0],this._pos_begain[indext][1],this._pos_begain[indext][2]));
		player.setIndext(indext);
		

		
		this.addActor3D(player);
		
		this.setBodyRect();
	},
	
	setBodyRect : function() {
		var actors = this.getActor3D();
		for(var i = 0 ; i < actors.length;++i){
			var player = actors[i];
			if(player.getState() != Player.STATE_DEAD){
				
				if(i == 0){
					
					this._bodyRect = new cc.rect(player.getBodyRect().x,player.getBodyRect().y,player.getBodyRect().width,player.getBodyRect().height);
				}else{
					this._bodyRect = Tools_RectMix(this._bodyRect, player.getBodyRect());

				}

			}
		}
		
		
		
	},
	
	getBodyRect : function() {
		return this._bodyRect;
	},
	
	addHelp : function(name) {
		for (var i = 0; i < this._add.length; i++) {
			if (!this._add[i]) {
				var player = new Player(name);
				player.setPosition(this._pos1[i][0], this._pos1[i][1]);
				player.setIndext(i+6);
				player.setLocalZOrder(-i-1);
				this.addActor(player);
				this.setBodyRect();
				this._add[i]= true;
				return true;
			}
		}
		this._isAddAll = true;
		return false;
	},
	
	setIsAddAll : function(all) {
		this._isAddAll = all;
	},
	
	getIsAddAll : function() {
		return this._isAddAll;
	},
	
	setAddInfo : function(has,indext) {
		this._add[indext]=has;
	},
	
	drawBodyRect : function() {
		var darw = new cc.DrawNode();

		darw.drawRect(cc.p(this.getBodyRect().x, this.getBodyRect().y), cc.p(this.getBodyRect().x+this.getBodyRect().width, this.getBodyRect().y+this.getBodyRect().height), cc.color(0, 0, 255, 180), 2, cc.color(0, 0, 0, 180));

		darw.drawCircle(cc.p(this.getBodyRect().x, this.getBodyRect().y), 10, 360, 10, true, 5, cc.color(0, 0, 0, 100));
		
		this.addChild(darw);
	},
});