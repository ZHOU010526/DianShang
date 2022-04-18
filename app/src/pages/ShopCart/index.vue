<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1"
            @click="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
         
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData();
    },
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList||[];
      },
      //计算加购总价
       totalPrice(){
         let sum=0;
         this.cartInfoList.forEach(item => {
           sum+=item.skuNum*item.skuPrice;
         });
         return sum;
       },
      // 判断是否全选
       isAllChecked(){
         return this.cartInfoList.every(item=>item.isChecked==1);
       }
    },
    methods:{
      //获取个人购物车的数据,但是服务器不知道你是谁 npm install uuid,依赖包里有
      getData(){
        this.$store.dispatch('getCartList');
      },
      // 结算页面修改个数
       //用户点的过快，节流
      handler:throttle(async function(type,disNum,cart){
        //type为了区分这三个元素
        // disNum变化量
        //cart哪一个产品身上有id
        // console.log(type,disNum,cart);
        //最终的目的是向服务器发请求修改产品个数
        switch(type){
          //加号
          case 'add':
            //带给服务器变化的量
            disNum=1;
            break;
            case 'minus':
              //判断产品的个数大于一，才能传给服务器-1
              if(cart.skuNum>1){
                disNum=-1;
              }else{
                //产品的个数小于等于1
                disNum=0;
              }
              // disNum=cart.skuNum>1?-1:0;
              break;
              case 'change':
                //输入非法
                if(isNaN(disNum)||disNum<1){
                  disNum=0;//发给服务器为0
                }else{
                  disNum=parseInt(disNum)-cart.skuNum;
                }
                break;
                // disNum=(isNaN(s=disNum)||disNum<1)?0:parseInt(disNum)-cart.skuNum;
        }
        // console.log(disNum);
        // 派发action
        try {
          //代表的是修改成功
          await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum});
          //修改成功后再给服务器发请求,就不用刷新后数据再改变
          this.getData();
        } catch (error) {  
        }
      },20),
     deleteCartById(cart){
        try {
          this.$store.dispatch('deleteCartListBySkuId',cart.skuId);
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      //改变选中状态
      async updateChecked(cart,event){
        //带给服务器的应该是0或1，而不是true，false
        // console.log(event.target.checked);//boolean
        try {
          let isChecked=event.target.checked?"1":"0";
        await this.$store.dispatch('updateCheckedById',{skuId:cart.skuId,isChecked});
        this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      //删除全部选中的产品
      async deleteAllCheckedCart(){
        try {
          await this.$store.dispatch("deleteAllCheckedCart");
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      //修改全部选中产品的状态
      async updateAllCartChecked(event){
        // alert(123);
        try {
           let isChecked=event.target.checked?"1":"0";
        // console.log(isChecked);
        //派发action
        await this.$store.dispatch("updateAllCartIsChecked",isChecked);
        this.getData();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>