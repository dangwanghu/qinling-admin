<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        
        <el-form-item>
          <el-input v-model="filters.name" placeholder="名称"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" v-on:click="refreshData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table
      :data="data"
      highlight-current-row
      v-loading="listLoading"
      
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="法规名称" width="120" sortable :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="publishUnit" label="发布单位" min-width="150"></el-table-column>
      <el-table-column prop="implementTime" label="实施时间" min-width="120" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.implementTime | moment("YYYY-MM-DD,h:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接地址"
        min-width="120"
        sortable
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="urlType" label="链接类型" min-width="120" sortable></el-table-column>
      <el-table-column
        prop="urlTypeDescription"
        label="其他说明"
        min-width="100"
        sortable
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger"  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="法规名称" prop="name">
          <el-col :span="11">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="发布单位" prop="publishUnit">
          <el-col :span="11">
            <el-input v-model="editForm.publishUnit" type="text"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="实施时间" prop="implementTime">
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="editForm.implementTime"
              disabled
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="链接地址" prop="url">
          <el-col :span="11">
            <el-input v-model="editForm.url" type="text"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="链接类型" prop="urlType">
          <el-col :span="11">
            <el-input v-model="editForm.urlType" disabled type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="其他说明" prop="urlTypeDescription">
          <el-col :span="30">
            <el-input v-model="editForm.urlTypeDescription" type="textarea"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible =false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="法规名称" prop="name">
          <el-col :span="11">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="发布单位" prop="publishUnit">
          <el-col :span="11">
            <el-input v-model="addForm.publishUnit" type="text"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="实施时间">
          <el-col :span="5">
            <el-date-picker type="date" v-model="addForm.implementTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="链接地址" prop="url">
          <el-input v-model="addForm.url" type="text"></el-input>
        </el-form-item>

        <el-form-item label="链接类型" prop="urlType">
          <el-input v-model="addForm.urlType" type="number"></el-input>
        </el-form-item>

        <el-form-item label="其他说明" prop="urlTypeDescription">
          <el-col :span="30">
            <el-input v-model="addForm.urlTypeDescription" type="textarea"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

 <script src="../../scripts/policy/fagui.js">
</script>
	
<style scoped>
</style>