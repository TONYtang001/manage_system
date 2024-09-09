<template>
  <!-- 表单组件，用于输入和提交数据 -->
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="年份">
      <el-input v-model="this.form.year" placeholder="请输入年份" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
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
import { ref } from "vue";
export default {
  data() {
    return {
      form: {
        year: "",
        industryData: [],
      },
    };
  },
  methods: {
    industry_Change(e) {
      console.log(e);
      this.form.industry = e;
    },
    onSubmit() {
      this.form.industryData = [
        { name: "华东", value: 2 },
        { name: "东北", value: 4 },
        { name: "西北", value: 3 },
        { name: "西藏", value: 5 },
        { name: "海外", value: 8 },
      ];
      console.log(this.form.industryData);

      // 初始化图表1
      const chart1 = echarts.init(this.$refs.chart1);
      const option1 = {
        title: {
          text: this.form.year + "年行业违约主体占比",
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
          text: this.form.year + " 年行业违约主体个数",
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
