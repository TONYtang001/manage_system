
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="180px">
                <!-- 要注意这里引用CommonAside组件的方法，拆分了两个字符，用中短线连接的-->
                <!-- Vue 会在模板中自动将驼峰命名法的组件名称转换为短横线命名法。这意味着 <CommonAside> 会被转换为 <common-aside>，这种转换只适用于局部注册的组件，并且只有在开发模式下启用。 -->
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from "../../components/CommonAside.vue";
import CommonHeader from "../../components/CommonHeader.vue";
export default {
    // name: 'Home',
    components: {
        CommonAside,
        CommonHeader,
    }
}
</script>

<!-- 试了一下less -->
<style lang="less" scoped>
.common-layout {
    height: 100%;
    &>.el-container {
        height: 100%;
        &>.el-aside {
            height: 100%;
            background: #545c64;
        }
        &>.el-container {
            &>.el-header {
                padding: 0%;
            }
        }
    }
}
</style>

