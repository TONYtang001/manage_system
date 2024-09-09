<template>
    <el-header>
      <div class="l-content">
        <!-- 这个button本来应该是有用途的，但是与本主体内容无关，所以去除了，只保留样式 -->
        <el-button size="small" class="homebtn" plain @click="handleClick">
          <el-icon :size="20">
            <Menu/>
          </el-icon>
        </el-button>
      </div>
      <div class="center-content">
        <h3>违约管理系统</h3>
      </div>
      <div class="r-content">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="user" :src="getImgSrc()" alt="头像" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>我的</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </template>
  
  <script>
  // vue里不推荐原生js语法了
  // document.querySelector('.homebtn').addEventListener(click, ()=>{
  //   alert('别瞎点！')
  // });
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const router = useRouter();

      const getImgSrc = () => {
        // 参考https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url
        return new URL("../assets/1.jpeg", import.meta.url).href;
      };

      const handleClick = () => {
        alert('别瞎点！')
        router.push({ path: '/' })

      };

      return {
        getImgSrc,
        handleClick,
      };
    }
  };
  </script>
  
  <style lang="less" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #333;
  }
  
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 16px;
      margin-left: 10px;
    }
    h3 {
      color: #fff;
    }
  }
  
  .center-content {
    flex: 1; /* 让中间内容占据剩余空间 */
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      color: #fff;
    }
  }
  
  .r-content {
    display: flex;
    align-items: center; /* 上下居中 */
    .el-dropdown-link {
      display: flex;
      align-items: center; /* 上下居中 */
    }
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  </style>