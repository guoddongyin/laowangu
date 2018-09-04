<template>
    <div class="big_boxs">
		<div class="main" style="position: relative">
			<div class="nav" style="position: absolute;top: -30px;right: 0;">
				<span  style="color: #ffffff">您当前的位置：</span>
				<router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
				<router-link :to="{path:'/zsjm'}" style="color: #188ecf">招商加盟</router-link>
			</div>
     		<div class="mian_box">
     			<div class="main_cotent">
 					<div class="zj_left">
 						<div class="form_box">
 							<p class="form_title">在线加盟</p>
 							<div class="inputs">
 								<input v-model="join_name" type="text" placeholder="填写您的姓名"/>
 								<input v-model="mobile" type="text" placeholder="填写您的联系方式"/>
 							</div>
 							<div class="inputs">
 								<input v-model="address" style="width: 100%;" type="" placeholder="填写您的住址"/>
 							</div>
 							<div class="inputs texts">
 								<textarea  v-model="content" name="" rows="" cols="" placeholder="填写留言内容"></textarea>
 							</div>
 							<div class="inputs" style="text-align: center;margin-bottom: 0;">
 								<span @click="gejoinOrder">提交</span>
 								<span @click="hide_data()">取消</span>
 							</div>
 						</div>
 						<div class="info_box">
 							<div class="info1">
 								<p class="info_title">加盟条件（开店要求）</p>
 								<div>
 									1.自有建材门市或建材超市。2.熟悉并了
									解建材行业。3.诚信共赢的经营理念。
									4.有泥瓦匠、建筑公司、装饰公司等客户
									资源。
 								</div>
 							</div>
 							<div class="info1">
 								<p class="info_title">招商热线（全国统一）</p>
 								<p>联系电话：400-6700-189</p>
 								<p>地址：重庆市江津区珞璜工业园B区云港大道10号</p>
 							</div>
 						</div>
 					</div>
 					<div class="zj_right">
 						<div v-html="list"></div>
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
          join_name:'',
          mobile:'',
          address:'',
          content:'',
          list:'',//企业示例
      }
    },
    mounted(){
		this.get_height()
		this.getsl()
    },
    methods: {
    	//取消键
    	hide_data(){
    		this.join_name=''
    		this.mobile=''
    		this.address=''
    		this.content=''
    	},
     	get_height(){
    		$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.main_cotent').css('height',$('.main').height()+'px')
    		$('.navigators>li').removeClass('selected')
    		$('.navigators>li').eq(4).addClass('selected')
    		$('.zj_right').css('height',$('.zj_left').height()+'px')
    	},
    	getsl(){
    		var self=this
    		AjaxCon({  
	            url:'/api/index/enterpriseStrength',
	            method:'Get',
	            data:{},
	            success: function (data) {
	            	if(data.code==1){
	            		self.list=data.data
	            		self.$nextTick(()=>{
	            			$('.zj_right img').css('max-width','100%')
	            			$('.zj_right img').css('display','block')
	            			$('.zj_right img').css('margin','0 auto')
	            		})
	            	}
	            }
	       });
    	},
        gejoinOrder() {//请求产品列表
            var that=this;
            if(!that.join_name){
                Toast({
                    message:'请输入姓名！',
                    position: 'middle',
                    duration: 2000
                });
                return '';
            }
            if(!that.mobile){
                Toast({
                    message:'请输入手机号！',
                    position: 'middle',
                    duration: 2000
                });
                return '';
            }
            var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!myreg.test(that.mobile)) {
                Toast({
                    message:'填输入正确手机号！',
                    position: 'middle',
                    duration: 2000
                });
                return '';
            }
            if(!that.address){
                Toast({
                    message:'请输入地址！',
                    position: 'middle',
                    duration: 2000
                });
                return '';
            }
            if(!that.content){
                Toast({
                    message:'请输入留言内容！',
                    position: 'middle',
                    duration: 2000
                });
                return '';
            }

            var datas={
                join_name:that.join_name,
                mobile:that.mobile,
                address:that.address,
                content:that.content
            }
            that.$post('api/join/joinOrder',datas)
                .then((response) => {
                    if (response.code == 1) {
                        Toast({
                            message:'提交成功！',
                            position: 'middle',
                            duration: 2000
                        });
                        that.hide_data()
                    } else {
                        Toast({
                            message: response.msg,
                            position: 'middle',
                            duration: 2000
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
	.mian_box{
		background: rgba(255,255,255,0.2);
	}
	.main_more{
		width: 100%;
		height: auto;
		overflow: hidden;	
	}
	.main_cotent{
		/*overflow-y: hidden !important;*/
	}
	.zj_left{
		height: auto;
		width: 58%;
		float: left;
	}
	.zj_right{
		height: auto;
		width: 40%;
		background: #fff;
		float: right;
		overflow: auto;
	}
	.zj_right::-webkit-scrollbar{  
	    width:4px;  
	    height:4px;  
	}  
	.zj_right::-webkit-scrollbar-track{  
	    background: #f6f6f6;  
	    border-radius:2px;  
	}  
	.zj_right::-webkit-scrollbar-thumb{  
	    background: #008cd6;  
	    border-radius:2px;  
	}  
	.zj_right::-webkit-scrollbar-thumb:hover{  
	    background: #747474;  
	}  
	.zj_right::-webkit-scrollbar-corner{  
	    background: #f6f6f6;  
	} 
	.form_box{
		width: 100%;
		height: auto;
		background: #fff;
		padding: 20px;
		.form_title{
			font-size: 20px;
			font-weight: 600;
			margin-bottom: 10px;
		}
		.inputs{
			width: 100%;
			height: 50px;
			margin-bottom: 20px;
			line-height: 50px;
			input{
				float: left;
				width: 48.5%;
				height: 50px;
				font-size: 18px;
				border:1px solid #d6d6d6;
				border-radius: 5px;
				padding-left: 20px;	
			}
			input:nth-child(2){
				float: right;
			}
			span{
				width: 35%;
				height: 50px;
				line-height: 50px;
				display: inline-block;
				text-align: center;
				margin: 0 20px;
				border-radius: 3px;
			}
			span:nth-child(1){
				background: #008cd6;
				color:#fff;
			}
			span:nth-child(2){
				color: #008cd6;
				border:1px solid #008cd6;
			}
		}
		.texts{
			height: 100px;
			textarea{
				display: inline-block;
				width: 100%;
				height: 100%;
				border:1px solid #d6d6d6;
				border-radius: 5px;
				padding: 20px;
				font-size: 18px;
			}
		}
	}
	.info_box{
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		div.info1{
			width: 48.5%;
			float: left;
			color:#666;
			height: 155px;
			background: #fff;
			padding: 20px 20px 0px 20px;
			.info_title{
				font-size: 20px;
				font-weight: 600;
				color:#333;
			}
			p,div{
				line-height: 1.8;
			}
		}
		div:nth-child(2){
			float: right;
		}
	}
	
</style>