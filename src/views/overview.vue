<template>
    <div class="overview">
        <div class="top"></div>
        <div class="bottom"></div>
    </div>
</template>
<script>
export default {
    name: 'overview',
    created(){
    	console.log("created")
    },
    mounted(){
    	console.log("mounted")
    },
    updated(){
    	console.lof("updated")
    },
    destroyed(){
    	console.log("destroyed")
    }
}
</script>
<style scoped lang="scss">
.overview{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom:0;
	padding: 20px;
	.top{
		height: 50%;
		background: #ccc;
	}
	.bottom{
		height: 50%;
		background:#666;
	}
}

</style>