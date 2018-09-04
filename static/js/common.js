
//获取url中的参数
var getUrlParam = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
};
var token=getUrlParam('token')
if(token!=undefined && token!=null && token!=''){
	localStorage.setItem('token',token);
}
//安卓手机键盘事件
$(function(){
	var oHeight = $(document).height(); //屏幕当前的高度
	$(window).resize(function(){
        if($(document).height() < oHeight){
	        $("footer").hide();
	    }else{
	        $("footer").show();
	    } 
	});
})

//正式测试跳转
//var window_url="http://jiexi.hlsxcx.com/html/"
var window_url=""
var $routerUrl ='http://web.laowangu.net'
function AjaxCon(options) {
    var defaults = {
    	url: "",
    	method:'GET',
        data: "",
        success: $.noop
    };
    var settings = $.extend(defaults, options);
    $.ajax({
    	url: $routerUrl+settings.url,
        type: settings.method,
        data: settings.data,
        success: function (data) {
//      	var datas=JSON.parse(data.Data)
            settings.success(data);
        }
    });
};
//获取url中的token
// 加载等待
var loading={  //  加载等待
  	open:function(){
  		var o = document.getElementById("loadingwrap")
  		if(o){
  			return
  		}
  		var loadHtml = '<div class="mint-indicator-wrapper" style="padding: 2.5rem;">'+
					'<span class="mint-indicator-spin">'+
						'<div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204);border-left-color: rgb(204, 204, 204);border-bottom-color: rgb(204, 204, 204);height: 2.5rem;width: 2.5rem;"></div>'+
					'</span> '+
					'<span class="mint-indicator-text" style="display:none">正在加载...</span>'+
				'</div>'+
				'<div class="mint-indicator-mask"></div>'
  		  var objE = document.createElement("div");
		  objE.setAttribute("class", "mint-indicator");
		  objE.setAttribute("id", "loadingwrap");
		  objE.innerHTML = loadHtml; 
		  var $body = document.getElementsByTagName("body")[0]
		  $body.appendChild(objE)
  	},
  	close:function(){
  		var o = document.getElementById("loadingwrap")
  		var $body = document.getElementsByTagName("body")[0]
  		if(o){
  			$body.removeChild(o)
  		}
  	}
}
var dailog = {
	Toast:function(options){
  		var defaults = {
	  		msg : '', //提示消息
				time:3500,
				vAlign:'bottom',//--垂直方向位置
				tAlign:'center'//--水平方向位置
			};
			for(var key in options){
			   defaults[key]=options[key]
			}
			var html='<div class="field-tooltipInner">'+
		             '<div class="field-tooltip fieldTipBounceIn" style="vertical-align:'+defaults.vAlign+';text-align:'+defaults.tAlign+'">'+
			         '<div class="zvalid-resultformat">'+
				     '<div class="field-invalidmsg">'+defaults.msg+'</div>'+
			         '</div>'+
		             '</div>'+
	                 '</div>';
      var objE = document.createElement("div");
		  objE.setAttribute("class", "field-tooltipWrap");
		  objE.setAttribute("id", "Toastwrap");
		  objE.innerHTML = html;   
		  var $body = document.getElementsByTagName("body")[0]
			$body.appendChild(objE)
			setTimeout(function(){
				var o = document.getElementById("Toastwrap")
				$body.removeChild(o)
			},defaults.time)
  	}
}



//获取当前日期
 function getNowFormatDate() {
        var date = new Date();
        var seperator1 = ".";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
 
//分享
//$(function(){
//	var lists=[]
//	var href=window.location.href 
//	var goodsName='孩子英语好不好，父母的英语水平真就那么重要吗？'
//	var desc='问一个问题：决定孩子英语启蒙的关键因素是什么？'
//	var imgUrl=$routerUrl+'/data/i11/attachment/defalut/share.jpg'
//	var href_url=href
//	if(href.indexOf("token")!=-1){
//		href=href.split('token')[0]
//	}
////	if(href_url.indexOf("?")!=-1){
////		href_url=href.split('?')[0]
////	}
//	console.log(href)
//	console.log(href_url)
//	AjaxCon({  
//      url:'/sendMessage/getShare',
//      method:'POST',
//      data:{
//      	url:href_url
//      },
//      success: function (data) {
//      	var datas=JSON.parse(data)
//      	loading.close()
//          if(datas.status==1){
// 				lists=datas.data
// 				console.log(lists)
// 				wx.config({
//                  debug: false,
//                  appId: lists.appId, // 必填，公众号的唯一标识
//                  timestamp: lists.timestamp, // 必填，生成签名的时间戳
//                  nonceStr: lists.nonceStr, // 必填，生成签名的随机串
//                  signature:lists.signature,// 必填，签名，见附录1
//                  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone','scanQRCode' , 'previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//	            })
// 				wx.ready(function(){
//	  				//  分享给朋友
//                  wx.onMenuShareAppMessage({
//                      title:goodsName, // 分享标题
//                      link: href, //  parentid上级id 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//                      imgUrl:imgUrl, // 分享图标
//                      desc: desc,
//                      success: function () {
//                          // 用户确认分享后执行的回调函数
//                          // alert(opts.from_id)
//                          // alert(url)
//                      },
//                      cancel: function () {
//                          // 用户取消分享后执行的回调函数
//                      }
//                  })
//                  //  分享到朋友圈
//                  wx.onMenuShareTimeline({
//                      title: goodsName, // 分享标题
//                      link:  href, //  parentid上级id 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//                      imgUrl:imgUrl , // 分享图标
//                      desc: desc,
//                      success: function () {
//                          //alert("888888成功")
//                          // 用户确认分享后执行的回调函数
//                      },
//                      cancel: function () {
//                          // 用户取消分享后执行的回调函数
//                      }
//                  })
//                  wx.onMenuShareQZone({
//						title: goodsName, // 分享标题
//						desc: desc, // 分享描述
//						link: href, // 分享链接
//						imgUrl: imgUrl, // 分享图标
//						success: function () {
//						// 用户确认分享后执行的回调函数
//						},
//						cancel: function () {
//						// 用户取消分享后执行的回调函数
//						}
//					});
//					wx.onMenuShareQQ({
//						title: goodsName, // 分享标题
//						desc: desc, // 分享描述
//						link: href, // 分享链接
//						imgUrl: imgUrl, // 分享图标
//						success: function () {
//						// 用户确认分享后执行的回调函数
//						},
//						cancel: function () {
//						// 用户取消分享后执行的回调函数
//						}
//					});
//	  			})
// 				
//          }
//      }
// });
//})
