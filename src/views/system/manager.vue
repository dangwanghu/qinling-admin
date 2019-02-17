<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
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
		<el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="role" v-if="false" sortable>
			</el-table-column>
			<el-table-column prop="realName" label="姓名" width="100" sortable>
			</el-table-column>
			<el-table-column prop="roleName" label="角色" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="email" label="邮箱" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus" min-width="90" sortable>
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="formatTime" sortable>
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					<el-button type="warning" size="small" @click="handleDisOrEnable(scope.$index, scope.row, 0)" v-if="scope.row.status == '1'">禁用</el-button>
					<el-button type="success" size="small" @click="handleDisOrEnable(scope.$index, scope.row, 1)" v-if="scope.row.status != '1'">启用</el-button>
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
				<el-form-item label="姓名" prop="realName">
					<el-input v-model="editForm.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role">
					<el-select v-model="editForm.role" placeholder="请选择角色">
						<el-option :label="role.name" :value="role.id" v-for="role in roles"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="editForm.sex" placeholder="请选择性别">
						<el-option label="男" value="M"></el-option>
						<el-option label="女" value="F"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="editForm.phone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" custom-class="el-dialog--small" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="realName">
					<el-input v-model="addForm.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role">
					<el-select v-model="addForm.role" placeholder="请选择角色">
						<el-option :label="role.name" :value="role.id" v-for="role in roles"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="addForm.sex" placeholder="请选择性别">
						<el-option label="男" value="M"></el-option>
						<el-option label="女" value="F"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="addForm.phone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script src="../../scripts/system/manager.js">
</script>

<style scoped>
</style>