var BlockManage = ActorManage.extend({
	ctor:function () {
		this._super();
		return true;
	},

	addBlock : function(name,type,pos) {
		var block = new Block(name,type);

		block.setPosition(pos);

		this.addActor(block);
	},
});