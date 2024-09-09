<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="申请人">
      <el-input v-model="this.form.user_name" />
    </el-form-item>
    <el-form-item label="补充">
      <el-input v-model="this.form.notes" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        user_name: "",
        notes: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.user_name === "") {
        alert("有内容未填写完成");
        return;
      }
      console.log("submit!");
      const data = {
        user_name: this.form.user_name,
        notes: this.form.notes,
      };
      console.log(data);
      axios
        .post("http://10.249.105.115:8080/renewapply", data)
        .then((response) => {
          if (response.data === "empty") {
            alert("贵公司未违约，无法提交重生申请");
          } else if (response.data === "reject") {
            alert("该集团所有公司都违约，申请驳回");
          } else if (response.data === "failed") {
            alert("申请提交异常，请稍后重试");
          } else if (response.data === "ok") {
            alert("申请提交成功，请耐心等待审批");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
