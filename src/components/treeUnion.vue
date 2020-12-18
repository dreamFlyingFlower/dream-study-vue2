<template>
  <div class="el-select">
    <el-input placeholder="请选择" v-model="branchName" readonly="readonly" v-on:click.stop.native="isShowSelect = !isShowSelect;">
      <!-- <i id="suffix" class="el-select__caret el-input__icon el-icon-arrow-up" slot="suffix"></i> -->
      <i class="el-select__caret el-input__icon el-icon-arrow-up" :style="styleDown" slot="suffix"></i>
    </el-input>
    <div v-if="isShowSelect" class="el-select-dropdown el-popper" style="min-width: 180px; transform-origin: center top 0px; z-index: 2011;" x-placement="bottom-start">
      <div class="el-scrollbar">
        <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom:-19px;margin-right:-19px;">
          <el-tree :expand-on-click-node="false" :data="branchTree" :props="defaultProps" @node-click="handleNodeClick" style="top:5px;padding-bottom:5px;" empty-text="无数据">
          </el-tree>
        </div>
        <div class="el-scrollbar__bar is-horizontal">
          <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
        </div>
        <div class="el-scrollbar__bar is-vertical">
          <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
        </div>
      </div>
      <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["branchTree"],
  data() {
    return {
      branchId: "",
      branchName: "",
      // 是否显示巡检对象的树状选择器
      isShowSelect: false,
      defaultProps: {
        children: "childbranch",
        label: "branchName"
      }
    }
  },
  created() {
    this.initShow();
  },
  computed:{
    styleDown:function(){
      if(this.isShowSelect){
        return {transform:"rotateZ(0)"};
      }
    }
  },
  methods: {
    // 点击巡检对象的选择器的树节点
    handleNodeClick(data, Node) {
      // 如果是顶级父节点
      // if (Node.parent.level === 0) {
      //   // 不会触发事件
      // } else {
      //   this.formData.inspectObjectName = data.departName;
      //   this.formData.inspectObject = data.id;
      //   // 关闭选择器
      //   this.isShowSelect = false;
      // }
      this.branchId = data.branchId;
      this.branchName = data.branchName;
    },
    initShow(){
      var that = this;
      document.addEventListener("click", function() {
        that.isShowSelect = false;
        return false;
      }, false);
    }
  }
}

</script>
<style scope>
.el-tree-node__content {
  display: -webkit-box;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  height: 34px;
  cursor: pointer;
  padding: 15px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 34px;
  box-sizing: border-box;
}

.el-tree__empty-text {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.el-select-dropdown__empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.el-tree__empty-block {
  min-height: 33px;
}

</style>