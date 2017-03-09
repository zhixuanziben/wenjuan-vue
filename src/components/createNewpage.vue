<template>
	<div class="createWrap">
		<div class="newPageDiv">
			<router-link to="/editPage"><el-button type="primary"><i class="el-icon-plus"></i>新建问卷</el-button></router-link>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	
</script>

<style>
	.createWrap {
		padding-top: 100px;
	}
	.newPageDiv {
		width: 70%;
		padding-top: 10%;
		padding-bottom: 10%;
		text-align: center;
		border: 1px solid #8492A6;
		border-radius: 5px;
		box-shadow: -2px 2px 1px #99A9BF;
		margin: 0 auto;
		background-color: white;
	}
	.el-icon-plus {
		margin-right: 10px;
	}
</style>