<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/product'}" style="color: #188ecf">产品中心</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<div class="main_more" >
     					<div class="one_box" v-for="item in productList" @click="gotoinfo(item.id)">
     						<img :src="item.product_image"/>
     						<p>{{item.product_title}}</p>
     					</div>

     				</div>
     			</div>
     		</div>
     	</div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
  export default {
    name: "index",
    data() {
      return {
          productList:[]
      }
    },
    mounted(){
		this.get_height();
		this.gevideoList();
    },
    methods: {
        gotoinfo(id){
            let that=this;
            if(id){
                that.$router.push({path: 'product_del',query:{prinfoid:id,prodid:that.$route.query.prodid}})//跳转到详情
            }
        },
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		$('.navigators>li').removeClass('selected')
    		$('.navigators>li').eq(1).addClass('selected')
    	},

        gevideoList() {//请求产品列表
            var that=this;
            var datas={
                page:1,
                size:10,
                class_id:that.$route.query.prodid
            }
            that.$fetch('api/product/productList',datas)
                .then((response) => {
                    if (response.code == 1) {

                        that.productList = response.data;
                        that.$nextTick(()=>{
                        	$('.one_box p').css('-webkit-box-orient','vertical')
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
      watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": "gevideoList"
      },
    created() {

    },
    
  }

</script>

<style lang="scss" scoped="scoped">
	.mian_box{
		background: rgba(255,255,255,0.2);
	}
	.main_more{
		width: 100%;
		height: auto;
		display: flex;
		overflow: hidden;
		flex-direction:row;
		-webkit-flex-direction:row;
		flex-wrap:wrap;
		-webkit-flex-wrap:wrap;
		display: -webkit-flex;
		.one_box{
			width: 23.68%;
			margin-left: 1.6%;
			height: auto;
			padding: 20px;
			background: #fff;
			margin-bottom: 20px;
			text-align: center;
			overflow: hidden;
			img{
				max-width: 35%;
			}
			p{
				font-size: 18px;
				text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 1;
				  -webkit-box-orient:vertical !important;
			}
		}
		.one_box:nth-child(4n+1){
			margin-left: 0;
		}
	}
</style>