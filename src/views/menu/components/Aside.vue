<template>
    <div class="Aside">
        <!--主体Main-->
        <el-menu class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse"
                 :default-active="onRoutes"
                 :default-openeds="['2']"
        >
            <!--一级分类目录-->
            <template v-for="(items,index) in tabsJson" >
                <template v-if="items.childTabs!=null">
                    <el-submenu  :disabled="items.disabled" :index="index" :key="index" @click="menuNavto(items.pageUrl,items.name)">
                        <template slot="title">
                            <i :class="items.icon"></i>
                            <span slot="title">{{items.name}}</span>
                        </template>
                        <template v-for="(item,item_index) in items.childTabs" >
                            <template v-if="item.childTabs!=null&&item.childTabs!=''">
                                <el-submenu :index="index+'-'+item_index"  :key="item_index" @click="menuNavto(item.pageUrl,items.name)">
                                    <!--二级分类目录-->
                                    <span slot="title">{{item.name}}</span>
                                    <div v-for="(val,key) in item.childTabs" :key="key">
                                        <!--三级分类目录-->
                                        <el-menu-item :index="index+'-'+item_index+'-'+key" @click="menuNavto(val.pageUrl,val.name)">
                                            {{val.name}}
                                        </el-menu-item>
                                    </div>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item   :disabled="item.disabled" :index="index+'-'+item_index" :key="item_index" @click="menuNavto(item.pageUrl,item.name)">
                                    {{item.name}}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item   :disabled="items.disabled" :index="index" :key="index" @click="menuNavto(items.pageUrl,items.name)">
                        <i :class="items.icon"></i>
                        <span slot="title">{{items.name}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <el-button class="flod" icon="el-icon-s-unfold" @click="isCollapseFunction"></el-button>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                isCollapse: true,
                tabsJson: [
                    {name: '导航1',pageUrl: '',disabled: false,icon: 'el-icon-location',
                        childTabs:[
                            {
                                name:'导航1-1',childTabs: [
                                    {name: '导航1-1-1',pageUrl:'/menu',disabled: false,},
                                    {name: '导航1-1-2',pageUrl:'/login',disabled: false,},
                                ]
                            },{
                                name:'导航1-2',childTabs: [
                                    {name: '导航1-2-1',pageUrl:'',disabled: false,},
                                    {name: '导航1-2-2',pageUrl:'',disabled: false,},
                                ]
                            },
                        ]
                    },
                    {name: '导航2',pageUrl: '/basetable',disabled: false,icon: 'el-icon-menu',},
                    {name: '导航3',pageUrl: '/list',disabled: false,icon: 'el-icon-document',},
                    {name: '导航4',pageUrl: '/table',disabled: false,icon: 'el-icon-setting',},
                    {name: '导航5',pageUrl: '',disabled: false,icon: 'el-icon-location',
                        childTabs:[
                            {
                                name:'导航1-1',childTabs: [

                                ]
                            },{
                                name:'导航1-2',childTabs: [
                                    {name: '导航1-2-1',pageUrl:'',disabled: false,},
                                    {name: '导航1-2-2',pageUrl:'',disabled: false,},
                                ]
                            },


                        ]
                    },
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace("/", "");
            },
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            isCollapseFunction(){
                this.isCollapse = !this.isCollapse
            },handleLetterClick(e) {
                // console.log(key, keyPath);
                this.$emit('change',e.target.innerText);
            },
            menuNavto(pageUrl,pagename){
                // 监听点击动作，判断其param是否为空
                console.log(pageUrl)
                this.$emit('menuNavto',pagename,pageUrl)
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        /*min-height: 400px;*/
    }
    .flod{

    }
    .Aside{
        display: flex;
        flex-flow: column;
    }
</style>