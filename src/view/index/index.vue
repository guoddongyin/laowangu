<template>
    <div class="big_box">
		<mt-swipe :auto="3000"  ref="mtSwipe" :show-indicators="false" :continuous="true" style="height: 100%;" @change="handleChange">
			<mt-swipe-item>
				<a style="display: block;position: relative;width: 100%;height: 100%">
					<div  style="position: absolute;background-color:rgba(0,0,0,0.5);color: #ffffff;font-size: 60px;width:100%;left: 0;right: 0;margin-left: 0;top: 0;bottom: 0;display: flex">
						<div style="margin: 10% auto">高精制造 环保节能</div>
					</div>
					<img style="height: 100%;width: 100%;" src="../../../static/img/home_banner_1.jpg">
				</a>
			</mt-swipe-item>
			<mt-swipe-item>
				<a style="display: block;position: relative;width: 100%;height: 100%">
					<div  style="position: absolute;background-color:rgba(0,0,0,0.5);color: #ffffff;font-size: 60px;width:100%;left: 0;right: 0;margin-left: 0;top: 0;bottom: 0;display: flex">
						<div style="margin: 10% auto">内圣外王 顽固到底</div>
					</div>
					<img style="height: 100%;width: 100%;" src="../../../static/img/home_banner_2.jpg">
				</a>
			</mt-swipe-item>
			<mt-swipe-item>
				<a style="display: block;position: relative;width: 100%;height: 100%">
					<div  style="position: absolute;background-color:rgba(0,0,0,0.5);color: #ffffff;font-size: 60px;width:100%;left: 0;right: 0;margin-left: 0;top: 0;bottom: 0;display: flex">
						<div style="margin: 10% auto"><div>致力于成为</div> 备受用于信赖的建筑辅材企业</div>
					</div>
					<img style="height: 100%;width: 100%;" src="../../../static/img/home_banner_3.jpg">
				</a>
			</mt-swipe-item>
			<mt-swipe-item>
				<a style="display: block;position: relative;width: 100%;height: 100%">
					<div  style="position: absolute;background-color:rgba(0,0,0,0.5);color: #ffffff;font-size: 60px;width:100%;left: 0;right: 0;margin-left: 0;top: 0;bottom: 0;display: flex">
						<div style="margin: 10% auto">好装修从基础开始</div>
					</div>
					<img style="height: 100%;width: 100%;" src="../../../static/img/home_banner_4.jpg">
				</a>
			</mt-swipe-item>
		</mt-swipe>
     	<div class="swiper_btn">
     		<span><img @click="front()" src="../../../static/img/left.png"/></span>
     		<span><img @click="back()" src="../../../static/img/right.png"/></span>
     	</div>
     	<div class="main_home">
     		<div class="ul_box">
     			<div class="one_box">
     				<div @click="()=>{this.$router.push({path:'plan',query:{}})}">
     					<i></i>
     					<img src="../../../static/img/img_home1.png"/>
     					<p><span>解决方案</span> <br /><span>&gt;了解详情</span></p>
     				</div>
     			</div>
     			<div class="one_box" @click="()=>{this.$router.push({path:'knowledge',query:{articid:17}})}">
     				<div>
     					<i></i>
     					<img src="../../../static/img/img_home2.png"/>
     					<p><span>企业动态</span> <br /><span>&gt;了解详情</span></p>
     				</div>
     			</div>
     			<div class="one_box" @click="()=>{this.$router.push({path:'video',query:{}})}">
     				<div>
     					<i></i>
     					<img src="../../../static/img/img_home3.png"/>
     					<p><span>施工视频</span> <br /><span>&gt;了解详情</span></p>
     				</div>
     			</div>
     		</div>
     	</div>
    </div>
</template>

<script>
  var slider=null;
  export default {
    name: "index",
    data() {
      return {
         check_index:0,	//根据轮播图显示下一页的按钮
      }
    },
    mounted(){
		this.get_height()
    },
    methods: {
     	get_height(){
//  		$('.big_box').css('height',$(window).height()-200+'px')
    		$('.big_box').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_home').css('height',$(window).height()-200+'px')  
    		$('.navigators>li').removeClass('selected')
    		$('.navigators>li').eq(0).addClass('selected')
    	},
    	//操作轮播
	 	front(){   //前一页
            this.$refs.mtSwipe.prev();
        },
        back(){    //后一页
            this.$refs.mtSwipe.next();
        },
        handleChange(index) {
    		this.check_index=index
  		},
//		autoplay(){
//            var sw =0
//            var number = slideBox.find(".spanBox span");
//            timer = setInterval(function (){
//                sw++;
//                if(sw==number.length){sw=0};
//                number.eq(sw).trigger("click");
//            },2000);
//		}
    },
    created() {

    },
    
  }

</script>

<style lang="scss" scoped="scoped">
	.big_box{
		width: 100%;
		position: relative;
	}
	.swiper_btn{
		span{
			display: inline-block;
			width: 100px;
			height: 100px;
			transition: all 0.2s;
			position: absolute;
			top:50%;
			left: 5%;
			transform: translate(0%,-50%);
			-webkit-transform: translate(0%,-50%);
			img{
				width: 100%;
			}
		}
		span:nth-child(2){
			left: auto;
			right: 5%;
		}
	}
	.main_home{
		width: 62.5%;
		height: auto;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		.title1{
			width: 100%;
			text-align: center;
			color:#fff;
			font-size: 40px;
			font-weight: 600;
			margin-top: 144px;
		}
		.title2{
			width: 100%;
			text-align: center;
			color:#fff;
			font-size:54px;
			font-weight: bold;
		}
		.ul_box{
			width: 100%;
			position: absolute;
			bottom:50px;
			left: 50%;
			transform: translate(-50%,0%);
			-webkit-transform: translate(-50%,0%);
			height: auto;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			-webkit-justify-content: space-between;
			overflow: hidden;
			.one_box{
				width: 31.6%;
				overflow: hidden;
				cursor: pointer;
				height: auto;
				div{
					width: 100%;
					height: 0;
					position: relative;
					padding-bottom: 63.15%;
					i{
					    width: 100%;
					    height: 100%;
					    position: relative;
					    z-index: 99;
					    background: rgba(0,0,0,0.1);
					    display: inline-block;
					    padding-bottom: 63.15%;
					}
					img{
						width: 100%;
						position: absolute;
						top:50%;
						left: 50%;
						text-align: center;
						transform: translate(-50%,-50%);
						-webkit-transform: translate(-50%,-50%);
					}
					p{
						width: 100%;
						position: absolute;
						top:50%;
						left: 50%;
						text-align: center;
						transform: translate(-50%,-50%);
						-webkit-transform: translate(-50%,-50%);	
						color:#fff;
						span{
							display: inline-block;
							width: 100%;
							text-align: center;
							font-size: 14px;
						}
						span:nth-child(1){
							font-size: 24px;
							margin-bottom: 5px;
						}
					}
				}
			}
		}
	}
</style>