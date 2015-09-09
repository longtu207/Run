
function  Http(){
	var _succCallback = function(){};
	var _errCallback = function(){};

}

Http.prototype.get = function(url,callBack,errorCallBack){
	
	
	if(typeof (callBack) == "function"){
		this._succCallback = callBack;
	}else{
		this._succCallback = function(data){};
	}
	if(typeof (errorCallBack) == "function"){
		this. _errorCallBack = errorCallBack;
	}else{
		this._succCallback = function(){};
	}
	
	var xhr = cc.loader.getXMLHttpRequest();
	
	var me = this;
	
	xhr.onreadystatechange = function () {
		
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
//				cc.log("get response : "+xhr.responseText);
				me._succCallback(xhr.responseText);
			}else{
				//网络错误处理
				cc.log("xhr.status : "+xhr.status);
				if(me._errorCallBack) {
					me._errorCallBack();
				}
			}
			
		}else{
			//网络错误处理
			cc.log("readyState : "+xhr.readyState);
			if(me._errorCallBack) {
				me._errorCallBack();
			}
		}
		
		
	}
	
	// 5 seconds for timeout
	xhr.timeout = 5000;
	//set arguments with <URL>?xxx=xxx&yyy=yyy
	xhr.open("GET", url, true);
	xhr.send();
	
//	sendGetRequest: function() {
//
//		var xhr = cc.loader.getXMLHttpRequest();
//		
//		// Special event
//		xhr.onreadystatechange = function () {
//			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
//				var httpStatus = xhr.statusText;
//				var response = xhr.responseText.substring(0, 100) + "...";
//
//				cc.log("sendGetRequest response : "+httpStatus);
//				cc.log("sendGetRequest Response (100 chars):\n"+response);
//			}
//		}
//		
//		// 5 seconds for timeout
//		xhr.timeout = 5000;
//		//set arguments with <URL>?xxx=xxx&yyy=yyy
//		xhr.open("GET", "http://httpbin.org/get?show_env=1", true);
//		xhr.send();
//		
//	},
//	
//	
//	sendPostPlainText: function() {
//
//		var xhr = cc.loader.getXMLHttpRequest();
//		// Special event
//		xhr.onreadystatechange = function () {
//			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
//				var httpStatus = xhr.statusText;
//				var response = xhr.responseText.substring(0, 100) + "...";
//
//				cc.log("sendPostPlainText response : "+httpStatus);
//				cc.log("sendPostPlainText Response (100 chars):\n"+response);
//			}
//		}
//
//		xhr.open("POST", "http://httpbin.org/post");
//		//set Content-type "text/plain;charset=UTF-8" to post plain text
//		xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
//		xhr.send("plain text message");
//	},
//
//	sendPostForms: function() {
//		
//
//		var xhr = cc.loader.getXMLHttpRequest();
//		// Special event
//		xhr.onreadystatechange = function () {
//			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
//				var httpStatus = xhr.statusText;
//				var response = xhr.responseText.substring(0, 100) + "...";
//
//				cc.log("sendPostForms response : "+httpStatus);
//				cc.log("sendPostForms Response (100 chars):\n"+response);
//			}
//		}
//
//		xhr.open("POST", "http://httpbin.org/post");
//		//set Content-Type "application/x-www-form-urlencoded" to post form data
//		//mulipart/form-data for upload
//		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//		/**
//	        form : {
//	            "a" : "hello",
//	            "b" : "world"
//	        }
//		 **/
//		var args = "a=hello&b=world";
//		xhr.send(args);
//	},
	
	
};

Http.prototype.post = function(url,json,callBack,errorCallBack){


	if(typeof (callBack) == "function"){
		this._succCallback = callBack;
	}else{
		this._succCallback = function(data){};
	}
	if(typeof (errorCallBack) == "function"){
		this. _errorCallBack = errorCallBack;
	}else{
		this._succCallback = function(){};
	}

	var xhr = cc.loader.getXMLHttpRequest();

	var me = this;

	xhr.onreadystatechange = function () {

		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
//				cc.log("get response : "+xhr.responseText);
				me._succCallback(xhr.responseText);
			}else{
				//网络错误处理
				cc.log("xhr.status : "+xhr.status);
				if(me._errorCallBack) {
					me._errorCallBack();
				}
			}

		}else{
			//网络错误处理
			cc.log("readyState : "+xhr.readyState);
			if(me._errorCallBack) {
				me._errorCallBack();
			}
		}


	}

	xhr.open("POST", url);
	//set Content-Type "application/x-www-form-urlencoded" to post form data
	//mulipart/form-data for upload
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(json);
};