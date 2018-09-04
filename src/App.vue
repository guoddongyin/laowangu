<template>
 <div id="app">
 	<Navs v-if="$route.meta.showNav">
	    <keep-alive slot="content">
	    	 <router-view  v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		
		<router-view slot="content" v-if="!$route.meta.keepAlive">
		    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
		</router-view>
	</Navs>
 </div>
</template>

<script>
import Navs from './components/Nav.vue'
export default {
  name: 'app',
  components: {
            Navs
        },
  data(){
  	return{
  		url:'',//保存链接
  	}
  },
  	created:function(){

	},
 	beforeMount:function(){
  	
	},
	mounted:function(){
//		this.is_phone()
		}, 
	watch: {

        },
	
	methods:{
		is_phone(){
			var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
//              alert('检测到您是用手机访问，即将为您跳转到手机端页面');

            } else {

               //pc版
               location.href = 'http://www.thyssennius.com';
            }
		},
	},

}
</script>

<style>
/*swipe样式*/

.mint-swipe-indicator.is-active {
  background: rgb(248, 101, 56);
  width: 1.2rem;
  border-radius: 6px;
}
.mint-swipe-indicator {
  width: 0.8rem;
  height: 0.8rem;
  background: #ffffff;
  opacity: 1;
  margin:0 0.4rem;
}


</style>
