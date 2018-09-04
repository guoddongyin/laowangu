<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/case'}" style="color: #ffffff">案例展示></router-link>
				<router-link :to="{path:'/case_del'}" style="color: #188ecf">案例展示详情</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<p class="mian_title" @click="go_top()">
     					<span>{{list.case_title}}</span>
     				</p>
     				<div class="main_more" v-html="list.case_content"></div>
            <div class="img_box">
              <img :src="list.case_image" alt="" width="100%"/>
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
			list:'',
      }
    },
    mounted(){
		this.get_height()
		this.get_del()
    },
    methods: {
    	go_top(){
    		window.history.go(-1);
    	},
    	get_del(){
    		var id = this.$route.query.id;
    		var self=this
    		AjaxCon({
	            url:'/api/example/exampleDetailed',
	            method:'Get',
	            data:{id:id},
	            success: function (data) {
	              console.log(data)
	            	if(data.code==1){
	            		self.list=data.data
	            		self.$nextTick(()=>{
	            			$('.main_more img').css('max-width','100%')
	            		})
	            	}
	            }
	       });
    	},
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    	},

    },
    created() {

    },

  }

</script>

<style lang="scss" scoped="scoped">
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
    /*.img_box img{*/
      /*width: 100%;*/
    /*}*/
	}
</style>
