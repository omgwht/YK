<template>
    <div id="aside_biggest">
        <el-menu default-active="1">
            <el-menu-item index="1" @click="handleComponentChange('my-infocpt')">
                <i class="el-icon-info"></i>
                <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleComponentChange('rygl-view')">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">人员管理</span>
            </el-menu-item>
            <el-menu-item index="3"  @click="handleComponentChange('yprk-view')">
                <i class="el-icon-circle-plus"></i>
                <span slot="title">药品入库</span>
            </el-menu-item>
            <el-menu-item index="4" @click="handleComponentChange('ypck-view')">
                <i class="el-icon-remove"></i>
                <span slot="title">药品出库</span>
            </el-menu-item>
            <el-menu-item index="5" @click="handleComponentChange('dzbl-view')">
                <i class="el-icon-document"></i>
                <span slot="title">电子病历</span>
            </el-menu-item>
            <el-menu-item index="6" @click="handleComponentChange('doc-regislation')">
                <i class="el-icon-s-claim"></i>
                <span slot="title">挂号信息</span>
            </el-menu-item>
            <el-menu-item index="7" @click="handleComponentChange('chat-view')">
                <i class="el-icon-s-comment"></i>
                <span slot="title">医患交流</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data:{
        now_active: 1
    },
    methods:{
        handleComponentChange(componentName){
            this.$emit('componentName', componentName);
        }
    }
}
</script>

<style>
#aside_biggest span{
    color: #000;
}
.el-menu-item{
    background-color: #f7f2eb;
}
.el-menu-item.is-active{
    background-color: #faf3d8;
}
.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #eef0f1;
}
</style>