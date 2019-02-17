<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="昵称或真实姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="refreshData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="openType" label="类型" width="100" :formatter="formatOpenType" sortable>
			</el-table-column>
			<el-table-column prop="nickName" label="用户昵称" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="realName" label="真实姓名" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" min-width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus" min-width="90" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间" min-width="120" :formatter="formatTime" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
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
	</section>
</template>

<script src="../../scripts/mutual/user.js">
</script>

<style scoped>
</style>