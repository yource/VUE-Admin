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
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit-outline" style="font-size:16px;" title="编辑"></el-button>
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" style="font-size:16px;" title="删除" class="deleteBtn"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize" :total="tableData.length" layout="total, sizes, prev, pager, next">
            </el-pagination>
        </div>
        <div class="asideDialogWrap" :visible="showDialog" @click="showDialog=false">
            <div class="asideDialog">
                <div class="asideDialogHeader">
                    <div class="asideDialogTitle">
                        <span>编辑资料</span>
                        <span class="close"><i class="el-icon el-icon-close"></i></span>
                    </div>
                </div>
                <div class="asideDialogBody"></div>
                <div class="asideDialogBottom">
                    <el-button type="primary" @click="showDialog = false">确 定</el-button>
                    <el-button @click="showDialog = false" style="margin-right:20px;margin-left:20px;">取 消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tableShow',
    data() {
        return {
            tableData: [], //所有表格数据
            pageSize: 10,
            currentPage: 1,
            showDialog: true
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

.deleteBtn:hover {
    color: #f56c6c;
    border-color: #fbc4c4;
    background: #fef0f0;
}

.asideDialogWrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.05);
    z-index: 99;

    .asideDialog {
        width: 420px;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        box-shadow: 0 0 15px #999;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;

        .asideDialogHeader {
            background: #f1f7f6;
            font-size: 16px;
            line-height: 40px;
            padding-left: 15px;
            padding-right: 15px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;

            .close {
                float: right;
                font-size: 20px;
                cursor: pointer;
                color: #999;

                &:hover {
                    color: #ff690e;
                }
            }
        }

        .asideDialogBody {
            height: calc(100% - 100px);
            padding: 15px;
        }

        .asideDialogBottom {
            text-align: right;
            height: 60px;
            padding-top: 14px;
            border-top: 1px solid #dedede;

            .el-button {
                padding: 8px 12px;
            }
        }
    }
}
</style>