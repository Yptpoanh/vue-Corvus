<template>
    <el-table-column
            :prop="tableColumn.prop"
            :label="tableColumn.label"
            :show-overflow-tooltip="tableColumn.showOverflowTooltip"
            :width="tableColumn.width"
            :sortable="tableColumn.sortable"
            align="center"
    >
        <template v-for="item in tableColumn.children">
            <table-column v-if="item.children && item.children.length" :key="item.prop" :tableColumn="item"></table-column>
            <el-table-column
                    v-else
                    :show-overflow-tooltip="item.showOverflowTooltip"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :sortable="item.sortable"
                    align="center"
            >
            </el-table-column>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: "TableColumn",
        props: {
            tableColumn: {
                type: Object,
                required: true
            }
            // tableColumn: {
            //     label: String,
            //     width: String,
            //     fixed: Boolean,
            //     prop: String,
            //     children: Array
            // }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>