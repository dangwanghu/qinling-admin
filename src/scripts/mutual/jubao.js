import * as Constants from "../../common/constants";
import getApi from "../../api/api";
const {
  getDataListPage,
  getDataTotal,
  removeData,
  editData,
} = getApi(Constants.JUBAO);
export default {
  data() {
    return {
      filters: {
        content: '' //按照内容检索建议数据（模糊查询）
      },
      editFormVisible: false,
      data: [],
      total: 0, // 分页
      page: 1,
      listLoading: false,
      // sels: [], //列表选中列
      editLoading: false,
      //编辑界面数据
      editForm: {},
      editLoading: false,
      // 是否显示查看图片对话框
      showViewImage: false,
      // 图片数据 
      viewImageData: [],
      editFormRules: {
        comments: [{
          required: true,
          message: '请输入举报处理内容',
          trigger: 'blur'
        }],
      },
    };
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
    //状态显示转换
    transformStatus(row, column) {
      return row.status == 1 ? "已处理" : row.status == 0 ? "未处理" : "未知";
    },
    //对处理建议数据执行审核处理(弹出编辑画面)
    handleEdit(index, row) {
      // 获取页面上值
      this.editForm = Object.assign({}, row);
      // 显示对话框
      this.editFormVisible = true;
    },
    viewimage(index, date) {
      this.showViewImage = true;
      this.viewImageData = date
    },
    // 处理当前变化
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    // 点击查询按钮刷新页面
    refreshData() {
      let para = {
        content:this.filters.content
      };
      this.listLoading = true;
      let self = this;
      getDataTotal(para)
        .then(res => {
          this.total = res.data.data;
          this.listLoading = false;
          this.getDataList();
        })
        .catch(function (error) {
          self.listLoading = false;
          self.$message({
            message: "请求出错",
            type: "error"
          });

        });
    },
    //分页功能
    getDataList() {
      let para = {
        skip: (this.page - 1) * 10,
        limit: 10,
        content: this.filters.content,
        status: this.filters.status
      };
      this.listLoading = true;
      let self = this;
      getDataListPage(para)
        .then(res => {
          this.data = res.data.data;
          this.listLoading = false;
        })
        .catch(function (error) {
          self.listLoading = false;
          self.$message({
            message: "请求出错",
            type: "error"
          });
        });
    },
    // 举报数据处理提交
    handleDataSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            this.editLoading = false;
            editData(para).then(res => {
      
              if (res.data.success) {
                this.$message({
                  message: "处理成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "处理出错",
                  type: "error"
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
    //删除
    handleDelete(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          this.listLoading = true;
          let para = {
            id: row.id
          };
          removeData(para).then(res => {
            this.listLoading = false;
            if (res.data.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "删除出错",
                type: "error"
              });
            }
            this.refreshData();
          });
        })
        .catch(error => {
          console.info(error);
        });
    },
    // 实现批量删除通过selection-change实现
    // selsChange(sels) {
    //   this.sels = sels;
    // }
  },
  // 在vue的生命周期的mounted中调用渲染列表
  mounted() {
    if (this.isHasPermission("'jbgl_scan'")) {
        this.refreshData();
    } else {
        this.$message({
            message: '无权访问，联系管理员',
            type: 'error'
        });
    }
  },
};