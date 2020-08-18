<template>
    <el-table
            style="width: 100%"
            :row-class-name="tableConfig.tableRowClassName"
            :stripe="tableConfig.stripe"
            :border="tableConfig.border"
            :height="tableConfig.height"
            :tooltip-effect="tableConfig.tooltipEffect"
            @current-change="tableEvent.currentChange"
            :default-sort="tableConfig.defaultSort"
            :load="tableEvent.load"
            :data="tableData"
            :row-key="tableConfig.rowKey"
            :default-expand-all="tableConfig.defaultExpandAll"
            :tree-props="tableConfig.treeProps"
            :show-summary="tableConfig.showSummary"
            :sum-text="tableConfig.sumText"
            :summary-method="tableEvent.getSummaries"
            :span-method="tableEvent.spanMethod"
    >
        <el-table-column
                v-if="tableConfig.type"
                :type="tableConfig.type"
                :index="tableEvent.indexMethod"
                width="60"
                align="center"
        >
        </el-table-column>

        <template v-for="item in tableHeader">
            <tableColumn v-if="item.children && item.children.length" :key="item.prop" :tableColumn="item"></tableColumn>
            <el-table-column
                v-else
                :sortable="item.sortable"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                align="center"
            >
            </el-table-column>
        </template>

        <slot name="scopedOne"></slot>
    </el-table>
</template>

<script>
    import tableColumn from "./components/TableCoulumn"
    export default {
        name: "Table",
        components: {
            tableColumn
        },
        props: {
            tableConfig: {
                stripe:null, // 斑马线
                border:null, // 边框
                height:null,
                maxheight: null,
                multipleSelection: []
            },
            tableHeader:Array,
            tableData: Array,
            tableEvent:{}
        },
        // data(){
        //     return {
        //         tableDatas: []
        //     }
        // },
        mounted() {
            // this.tableDatas = this.table.tableData
        },
        watch: {
            table: function(newVal,oldVal){
                console.log("newVal:"+newVal)
                console.log(this.tableDatas)
                this.tableDatas = newVal
                newVal&& this.drawChart(); //newVal存在的话执行drawChar函数
            }
        },
        created() {
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 对内容进行标注 该方法与stripe部分冲突
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                console.log(rowIndex)
                return '';
            },

        }
    }
</script>

<style scoped>

</style>
<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>