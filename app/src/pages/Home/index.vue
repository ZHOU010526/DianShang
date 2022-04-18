<template>
  <div>
    <!--三级联动全局组件:三级联动已经注册为全局组件，因此不需要引入-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in FloorList" :key="floor.id" :list="floor"/>
    <!-- <Floor/> -->
    <Brand/>
    <!-- <button @click="add">点我+1</button>
    <span>创库的数据{{count}}</span>
    <button>点我-1</button> -->
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

import {mapState} from 'vuex';
export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    // ...mapState(['count'])
    ...mapState({
      FloorList:state=>state.home.FloorList
    })
  },
  // methods:{
  //   add(){
  //     this.$store.dispatch('add');
  //   }
  // }
  
  //在Home组件内部发action，不能从Floor组件中派发，因为只有一个v-for
  mounted(){
    this.$store.dispatch("getFloorList");
    //登录完主页展示的是用户信息
    this.$store.dispatch("getUserInfo");
  }
}
</script>
 
<style>

</style>