var ItemManage = ActorManage.extend({
	ctor:function () {
		this._super();
		return true;
	},

	addItem : function(name,type,pos) {
		var item = new Item(name,type);

		item.setPosition(pos);

		this.addActor(item);
	},
});