

var PlayerManage = ActorManage.extend({

	_bodyRect : null,
	
	setBodyRectC : 0,
	
	_isAddAll : false,
	
	_pos : [],
	_pos1 : [],
	_add : [false,false,false,false,false],

	ctor:function () {
		this._super();
		
		var win = cc.winSize;
		var pos = [win.width*0.5,win.height*0.3];
		
		var jx = 30;
		var jy = 70;
		
		this._pos.push(pos);
		
		this._pos.push([pos[0]-jx,pos[1]-jy]);
		
		this._pos.push([pos[0]+jx,pos[1]-jy]);
		
		this._pos.push([pos[0]-jx*2,pos[1]-jy*2]);
		
		this._pos.push([pos[0],pos[1]-jy*2]);
		
		this._pos.push([pos[0]+jx*2,pos[1]-jy*2]);
		
		this._pos1.push([pos[0]-jx,pos[1]+jy]);
		this._pos1.push([pos[0]+jx,pos[1]+jy]);
		this._pos1.push([pos[0]-jx*2,pos[1]+jy*2]);

		this._pos1.push([pos[0],pos[1]+jy*2]);

		this._pos1.push([pos[0]+jx*2,pos[1]+jy*2]);
		
//		this._bodyRect = new cc.rect(0,0,0,0);
		
		
		
		return true;
	},
	
	addPlayer : function(player , indext) {
		player.setPosition(this._pos[indext][0],this._pos[indext][1]);
		player.setIndext(indext);
		this.addActor(player);
		this.setBodyRect();
	},
	
	setBodyRect : function() {
		var actors = this.getActor();
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
				player.setPosition(this._pos[i][0], this._pos[i][1]);
				player.setIndext(i+6);
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

		darw.drawRect(cc.p(this._bodyRect.x, this._bodyRect.y), cc.p(this._bodyRect.x+this._bodyRect.width, this._bodyRect.y+this._bodyRect.height), cc.color(0, 0, 255, 180), 2, cc.color(0, 0, 0, 180));

		darw.drawCircle(cc.p(this._bodyRect.x, this._bodyRect.y), 10, 360, 10, true, 5, cc.color(0, 0, 0, 100));
		
		this.addChild(darw);
	},
});