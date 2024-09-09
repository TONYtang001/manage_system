<template>
  <!-- 表单组件，用于输入和提交数据 -->
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="年份">
      <el-input v-model="this.form.year" placeholder="请输入年份" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onSubmit">生成</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <!-- 图表容器，用于显示图表1 -->
  <div ref="chart1" style="width: 600px; height: 400px"></div>
  <!-- 图表容器，用于显示图表2 -->
  <div ref="chart2" style="width: 600px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import { ref } from "vue";
export default {
  // 组件的数据模型
  data() {
    return {
      form: {
        year: "",
        industryData: []
      },
    };
  },
  // 组件的方法定义
  methods: {
    // 提交表单的方法
    onSubmit() {
      axios
        .post("http://10.249.105.115:8080/chart/industry", {year:this.form.year})
        .then((response) => {
          this.form.industryData = response.data;
          console.log(response.data);
          console.log(this.form.industryData);
        })
        .catch(function (error) {
          console.log(error);
        });
      // const testData = [
      //   { name: "行业1", value: 10 },
      //   { name: "行业2", value: 15 },
      //   { name: "行业3", value: 8 },
      //   { name: "行业4", value: 12 },
      // ];
      // console.log(testData);
      console.log(this.form.industryData);
 
      // 初始化图表1
      const chart1 = echarts.init(this.$refs.chart1);
      const option1 = {
        title: {
          text: this.form.year+"年行业违约主体占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: this.form.year + "年行业违约主体占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.form.industryData.map((item) => ({
              name: item.name,
              value: item.value,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: true,
              formatter: "{b}: {d}%",
            },
          },
        ],
      };
      chart1.setOption(option1);
 
      // 初始化图表2
      const chart2 = echarts.init(this.$refs.chart2);
      const industryData = this.form.industryData.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});
      const option2 = {
        title: {
          text: this.form.year + "年行业违约主体占比",
        },
        xAxis: {
          type: "category",
          data: this.form.industryData.map((item) => item.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.form.industryData.map((item) => item.value),
            type: "bar",
          },
        ],
      };
      chart2.setOption(option2);
    },
  },
};
</script>