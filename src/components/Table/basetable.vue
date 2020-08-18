<template>
    <div>
        <Table :tableConfig="tableConfig" :tableHeader="tableHeader" :tableData="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" :tableEvent="tableEvent">
            <template slot="scopedOne">
                <!--自定义-->
                <el-table-column  align="right">
                    <template slot="header" slot-scope="{}">
                        <el-input
                                v-model="search"
                                @input="change"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </template>
        </Table>
    </div>
</template>
<script>
    import Table from "./Table"
    export default {
        name: "index",
        data(){
            return {
                // tableconfig
                tableEvent: {
                    // 点击行后回调方法
                    currentChange(val){
                        // console.log(val)
                    },
                    // 子节点方法 查询 回调方法
                    load(tree, treeNode, resolve) {
                        setTimeout(() => {
                            resolve([
                                {
                                    id: 31,
                                    date: '2016-05-01',
                                    name: '王小虎',
                                    address: '上海市普陀区金沙江路 1519 弄'
                                }, {
                                    id: 32,
                                    date: '2016-05-01',
                                    name: '王小虎',
                                    address: '上海市普陀区金沙江路 1519 弄'
                                }
                            ])
                        }, 1000)
                    },
                    // 计算合计的方法
                    getSummaries(param){
                        console.log(param)
                        const { columns, data } = param;
                        const sums = [];
                        columns.forEach((column, index) => {
                            if (index === 0) {
                                sums[index] = '总价';
                                return;
                            }
                            const values = data.map(item => Number(item[column.property]));
                            if (!values.every(value => isNaN(value))) {
                                sums[index] = values.reduce((prev, curr) => {
                                    const value = Number(curr);
                                    if (!isNaN(value)) {
                                        return prev + curr;
                                    } else {
                                        return prev;
                                    }
                                }, 0);
                                sums[index] += ' 元';
                            } else {
                                // sums[index] = 'N/A';
                                sums[index] = '';
                            }
                        });

                        return sums;
                    },
                    // 合并方法 当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
                    // 合并
                    // spanMethod: null // 从Event中找方法 arraySpanMethod
                    spanMethod({ row, column, rowIndex, columnIndex }) {
                        // if (rowIndex % 2 === 0) {
                        //     if (columnIndex === 0) {
                        //         return [2, 2];
                        //     } else if (columnIndex === 1) {
                        //         return [0, 0];
                        //     }
                        // }
                    },
                    indexMethod(){

                    }
                },
                tableConfig: {
                    stripe:false, // 斑马线
                    border:false, // 边框
                    height:400,
                    maxheight: 400,
                    tooltipEffect:"dark",
                    multipleSelection: [],
                    defaultSort: "{prop: 'date', order: 'ascending'}", //  order: ascending, descending 排序
                    type: "selection", // selection：选择框体，index：显示序号，expand：展开按钮

                    // 拥有子节点的时候参数集Strat
                    lazy: true , // lazy: 是否懒加载子节点数据
                    load: "load", // load: Function(row, treeNode, resolve) 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
                    treeProps: "{children: 'children', hasChildren: 'hasChildren'}", // 渲染嵌套数据的配置选项 对单个的需要在数据中加入  hasChildren: true
                    rowKey: "id", // 必填
                    defaultExpandAll: false, // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
                    // 拥有子节点的时候参数集End

                    showSummary: true, // 是否 设置 表尾合计行
                    sumText: "合计",
                },
                tableData: [
                    {
                        id: 1,
                        date: '2016-05-03',
                        name: '王哈哈',
                        address: '上海市普陀区金沙江路 1518 弄',
                        city: '城市名称',
                        province: '省名称',
                        amount: '324',
                        children: [
                            {
                                id: 31,
                                date: '2016-05-01',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1519 弄',
                                amount: '324',
                            }, {
                                id: 32,
                                date: '2016-05-01',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1519 弄',
                                amount: '324',
                            }
                        ]
                    },
                    {
                        id: 2,
                        date: '2016-05-02',
                        name: '小虎',
                        address: '上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路 1518 弄',
                        city: '城市名称',
                        province: '省名称',
                        amount: '324',
                    },
                    {
                        id: 3,
                        date: '2016-05-04',
                        name: '离虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        city: '城市名称',
                        province: '省名称',
                        amount: '324',
                    },
                    {
                        id: 4,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        city: '城市名称',
                        province: '省名称',
                        amount: '324',
                    },
                    {
                        id: 5,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        city: '城市名称',
                        province: '省名称',
                        amount: '324',
                    },
                    {
                        id: 6,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        city: '城市名称',
                        province: '省名称',
                        amount: '324',
                    },
                ],
                tableHeader:[
                    {
                        label:'日期',
                        width:"120",
                        fixed: false , //true|false|left|right,
                        prop:'date',
                        sortable: true,
                        showOverflowTooltip: false, // 当内容过长被隐藏时显示 tooltip
                        children:[]
                    },
                    {
                        label:'姓名',
                        width:"120",
                        fixed:false,
                        prop:'name',
                        sortable: false,
                        showOverflowTooltip: false, // 当内容过长被隐藏时显示 tooltip
                    },
                    {
                        label:'Amount',
                        width:"120",
                        fixed:false,
                        prop:'amount',
                        sortable: false,
                        showOverflowTooltip: false, // 当内容过长被隐藏时显示 tooltip
                    },
                    {
                        label:'详细地址',
                        width:"120",
                        fixed:false,
                        prop:'address',
                        sortable: false,
                        showOverflowTooltip: true, // 当内容过长被隐藏时显示 tooltip
                        children:[
                            {
                                label:'地址',
                                width:"120",
                                fixed:false,
                                prop:'address',
                                sortable: false,
                                showOverflowTooltip: true, // 当内容过长被隐藏时显示 tooltip
                            },
                            {
                                label:'省份',
                                width:"120",
                                fixed:false,
                                prop:'province',
                                sortable: true,
                                showOverflowTooltip: false, // 当内容过长被隐藏时显示 tooltip
                            },{
                                label:'城市',
                                width:"120",
                                fixed:false,
                                prop:'city',
                                sortable: false,
                                showOverflowTooltip: false, // 当内容过长被隐藏时显示 tooltip
                            }
                        ]
                    },


                ],
            }
        },
        components: {
            Table
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            change(){
                this.$forceUpdate()
            }
        },
    };
</script>
<style>

</style>