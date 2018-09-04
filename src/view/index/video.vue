<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/video'}" style="color: #188ecf">视频中心</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<p class="mian_title" @click="()=>{this.$router.push({path:'index',query:{}})}">视频中心</p>
     				<div class="main_more" >
     					<div v-for="item in videoList" class="one_box" @click="gotoinfo(item.id)">

							<img :src="item.videoCoverimage" alt="">
     						<p>{{item.title}}</p>
     					</div>

     				</div>
     			</div>
     		</div>
     	</div>
    </div>
</template>

<script>
  var slider=null;

  import { Toast } from 'mint-ui';
  export default {
    name: "index",
    data() {
      return {
          videoList:[]
      }
    },
    mounted(){
		this.get_height()
		this.gevideoList();
    },
    methods: {
        gotoinfo(id){
            let that=this;
            if(id){
                that.$router.push({path: 'video_del',query:{void:id}})//跳转到详情
            }
        },

     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    	},
        gevideoList() {//请求用户数据个人统计
			var datas={
			    page:1,
				size:10
			}
			var that=this;
            that.$fetch('api/video/videoList',datas)
                .then((response) => {
                    if (response.code == 1) {

                        that.videoList = response.data.data;
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
	video{
		height: 100%;
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
			margin-bottom: 40px;
			overflow: hidden;
			img{
				width: 100%;
				margin-bottom: 30px;
			}
			p{
				font-size: 18px;
			}
		}
		.one_box:nth-child(4n+1){
			margin-left: 0;
		}
	}
</style>