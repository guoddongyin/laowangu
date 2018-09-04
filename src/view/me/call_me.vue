<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/call_me'}" style="color: #188ecf">联系我们</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<p class="mian_title">联系我们</p>
     				<div class="main_more" v-html="contactUs">

     				</div>
     			</div>
     		</div>
     	</div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
  var slider=null;
  export default {
    name: "index",
    data() {
      return {
          contactUs:''
      }
    },
    mounted(){
		this.get_height()
		this.getcontactUs();
    },
    methods: {
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		$('.navigators>li').removeClass('selected')
    		$('.navigators>li').eq(5).addClass('selected')
    	},
        getcontactUs() {//请求联系我们
            var datas={

            }
            var that=this;
            that.$fetch('api/index/contactUs',datas)
                .then((response) => {
                    console.log(response.data)
                    if (response.code == 1) {

                        that.contactUs = response.data;
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

    },
    
  }

</script>

<style lang="scss" scoped="scoped">
	.mian_title{
		text-align: center;
		background: none;
	}
	.main_more{
		width: 1000px !important;
		margin: 0 auto;
		p{
			font-size: 16px;
			line-height: 2;
		}
		.name{
			color:#008cd6;
			margin-top: 20px;
			font-size: 18px;
		}
	}
	
</style>