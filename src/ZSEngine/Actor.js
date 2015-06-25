

var Actor = ccs.Armature.extend({
	STATE_NORMAL : 100,
	STATE_DEAD : 101,
	
	state : this.STATE_NORMAL,
	proState : this.state,
	isAutoDead : true,
	body1 : null,
	body2 : null,
	
	ctor:function (name) {

		this._super(name);
		this.body1 = new Array();
		this.body2 = new Array();
		
		this.setBodyPonit();
		
		return true;
	},
	
	cycle:function(dt){
		
	},
	
	getCurrentMovementID:function(){
		return "";
	},
	
	setBodyPonit:function(){
		this.body1 = [];
		this.body2 = [];
		
		for(var i = 0 ; i < 100 ; ++i){
			var str = "body"+i+"_1";
			
			if(this.getBone(str)){
				this.body1.push(this.getBone(str).getPos());
//				cc.log("x : "+this.body1[0].x+"y : "+this.body1[0].y);
				
				var str1 = "body"+i+"_2"
					this.body2.push(cc.p(this.getBone(str1).getPos().x, this.getBone(str1).getPos().y));
//				cc.log("x : "+this.getBone(str1).x+"y : "+this.body2[0].y);
			}
		}
	},
	
	debugDraw:function(){
		
	},
});