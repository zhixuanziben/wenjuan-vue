<template>
	<div>
		<div v-if="editQuestion">
			<el-input class="titleSty" v-model = "questionInp" size="large" placeholder = "请输入问题"><template slot="prepend">题目</template></el-input>
			<el-input class="optionsSty" v-for="item in answerInp" v-model="item.options" size="small" placeholder="请输入选项"><template slot="prepend">选项</template></el-input>
	  		<el-button icon="plus" @click="addOptions" :disabled="addBtnDisable">添加选项</el-button>
	  		<div class="btn">
	  			<el-button type="primary" v-on:click="cancelQuestion">取消</el-button>
	  			<el-button type="primary" v-on:click="saveQuestion">确定</el-button>
	  		</div>
	  	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editQuestion: true,
				questionInp: '',
				answerInp: [
					{
						options: ''
					},
					{
						options: '',
					}
				],
				addBtnDisable: false,
				putJson: {
					question: '',
					type: '',
					must: '',
					answers: []
				}
			}
		},
		props: ['msg','rad'],
		created: function() {
			if (this.rad === "单选题") {
				return
			}
			else if (this.rad === "多选题") {
				this.answerInp.push({options:''});
			}
			else {
				this.answerInp.splice(0);
				this.addBtnDisable = true;
			}
			
		},
		methods: {
			addOptions: function() {
				this.answerInp.push({options: ''});
			},
			cancelQuestion: function() {
				this.editQuestion = false;
				//将编辑窗口状态信息以0（false），1（true）的形式发送出去
				this.$emit('cancelQuestion', this.editQuestion == false?0:1);
			},
			saveQuestion: function(msg) {
				//问题编辑页面随之消失
				this.editQuestion = false;
				this.putJson.question = this.questionInp;
				if (this.rad === "单选题") {
					this.putJson.type = "单选题";
				}
				else if (this.rad === "多选题") {
					this.putJson.type = "多选题";
				}
				else {
					this.putJson.type = "文本题";
				}
				this.putJson.must = "1";
				for (let i = 0; i < this.answerInp.length; i++) {
					this.putJson.answers.push(this.answerInp[i].options);
				};
				this.$on('ceshi', function (msg) {
  					console.log(msg)
				})
				this.$emit('saveQuestion', this.putJson	);
			}
		}
	}
</script>

<style>
	.titleSty,
	.optionsSty {
		margin-bottom: 10px;
	}
	.btn {
		float: right;
	}
</style>