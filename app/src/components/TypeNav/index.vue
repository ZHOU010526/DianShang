<template>
   <div class="type-nav">
            <div class="container" @mouseleave="leaveShow">
                <h2 class="all" @mouseleave="leaveIndex"
                 @mouseenter="enterShow"
                 >全部商品分类</h2> 
                  <!-- 编程式导航 事件委派-->
                 <!-- 过渡动画 --> 
                 <transition name="sort">
                      <div class="sort" @click="goSearch" v-show="show">
                    <div class="all-sort-list2">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <!-- 声明式导航 出现卡顿-->
                                <!-- <router-link to="/search">{{c1.categoryName}}{{index}}</router-link>-->

                                <!-- 自定义属性 -->
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}{{index}}</a> 
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a> 
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a> 
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                 </transition>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>           
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex';

//这样引入是将lodash所有的函数都引入，我们应该按照需要引入
//防抖节流
// import _ from 'lodash';

import throttle from 'lodash/throttle';

export default {
name:'TypeNav',
data(){
    return{
        //存储用户鼠标移上哪一个一级分类
        currentIndex:-1,
        show:true
    }
},
//组件挂载完毕：可以向服务器发请求
mounted(){
    //通知Vuex发请求，获取数据，存储于仓库当中
    //派发action
    // this.$store.dispatch('categoryList');
   if(this.$route.path!='/home'){
       this.show=false;
   }
},
computed:{
    ...mapState({
        //这里的state是大仓库中的数据
        categoryList:(state)=>{
            console.log(state.home);
            return state.home.categoryList;
        }      
    })
},
methods:{
    // changeIndex(index){
    //     // console.log(index);
    //     this.currentIndex=index;
    //     // console.log("鼠标进入"+index);
    // },
    //节流
    changeIndex:throttle(function(index){
        this.currentIndex=index;
    },50),
    leaveIndex(){
        this.currentIndex=-1;
    },
    goSearch(event){
        // this.$router.push('/search');
        let element=event.target;
        //dataset获取自定义属性和属性值
        console.log(element.dataset);
        let {categoryname,category1id,category2id,category3id}=element.dataset;
        if(categoryname){
            let location={name:'search'};
            let query={categoryName:categoryname};
            if(category1id){
                query.category1Id=category1id;
            }else if(category2id){
                query.category2Id=category2id;
            }else{
                query.category3Id=category3id;
            }
            console.log(location,query);
            //先点三级菜单，有query，再点搜索，有params
            if(this.$route.params){
            location.params=this.$route.params;
            location.query=query;
            this.$router.push(location);
            }
           
        }
    },
    enterShow(){
        if(this.$route.path!='/home'){
            this.show=true;
        } 
    },
    leaveShow(){
        this.currentIndex=-1;
        if(this.$route.path!='/home'){
            this.show=false;
        }
    }
}
};
</script>

<style lang="less">
 .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    // .item:hover{
                    //     background:skyblue;
                    // }
                    .cur{
                        background:skyblue;
                    }
                }
            }
            //过渡动画的样式
            //开始
            .sort-enter{
                height:0px;
                transform:rotate(0deg);
            }
            //结束
            .sort-enter-to{
                height: 461px;
                transform:rotate(360deg);
            }
            //动画时间速率
            .sort-enter-active{
                transition:all .5s line;
            }
        }
    }
</style>