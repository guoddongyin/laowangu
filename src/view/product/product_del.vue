<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/product',query:{prodid:prodid}}" style="color: #ffffff">产品中心></router-link>
				<router-link :to="{path:'/product_del'}" style="color: #188ecf">产品详情</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<p class="mian_title" @click="()=>{this.$router.push({path:'product',query:{prodid:prodid}})}">
     					{{productinfo.product_title}}
     				</p>
     				<div class="main_more">
						<div class="img_box">
							<img :src="productinfo.product_image" alt="" />
						</div>
						<div class="content_box" v-html="productinfo.product_content"></div>
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
          prinfoid:'',
          productinfo:'',
          prodid:''
      }
    },
    mounted(){
		this.get_height();
        this.prinfoid=this.$route.query.prinfoid;
        this.prodid=this.$route.query.prodid
        this.getinfo();
    },
    methods: {
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		$('.content_box').css('height',$('.main').height()-140+'px')
    		$('.img_box').css('height',$('.main').height()-140+'px').css('line-height',$('.main').height()-140+'px')
    	},
        getinfo:function(){
            var that=this;
            var datas={
                id:that.prinfoid
            }
            that.$fetch('api/product/productDetailed',datas)
                .then((response) => {
                    console.log( response.data)
                    if (response.code == 1) {
                        that.productinfo = response.data;
                        that.$nextTick(()=>{
                        	 $('.content_box img').css('max-width','100%')
                        })
                       

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
	.main_cotent{
		overflow-y:hidden ;
		padding-right: 0;
	}
	.main_more{
		overflow: hidden;
		position: relative;
	}
	.mian_title{
		span{
			display: inline-block;
			width: 78%;
			text-overflow: -o-ellipsis-lastline;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  display: -webkit-box;
			  -webkit-line-clamp: 1;
			  -webkit-box-orient: vertical;
			  float: left;
		}
		b{
			font-weight: normal;
			float: right;
			font-size: 14px;
			color:#666;
			a{
				font-size: 26px;
			}
		}
	}
	.img_box{
		width: 30%;
		float: left;
		text-align: center;
		img{
			max-width: 75%;
			vertical-align: middle;
		}
	}
	.content_box{
		width: 70%;
		float: right;
		overflow: auto;
	}
	.content_box::-webkit-scrollbar{  
	    width:4px;  
	    height:4px;  
	}
	.content_box::-webkit-scrollbar-track{  
    	background: #f6f6f6;  
    	border-radius:2px;  
	}  
	.content_box::-webkit-scrollbar-thumb{  
	    background: #008cd6;  
	    border-radius:2px;  
	}  
	.content_box::-webkit-scrollbar-thumb:hover{  
	    background: #747474;  
	}  
	.content_box::-webkit-scrollbar-corner{  
	    background: #f6f6f6;  
	}    
</style>