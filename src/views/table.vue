<template>
    <div class="tableShow">
        <div class="operation">
            <el-input placeholder="请输入检索内容" v-model="searchText" clearable @clear="clearSearch" style="width:365px;margin-right:20px;">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button plain @click="deletes" style="float:right;">批量删除</el-button>
            <el-button plain @click="add" style="float:right;margin-right:20px;">新增记录</el-button>
        </div>
        <el-table :data="showData" stripe style="width: 100%" :border="true" 
            @selection-change="handleSelectionChange" 
            @sort-change="handleSortChange" 
            @select="handleSelect" 
            @select-all="handleSelect">
            <el-table-column type="selection" width="36"></el-table-column>
            <el-table-column prop="date" label="日期" width="165" sortable="custom"></el-table-column>
            <el-table-column prop="name" label="姓名" width="165" sortable="custom"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)" icon="el-icon-edit-outline" title="编辑" class="editBtn"></el-button>
                    <el-button size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete" title="删除" class="deleteBtn"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-sizes="[10, 20, 30]" 
                :page-size="pageSize" 
                :total="tableData.length" 
                layout="total, sizes, prev, pager, next">
            </el-pagination>
        </div>
        <aside-dialog :visible.sync="showDialog" title="编辑资料">
            <el-form class="myForm" ref="form" :model="editData" :rules="rules" label-width="80px">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="editData.name"></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="address">
                    <el-cascader separator=" " 
                        v-model="editData.city" 
                        :show-all-levels="true" 
                        :options="cities" 
                        :props="{value: 'text',label:'text',children: 'children'}">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="editData.email"></el-input>
                </el-form-item>
            </el-form>
            <div class="asideDialogBtns">
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="showDialog=false">取消</el-button>
            </div>
        </aside-dialog>
    </div>
</template>
<script>
import asideDialog from '../components/asideDialog.vue'
import cities from '../utils/city.js'
export default {
    name: 'tableShow',
    components: {
        asideDialog
    },
    data() {
        return {
            tableData: [], //所有表格数据
            tableDataBack: [],
            pageSize: 10,
            currentPage: 1,
            showDialog: false,
            editData: {},
            cities,
            selection: [],
            searchText: "",
            rules: {
                name: [
                    { required: true, message: '请输入名字', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请选择城市', trigger: 'blur' }
                ],
                email: [
                    { required: true, type: "email", message: '请输入邮箱', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        showData() { //当前分页展示的数据
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        searchArray() {
            return this.searchText.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '').split(" ")
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
        },
        // 打开编辑弹框
        handleEdit(row) {
            // 清空表单的success/error样式
            let doms = [...document.querySelectorAll(".myForm .el-form-item")];
            doms.forEach(function(dom) {
                dom.classList.remove("is-success");
                dom.classList.remove("is-error");
            })

            this.editData = getEditData(row);
            this.showDialog = true;
        },
        // 删除单条数据
        handleDelete(row) {
            this.$confirm('确定删除此条记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(this.tableData.indexOf(row), 1);
                this.$notify({
                    type: 'success',
                    title: "提示",
                    message: '删除成功!',
                    duration: '1800'
                });
            }).catch(() => {});
        },
        // 提交编辑
        onSubmit() {
            this.editData.address = this.editData.city.join(" ");
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.$ajax.post("/api/table/edit", { params: this.editData }).then((response) => {
                        this.showDialog = false;
                        response = response.data;
                        if (response.code == 0) {
                            this.$notify.success({
                                title: '提示',
                                message: '提交成功',
                                duration: 1800
                            });
                        }
                    }).catch(() => {
                        this.$notify.error({
                            title: '错误',
                            message: '网络错误，提交失败',
                            duration: 2500
                        });
                    })
                } else {
                    return false;
                }
            });
        },
        // 选中事件
        handleSelect(selection) {
            this.selection = selection;
        },
        // 新增记录
        add() {
            // 清空表单的success/error样式
            let doms = [...document.querySelectorAll(".myForm .el-form-item")];
            doms.forEach(function(dom) {
                dom.classList.remove("is-success");
                dom.classList.remove("is-error");
            });
            this.editData = {
                name: "",
                address: "",
                city: [],
                email: ""
            };
            this.showDialog = true;
        },
        // 批量删除
        deletes() {
            if (this.selection.length == 0) {
                this.$notify({
                    type: 'warning',
                    title: "提示",
                    message: '请选择要删除的数据',
                    duration: '2200'
                });
                return;
            } else {
                this.selection.forEach((item) => {
                    this.tableData.splice(this.tableData.indexOf(item), 1);
                });
                this.selection = [];
            }
        },
        // 前端搜索search
        search() {
            if (this.searchArray[0] == "") {
                this.tableData = JSON.parse(JSON.stringify(this.tableDataBack));
            } else {
                let searchout = [];
                this.tableDataBack.forEach((item) => {
                    let conform = true;
                    this.searchArray.forEach((search) => {
                        if (JSON.stringify(item).indexOf(search) < 0) {
                            conform = false;
                        }
                    })
                    if (conform) {
                        searchout.push(item)
                    }
                });

                this.tableData = searchout;
            }
        },
        clearSearch() {
            this.tableData = JSON.parse(JSON.stringify(this.tableDataBack));
        }
    },
    created() {
        this.$ajax.get("/api/table/tableData").then((response) => {
            response = response.data;
            if (response.code == 0) {
                this.tableData = response.data;
                this.tableDataBack = response.data;
            } else {
                this.$notify.error({ title: "错误", message: '表格数据请求失败' })
            }
        }).catch((error) => {
            this.$notify.error({ title: "错误", message: '表格数据请求失败' })
        })
    }
}

function getEditData({ id, name, address, email, time }) {
    return {
        id,
        name,
        city: address.split(" "), //级联选择组件需要数组
        email,
        time
    }
}
</script>
<style scoped lang="scss">
.tableShow {
    padding: 20px;

    .operation {
        padding-bottom: 20px;
    }
}

.pagination {
    margin-top: 20px;
    height: 30px;
}

.el-pagination {
    float: right;
}

.editBtn,
.deleteBtn {
    font-size: 16px;
    padding: 6px 10px;
    border: none;
    background: none;
    margin-left: 0;
}

.editBtn:hover {
    background: #ecf5ff;
}

.deleteBtn:hover {
    color: #f56c6c;
    background: #fef0f0;
}

.asideDialogBtns {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: right;
    height: 60px;
    padding-top: 12px;
    border-top: 1px solid #dedede;

    .el-button {
        padding: 9px 20px;
        margin-right: 20px;
        margin-left: 0;
    }
}
</style>