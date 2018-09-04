<template>
    <div class="big_boxs">
     	<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/case'}" style="color: #188ecf">案例展示</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<div class="main_more" >
     					<div class="one_box"  v-for="item in exampleList" @click="go_del(item.id)">
     						<img :src="item.case_image"/>
     						<p>{{item.case_title}}</p>
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
          exampleList:[]
      }
    },
    mounted(){
		this.get_height();
		this.getexampleList();
    },
    methods: {
      //跳转详情页
      go_del(id){
        this.$router.push({path:'case_del',query:{id:id}})
      },
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		console.log($('.navigators li'))
    		$('.navigators>li').removeClass('selected')
    		$('.navigators>li').eq(2).addClass('selected')
    	},
        getexampleList() {//请求案例列表
            var that=this;

            var datas={
                page:1,
                size:10,
            }
            that.$fetch('api/example/exampleList',datas)
                .then((response) => {
                    if (response.code == 1) {
                        that.exampleList = response.data;
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
			background: #fff;
			position: relative;
			margin-bottom: 20px;
			text-align: center;
			overflow: hidden;
			img{
				width: 100%;
				display: block;
			}
			p{
				text-align: left;
				padding-left: 20px;
				font-size: 18px;
				width: 100%;
				position: absolute;
				bottom: 0px;
				color:#fff;
				height: 60px;
				line-height: 60px;
				background: -webkit-linear-gradient(rgba(254,254,254,0.1), rgba(0,0,0,0.8)); /* Safari 5.1 - 6.0 */
				  background: -o-linear-gradient(rgba(254,254,254,0.1), rgba(0,0,0,0.8)); /* Opera 11.1 - 12.0 */
				  background: -moz-linear-gradient(rgba(254,254,254,0.1), rgba(0,0,0,0.8)); /* Firefox 3.6 - 15 */
				  background: linear-gradient(rgba(254,254,254,0.1), rgba(0,0,0,0.8)); /* 标准的语法 */
			}
		}
		.one_box:nth-child(4n+1){
			margin-left: 0;
		}
	}
</style>
