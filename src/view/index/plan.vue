<template>

    <div class="big_boxs">
    	<div class="tc_box">
    		<div class="img_box">
    			<img  @click="hide_tc()" class="delete" src="../../../static/img/delete.png"/>
    			<p>{{content.title}}</p>
    			<div class="content_box">
    				<div class="fa_box" v-html="content.content"> </div>
    			</div>
    		</div>
    	</div>
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/video'}" style="color: #188ecf">解决方案</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<p class="mian_title" @click="()=>{this.$router.push({path:'index',query:{}})}">{{solutionList.solution}}</p>
     				<div class="main_more" >
     					<img class="home_fa" src="../../../static/img/home_fa.jpg"/>
     					<div v-for="item in solutionList.data" :class="'one_box'+item.id" class="one_box " @click="show_tc(item.id)">
     						<span><img :src="item.image"/></span>
     						<span>{{item.title}}</span>
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
          solutionList:[],
          content:[]
      }
    },
    mounted(){
		this.get_height()
		this.gevideoList()
    },
    methods: {
        gevideoList() {//请求解决方案列表
            var datas={
                page:1,
                size:10
            }
            var that=this;
            that.$fetch('api/solution/solutionList',datas)
                .then((response) => {
                    if (response.code == 1) {
                         console.log(response.data)
                        that.solutionList = response.data;
                    } else {
                        Toast({
                            message: response.msg,
                            position: 'middle',
                            duration: 2000
                        });
                    }

                })
        },
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		$('.img_box').css('height',$('.main').height()+20+'px')
//  		$('.navigators>li').removeClass('selected')
//  		$('.navigators>li').eq(3).addClass('selected')
    	},
		show_tc(id){
            var that=this;
            var datas={
                id:id
			}
            that.$fetch('api/solution/solutionDetailed',datas)
                .then((response) => {
                    if (response.code == 1) {
                        that.content = response.data;
                        $('.tc_box').fadeIn();
                        that.$nextTick(()=>{
                        	$('.fa_box img').css('max-width','100%')
                        })
                        
                    } else {
                        Toast({
                            message: response.msg,
                            position: 'middle',
                            duration: 2000
                        });
                    }

                })


		},
		hide_tc(){
			$('.tc_box').fadeOut()
		},
		

    },
    created() {

    },
    
  }

</script>

<style lang="scss" scoped="scoped">
	.home_fa{
		width: 86%;
		display: block;
		margin: 0 auto;
	}
	.main_more{
		position: relative;
	}
	.one_box{
		width: 200px;
		background: rgba(0,0,0,0.6);
		height: 60px;
		cursor: pointer;
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: left;
		align-items: center;
		padding: 5px;
		overflow: hidden;
		span{
			float: left;
			img{
				width: 40px;
				vertical-align: middle;
			}
		}
		span:nth-child(1){
			line-height: 60px;

		}
		span:nth-child(2){
			font-size: 16px;
			color:#fff;
			padding-top: 8px;
			margin-left: 10px;
		}
	}
	.one_box:hover{
		background: rgba(16,123,188,0.8);
		z-index: 9;
	}
	.one_box1{
		position: absolute;
		top:9%;
		right: 27%;
	}
	.one_box2{
		width: 210px;
		position: absolute;
		top:23%;
		left: 25%;

	}
	.one_box3{
		position: absolute;
		top:35%;
		left: 63.5%;
	}
	.one_box4{
		width: 220px;
		position: absolute;
		top:46%;
		left: 16.5%;

	}
	.one_box5{
		width: 185px;
		position: absolute;
		top:49%;

		left: 38%;

	}
	.one_box6{
		width: 185px;
		position: absolute;
		top:55%;
		left: 56%;

	}
	.one_box7{
		width: 185px;
		position: absolute;
		top:69%;
		left: 74%;

	}
	.one_box8{
		width: 185px;
		position: absolute;
		top:79%;
		left: 10%;

	}
	.tc_box{
		width: 100%;
		height: 100%;
		position: fixed;
		display: none;
		top:0;
		background: rgba(0,0,0,0.5);
		z-index: 100000;
		.img_box{			
			width: 62.5%;
			background: #fff;
			padding: 30px;
			padding-right: 0;
			position: absolute;
			top:50%;
			left: 50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
			.content_box{
				height: 85%;
				padding-right: 30px;
				overflow-y: auto;
				overflow-x: hidden;
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
			p{
				font-size: 24px;
				text-align: center;
				line-height: 40px;
				margin-bottom: 20px;
			}
			img{
				width: 100%;
			}
			.delete{
				width: 50px;
				height: 50px;
				position: absolute;
				top:-25px;
				right:-25px;
				cursor: pointer;
				/*transform: translate(-50%,-50%);
				-webkit-transform: translate(-50%,-50%);*/
			}
		}
	}
	@media screen and (max-width: 1600px){
		.one_box span img{
			margin-bottom: 0 !important;
		}
		.one_box span:nth-child(2){
			padding-top: 5px;
		}
		.tc_box .img_box .delete{
			width: 35px;
			height: 35px;
			top:-17.5px;
			right:-17.5px;
		}
	}
	
</style>