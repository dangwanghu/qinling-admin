<template>
		<section>
			<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.content" placeholder="请输入纠错名称"></el-input>
				</el-form-item>
         <el-form-item>
          <el-radio-group v-model="filters.status">
            <el-radio class="radio" :label="0">未处理</el-radio>
            <el-radio class="radio" :label="1">已处理</el-radio>
          </el-radio-group>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="refreshData" :formatter="transformStatus">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <!-- @selection-change="selsChange" -->
		<el-table  :data="data" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
     
      <el-table-column prop="content" label="纠错内容" width="100" :show-overflow-tooltip="true"></el-table-column>
     
      <!-- <el-table-column prop="relId" label=" 关联专题ID" min-width="130"></el-table-column>
        -->
      <el-table-column prop="createTime" label="发布时间"  min-width="160">
        <template slot-scope="scope">
           <span>{{ scope.row.createTime  | moment("YYYY-MM-DD,h:mm:ss") }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="处理时间"  min-width="170">
        <template slot-scope="scope">
           <span>{{ scope.row.updateTime  | moment("YYYY-MM-DD,h:mm:ss") }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="200"></el-table-column>
     <el-table-column prop="type" label="专题类别" width="200"></el-table-column>
      <el-table-column prop="submitter" label="提交人 " min-width="150"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="100" ></el-table-column>
    <el-table-column prop="comments" label="处理纠错" min-width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" size="small" :disabled='scope.row.status === "已处理"?true:false' 
          @click="handleEdit(scope.$index,scope.row)">{{scope.row.status==='未处理'?'处理建议':scope.row.status}}</el-button>
          <el-button type="danger"  size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination  layout="prev, pager, next"  @current-change="handleCurrentChange" :page-size="5" :total="total"  style="float:right;"></el-pagination>
    </el-col>
    <!-- 点击处理时的对话框 -->
    <el-dialog v-model="editFormVisible" title="" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
     <el-form-item label="处理建议" prop="comments">
      <!-- <el-col :span="10"> -->
      <el-input v-model="editForm.comments" type="text"></el-input>
      <!-- </el-col> -->
     </el-form-item>
        </el-form>
       <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleDataSubmit" :loading="editLoading" >提交</el-button>
			</div>
     </el-dialog>
	</section>
</template>
<script src="../../scripts/mutual/jiucuo.js"></script>
<style scoped>
</style>