var Boss3D_const = {
		TYPE_DOG : 1,//三头犬
		
		
		BEGIN_TYPE_DOG : 1,//三头狗登场
};


var Boss3D = Actor3D.extend({
	
	_type : Boss3D_const.TYPE_DOG,
	_atk : 1,
	_hp : 1,
	
	_speed : 0,
	_speedX : 0,
	_speedY : 0,
	_speedZ : 0,
	
	_effe : null,
	
	ctor:function (name,type) {

		this._super(name);

		this.setType(type);

		return true;
	},
	
	
	setBegin : function(type,pos){
		if(type == Boss3D_const.BEGIN_TYPE_DOG){
			
		}

		this.setState(Boss3D_const.STATE_BEGAIN);
	},
	
	cycle : function(dt) {
	},
	
});