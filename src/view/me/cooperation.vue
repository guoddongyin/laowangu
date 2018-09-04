<template>
    <div class="big_boxs">
        <div class="main" style="position: relative">
            <div class="nav" style="position: absolute;top: -30px;right: 0;">
                <span  style="color: #ffffff">您当前的位置：</span>
                <router-link :to="{path:'/index'}"  style="color: #ffffff">首页> </router-link>
                <router-link :to="{path:'/cooperation'}" style="color: #188ecf">合作伙伴</router-link>
            </div>
            <div class="mian_box">
                <div class="main_cotent">
                    <div class="main_more">
                        <div class="one_box" v-for="item in cooperative">
                            <img :src="item.image"/>
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
                cooperative: []
            }
        },
        mounted() {
            this.get_height();
            this.getcooperativePartner();
        },
        methods: {
            get_height() {
                $('.big_boxs').css('height',$(window).height()-$('.outer-footer').height()-$('.header').height()+'px')
                $('.main_cotent').css('height', $('.main').height() + 'px')
                $('.navigators>li').removeClass('selected')
                $('.navigators>li').eq(5).addClass('selected')
            },
            getcooperativePartner() {//合作伙伴
                var datas = {
                    page: 1,
                    size: 10
                }
                var that = this;
                that.$fetch('api/index/cooperativePartner', datas)
                    .then((response) => {
                        console.log(response.data)
                        if (response.code == 1) {

                            that.cooperative = response.data.data;
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
    .mian_box {
        background: rgba(255, 255, 255, 0.2);
    }

    .main_cotent {
        padding-top: 10px !important;
    }

    .main_more {
        width: 100%;
        height: auto;
        display: flex;
        overflow: hidden;
        flex-direction: row;
        -webkit-flex-direction: row;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        display: -webkit-flex;
        .one_box {
            width: 23.68%;
            margin-left: 1.6%;
            height: auto;
            background: #fff;
            margin-top: 20px;
            text-align: center;
            overflow: hidden;
            img {
                width: 100%;
                display: inline-block;
            }

        }
        .one_box:nth-child(4n+1) {
            margin-left: 0;
        }
    }
</style>