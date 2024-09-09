<template>
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" :collapse-transition="false"
             active-text-color="#ffd04b">
        <img class="menu-logo" :src="getLogoSrc()" alt="Logo" />
        
        <!-- 发起申请菜单项及其子菜单 -->
        <el-sub-menu index="applypage">
            <template #title>
                <CirclePlus class="icons" />
                <span>发起申请</span>
            </template>
            <el-menu-item index="/apply/breach" @click="handleClick('/apply/breach')">
                <WarnTriangleFilled class="icons" />
                <span>违约</span>
            </el-menu-item>
            <el-menu-item index="/apply/rebirth" @click="handleClick('/apply/rebirth')">
                <Male class="icons" />
                <span>重生</span>
            </el-menu-item>
        </el-sub-menu>

        <!-- 状态查询菜单项 -->
        <el-menu-item index="/searchpage" @click="handleClick('/searchpage')">
            <ZoomIn class="icons" />
            <span>状态查询</span>
        </el-menu-item>

        <!-- 审核申请菜单项 -->
        <el-menu-item index="/checkpage" @click="handleClick('/checkpage')">
            <Edit class="icons" />
            <span>审核申请</span>
        </el-menu-item>

        <!-- 添加公司信息菜单项 -->
        <el-menu-item index="/addpage" @click="handleClick('/addpage')">
            <OfficeBuilding class="icons" />
            <span>添加公司信息</span>
        </el-menu-item>

        <!-- 违约信息图示菜单项及其子菜单 -->
        <el-sub-menu index="chart">
            <template #title>
                <TrendCharts class="icons" />
                <span>违约信息图示</span>
            </template>
            <el-menu-item index="/chart/industry" @click="handleClick('/chart/industry')">
                <Monitor class="icons" />
                <span>行业</span>
            </el-menu-item>
            <el-menu-item index="/chart/region" @click="handleClick('/chart/region')">
                <Location class="icons" />
                <span>区域</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import { useRouter } from 'vue-router';
import { CirclePlus, ZoomIn, Edit, TrendCharts, Location, Monitor } from '@element-plus/icons-vue';

export default {
    components: {
        CirclePlus,
        ZoomIn,
        Edit,
        TrendCharts
    },
    setup() {
        const router = useRouter();

        const getLogoSrc = () => {
            return new URL("../assets/logo2.png", import.meta.url).href;
        };

        const handleClick = (path) => {
            router.push(path);
        };

        return {
            getLogoSrc,
            handleClick
        };
    }
}
</script>

<style lang="less" scoped>
.menu-logo {
    margin-top: 20px;
    width: auto; /* 自动宽度 */
    height: 115px; /* 固定高度，可以根据需要调整 */
    object-fit: contain; /* 保持图片宽高比 */
    margin-bottom: 10px; /* 为图片下方添加一些空隙 */
}

.icons {
    width: 18px;
    height: 18px;
    margin-right: 4px;
}

.el-menu-vertical-demo {
    width: 100%;
    border-right: none;
}
</style>
