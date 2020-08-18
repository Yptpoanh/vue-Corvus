<template>
    <dynamic-table :table-data="tableData" :table-header="tableConfig" v-if="dynamicTableShow"></dynamic-table>
</template>
<script>
    import dynamicTable from '../../components/test/dynamicTable'
    const tableData =[{
        c_0:'c_0',
        c_1:'c_1',
        c_2:'c_2',
        c_3:'c_3',
        c_4:'c_4'
    },
        {
            c_0:'a_0',
            c_1:'a_1',
            c_2:'a_2',
            c_3:'a_3',
            c_4:'a_4'
        }]
    const tableConfig = [{
        "label": "2019年1月xxx资表",
        "prop": "",
        "children": [
            {
                "label": "表1",
                "prop": "c_0"
            }, {
                "label": "表2",
                "prop": "c_1",
                "children": []
            }, {
                "label": "表3",
                "prop": "c_2",
                "children": [
                    {
                        "label": "表4",
                        "prop": "c_3",
                        "children": []
                    },{
                        "label": "表5",
                        "prop": "c_4",
                        "children": []
                    }
                ]
            }
        ]
    }]
    export default {
        components: {
            dynamicTable
        },
        data () {
            return{
                dynamicTableShow: true, // 使得DynamicTable组件重新渲染变量
                // 表数据
                tableData: tableData,
                // 表头数据
                tableConfig: tableConfig
            }

        },
        created(){
            this.getHead()
        },
        methods:{
            getHead(){
                //请求接口后赋值
                this.tableConfig = tableConfig;
                this.handleServiceCategoryChange();
                this.tableData = tableData;
            },
            // 服务类型改变的时候，需要重新请求表头信息和表格数据
            handleServiceCategoryChange () {
                // 设置dynamicTableShow为false，使得DynamicTable组件重新渲染
                this.dynamicTableShow = false
                // 此处是DOM还没有更新，此处的代码是必须的
                this.$nextTick(() => {
                    // DOM 现在更新了
                    this.dynamicTableShow = true
                })
            }
        }
    }
</script>