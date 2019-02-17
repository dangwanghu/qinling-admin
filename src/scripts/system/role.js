import * as Constants from '../../common/constants';
import getApi from '../../api/api';
const { getDataListPage, getDataTotal, removeData, editData, addData } = getApi(Constants.ROLE)
const { getMenus } = getApi(Constants.DICT)

export default {
    data() {
        return {
            filters: {
                name: ''
            },
            data: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],//列表选中列
            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            },
            //编辑界面数据
            editForm: {
            },
            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            },
            //新增界面数据
            addForm: {
            },
            formInitVal: {
                id: 0,
                name: null
            },
            menus: [],
            roleMenus: []
        }
    },
    methods: {
        isHasPermission(code) {
            let user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                if (user.roleScope && user.roleScope.indexOf(code) != -1) {
                    return true;
                }
            }
            return false;
        },
        formatStatus: function (row, column) {
            return row.status == 1 ? '启用' : '禁用';
        },
        formatTime: function (row, column) {
            return new Date(row.updateTime).toLocaleDateString();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getDataList();
        },
        getDataList() {
            let para = {
                skip: (this.page - 1) * 10,
                limit: 10,
                name: this.filters.name
            };
            this.listLoading = true;
            let self = this;
            getDataListPage(para).then((res) => {
                this.data = res.data.data;
                this.listLoading = false;
            }).catch(function (error) {
                self.listLoading = false;
                self.$message({
                    message: '请求出错',
                    type: 'error'
                });
            });
        },
        refreshData() {
            let para = {
                name: this.filters.name
            };
            this.listLoading = true;
            let self = this;
            getDataTotal(para).then((res) => {
                this.total = res.data.data;
                this.listLoading = false;
                this.getDataList();
            }).catch(function (error) {
                self.listLoading = false;
                self.$message({
                    message: '请求出错',
                    type: 'error'
                });
            });
        },
        getMenus() {
            let para = {
            };
            getMenus(para).then((res) => {
                this.menus = res.data.data;
            }).catch(function (error) {
                console.info(error);
            });
        },
        handleDisOrEnable: function (index, row, status) {
            let text = status == 1 ? '启用' : '禁用';
            this.$confirm('确认' + text + '该用户吗？', '提示', {}).then(() => {
                this.listLoading = true;
                let para = Object.assign({}, row);
                para.status = status;
                editData(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.success) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '操作出错',
                            type: 'error'
                        });
                    }
                    this.refreshData();
                });
            }).catch((error) => {
                console.info(error);
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { id: row.id };
                removeData(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.success) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '删除出错',
                            type: 'error'
                        });
                    }
                    this.refreshData();
                });
            }).catch((error) => {
                console.info(error);
            });
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            if (this.$refs.tree_edit) {
                this.$refs.tree_edit.setCheckedKeys([])
            }
            this.roleMenus = [];
            this.editFormVisible = true;
            this.editForm = this.formInitVal;
            this.editForm = Object.assign({}, row);
            this.roleMenus = row.scopeIds.split(',')
            if (this.$refs.tree_edit) {
                this.$refs.tree_edit.setCheckedKeys(this.roleMenus)
            }
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = this.formInitVal;
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    let selectedRols = this.$refs.tree_edit.getCheckedNodes();
                    if (selectedRols && selectedRols.length > 0) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            let scopes = [];
                            selectedRols.forEach(role => {
                                scopes.push('\'' + role.code + '\'')
                            });
                            para.scope = scopes.join(',');
                            editData(para).then((res) => {
                                this.editLoading = false;
                                if (res.data.success) {
                                    this.$message({
                                        message: '更新成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message({
                                        message: '更新出错',
                                        type: 'error'
                                    });
                                }
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.refreshData();
                            });
                        });
                    } else {
                        this.$message({
                            message: '请选择菜单',
                            type: 'error'
                        });
                    }
                }
            });
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    let selectedRols = this.$refs.tree.getCheckedNodes();
                    if (selectedRols && selectedRols.length > 0) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            let scopes = [];
                            selectedRols.forEach(role => {
                                scopes.push('\'' + role.code + '\'')
                            });
                            para.scope = scopes.join(',');
                            addData(para).then((res) => {
                                this.addLoading = false;
                                if (res.data.success) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message({
                                        message: '添加出错',
                                        type: 'error'
                                    });
                                }
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.refreshData();
                            });
                        });
                    } else {
                        this.$message({
                            message: '请选择菜单',
                            type: 'error'
                        });
                    }
                }
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        if (this.isHasPermission("'jsgl_scan'")) {
            this.getMenus();
            this.refreshData();
        } else {
            this.$message({
                message: '无权访问，联系管理员',
                type: 'error'
            });
        }
    }
}
