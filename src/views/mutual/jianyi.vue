<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.content" placeholder="请输入建议内容"></el-input>
        </el-form-item>
      
        <el-form-item>
          <el-radio-group v-model="filters.status">
            <el-radio class="radio" :label="0">未处理</el-radio>
            <el-radio class="radio" :label="1">已处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="refreshData" :formatter="transformStatus" v-show="isHasPermission('\'jygl_scan\'')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 数据列表 -->
  <!-- @selection-change="selsChange" -->
    <el-table :data="data" highlight-current-row v-loading="listLoading"  style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="content" label="建议内容" width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="发布时间"  min-width="180">
        <template slot-scope="scope">
           <span>{{ scope.row.createTime  | moment("YYYY-MM-DD,h:mm:ss") }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="处理时间" min-width="180">
        <template slot-scope="scope">
           <span>{{ scope.row.updateTime  | moment("YYYY-MM-DD,h:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" min-width="130"></el-table-column>
      <el-table-column prop="submitter" label="建议人 " min-width="120"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="100"></el-table-column>
      <el-table-column prop="comments" label="处理建议" min-width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" width="200" v-if="isHasPermission('\'jygl_handle\'') || isHasPermission('\'jygl_delete\'')">
        <template scope="scope">
          <el-button type="primary" size="small" v-show="isHasPermission('\'jygl_handle\'')" :disabled='scope.row.status === "已处理"?true:false' 
          @click="handleEdit(scope.$index,scope.row)">{{scope.row.status==='未处理'?'处理建议':scope.row.status}}</el-button>
          <el-button type="danger" size="small" v-show="isHasPermission('\'jygl_delete\'')" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination  layout="prev,pager,next"  @current-change="handleCurrentChange" :page-size="5" :total="total" 
      style="float:right;"></el-pagination>
    </el-col>
    <!-- 点击处理时的对话框 -->
    <el-dialog v-model="editFormVisible" title="" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
     <el-form-item label="处理建议" prop="comments">
      <el-col>
      <el-input type="textarea" :rows="8" v-model="editForm.comments"></el-input>
      </el-col>
     </el-form-item>
        </el-form>
       <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary"  @click.native="handleDataSubmit" :loading="editLoading">提交</el-button>
			</div>
     </el-dialog>
  </section>
</template>
<script src="../../scripts/mutual/jianyi.js"></script>
<style scoped>
</style>