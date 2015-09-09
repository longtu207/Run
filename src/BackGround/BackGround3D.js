var BackGround3D_const = {
		TYPE_Camera : 1,
		TYPE_Sprite3D : 2,
		TYPE_Node3D : 3,
};


var BackGround3D = cc.Node.extend({

	_indext : null,
	
	_camera : null,
	
	ctor:function (indext) {
		
		this._super();
		
		this._indext = indext;
		this._camera = {};
		
		this.addSceneData(indext);
		
		
		return true;
	},
	
	
	getCamera : function(name) {
		return this._camera[name];
	},
	
	cycle:function(dt){
		

	},
	
	
	
	addSceneData : function(indext) {
//		var data = cc.BinaryReadUtil.create("res/back/back"+indext+".data");
		var data = cc.BinaryReadUtil.create(res.backdata_1);
		var num = data.readInt();
//		cc.log("num : "+num);
		
		for (var i = 0; i < num; i++) {

			var type = data.readInt();
//			cc.log("type : "+type);
//			this._camera = cc.Camera.createPerspective(60, this._winSize.width/this._winSize.height, 1, 1000);
////			this._camera.setPosition3D({x : 200, y : 100, z: 0});
//			this._camera.setRotation3D(cc.math.vec3(50,0, 0));
//			var p = test.getPosition3D();
//			this._camera.setPosition3D(cc.math.vec3(0, 0, 600));

//			this._camera.setCameraFlag(cc.CameraFlag.USER1);
//			this.addChild(this._camera);
//			this.setCameraMask(cc.CameraFlag.USER1);
			
			if (type == BackGround3D_const.TYPE_Camera) {
				
				var name = data.readUtf();
//				cc.log("name : "+name);
				var fov = data.readFloat();
//				cc.log("fov : "+fov);
				var clipPlaneX = data.readFloat();
//				cc.log("clipPlaneX : "+clipPlaneX);
				var clipPlaneY = data.readFloat();
//				cc.log("clipPlaneY : "+clipPlaneY);
				var flag = data.readInt();
//				cc.log("flag : "+flag);
				var PX = data.readFloat();
//				cc.log("PX : "+PX);
				var PY = data.readFloat();
//				cc.log("PY : "+PY);
				var PZ = data.readFloat();
//				cc.log("PZ : "+PZ);
				var RX = data.readFloat();
//				cc.log("RX : "+RX);
				var RY = data.readFloat();
//				cc.log("RY : "+RY);
				var RZ = data.readFloat();
//				cc.log("RZ : "+RZ);
				
				var camera = cc.Camera.createPerspective(fov, cc.winSize.width/cc.winSize.height, clipPlaneX, clipPlaneY); 
				camera.setCameraFlag(flag);
				camera.setPosition3D(cc.math.vec3(PX, PY, PZ));
				camera.setRotation3D(cc.math.vec3(RX, RY, RZ));
//				this._camera.push(camera);
				
				this._camera[name] = camera;
//				this._camera.name = camera;
//				this._camera.add(name,camera);
			}else if(type == BackGround3D_const.TYPE_Sprite3D){
				var name = data.readUtf();
				var path = data.readUtf();
//				cc.log("path: "+path);
				var actor = new Actor3D(path);
				actor.setName(name);
				var flag = data.readInt();
				actor.setCameraMask(flag);
				var tag = data.readInt();
				actor.setTag(tag);
				var isRun = data.readBool();
				
				var PX = data.readFloat();
				var PY = data.readFloat();
				var PZ = data.readFloat();
				actor.setPosition3D(cc.math.vec3(PX, PY, PZ));
				
				var RX = data.readFloat();
				var RY = data.readFloat();
				var RZ = data.readFloat();
				actor.setRotation3D(cc.math.vec3(RX, RY, RZ));
				
				
				var SX = data.readFloat(); 
				var SY = data.readFloat();
				var SZ = data.readFloat();
				actor.setScaleX(SX);
				actor.setScaleY(SY);
				actor.setScaleZ(SZ);
				
				this.addChild(actor);
			}else if(type == BackGround3D_const.TYPE_Node3D){
				var name = data.readUtf();
				var node = new cc.Node();
				node.setName(name);
				var flag = data.readInt();
				node.setCameraMask(flag);
				var tag = data.readInt();
				node.setTag(tag);
				
				
				var PX = data.readFloat();
				var PY = data.readFloat();
				var PZ = data.readFloat();
				node.setPosition3D(cc.math.vec3(PX, PY, PZ));

				var RX = data.readFloat();
				var RY = data.readFloat();
				var RZ = data.readFloat();
				node.setRotation3D(cc.math.vec3(RX, RY, RZ));


				var SX = data.readFloat(); 
				var SY = data.readFloat();
				var SZ = data.readFloat();
				node.setScaleX(SX);
				node.setScaleY(SY);
				node.setScaleZ(SZ);
				this.addChild(node);
			}
			
//			cc.log(data.readUtf());
//			cc.log(data.readBool());
//			cc.log(data.readUtf());
//			cc.log(data.readInt());
//			cc.log(data.readInt());
//			cc.log(data.readFloat());
//			cc.log(data.readFloat());
//			cc.log(data.readFloat());
//			cc.log(data.readBool());
//			cc.log(data.readUtf());
//			cc.log(data.readInt());
//			cc.log(data.readUtf());

		}

//		var endY = cc.log(data.readInt());

	},
});