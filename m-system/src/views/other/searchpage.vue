<template>
  
    <!-- 输入框组件，用于输入违约客户名称并查询 -->
    <el-input
      class="search"
      v-model="input"
      style="width: 300px"
      placeholder="请输入举报人名称，点击回车键查询"
      clearable
      @keyup.enter="SendData(input)"
    >
    </el-input>
    <h2>查询结果</h2>
    
    <div class="table-container">
      <!-- 表格组件，用于展示查询到的违约客户信息 -->
       <div>

       
      <el-table
        :data="tableData"
        style="width: 100%"
        height="250"
        stripe="true"
      >
        <el-table-column
          fixed
          prop="defaulter_name"
          label="违约客户"
          width="200"
        />
        <el-table-column prop="state" label="审核状态" width="200" />
        <el-table-column
          prop="default_reason"
          label="认定违约原因"
          width="200"
        />
        <el-table-column prop="cat" label="申请类型" width="200" />
        <el-table-column prop="default_level" label="严重程度" width="200" />
        <el-table-column prop="time" label="认定申请时间" width="200" />
        <el-table-column prop="if_default" label="最新外部等级" width="200" />
      </el-table>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ta } from "element-plus/es/locales.mjs";

export default defineComponent({
  name: "Search",
  setup() {
    const input = ref("");
    let tableData = ref([
      {
        time: "1",
        cat: "1",
        defaulter_name: "1",
        default_reason: "1",
        default_level: "1",
        if_default: "1",
        state: "1",
      },
    ]);

    // 发送数据函数，用于向后台发送查询请求
    function SendData(input: string) {
      axios
        .post("http://10.249.105.115:8080/search", {
          user_name: input,
        })
        .then(function (response) {
          if (response.data.status === "failed") {
            alert("无查询结果");
          } else {
            tableData.value = response.data; // 正确地声明和赋值
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return {
      input,
      tableData,
      SendData,
    };
  },
});
</script>

<style scoped>
.container {
  position: relative;
}
.search {
  position: absolute;
  left: 198px;
  top: 230px;
}
.table-container {
  display: flex;
  justify-content: flex-start; /* 使内容靠左 */
  width: 100%; /* 确保容器宽度占满父容器 */
}
</style>
