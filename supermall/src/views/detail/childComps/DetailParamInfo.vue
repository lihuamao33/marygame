<template>
<!-- 展示详情页商品参数部分 -->
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
      <!-- 搜索获取来的数据中paramInfo.sizes内容，尺码表 -->
      <table class="info-size"
             v-for="(table, index) in paramInfo.sizes"
             :key="index">
          <tr v-for="(tr, indey) in table" :key="indey">
              <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
          </tr>
      </table>
      <!-- 搜索获取来的数据中paramInfo.infos内容，衣服属性 -->
      <table class="info-param">
          <tr v-for="(info, index) in paramInfo.infos" :key="index">
              <td class="info-param-key">{{info.key}}</td>
              <td class="param-value">{{info.value}}</td>
          </tr>
      </table>
      <!-- 搜索获取来的数据中paramInfo.image内容，动态展示对应图片 -->
      <div class="info-img" v-if="paramInfo.image.length !== 0">
        <img :src="paramInfo.image" alt="">
      </div>
  </div>
</template>
<script>
export default {
  name: 'DetailParamInfo',
  props: {
      paramInfo: {
          type: Object
      }
  },
  data () {
   return {}
  },
   methods:{}
}
</script>
<style scoped>
.param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
}
.param-info table {
    width: 100%;
    border-collapse: collapse;/* 设置表格合并边框模型，collapse边框会合并为一个单一的边框 */
}
.param-info table tr {
    height: 42px;/* 表格行高为42px */
}
.param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);/* 设置每个格底部边框颜色 */
}
.info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
}
/* 属性表上部加粗加颜色 */
.info-param {
    border-top: 1px solid rgba(0,0,0,.1);
}
/* 让属性值为红色 */
.param-value {
    color: #eb4868;
}
.info-img img {
    width: 100%;
}
</style>