<!--
    耦合度太高
    做的太弱了
    后期需要改掉这块内容
    降低耦合后封装
-->
<template>
    <div class="menu">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="auto">
                    <Aside @change="handleLetterClick" @menuNavto="handleNewTabsChange"></Aside>
                </el-aside>
                <el-container>
                    <el-main>
                        <Main ref="main">
                            {{newTabs}}
                        </Main>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    .menu{
        overflow: hidden;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>

<script>
    import Aside from "./components/Aside";
    import Header from "./components/Header"
    import Main from "./components/Main"
    export default {
        name: "index",
        data(){
            return {
                newTabs: {}
            }
        },
        components: {
            Aside,
            Header,
            Main
        },
        methods: {
            handleLetterClick(letter){
                // console.log(letter)
            },
            handleNewTabsChange(pagename,pageUrl){
                var newTabs={}
                newTabs.pageUrl = pageUrl;
                newTabs.pagename = pagename;
                // console.log(JSON.stringify(newTabs))
                this.newTabs = newTabs;
            }
        },
        watch: {
            newTabs(val,oldValue){
                // 发生改变后应新增tabs
                // console.log("newTabs: "+val, oldValue);
                this.$refs.main.addTab(val.pagename,val.pageUrl);

            }
        }
    };
</script>