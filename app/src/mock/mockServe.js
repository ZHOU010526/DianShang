//先引入mockjs模块
import Mock from 'mockjs';
//把JSON数据格式引进来(不用对外暴露)
//webpack默认对外暴露的有图片、JSON
import banner from './banner.json';//轮播图
import floor from './floor.json';//家用电器

//模拟接口假的数据
//mock数据：第一个参数请求地址 第二个参数请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大的轮播图数据
Mock.mock("/mock/floor",{code:200,data:floor});