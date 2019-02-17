import * as Constants from '../../common/constants';
import getApi from '../../api/api';
import util from '../../common/js/util'
const { getDataListPage, getDataTotal, editData,addData,removeData } = getApi(Constants.FAGUI);

export default {
    data() {
        return {
            //过滤器
            filters: {
                name: ''
            },
            data: [],
            total: 0,
            page: 1,
            listLoading: false,
            // sels: [],//列表选中列
            editFormVisible: false,//编辑界面是否显示
            
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                publishUnit: [
                    { required: true, message: '请输入发布单位' }
                ],
                publishTime: [
                    { required: true, message: '请输入发布时间' }
                ],
                implementTime: [
                    { required: true, message: '请输入实施时间' }
                ],
                url: [
                    { required: true, message: '请输入链接地址' }
                ],
                urlType: [
                    { required: true, message: '请输入链接类型' }
                ]
            },
            //编辑界面数据
            editForm: {
            },
            addFormVisible: false,//新增界面是否显示
            //新增界面数据
            addForm: {
            },
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                publishUnit: [
                    { required: true, message: '请输入发布单位',trigger: 'blur'}
                ],
                publishTime: [
                    { required: true, message: '请输入发布时间', trigger: 'blur'}
                ],
                implementTime: [
                    { required: true, message: '请输入实施时间', trigger: 'blur'}
                ],
                url: [
                    { required: true, message: '请输入链接地址', trigger: 'blur' }
                ],
                urlType: [
                    { required: true, message: '请输入链接类型' , trigger: 'blur'}
                ]
            },
            formInitVal:{
                id:0,
                name:null,
                publishUnit:'',
                publishTime:'',
                implementTime:'',
                url:'',
                urlTypeDescription:''
            }
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
        handleAdd() {//新增法规按钮
            this.addFormVisible = true;
            this.addForm = this.formInitVal;
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = this.formInitVal;
            this.editForm = Object.assign({}, row);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getDataList();
        },
        //分页方法
        getDataList() {
            let para = { skip: (this.page - 1) * 10, limit: 10, name: this.filters.name};
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
        // 点击查询或刷新数据
        refreshData() {
            let para = {
                name: this.filters.name
            };
            this.listLoading = true;
            let self = this;
            getDataTotal(para).then((res) => {
                this.total = res.data.data;//符合查询条件的数据的总数
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
      
        //编辑 Submit 
        editSubmit() {
            this.$refs.editForm.validate((valid) => {    //   减少获取dom节点的消耗
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //提交的时候,把data里面定义的一个对象赋值给一个变量，然后把这个变量传给后台
                        let para = Object.assign({}, this.editForm);   

                        para.publishTime = (!para.publishTime || para.publishTime == '') ? '' : util.formatDate.format(new Date(para.publishTime), 'yyyy-MM-dd');
                        para.implementTime = (!para.implementTime || para.implementTime == '') ? '' : util.formatDate.format(new Date(para.implementTime), 'yyyy-MM-dd');
                        editData(para).then((res) => {
                            this.editLoading = false;
                            console.log(para);
                            console.log(res.data);
                            if(res.data.success) {
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                })
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
                }
            });
        },
         //新增
         addSubmit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;

                        let para = Object.assign({}, this.addForm);

                        para.publishTime = (!para.publishTime || para.publishTime == '') ? '' : util.formatDate.format(new Date(para.publishTime), 'yyyy-MM-dd');
                        para.implementTime = (!para.implementTime || para.implementTime == '') ? '' : util.formatDate.format(new Date(para.implementTime), 'yyyy-MM-dd');
                        
                        //console.log("publishTime=["+ para.publishTime +"]");
                        //console.log("implementTime=["+ para.implementTime + "]");
                        addData(para).then((res) => {
                            this.addLoading = false;
                            console.log(para);
                            console.log(res.data);
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
                }
            });
        },
        //删除
        handleDel(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { id: row.id };//提交的时候,把data里面定义的一个对象赋值给一个变量，然后把这个变量传给后台
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
        }
    },
    // selsChange(sels) {
    //     this.sels = sels;
    // },
     // 在vue的生命周期的mounted中调用渲染列表
    mounted() {
        // 在vue的生命周期的mounted中调用渲染列表
        if (this.isHasPermission("'fggl_scan'")) {
            this.refreshData();
        } else {
            this.$message({
                message: '无权访问，联系管理员',
                type: 'error'
            });
        }
    }
}