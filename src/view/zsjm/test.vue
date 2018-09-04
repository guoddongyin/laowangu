<template>
    <div class="big_boxs" style="height: 500px;">
     	<div class="main" v-html="html">
     		
     	</div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
  export default {
    name: "index",
    data() {
      return {
          html:'',
      }
    },
    mounted(){

    	console.log(this.html)
    },
    methods: {
		
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
	
</style>