<template>
	<div id="wrap" class="wrap">
		<table  border="0" cellspacing="0"class="table">
			<tr>
				<th></th>
				<th>标题</th>
				<th>时间</th>
				<th>状态</th>
				<th>
					<span class="left">操作</span>
					<router-link to="/createNewpage" class="right"><el-button type="primary"><i class="el-icon-plus icon"></i>新建问卷</el-button></router-link>
				</th>
	    		<router-view></router-view>
			</tr>
			<tr v-for="(item, index) of allTitle" class="tr">
					<td class="td"><el-checkbox label=""></el-checkbox></td>
					<td class="td">{{item.title}}</td>
					<td class="td">{{ item.dateArr[0] }}-{{ item.dateArr[1]>9?item.dateArr[1]:('0'+ (item.dateArr[1]+1))}}-{{ item.dateArr[2]}} {{ item.dateArr[3] }}:{{ item.dateArr[4] }}:{{ item.dateArr[5] }}</td>
					<td class="td" :class="{onColor: item.status == '发布中'}" >{{item.status}}</td>
					<td  class="td">
						<router-link :to="'/editPage/' + (index + 1)" class="link"><el-button>编辑</el-button></router-link>
						<el-button @click="deletePage(index)">删除</el-button>
						<el-button v-if="item.status==='未发布'">查看问卷</el-button>
						<el-button v-if="item.status==='发布中'||item.status==='已结束'">查看数据</el-button>
					</td>
					<router-view></router-view>
			</tr>
			<tr>
				<td><el-checkbox label="全选"></el-checkbox></td>
				<td><el-button size="small">删除</el-button></td>
			</tr>
			
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				allPage: [],
				allTitle: [],
				pageMsg: {},
				storage: window.localStorage
			}
		},
		created: function() {
			//if (this.storage.getItem("allPage")) {
				var json=this.storage.getItem("allPage");
            	var jsonObj=JSON.parse(json);
            	this.allTitle = jsonObj;
            	//console.log(this.allTitle[4].dateArr);
			//}
		},
		methods: {
			getStatu: function(arr) {
				if (arr == "未发布") {
					arr = "cao"
				}
			},
			deletePage: function(ind) {
				//console.log(JSON.stringify(this.allTitle));
				this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.allTitle.splice(ind, 1);
					var a = JSON.stringify(this.allTitle);	
					this.storage.setItem('allPage', a);
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			}
		}
	}
</script>

<style>
	.wrap {
		background-color: #E5E9F2;
		overflow: hidden;
	}
	.table {
		margin: 0 auto;
		background-color: white;
		border: 1px solid #99A9BF;
		border-radius: 5px;
		box-shadow: -1px 1px 1px #99A9BF;
	}
	.left {
		position: relative;
		top: 50%;
		float: left;
		line-height: 40px;
	}
	.right {
		float: right;
	}
	.icon {
		margin-right: 10px;
	}
	.onColor {
		color: #1D8CE0;
	}
	th {
		text-align: left;
		background-color: #E5E9F2;
		padding: 10px 20px;
	}
	td {
		padding: 5px 20px;
	}
	.tr:hover {
		background-color: #58B7FF;
	}
	.td {
		box-sizing: border-box;
		border-bottom: 1px solid #E5E9F2;
	}
	.link {
		text-decoration: none;
		color: black; 
	}
</style>