<template>
	<div id="editPage" class="wrap">
		<div class="editWrap">
			<div class="header">
				<input v-model= "titleInput" class="titleInp" @click="changeInp"></input>
			</div>
			<div class="questionsInputWrap">
				<div class="questionsInput">
					<div class="quesHolder">
						<div class="eachQusDiv" v-for="(item, index) of this.questionsList">
							<div v-if="item.type == '单选题'">
								<h3>{{ index + 1 }}. {{ item.question }}({{item.type}})</h3>
								<p v-for="ans of item.answers">
									<el-radio class="radio" v-model="radio[index]" :label="ans">
										<span>{{ ans }}</span>
									</el-radio>
								</p>
								<div class="optsBtn">
									<el-button size="small" @click="preMove(index)">上移</el-button>
									<el-button size="small" @click="nextMove(index)">下移</el-button>
									<el-button size="small" @click="copyQus(index)">复用</el-button>
									<el-button size="small" @click="delQus(index)">删除</el-button>
								</div>
							</div>
							<div v-if="item.type == '多选题'">
								<h3>{{ index + 1 }}. {{ item.question }}({{item.type}})</h3>
								<p v-for="ans of item.answers">
									<el-checkbox>{{ ans }}</el-checkbox>
								</p>
								<div class="optsBtn">
									<el-button size="small" @click="preMove(index)">上移</el-button>
									<el-button size="small" @click="nextMove(index)">下移</el-button>
									<el-button size="small" @click="copyQus(index)">复用</el-button>
									<el-button size="small" @click="delQus(index)">删除</el-button>
								</div>
							</div>
							<div v-if="item.type == '文本题'">
								<h3>{{ index + 1 }}. {{ item.question }}({{item.type}})</h3>
								<el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
								<div class="optsBtn">
									<el-button size="small" @click="preMove(index)">上移</el-button>
									<el-button size="small" @click="nextMove(index)">下移</el-button>
									<el-button size="small" @click="copyQus(index)">复用</el-button>
									<el-button size="small" @click="delQus(index)">删除</el-button>
								</div>
							</div>
						</div>
					</div>
					<div  v-if="showQuestionEdit" class="questionShow">
						<radio :rad="qusType" v-on:saveQuestion="ceshi" v-on:cancelQuestion="cancelRsp"></radio>
					</div>
					<div v-show="showCheckOptions" class="showCheckOptions">
						<el-button icon="check" @click="showRadio">单选题</el-button>
						<el-button icon="circle-check" @click="showCheckbox">多选题</el-button>
						<el-button icon="document" @click="showTextarea">文本题</el-button>
					</div>
					<div class="addQuestionBtn">
						<el-button type="primary" icon="plus" @click="addQuestions">添加问题</el-button>
					</div>
				</div>
			</div>
			<div class="options">
				<span>问卷截止日期</span>
				<el-date-picker v-model='endDate' type='date' placeholder="选择问卷截止日期" :picker-options="pickerOptions0"></el-date-picker>
				<div class="pageOptions">
					<el-button type="primary" @click="savePage('未发布', '保存')">保存问卷</el-button>
					<el-button type="primary" @click="savePage('发布中', '发布')">发布问卷</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import radio from './radio'
	export default {
		data() {
			return {
				titleInput: '请在这里输入你的标题',
				qusType: '',
				startDate: '',
				endDate: '',
				dateArr: [],
				status: '',
				jsonRromRadio: '',
				showCheckOptions: false,
				showQuestionEdit: false,
				radio: [],
				allPage: [],
				wholePage: {},
				questionsList: [],
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				}
			}
		},
		components: { 
			radio: radio
		},
		created: function() {
			console.log(this.$route.params.id);
			if (this.$route.params.id) {
				var json = window.localStorage.getItem("allPage")
				var jsonObj = JSON.parse(json);
				this.wholePage = jsonObj[this.$route.params.id-1];
				this.titleInput = this.wholePage.title;
				this.endDate = this.wholePage.endDate;
				this.questionsList = this.wholePage.questionsList;
			}
		},
		methods: {
			addQuestions: function() {
				this.showCheckOptions = !this.showCheckOptions;
			},
			changeInp: function() {
				this.titleInput = "";
			},
			showRadio: function() {
				this.qusType = "单选题";
				this.showQuestionEdit = !this.showQuestionEdit;
				this.showCheckOptions = !this.showCheckOptions;
			},
			showCheckbox: function() {
				this.qusType = "多选题";
				this.showQuestionEdit = !this.showQuestionEdit;
				this.showCheckOptions = !this.showCheckOptions;
			},
			showTextarea: function() {
				this.qusType = "文本题";
				this.showQuestionEdit = !this.showQuestionEdit;
				this.showCheckOptions = !this.showCheckOptions;
			},
			cancelRsp: function(arr) {
				//如果收到子组件传来的为0，则为false，否则为true
				this.showQuestionEdit = (arr.valueOf() == 0?false:true);
			},
			ceshi: function(arr) {
				this.jsonRromRadio = arr;
				this.questionsList.push(this.jsonRromRadio);
				this.showQuestionEdit = !this.showQuestionEdit;
				//alert(this.questionsList[0].type);
			},
			preMove: function(ind) {
				if ( ind === 0) {
					return false;
				}
				else {
					let qus = this.questionsList.slice(ind, ind+1);
					this.questionsList.splice(ind, 1);
					this.questionsList.splice(ind-1, 0, qus[0]);
				}
			},
			nextMove: function(ind) {
				if ( ind === (this.questionsList.length-1)) {
					return false;
				}
				else {
					let qus = this.questionsList.slice(ind, ind+1);
					this.questionsList.splice(ind, 1);
					this.questionsList.splice(ind+1, 0, qus[0]);
				}
			},
			judgeType: function() {

			},
			copyQus: function(ind) {
				//先把要复用的那一项给复制一份，然后传给被复用的下一个索引
				let qus = this.questionsList.slice(ind, ind+1);
				this.questionsList.splice(ind+1, 0, qus[0]);
			},
			delQus: function(ind) {
				//将被删除的项从数组中删去
				this.questionsList.splice(ind, 1)
			},
			savePage: function(arr1, arr2) {
				this.$confirm('确定' + arr2 + '问卷吗, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.status = arr1;
					this.startDate = new Date();
					this.dateArr = [this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), this.startDate.getHours(), this.startDate.getMinutes(), this.startDate.getSeconds()];
					this.wholePage.title = this.titleInput;
					this.wholePage.status = this.status;
					this.wholePage.startDate = this.startDate;
					this.wholePage.endDate = this.endDate;
					this.wholePage.dateArr = this.dateArr;
					this.wholePage.questionsList = this.questionsList;
					var storage=window.localStorage;
					//如果已有缓存，则添加新的缓存
					if (window.localStorage.getItem("allPage")) {
						var json = window.localStorage.getItem("allPage")
						var jsonObj = JSON.parse(json);
						this.allPage = jsonObj;
					}
					//如果发现是查看的行为，则不添加新的数据
					if(!this.$route.params.id) {
						this.allPage.push(this.wholePage);
					}
					else {
						this.allPage[this.$route.params.id-1] = this.wholePage;
					}
					var allPage = JSON.stringify(this.allPage);	
					storage.setItem("allPage", allPage);
					this.$emit('savepage', this.allPage);
					this.$message({
						type: 'success',
						message: arr2 + '成功!'
					});
					}).catch(() => {
						this.$message({
						type: 'info',
						message: '已取消'+ arr2
					});          
				});
				
			}
		}
	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;	
	}
	.wrap {
		width: 100%;
		height: 100%;
		background-color: #E5E9F2;
		padding: 5% 10%;
		box-sizing: border-box;
	}
	.editWrap {
		background-color: white;
		padding: 30px 0;
		box-sizing: border-box;
	}
	.questionsInputWrap {
		width: 80%;
		margin: 0 auto;
		margin-top: 50px;
		margin-bottom: 50px;
		border-top: 2px solid #D3DCE6;
		border-bottom: 2px solid #D3DCE6;
		padding: 20px;
	}
	.header {
		width: 80%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	.titleInp {
		border-style: none;
		font-size: 30px;
		text-align: center;
		background-color: #D3DCE6;
		width: 100%;
		height: 80px;
		cursor: pointer; 
	}
	.titleInp:hover {
		background-color: #58B7FF;
	}
	.questionShow {
		width: 80%;
		margin: 0 auto;
		margin-top: 30px;
		margin-bottom: 30px; 
		background-color: #D3DCE6;
		padding: 30px;
	}
	.options {
		text-align: center;
	}
	.pageOptions {
		float: right;
		margin-right: 20%;
	}
	.questionsInput {
		border: 1px solid #D3DCE6;
	}
	.showCheckOptions {
		margin-bottom: 20px;
		width: 40%;
		margin: 0 auto;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.eachQusDiv {
		margin: 10px;
		padding: 20px;
		padding-top: 10px;
	}
	.eachQusDiv:hover {
		background-color: #58B7FF;
	}
	.optsBtn {
		text-align: right;
	}
	.addQuestionBtn {
		padding: 20px;
		background-color: #E5E9F2;
		text-align: center;
	}
</style>