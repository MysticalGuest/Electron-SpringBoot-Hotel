/*!
 * js-login.js
 * Create by MysticalGuest
 * https://github.com/MysticalGuest
 */

// ---------------------------//
//      FUNCTION CODE        //
// ---------------------------//
/**
 * 前端验证函数
 */
// function validateLimit(){

// jquery.validate表单验证
$(document).ready(function(){
	//登陆表单验证
	// $("#loginForm").validate({
	// 	rules:{
	// 		AdmId:{
	// 			required:true,			//必填
	// 			minlength:3, 			//最少3个字符
	// 			maxlength:32,			//最多32个字符
	// 			// 使用ajax方法调用映射方法验证输入值
	// 			remote:{
	// 				url:"validateId",	//用户名有效性检查，别跨域调用
	// 				type:"post",
	// 			},
	// 		},
	// 		aPassword:{
	// 			required:true,
	// 			minlength:3, 
	// 			maxlength:32,
	// 			remote:{
	// 				url:"validatePassword",	//该用户的密码有效性检查，别跨域调用
	// 				type:"post",
	// 				data:{
	// 					AdmId:function() {return $("#loginForm input[name='AdmId']").val();},
	// 					aPassword:function() {return $("#loginForm input[name='aPassword']").val();}
	// 				},
	// 			},
	// 		},
	// 	},
	// 	// 错误信息提示
	// 	messages:{
	// 		AdmId:{
	// 			required:"必须填写用户名",
	// 			minlength:"用户名至少为3个字符",
	// 			maxlength:"用户名至多为32个字符",
	// 			remote: "用户名不存在",
	// 		},
	// 		aPassword:{
	// 			required:"必须填写密码",
	// 			minlength:"密码至少为3个字符",
	// 			maxlength:"密码至多为32个字符",
	// 			remote: "密码错误",
	// 		},
	// 	},

	// });
	// // 注册表单验证
	// $("#registerForm").validate({
	// 	rules:{
	// 		AdmId:{
	// 			required:true,
	// 			minlength:3,
	// 			maxlength:32,
	// 			remote:{
	// 				url:"",		//用户名重复检查，别跨域调用
	// 				type:"post",
	// 			},
	// 		},
	// 		aPassword:{
	// 			required:true,
	// 			minlength:3, 
	// 			maxlength:32,
	// 		},
	// 		confirm_password:{
	// 			required:true,
	// 			minlength:3,
	// 			equalTo:'.aPassword'
	// 		},
	// 	},
	// 	// 错误信息提示
	// 	messages:{
	// 		AdmId:{
	// 			required:"必须填写用户名",
	// 			minlength:"用户名至少为3个字符",
	// 			maxlength:"用户名至多为32个字符",
	// 			remote: "用户名已存在",
	// 		},
	// 		aPassword:{
	// 			required:"必须填写密码",
	// 			minlength:"密码至少为3个字符",
	// 			maxlength:"密码至多为32个字符",
	// 		},
	// 		confirm_password:{
	// 			required: "请再次输入密码",
	// 			minlength: "确认密码不能少于3个字符",
	// 			equalTo: "两次输入密码不一致",//与另一个元素相同
	// 		},
	// 	},
	// });
});


