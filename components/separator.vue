<template>
	<div class="separator">
	    <div class="circle sm"></div>
        <div class="circle base"></div>
        <div class="circle lg"></div>
        <div class="txt">
           {{title}}
        </div>
        <div class="circle lg"></div>
        <div class="circle base"></div>
        <div class="circle sm"></div>
	</div>
</template>
<script>
export default {
    props:{
        title:{
            default: '分隔栏名',
            type:String,
        }
    }
}
</script>

<style lang="scss" scoped>
.separator{
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: $uni-spacing-col-lg 0;
    background:#fff;
    .txt{
        color: $color-primary-plain;
        font-size: $uni-font-size-lg;
        margin: 0 4px;
    }
    .circle{
        background: $color-primary;
        border-radius:50%; 
        margin: 0 4px;
    }
    .sm{
        width: 6px;
        height: 6px;
    }
    .base{
        width: 8px;
        height: 8px;
    }
    .lg{
        width: 10px;
        height: 10px;
    }
}
</style>
