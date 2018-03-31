<script>
export default {
    data() {
        return {
        };
    },
    methods: {
    },
    watch: {
    }
};
</script>
<template>
	<transition name="dialog-fade">
		<div class="dialog_wrapper">
            <div class="dialog">
                <div class="title">
                    <div class="text">切换城市</div>
                    <img src="/static/images/close.png">
                </div>
            </div>
        </div>
	</transition>
</template>
<style lang="less" scoped>
.dialog_wrapper{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999;
}
.dialog{
    
}
</style>