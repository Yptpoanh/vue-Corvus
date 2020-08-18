<template>
    <el-tabs class="main-tab" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" >
        <el-tab-pane class="tab-content"
                     v-for="(item, index) in editableTabs"
                     :key="item.name"
                     :label="item.title"
                     :name="item.name"
        >
            {{item.content}}-{{index}}
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        created() {
            //判断标签里面是否有值 有的话直接加载
            if (this.tagsList.length == 0) {
                this.setTags(this.$route);
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
                editableTabs: [{
                    title: '首页',
                    name: '1',
                    content: 'Tab 1 content'
                }, ],
                tabIndex: 1
            }
        },
        methods: {
            addTab(targetName) {
                console.log(targetName)
                let newTabName = ++this.tabIndex + '';
                console.log(newTabName)
                this.editableTabs.push({
                    title: targetName,
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
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
            }
        },
        watch: {
            letter(){
                if(this.letter){
                    console.log(this.letter)
                }
            }
        }
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