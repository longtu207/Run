var Actor3DManage = cc.Node.extend({

	_actor3DSet : null,

	ctor:function () {

		this._super();

		this._actor3DSet = new Array();
		
		return true;
	},

	addActor3D : function(actor3D) {
		this._actor3DSet.push(actor3D);
		this.addChild(actor3D);
	},

	cycle:function(dt){
		
		for (var i = 0; i < this._actor3DSet.length; ++i) {
			var actor3D = this._actor3DSet[i];
			
			actor3D.cycle(dt);
			if(actor3D.getState() == Actor3D_const.STATE_DEAD){

				this._actor3DSet.splice(i, 1);
				this.removeChild(actor3D, true);
				i--;
				continue;
			}
		}
	},

	getActor3D : function() {
		return this._actor3DSet;
	},

});