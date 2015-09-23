var Actor3DManage = cc.Node.extend({

	_actor3DSet : null,
	_darwNode : null,
	
	ctor:function () {

		this._super();
		this._actor3DSet = new Array();
		
        if(DEBUG_DRAW){
            this._darwNode =new cc.DrawNode3D();
            this.addChild(this._darwNode);
        }
		
		return true;
	},

	addActor3D : function(actor3D) {
		this._actor3DSet.push(actor3D);
		this.addChild(actor3D);
	},

	cycle:function(dt){
		if(DEBUG_DRAW){
			this._darwNode.clear();
		}
		
		
		
		for (var i = 0; i < this._actor3DSet.length; ++i) {
			var actor3D = this._actor3DSet[i];
			
			actor3D.cycle(dt);
			if(actor3D.getState() == Actor3D_const.STATE_DEAD){
                                   
				this._actor3DSet.splice(i, 1);
				this.removeChild(actor3D, true);
				i--;
				continue;
			}
			
			if (DEBUG_DRAW) {
				
//				this._darwNode.drawCube(actor3D.getDrawCube(), cc.color(0, 255, 0));

			}
                                   
            
		}
	},

	getActor3D : function() {
		return this._actor3DSet;
	},

});