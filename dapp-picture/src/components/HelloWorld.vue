<template>
  <div class="hello">
    <button @click="changeMode">change</button>
    <div v-if="mode == 0">
      <form action="/uploadImg" method="post" enctype="multipart/form-data">
        <h2>单图上传</h2>
        <input type="text" placeholder="相册地址" name="address">
        <input type="file" name="img">
        <input type="submit" value="提交">
      </form>
    </div>
    <div v-else>
      <img id="imgBox" src="../assets/logo.png" alt="imgBox">
      <form action="/downloadImg" method="get" enctype="multipart/form-data">
        <input type="text" placeholder="相册地址" name="address">
        <input type="number" placeholder="图片序号" name="seq">
        <input type="submit" value="获取">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
    this.mode = 0;
  },
  data(){
    return {
      mode: true
    }
  },
  methods:{
    changeMode:function() {
      this.mode = !this.mode;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
