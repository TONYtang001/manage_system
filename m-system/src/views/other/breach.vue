<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="申请人">
      <el-input v-model="this.form.user_name" />
    </el-form-item>
    <el-form-item label="被举报人">
      <el-input v-model="this.form.defaulter_name" />
    </el-form-item>
    <el-form-item label="举报原因">
      <el-select
        multiple
        @change="default_reasonChange"
        v-model="this.form.default_reason"
        placeholder="请选择你的举报原因"
      >
        <el-option
          label=" 6个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口2次以上"
          value="1"
        />
        <el-option label="6个月内因各种原因导致成交后撤单 2次以上" value="2" />
        <el-option
          label="未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）"
          value="3"
        />
        <el-option
          label="关联违约：如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成 员违约的触发条件"
          value="4"
        />
        <el-option
          label="发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金 或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期 或重组"
          value="5"
        />
        <el-option
          label="申请破产保护，发生法律接管，或者处于类似的破产保护状态"
          value="6"
        />
        <el-option
          label="在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况，逾期超过 90天等），或外部评级显示为违约级别"
          value="7"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="违约等级">
      <el-select
        @change="default_levelChange"
        v-model="this.form.default_level"
        placeholder="请选择违约严重性"
      >
        <el-option label="低" value="低" />
        <el-option label="中" value="中" />
        <el-option label="高" value="高" />
      </el-select>
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
        defaulter_name: "",
        default_reason: [],
        default_level: "",
        notes: "",
      },
    };
  },
  methods: {
    default_reasonChange(e) {
      console.log(e);
      this.form.default_reason = e;
    },
    default_levelChange(e) {
      console.log(e);
      this.form.default_level = e;
    },
    onSubmit() {
      if (
        this.form.user_name === "" ||
        this.form.defaulter_name === "" ||
        this.form.default_reason.length === 0 ||
        this.form.default_level === ""
      ) {
        alert("有内容未填写完成");
        return;
      }
      console.log("submit!");
      const data = {
        user_name: this.form.user_name,
        defaulter_name: this.form.defaulter_name,
        default_reason: this.form.default_reason,
        default_level: this.form.default_level,
        notes: this.form.notes,
      };
      console.log(data);
      axios
        .post("http://10.249.105.115:8080/defaultapply", data)
        .then((response) => {
          if (response.data === "reject") {
            
            alert("您已经被列入违约公司，无法举报");
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
