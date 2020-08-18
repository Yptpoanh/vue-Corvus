<template>
    <div class="header">

        <div class="header-logo">Logo</div>

        <!-- right menu-->
        <div class="header-right-menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="2">处理中心</el-menu-item>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <!--icon头像-->
                        <el-avatar :src="usericon"></el-avatar>
                        {{username}}
                    </template>
                    <el-menu-item index="2-1">账号信息</el-menu-item>
                    <el-menu-item index="2-2">退出</el-menu-item>
<!--                    <el-submenu index="2-4">-->
<!--                        <template slot="title">测试</template>-->
<!--                        <el-menu-item index="2-4-1">测试1</el-menu-item>-->
<!--                        <el-menu-item index="2-4-2">测试2</el-menu-item>-->
<!--                        <el-menu-item index="2-4-3">测试3</el-menu-item>-->
<!--                    </el-submenu>-->
                </el-submenu>
            </el-menu>
        </div>

    </div>



</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                username:'岳巍',
                usericon:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            };
       },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .demo-type{
        width: auto;
        padding: 0;
        margin: 0;
    }
    .header{
        display: flex;
        justify-content: space-between;
    }
    .header-logo{
        width: 10vw;
    }
    .header-right-menu{
        width: auto;
        display: flex;
    }
</style>