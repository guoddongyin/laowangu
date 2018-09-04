<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/knowledge',query:{articid:articid}}" style="color: #188ecf">企业动态</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
     				<div class="main_more" >
     					<div class="one_box" @click="go_del(item.id)" v-for="item in  articleList">
     						<div class="box_img">
     							<img :src="item.article_image"/>
     						</div>
     						<div class="box_text">
     							<p>{{item.article_title}}</p>
     							<span>{{item.article_subheading}}</span>
     							<div><b>{{item.day}}</b>{{item.createtime}}</div>
     						</div>
     					</div>
     				</div>
     				<div class="page_box">
     					<span @click="handleChange('-1')" v-if="page>3 && all_page>5" style="width: 67px;">上一页</span>
     					<!--当选择页数在后两位时显示-->
     					<span @click="handleChange(page-4)" v-if='page-4>=1 && page==all_page' :class="active_id==page-4?'active':''">{{page-4}}</span>
     					<span @click="handleChange(page-3)" v-if='page-3>=1 && (page==all_page-1 || page==all_page)' :class="active_id==page-3?'active':''">{{page-3}}</span>
     					<span @click="handleChange(page-2)" :class="active_id==page-2?'active':''" v-if="page>2">{{page-2}}</span>
     					<span @click="handleChange(page-1)" :class="active_id==page-1?'active':''" v-if="page>1">{{page-1}}</span>
     					<span @click="handleChange(page)" :class="active_id==page?'active':''">{{page}}</span>
     					<span @click="handleChange(page+1)" v-if='page+1<=all_page' :class="active_id==page+1?'active':''">{{page+1}}</span>
     					<span @click="handleChange(page+2)" v-if='page+2<=all_page' :class="active_id==page+2?'active':''">{{page+2}}</span>
     					<!--当选择页数小于3时显示-->
     					<span @click="handleChange(page+3)" v-if='page+3<=all_page && page<3' :class="active_id==page+1?'active':''">{{page+3}}</span>
     					<span @click="handleChange(page+4)" v-if='page+4<=all_page && page<2' :class="active_id==page+2?'active':''">{{page+4}}</span>
     					<span @click="handleChange('-2')" v-if="page+2<all_page && all_page>5" style="width: 67px;">下一页</span>
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
        	page:1,//页数
        	all_page:10,//总页数
        	active_id:1,//选择页数
            articid:'',
            size:3,
            articleList:[]
      }
    },
    mounted(){
		this.get_height();
		this.articid=this.$route.query.articid;
		this.gevideoList();
    },
    methods: {
    	//跳转详情页
    	go_del(id){
    		this.$router.push({path:'knowledge_del',query:{id:id,articid:this.articid}})
    	},
        gevideoList() {//请求产品列表
            var that=this;
            var datas={
                page:that.page,
                size:that.size,
                class_id:that.$route.query.articid
            }
            that.$fetch('api/article/articleList',datas)
                .then((response) => {
                    if (response.code == 1) {
                        that.articleList = response.data.data;
                        that.all_page=response.data.last_page;
                        that.active_id=response.data.current_page
                    } else {
                        Toast({
                            message: response.msg,
                            position: 'middle',
                            duration: 5000
                        });
                    }

                })
        },
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		$('.navigators>li').removeClass('selected')
    		$('.navigators>li').eq(3).addClass('selected')
    	},
        handleChange(index) {
        	if(index!=-1 && index!=-2){
        		this.active_id=index
        		this.page=index
        	}else if(index==-1){
        		this.active_id=this.active_id-1
        		this.page--
        	}else if(index==-2){
        		this.active_id=this.active_id+1
        		this.page++
        	}
        	this.gevideoList();

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
	.one_box{
		width: 100%;
		height: 140px;
		margin-bottom: 20px;
		overflow: hidden;
		.box_img{
			width: 19%;
			float: left;
			height: 100%;
			overflow: hidden;
			img{
				height: 100%;
				width: 100%;
			}
		}
		.box_text{
			width: 75%;
			height: 100%;
			padding-top: 10px;
			float: left;
			margin-left: 2%;
			p{
				font-size: 20px;
				font-weight: 600;
				text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 1;
				  -webkit-box-orient: vertical;
			}
			span{
				font-size: 14px;
				display: inline-block;
				margin-top: 10px;
				color:#666;
				text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 1;
				  -webkit-box-orient: vertical;
			}
			div{
				font-size: 14px;
				margin-top: 15px;
				width: 110px;
				text-align: left;
				height: 70px;
				line-height: 70px;
				border-top:1px solid #333;
				color:#666;
				b{
					font-size: 24px;
					font-weight: normal;
					margin-right: 10px;
				}
			}
		}
	}
	.page_box{
		width: 100%;
		height: 40px;
		overflow: hidden;
		position: absolute;
		bottom: 2rem;
		text-align: center;
		span{
			height: 40px;
			display: inline-block;
			line-height: 40px;
			cursor: pointer;
			width: 40px;
			text-align: center;
			font-size: 16px;
			border-radius: 4px;
			-webkit-border-radius: 4px;
			border:1px solid #d6d6d6;
			color:#d6d6d6;
		}
		span.active{
			color:#fff;
			background: #008cd6;
			border:0;
		}
	}
	@media screen and (max-width: 1600px){
		.one_box{
			height: 90px;
		}
		.main_more .one_box p {
		    font-size: 15px !important;
		}
		.one_box .box_text span{
			margin-top: 0 !important;
		}
		.one_box .box_text div{
			margin-top: 5px !important;
			height: 35px !important;
			line-height: 35px !important;
		}
		
	}


</style>