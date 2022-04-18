<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Carousel",
  props:['list'],
   watch:{
        list:{
            immediate:true,//立即监听：不管数据有没有变化
            handler(){
                //watch监听不到list的变化（因为数据是父亲给的,没发生变化）
                // console.log("我在监听Floor组件中的数据");
                //监听数据已经有了，但v-for动态渲染结构没办法确定，所以需要用到nextTick
                this.$nextTick(()=>{
        var mySwiper=new Swiper(this.$refs.cur,{
        loop:true,//循环轮播
        pagination:{
            el:'.swiper-pagination',//点
            clickable:true//点小球也可切换
        },
        navigation:{
            nextEl:'.swiper-button-next',//左右切换
            prevEl:'.swiper-button-prev',
        },
    });
                });
            }
        }
    }
};
</script>

<style>
</style>