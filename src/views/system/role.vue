<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="refreshData" v-show="isHasPermission('\'jsgl_scan\'')">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" v-show="isHasPermission('\'jsgl_new\'')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="scope" v-if="false" sortable>
			</el-table-column>
			<el-table-column prop="name" label="角色名称" width="180" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus" min-width="40" sortable>
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" :formatter="formatTime" min-width="80" sortable>
			</el-table-column>
			<el-table-column label="操作" width="350" v-if="isHasPermission('\'jsgl_edit\'') || isHasPermission('\'jsgl_delete\'') || isHasPermission('\'jsgl_enordis\'')">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)" v-show="isHasPermission('\'jsgl_edit\'')">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-show="isHasPermission('\'jsgl_delete\'')">删除</el-button>
					<el-button type="warning" size="small" @click="handleDisOrEnable(scope.$index, scope.row, 0)" v-if="scope.row.status == '1' && isHasPermission('\'jsgl_enordis\'')">禁用</el-button>
					<el-button type="success" size="small" @click="handleDisOrEnable(scope.$index, scope.row, 1)" v-if="scope.row.status != '1' && isHasPermission('\'jsgl_enordis\'')">启用</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-tree
					:data="menus"
					show-checkbox
					node-key="id"
					ref="tree_edit"
					:default-checked-keys="roleMenus"
					highlight-current>
				</el-tree>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" custom-class="el-dialog--small" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-tree
					:data="menus"
					show-checkbox
					node-key="id"
					ref="tree"
					highlight-current>
				</el-tree>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script src="../../scripts/system/role.js">
</script>

<style scoped>
</style>