// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//import iView from 'iview';
//import 'iview/dist/styles/iview.css';    // 使用 CSS
import App from './App'
import VueResource from 'vue-resource'
import {post,fetch,patch,put} from './api/http'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

Vue.config.productionTip = false

Vue.use(MintUI)
//Vue.use(iView);
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
//判断token是否过期
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.config.debug=true;

const routes=[
    {path:'/',name:'index',component:resolve=>require(['./view/index/index.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',
      showNav:true
    }},
     {path:'/test',name:'test',component:resolve=>require(['./view/zsjm/test.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',
      showNav:true
    }},
    {path:'/index',name:'index',component:resolve=>require(['./view/index/index.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',
      showNav:true
    }},
    {path:'/knowledge',name:'knowledge',component:resolve=>require(['./view/index/knowledge.vue'],resolve),meta: {
    	keepAlive: true, // 需要被缓存
        title:'老顽固',//基装知识
        showNav:true
    }},
    {path:'/knowledge_del',name:'knowledge_del',component:resolve=>require(['./view/index/knowledge_del.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',
      showNav:true
    }},
    {path:'/video',name:'/video',component:resolve=>require(['./view/index/video.vue'],resolve),meta: {
    	keepAlive: true, // 需要被缓存
      title:'老顽固',//视频
      showNav:true
    }},
    {path:'/video_del',name:'/video_del',component:resolve=>require(['./view/index/video_del.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',
      showNav:true
    }},
    {path:'/product',name:'/product',component:resolve=>require(['./view/product/product.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//产品
      showNav:true
    }},
    {path:'/product_del',name:'/product_del',component:resolve=>require(['./view/product/product_del.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//产品
      showNav:true
    }},
    {path:'/case',name:'/case',component:resolve=>require(['./view/cases/case.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//案例
      showNav:true
    }},
    {path:'/case_del',name:'/case_del',component:resolve=>require(['./view/cases/case_del.vue'],resolve),meta: {
      keepAlive: false, // 需要被缓存
      title:'老顽固',//案例详情
      showNav:true
    }},
    {path:'/zsjm',name:'/zsjm',component:resolve=>require(['./view/zsjm/zsjm.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//招商加盟
      showNav:true
    }},
	{path:'/me',name:'/me',component:resolve=>require(['./view/me/me.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//企业简介
      showNav:true
    }},
    {path:'/call_me',name:'/call_me',component:resolve=>require(['./view/me/call_me.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//联系我们
      showNav:true
    }},
	{path:'/cooperation',name:'/cooperation',component:resolve=>require(['./view/me/cooperation.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//合作伙伴
      showNav:true
    }},
    {path:'/plan',name:'/plan',component:resolve=>require(['./view/index/plan.vue'],resolve),meta: {
    	keepAlive: false, // 需要被缓存
      title:'老顽固',//解决方案
      showNav:true
    }},
	]


/*路由配置 结束,加mode: 'history'，是为了去掉url中的#，因为涉及到微信支付授权目录，#号后面的地址会被微信给截掉*/
const router=new VueRouter({
	routes,
  	hashbang: true,
	scrollBehavior (to, from, savedPosition) {//滚动条到顶部
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})
//页面跳转后滚动条到顶部
router.afterEach((to,from,next) => {
	/* 路由发生变化修改页面title */
	  if (to.meta.title) {
	    document.title = to.meta.title
	  }
    window.scrollTo(0,0);
});
Vue.filter('discount', function(value) {
		return value.toFixed(2);
});
Vue.filter('fmick', function(value) {
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - value*1000;
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
	var minC =diffValue/minute;
	var result=""
	if(monthC>=1){
		result="" + parseInt(monthC) + "月前";
	}
	else if(weekC>=1){
		result="" + parseInt(weekC) + "周前";
	}
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟前";
	}else
	result="刚刚";
	return result;
});
//图片加地址域名

Vue.filter('imgUrl', function(value) {
    return 'http://www.thyssennius.com'+value;
});

//转时间
Vue.filter('time', function(value) {
    var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate()<10?'0'+(date.getDate()) : date.getDate() ) + ' ';
    return Y+M+D;
});
//转时间分秒
Vue.filter('times', function(value) {
   var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate()<10?'0'+(date.getDate()) : date.getDate() ) + ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours())+':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y+M+D+h+m+s;
});

//--底部
//Vue.component('vue-footer', {
//	props: ['index'],
//  template:'<footer>'+
//				'<a :class="{selected:index==1}" :href="lurl1"><img v-if="index==1" src="../img/icon1s.png"/><img v-else src="../img/icon1.png"/>签到</a>'+
//				'<a :class="{selected:index==2}" :href="lurl2"><img v-if="index==2" style="width:17%;" src="../img/icon2s.png"/><img v-else src="../img/icon2.png"/>排行榜</a>'+
//				'<a :class="{selected:index==3}" :href="lurl3"><img v-if="index==3" src="../img/icon3s.png"/><img v-else src="../img/icon3.png"/>我的</a>'+
//			'</footer>',
//	data:function(){
//		return {
//			lurl1:window_url+"signin_y.html",
//			lurl2:window_url+"rank.html",
//			lurl3:window_url+"user.html",
//		}
//	}
//})


const app=new Vue({
	router:router,
	render:h=>h(App)
}).$mount('#app')

/* eslint-disable no-new */

