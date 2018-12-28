<template>

  <div class="hello">
    <button @click="changeMode">change</button>
    <input type="text" placeholder="相册地址" name="address" v-model="photoAddress">
    <img id="imgBox" v-bind:src="ImgSrc" alt="imgBox">
    <div v-if="mode == 0">
      <div >
        <h2>单图上传</h2>
        <el-upload class="uploadfile" action="" :http-request='uploadFileMethod' :show-file-list="false" multiple>
          <el-button class="custom-btn" size="small">上传</el-button>
        </el-upload>
        <!-- <input type="text" placeholder="相册地址" name="address" >
        <input type="file" name="img">
        <button v-on:click="postImg">提交</button> -->
      </div>
    </div>
    <div v-else>
      <div>
        <input type="number" placeholder="图片序号" name="seq" v-model="seq">
        <button v-on:click="getImg">获取</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  created(){
    this.mode = 0;
  },
  data(){
    return {
      mode: true,
      img64:"", 
      filename:"",
      upLoadUrl:"/api/getImage",

      seq:"",
      photoAddress:"",
    }
  },
  computed:{
    ImgSrc:function(){
      if(this.img64 == undefined || this.img64 == ""){
        return "";
      } else {
        return this.img64;
      }
    }

  },
  methods:{
    changeMode:function() {
      this.mode = !this.mode;
      this.img64 = "";
    },
    getImg:function(options){
      this.$axios.post('/api/getImage',{
                          seq : this.seq,
                          photoAddress: this.photoAddress
                        })
                        .then(res => {
                          if(res.data.sign == true){
                            this.img64 ='data:image/bmp;base64,'+ res.data.data;
                          }else 
                            console.log(res);
                        })
                        .catch(err => {
                          console.log(err);
                        })
    },
    postImg:function(options){
      let file = options.file
      let filename = file.name
      
      var fileReader = new FileReader();

      if (file) {
        fileReader.readAsDataURL(file)
      }
      fileReader.onload = () => {
        let base64Str = fileReader.result;

        console.log(this.photoAddress);
        
        this.img64 = fileReader.result;
        console.log(this.img64);

        this.$axios.post('/api/uploadImage',{
            data: base64Str.split(',')[1],
            name: filename,
            photoAddress: this.photoAddress,
          })
          .then(res => {
            options.onSuccess(res, file)
          })
          .catch(err => {
            options.onError(err)
          })
      }
    },
    uploadFileMethod: function(param){
      this.postImg(param);
    },
    uploadSuccess(){
      this.$message({
        message: '恭喜你，上传成功',
        type: 'success'
      });
    },
    uploadError(){
      this.$message.error('上传失败，请重新上传');
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
