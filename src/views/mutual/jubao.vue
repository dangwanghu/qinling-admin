<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.content" placeholder="请输入举报内容"></el-input>
        </el-form-item>

        <el-form-item>
          <el-radio-group v-model="filters.status">
            <el-radio class="radio" :label="0">未处理</el-radio>
            <el-radio class="radio" :label="1">已处理</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-on:click="refreshData" :formatter="transformStatus" v-show="isHasPermission('\'jbgl_scan\'')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="data" highlight-current-row v-loading="listLoading"  style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="content" label="举报内容" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="发布时间"  min-width="200" >
        <template slot-scope="scope">
         
           <span>{{ scope.row.createTime  | moment("YYYY-MM-DD,h:mm:ss") }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="处理时间" min-width="200" >
        <template slot-scope="scope">
           <span>{{ scope.row.updateTime  | moment("YYYY-MM-DD,h:mm:ss") }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="xLat" label=" 纬度" min-width="120"></el-table-column>
      <el-table-column prop="yLng" label="经度" min-width="120"></el-table-column>
      <el-table-column prop="submitter" label="举报人" min-width="130"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="130"></el-table-column>
        <el-table-column prop="address" label="举报地址" width="250" :show-overflow-tooltip="true"></el-table-column>        
      <el-table-column prop="comments" label="处理举报意见" min-width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" width="300" v-if="isHasPermission('\'jbgl_handle\'') || isHasPermission('\'jbgl_delete\'')">
        <template scope="scope">
          <el-button
            type="primary"
            size="small"
            :disabled="scope.row.status === '已处理'? true:false"
            @click="handleEdit(scope.$index,scope.row)"
          >{{scope.row.status==='未处理'?'处理建议':scope.row.status}}</el-button>
          <el-button type="danger" size="small" v-show="isHasPermission('\'jbgl_handle\'')" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button type="primary" size="small" v-show="isHasPermission('\'jbgl_delete\'')" @click="viewimage(scope.$index, scope.row.attachments.replace(/(^\[+)|(\]+$)/g,'').split(','))">查看图片</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="5"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
    <!-- 点击处理时的对话框 -->
    <el-dialog v-model="editFormVisible" title :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="建议处理" prop="comments">
            <el-input type="textarea" :rows="8" v-model="editForm.comments" sortable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="handleDataSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 查看图片的对话框 -->
    <el-dialog v-model="showViewImage" title :close-on-click-modal="false">
      <!-- 轮播图 -->
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in viewImageData" :key="index" >
          <img :src="item" class="carousel-img">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </section>
</template>
<script src="../../scripts/mutual/jubao.js"></script>
<style scoped lang="scss">
  .el-carousel__item img {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>