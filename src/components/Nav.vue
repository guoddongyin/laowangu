<template>
    <div class="outer-container">
        <div class="container">
            <div class="header">
                <div class="logo-container">
                    <img @click="()=>{this.$router.push('/index');}" class="logo" src="../../static/img/logo.png">
                    <ul class="navigators">
                        <li @click="navJump('index',$event)" :class="selectedIndex===1?'selected':''">
                        	<a>首页</a>
                        </li>
                        <li @click="navJump('about',$event)" :class="selectedIndex===2?'selected':''">
                        	<a>产品中心</a>
                        	<ul>
                        		<li v-for="item in productCateList" @click="gotoprod(item.id)">{{item.name}}</li>

                        	</ul>
                        </li>
                        <li @click="navJump('case',$event)" :class="selectedIndex===3?'selected':''">
                        	<a>案例展示</a>
                        </li>
                        <li @click="navJump('honor',$event)" :class="selectedIndex===4?'selected':''">
                        	<a>企业动态</a>
                        	<ul>
                        		<li v-for="item in articleCateList" @click="gotoarticle(item.id)">{{item.name}}</li>

                        	</ul>
                        </li>
                        <li @click="navJump('zsjm',$event)" :class="selectedIndex===5?'selected':''">
                        	<a>招商加盟</a>
                        </li>
                        <li @click="navJump('contact',$event)" :class="selectedIndex===6?'selected':''">
                        	<a>关于我们</a>
                        	<ul>
                        		<li @click="()=>{this.$router.push({path:'me',query:{}})}">企业简介</li>
                        		<li @click="()=>{this.$router.push({path:'cooperation',query:{}})}">合作伙伴</li>
                        		<li @click="()=>{this.$router.push({path:'call_me',query:{}})}">联系我们</li>
                        	</ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="center-content">
                <slot name="content"></slot>
            </div>
        </div>
        <div class="outer-footer">
            <div class="footer">
                <span>重庆老顽固实业有限公司  版权所有  <b style="font-weight: normal;cursor: pointer;" @click="go_gss()">渝ICP备11003039号-1</b> <img @click="go_gsj()" style="width: 25px;cursor: pointer;" src="../../static/img/icon.png" alt="" />  技术支持：重庆瀚乐思信息技术有限公司 </span>
               <span class="ewm"><img src="../../static/img/ewm.png"/></span>
            </div>
        </div>
    </div>
</template>

<script>
//  import { unreadCount } from '../api/api'
import { Toast } from 'mint-ui';
    export default {
        name: '',
        data() {
            return {
                selectedIndex:1,
                isSearch:false,
                searchValue:'',
                productCateList:[],
                articleCateList:[],
            }
        },
        mounted(){
          this.getcooperativePartner();
          this.getarticleCateList()
          
        },
        methods: {
        	go_gss(){
				window.open("http://www.miitbeian.gov.cn");
			},
        	go_gsj(){
        		window.open("http://113.207.120.45:7010/wljyzbs/index.html?sfdm=120180530100035453224#/index.html?sfdm=120180530100035453224");
        	},
             //前去产品列表
            gotoarticle(id){
                let that=this;
                if(id){
                    that.$router.push({path: 'knowledge',query:{articid:id}})//跳转到列表
                   // location.reload();//刷新页面
                }
            },
            //前去咨询分类
            gotoprod(id){
                let that=this;
                if(id){
                    that.$router.push({path: 'product',query:{prodid:id}})//跳转到列表
                   // location.reload();
                }
            },
        	//获取屏幕高
        	
            navJump(name,event){
            	$('.navigators ul').slideUp()
              switch (name){
                case "index":this.selectedIndex=1;break;
                case "about":this.selectedIndex=2;break;
                case "case":this.selectedIndex=3;break;
                case "honor":this.selectedIndex=4;break;
                case "product":this.selectedIndex=5;break;
                case "contact":this.selectedIndex=6;break;
              }
              if(name=='about' || name=='contact' || name=='honor'){
              	console.log($(event.target)[0].tagName)
              	if($(event.target)[0].tagName=="A" ){
              		if($(event.target).next().is(":hidden")){
              			$(event.target).next().slideDown()
              		}else{
              			$(event.target).next().slideUp()
              		}
              	}else{
              		
              		if($(event.target).children('ul').is(":hidden")){
              			$(event.target).children('ul').slideDown()
              		}else{
              			$(event.target).children('ul').slideUp()
              		}
          			
              	}
              
              }else{
              	this.$router.push("/"+name);	              	
              }

            },
            getRouter(){
              switch (this.$route.path){
                case "/index":this.selectedIndex=1;break;
                case "/about":this.selectedIndex=2;break;
                case "/honor":this.selectedIndex=3;break;
                case "/case":this.selectedIndex=4;break;
                case "/product":this.selectedIndex=5;break;
                case "/contact":this.selectedIndex=6;break;
              }
            },
            getcooperativePartner() {//产品分类列表
                var datas = {
                }
                var that = this;
                that.$fetch('api/product/productCateList', datas)
                    .then((response) => {
                        console.log(response.data)
                        if (response.code == 1) {

                            that.productCateList = response.data;
                        } else {
                            Toast({
                                message: response.msg,
                                position: 'middle',
                                duration: 5000
                            });
                        }

                    })
            },
            getarticleCateList() {//资讯分类
                var datas = {
                }
                var that = this;
                that.$fetch('api/article/articleCateList', datas)
                    .then((response) => {
                        console.log(response.data)
                        if (response.code == 1) {
                            that.articleCateList = response.data;
                        } else {
                            Toast({
                                message: response.msg,
                                position: 'middle',
                                duration: 5000
                            });
                        }

                    })
            },
        },
        created() {
//          this.getRouter();
        }
    }
</script>

<style>
.navigators>li{
	position: relative;
}
.navigators ul{
	position: absolute;
	top:77px;
	left: 0;
	width: 100%;
	display: none;
	z-index: 9999;
	background: #fff;
	box-shadow: 1px 0 6px rgba(0,0,0,.12);
}
.navigators ul li{
	height: 54px;
	line-height: 54px;
	font-size: 14px;
	border-bottom: 1px solid #ededed;
	margin: 0 !important;
}
.navigators ul li:hover{
	color:#fff;
	background: #008cd6;
}
</style>
