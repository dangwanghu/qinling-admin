import * as Constants from '../../common/constants';
import getApi from '../../api/api';
const { getDataListPage, getDataTotal, editData } = getApi(Constants.USER)

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
        formatSex: function (row, column) {
            return row.sex == 'F' ? '女' : '男';
        },
        formatOpenType: function (row, column) {
            if (!row.openType) return "";
            let openType = []
            if (row.openType.indexOf('WX') != -1) {
                openType.push('微信')
            };
            if (row.openType.indexOf('QQ') != -1) {
                openType.push('QQ')
            };
            return openType.join(',');
        },
        formatStatus: function (row, column) {
            return row.status == 1 ? '启用' : '禁用';
        },
        formatTime: function (row, column) {
            if (!row.createTime) return '';
            return new Date(row.createTime).toLocaleDateString();
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
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        if (this.isHasPermission("'appyhgl_scan'")) {
            this.refreshData();
        } else {
            this.$message({
                message: '无权访问，联系管理员',
                type: 'error'
            });
        }
    }
}
