import * as Constants from '../../common/constants';
import getApi from '../../api/api';
const { getYuKouData, getDataTotal, removeData, editData, addData } = getApi(Constants.YUKOU)
const { getCountryData, getTownData } = getApi(Constants.DICT)

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
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                xLat: [
                    { required: true, message: '请输入纬度' }
                ],
                yLng: [
                    { required: true, message: '请输入经度' }
                ],
                county: [
                    { type: 'number', required: true, message: '请选择区县', trigger: 'blur' }
                ],
                town: [
                    { type: 'number', required: true, message: '请选择乡镇', trigger: 'blur' }
                ]
            },
            //编辑界面数据
            editForm: {
            },
            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                xLat: [
                    { required: true, message: '请输入纬度', trigger: 'blur' }
                ],
                yLng: [
                    { required: true, message: '请输入经度', trigger: 'blur' }
                ],
                county: [
                    { type: 'number', required: true, message: '请选择区县', trigger: 'blur' }
                ],
                town: [
                    { type: 'number', required: true, message: '请选择乡镇', trigger: 'blur' }
                ]
            },
            //新增界面数据
            addForm: {
            },
            isEditIniting: false,
            formInitVal: {
                id: 0,
                name: null,
                locationDescription: '',
                introduction: '',
                history: '',
                naturalFeatures: '',
                otherComments: '',
                xLat: null,
                yLng: null,
                county: null,
                town: null
            },
            countries: [],
            towns: []
        }
    },
    methods: {
        formatXY: function (row, column) {
            let value = column.property == 'xLat' ? row.xLat : row.yLng;
            value = "" + value;
            return value.length > 10 ? value.substring(0, 10) : value;
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getDataList();
        },
        changeQuXian(val) {
            this.getTowns(val);
            this.addForm.town = null;
        },
        eChangeQuXian(val) {
            if (!this.isEditIniting && this.editFormVisible) {
                this.getTowns(val);
            }
        },
        getDataList() {
            let para = {
                skip: (this.page - 1) * 10,
                limit: 10,
                name: this.filters.name
            };
            this.listLoading = true;
            let self = this;
            getYuKouData(para).then((res) => {
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
        getCountries() {
            let para = {
            };
            getCountryData(para).then((res) => {
                this.countries = res.data.data;
            }).catch(function (error) {
                console.info(error);
            });
        },
        getTowns(quxian) {
            let para = {
                quxian: quxian
            };
            getTownData(para).then((res) => {
                this.towns = res.data.data;
                if (this.editFormVisible) {
                    this.findTownId();
                }
            }).catch(function (error) {
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
            this.editFormVisible = true;
            this.editForm = this.formInitVal;
            this.editForm = Object.assign({}, row);
            this.isEditIniting = true;
            this.editInit();
        },
        editInit() {
            this.findCountryId();
        },
        findTownId() {
            if(!this.editForm.town) {
                this.isEditIniting = false;
                return;
            }
            let isFindTown = false;
            this.towns.forEach(town => {
                if (town.name == this.editForm.town) {
                    this.editForm.town = town.id;
                    isFindTown = true;
                    return;
                }
            });
            if (!isFindTown) {
                this.editForm.town = null;
            }
            this.isEditIniting = false;
        },
        findCountryId() {
            if(!this.editForm.county) {
                this.isEditIniting = false;
                return;
            }
            this.countries.forEach(county => {
                if (county.name == this.editForm.county) {
                    this.editForm.county = county.id;
                    this.getTowns(county.id);
                    return;
                }
            });
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
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let para = Object.assign({}, this.editForm);
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
                }
            });
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let para = Object.assign({}, this.addForm);
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
                }
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.getCountries();
        this.refreshData();
    }
}
