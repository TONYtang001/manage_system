<template>
    <div>
      <el-form ref="companyFormRef" :model="companyForm" :rules="rules" label-width="120px">
        <el-form-item label="公司ID" prop="company_id">
          <el-input v-model.number="companyForm.company_id" placeholder="请输入公司ID"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company_name">
          <el-input v-model="companyForm.company_name" placeholder="请输入公司名称" required></el-input>
        </el-form-item>
        <el-form-item label="集团ID" prop="group_id">
          <el-input v-model.number="companyForm.group_id" placeholder="请输入集团ID"></el-input>
        </el-form-item>
        <el-form-item label="是否破产" prop="brokeup">
          <el-switch v-model="companyForm.brokeup" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="地区" prop="city">
          <el-input v-model="companyForm.city" placeholder="请输入地区"></el-input>
        </el-form-item>
        <el-form-item label="行业" prop="industry">
          <el-input v-model="companyForm.industry" placeholder="请输入行业"></el-input>
        </el-form-item>
        <el-form-item label="集团主干公司？" prop="is_main_company">
          <el-switch v-model="companyForm.is_main_company" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="近六月头缺数量" prop="position_gap_num">
          <el-input-number v-model="companyForm.position_gap_num" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="消极债务置换？" prop="debt_failed">
          <el-switch v-model="companyForm.debt_failed" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="外部违约记录" prop="other_default_record">
          <el-input v-model="companyForm.other_default_record" placeholder="请输入其他机构的违约记录"></el-input>
        </el-form-item>
        <el-form-item label="撤单数量" prop="bill_failed_num">
          <el-input-number v-model="companyForm.bill_failed_num" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="外部等级" prop="if_default">
          <el-select v-model="companyForm.if_default" placeholder="请选择外部等级">
            <el-option label="违约" value="违约"></el-option>
            <el-option label="不违约" value="不违约"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  
  export default {
    data() {
      return {
        companyForm: {
          company_id: null,
          company_name: '',
          group_id: null,
          brokeup: false,
          city: '',
          industry: '',
          is_main_company: false,
          position_gap_num: 0,
          debt_failed: false,
          other_default_record: '',
          bill_failed_num: 0,
          if_default: ''
        },
        rules: {
          company_name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
          if_default: [{ required: true, message: '请选择外部等级', trigger: 'change' }]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.companyFormRef.validate(valid => {
          if (valid) {
            // 提交表单
            console.log('Form data:', this.companyForm);
            // 可以在这里调用后端接口(没api就算了，当摆设)


            ElMessage.success('提交成功');
          } else {
            ElMessage.error('表单验证失败');
          }
        });
      },
      resetForm() {
        this.$refs.companyFormRef.resetFields();
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加一些样式以美化表单 */
  .el-form-item {
    margin-bottom: 15px;
  }
  </style>