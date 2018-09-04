<template>
    <div class="big_box_video">
     	<div class="main_cotent_video">
			<div class="video_box">
				<div class="video_s_box">
					<p class="mian_title" @click="()=>{this.$router.push({path:'video',query:{}})}">{{videoinfo.title}}</p>
					<div class="main_more" >
						<video style="height:100%" :src="videoinfo.videofile" autoplay controls></video>
                        <!--<video-player  class="video-player-box"
                                       ref="videoPlayer"
                                       :options="playerOptions"
                                       :playsinline="true"
                                       customEventName="customstatechangedeventname"
                                       @play="onPlayerPlay($event)"
                                       @pause="onPlayerPause($event)"

                                       @statechanged="playerStateChanged($event)"
                                       @ready="playerReadied">
                        </video-player>-->
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
  var slider=null;
  import { Toast } from 'mint-ui';
  import { videoPlayer } from 'vue-video-player';
  export default {
    name: "index",
      components: {
          videoPlayer
      },
    data() {
      return {
          void:'',
          videoinfo:'',
          video:'',
          playerOptions: {
              // videojs options
              muted: true,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                  type: "video/mp4",
                  src: ""
              }],
              poster: "/static/images/author.jpg",
          }
      }
    },
    mounted(){
		this.get_height();
        this.void=this.$route.query.void;
        this.getinfo()
    },
      computed: {
          player() {
              return this.$refs.videoPlayer.player
          }
      },
    methods: {
		get_height(){
			$('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
    		$('.big_box_video').css('height',$(window).height()+'px')
    		
    		if($(window).width()<1400){
    			$('.main_more').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()-180+'px')
    		}else{
    			$('.main_more').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()-240+'px')
    		}
		},
		getinfo:function(){
            var that=this;
            var datas={
                id:that.void
			}
            that.$fetch('api/video/videoDetailed',datas)
                .then((response) => {
                    console.log( response.data)
                    if (response.code == 1) {
                        that.videoinfo = response.data;
                        console.log(response.data.videofile)
                     that.playerOptions.sources[0].src=  response.data.videofile;
                        that.poster=response.data.videoCoverimage

                    } else {
                        Toast({
                            message: response.msg,
                            position: 'middle',
                            duration: 5000
                        });
                    }

                })
		},
        onPlayerPlay(player) {
            // console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        // ...player event

        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },

        // player is ready
        playerReadied(player) {
            console.log('the player is readied', player)
            // you can use it to do something...
            // player.[methods]
        }

    },
    created() {

    },

  }

</script>

<style lang="scss" scoped="scoped">
	.big_box_video{
		width: 100%;
		z-index: 9999;
		background: rgba(0,0,0,0.5);
		position: fixed;
		top:0;
		.main_cotent_video{
			width: 62.5%;
			height:auto;
			position: absolute;
			top:50%;
			left: 50%;
			transform: translate(-50%,-50%);
			-webkit-transform: translate(-50%,-50%);
			.video_box{
				width: 100%;
				padding-bottom: 58%;
				height: 0;
				background: #fff;
				text-align: center;
				div.video_s_box{
					width: 100%;
					padding: 30px;
					.mian_title{
						text-align: left;
					}
					.main_more{
						width: 75%;
						height: auto;
						overflow: hidden;
						margin: 0 auto;
						video{
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>