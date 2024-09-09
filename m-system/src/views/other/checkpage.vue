<template>
  <div class="mb-4">
    <el-button @click="enableRadio">编辑</el-button>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="250"
    stripe="true"
    class="table"
  >
    <el-table-column fixed prop="defaulter_name" label="举报对象" width="150" />
    <el-table-column prop="time" label="认定申请时间" width="120" />
    <el-table-column prop="cat" label="申请类型" width="120" />
    <el-table-column prop="user_name" label="申请人" width="120" />
    <el-table-column prop="default_name" label="申请原因" width="120" />
    <el-table-column prop="default_level" label="违约严重性" width="120" />
    <el-table-column prop="notes" label="备注" width="120" />
    <el-table-column prop="real" label="是否属实" width="120" />
    <el-table-column label="选择">
      <template #default="scope">
        <el-radio-group
          v-model="radios[scope.$index]"
          class="mb-2 ml-4"
          :disabled="isDisabled"
        >
          <el-radio value="通过" size="large">通过</el-radio>
          <el-radio value="不通过" size="large">不通过</el-radio>
        </el-radio-group>
      </template>
    </el-table-column>
  </el-table>
  <div class="mb-5">
    <el-button type="提交" @click="disableRadios">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from "axios";

// 初始化数据
let tableData = reactive([
  {
    defaulter_name: "举报对象",
    time: "认定申请时间",
    cat: "申请类型",
    user_name: "申请人",
    id: 123,
    default_name: "申请原因",
    default_level: "违约严重性",
    notes: "备注",
    real: "9",
    choice: "未审批",
  },
]);

const radios = ref(Array.from({ length: tableData.length }));
const isDisabled = ref(false);

// 禁用单选按钮并提交数据到服务器
const disableRadios = () => {
  isDisabled.value = true;
  tableData.forEach((item, index) => {
    item.choice =
      radios.value[index] == undefined
        ? "未选择"
        : radios.value[index].toString();
  });
  console.log(tableData);
  const data = tableData.map((item) => ({
        "cat": item.cat,
        "id": item.id,
        "state": item.choice
      }))
      console.log(data);
  axios
    .post("http://10.249.105.115:8080/checkapply", 
      data
    )
    .then(function (response) {
      // console.log(11111111);
      // console.log(response);
      const status = response.data.status; // 正确地声明和赋值
      if (status === "failed") {
        alert("后台出现问题");
      }else {
        alert("提交成功！")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// 启用单选按钮并从服务器获取数据
const enableRadio = () => {
  isDisabled.value = false;
  axios
    .post("http://10.249.105.115:8080/sendapply", {
      request: "request",
    })
    .then(function (response) {
      // console.log(11111111);
      // console.log(response);
      if (response.data.status === "failed") {
        alert("后台出现问题");
      } else {
        Object.assign(tableData, response.data); // 更新数据
        
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<style scoped>
.mb-4 {
  position: absolute;
  right: 100px;
  z-index: 2;
  
}
.mb-5 {
  position: absolute;
  right: 20px;
  z-index: 2;
}
.table {
  position: absolute;
  top: 100px;
}
</style>
