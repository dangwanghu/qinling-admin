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
		<el-table :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="xLat" label="纬度" :formatter="formatXY" min-width="150">
			</el-table-column>
			<el-table-column prop="yLng" label="经度" :formatter="formatXY" min-width="150">
			</el-table-column>
			<el-table-column prop="county" label="所属区县" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="town" label="所属乡镇" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="yuKou" label="所属峪口" min-width="150" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
				<el-form-item label="名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input :rows="5" type="textarea" v-model="editForm.introduction"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="xLat">
					<el-input v-model="editForm.xLat" type="number"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="yLng">
					<el-input v-model="editForm.yLng" type="number"></el-input>
				</el-form-item>
				<el-form-item label="区县" prop="county">
					<el-select v-model="editForm.county" placeholder="请选择区县" @change="eChangeQuXian">
						<el-option :label="country.name" :value="country.id" v-for="country in countries"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="乡镇" prop="town">
					<el-select v-model="editForm.town" placeholder="请选择乡镇" @change="eChangeXiangZhen">
						<el-option :label="town.name" :value="town.id" v-for="town in towns"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="峪口">
					<el-select v-model="editForm.yuKou" placeholder="请选择峪口">
						<el-option :label="yukou.name" :value="yukou.id" v-for="yukou in yukous"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="位置描述">
					<el-input :rows="3" type="textarea" v-model="editForm.locationDescription"></el-input>
				</el-form-item>
				<el-form-item label="人文历史">
					<el-input :rows="5" type="textarea" v-model="editForm.history"></el-input>
				</el-form-item>
				<el-form-item label="自然风貌">
					<el-input :rows="5" type="textarea" v-model="editForm.naturalFeatures"></el-input>
				</el-form-item>
				<el-form-item label="其他说明">
					<el-input :rows="5" type="textarea" v-model="editForm.otherComments"></el-input>
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
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input :rows="5" type="textarea" v-model="addForm.introduction"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="xLat">
					<el-input v-model="addForm.xLat" type="number"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="yLng">
					<el-input v-model="addForm.yLng" type="number"></el-input>
				</el-form-item>
				<el-form-item label="区县" prop="county">
					<el-select v-model="addForm.county" placeholder="请选择区县" @change="changeQuXian">
						<el-option :label="country.name" :value="country.id" v-for="country in countries"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="乡镇" prop="town">
					<el-select v-model="addForm.town" placeholder="请选择乡镇" @change="changeXiangZhen">
						<el-option :label="town.name" :value="town.id" v-for="town in towns"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="峪口">
					<el-select v-model="addForm.yuKou" placeholder="请选择峪口">
						<el-option :label="yukou.name" :value="yukou.id" v-for="yukou in yukous"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="位置描述">
					<el-input :rows="3" type="textarea" v-model="addForm.locationDescription"></el-input>
				</el-form-item>
				<el-form-item label="人文历史">
					<el-input :rows="5" type="textarea" v-model="addForm.history"></el-input>
				</el-form-item>
				<el-form-item label="自然风貌">
					<el-input :rows="5" type="textarea" v-model="addForm.naturalFeatures"></el-input>
				</el-form-item>
				<el-form-item label="其他说明">
					<el-input :rows="5" type="textarea" v-model="addForm.otherComments"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script src="../../scripts/topic/jingdian.js">
</script>

<style scoped>
</style>