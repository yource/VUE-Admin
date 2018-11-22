<template>
    <div class="tableShow">
        <el-table :data="showData" stripe style="width: 100%" :border="true" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
            <el-table-column type="selection" width="36"></el-table-column>
            <el-table-column prop="date" label="日期" width="165" sortable="custom"></el-table-column>
            <el-table-column prop="name" label="姓名" width="165" sortable="custom"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showDialog = true" icon="el-icon-edit-outline" title="编辑" class="editBtn"></el-button>
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" title="删除" class="deleteBtn"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize" :total="tableData.length" layout="total, sizes, prev, pager, next">
            </el-pagination>
        </div>
        <aside-dialog :visible.sync="showDialog" title="编辑资料">

        </aside-dialog>
    </div>
</template>
<script>
import asideDialog from '../components/asideDialog.vue'
export default {
    name: 'tableShow',
    components:{
        asideDialog
    },
    data() {
        return {
            tableData: [], //所有表格数据
            pageSize: 10,
            currentPage: 1,
            showDialog: false
        }
    },
    computed: {
        showData() { //当前分页展示的数据
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        handleSelectionChange() {},
        // 自定义排序方法，ascending/descending
        handleSortChange(sort) {
            this.tableData.sort((a, b) => {
                if (sort.order == "ascending") {
                    return a[sort.prop] > b[sort.prop] ? 1 : -1;
                } else {
                    return a[sort.prop] < b[sort.prop] ? 1 : -1;
                }
            })
        },
        // 改变分页大小
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // 翻页
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },
    created() {
        this.$ajax.get("/api/table/tableData").then((response) => {
            response = response.data;
            if (response.code == 0) {
                this.tableData = response.data;
            } else {
                this.$notify.error({ title: "错误", message: '表格数据请求失败' })
            }
        }).catch((error) => {
            this.$notify.error({ title: "错误", message: '表格数据请求失败' })
        })
    }
}
</script>
<style scoped lang="scss">
.tableShow {
    padding: 20px;
}

.pagination {
    margin-top: 20px;
    height: 30px;
}

.el-pagination {
    float: right;
}
.editBtn,.deleteBtn{
    font-size:16px;
    padding:6px 10px;
    border:none;
    background:none;
    margin-left:0;
}
.editBtn:hover {
    background: #ecf5ff;
}
.deleteBtn:hover {
    color: #f56c6c;
    background: #fef0f0;
}
</style>