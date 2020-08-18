<template>
    <div>
        <el-tabs class="main-tab" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane class="tab-content"
                         v-for="(item, index) in editableTabs"
                         :key="item.name"
                         :label="item.title"
                         :name="item.name"
                         :id="index"
                         v-model="activeName"
            >
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>

            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    export default {
        created() {
            //判断标签里面是否有值 有的话直接加载
            if (this.tagsList.length == 0) {
                this.setTags(this.$route);
            }
            if(this.$route.query.tabid) {
                this.activeName = this.$route.query.tabid;
            }else{
                this.activeName = 0;
            }
        },
        computed: {
            //computed 方法里面没有set方法因此不能使用mapState,需要重新定义set方法
            tagsList: {
                get: function() {
                    return this.$store.state.tagsList;
                },
                set: function(newValue) {
                    this.$store.commit("TAGES_LIST", newValue);
                    // this.$store.state.tagsList = newValue;
                }
            }
        },

        data() {
            return {
                editableTabsValue: '1',
                letter: String, // 接收数据Tabs
                tabsUrl: '',
                activeName: '0',
                editableTabs: [
                    // {
                    // title: '首页',
                    // name: '1',
                    // content: 'Tab 1 content',
                    // path: '/login',
                    // },
                ],
                tabIndex: 1
            }
        },
        methods: {
            addTab(targetName,path) {
                let isIn = this.editableTabs.some(item => {
                    //判断标签是否存在
                    return item.path === path;
                });
                if (!isIn) {
                    this.tabsUrl = path;
                    this.$router.push({path: path, query: {}})
                    // tab-
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: targetName,
                        name: newTabName,
                        path: path,
                        content: ''
                    });
                    this.tabsUrl = path
                    this.editableTabsValue = newTabName;
                    this.$store.commit("TAGES_LIST", this.editableTabs);
                }
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {

                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            tabClick(tab, event) {
                var ordTabs;
                this.editableTabs.some(item => {
                    //判断标签是否存在
                    if(item.name === event.target.id.replace('tab-','')){
                        ordTabs = item
                    }
                });
                if(this.tabsUrl!=ordTabs.path){
                    this.$router.push({path: ordTabs.path, query: {}})
                    let urlStr = this.editableTabs;
                }
                this.tabsUrl = ordTabs.path
            },

        },
        watch: {
            //监听路由变化
            $route(newValue, oldValue) {
                // this.addTab(newValue);
            },

        },
    }
</script>

<style scoped>
    /*.tab-content{*/
    /*    height:30vw;*/
    /*}*/
    .main-tab .el-tabs__nav{
        height: 4vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<style >
    .main-tab .el-tabs__nav{
        height: 4vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>