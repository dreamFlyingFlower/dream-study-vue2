<template>
  <div>
    <el-dialog title="编辑" :visible.sync="showConfigDialog" width="80%" center>
      <el-form :model="form" label-width="100px" :rules="rules" @submit.native.prevent>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基础数据</span>
          </div>
          <el-row :gutter="24">
            <!-- 旧表信息 -->
            <el-col :span="8">
              <el-form-item label="摄像机名称" required>
                <el-input v-model="form.camName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="摄像机编码">
                <el-input v-model="form.camNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属站点" required>
                <div @click="(()=>{ showTree = true })" @mouseleave="(()=>{ showTree = false })">
                  <el-input v-model="form.groupId" autocomplete="off"></el-input>
                  <div v-if="showTree">
                    <sortOrg :addr="OrgUrl" ref="tree" :lable="labels" :shows="false"></sortOrg>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="所属类型" required>
                <el-select v-model="form.cameraType">
                  <el-option v-for="item in cameraType" :key="item.dicId" :value="item.dicCode" :label="item.dicName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="摄像机形状" required>
                <el-select v-model="form.camShape" placeholder="请选择">
                  <el-option v-for="item in camShape" :key="item.dicId" :label="item.dicName" :value="item.dicCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图像类型">
                <el-select v-model="form.imageType">
                  <el-option v-for="item in imageType" :key="item.id" :value="item.imageType" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="8">
              <el-form-item label="是否同经纬度">
                <el-input v-model="form.sameBelong" autocomplete="off"></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="桩号">
                <el-input v-model="form.stake" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经度">
                <el-input v-model="form.longitude" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纬度">
                <el-input v-model="form.latitude" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="方向">
                <el-input v-model="form.direction" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品牌">
                <el-input v-model="form.camBrand" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="型号">
                <el-input v-model="form.camModel" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="云端控制台">
                <el-input v-model="form.cloudApi" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="摄像机描述">
                <el-input v-model="form.camDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="Ptz是否可控" required>
                <el-radio-group v-model="form.ptzCtrl">
                  <el-radio :label="0">不可控</el-radio>
                  <el-radio :label="1">可控</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否绑定音频">
                <el-radio-group v-model="form.audioBind">
                  <el-radio :label="0">不绑定</el-radio>
                  <el-radio :label="1">绑定</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="音频号码">
                <el-input v-model="form.audioNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车道信息</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="道路编号">
                <el-input v-model="form.roadNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="位置类型">
                <el-input v-model="form.locType" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="位置描述">
                <el-input v-model="form.locDesc" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="车道号">
                <el-input v-model="form.laneNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>扩展数据</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="for循环1">
                <el-input v-model="form.ex1" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="for循环2">
                <el-input v-model="form.ex2" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="for循环3">
                <el-input v-model="form.ex3" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import apiDic from '@/api/dic'
  import {
    sortOrg
  } from "@/components/index";
  export default {
    props: ["showConfigDialog"],
    data() {
      return {
        form: {
          camName: '',
          ptzCtrl: 1,
          audioBind: 0,
          cameraType: "",
          camShape: "",
          imageType: "图像"
        },
        rules: {
          camName: {
            required: true,
            message: "摄像机名称不能为空"
          },
          groupId: {
            required: true,
            message: "摄像机所属站点不能为空"
          },
          cameraType: {
            required: true,
            message: "摄像机类型不能为空"
          }
        },
        camShape: [],
        cameraType: [],
        imageType: [{
            imageType: "图像",
            id: 1
          },
          {
            imageType: "数字",
            id: 2
          }
        ],
        showTree: false
      };
    },
    components: {
      sortOrg
    },
    created() {
      this.getCamShape();
      this.getCameraType();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      closeDialog() {
        this.$emit("closeDialog", !this.showConfigDialog)
      },
      getCamShape() {
        apiDic.getTreeByCode("CameraShape").then((resp) => {
          if (resp.code === 1 && resp.data.length > 0) {
            this.camShape = resp.data;
            this.form.camShape = resp.data[0].dicCode;
          }
        });
      },
      getCameraType() {
        apiDic.getTreeByCode("CameraType").then((resp) => {
          if (resp.code === 1 && resp.data.length > 0) {
            this.cameraType = resp.data;
            this.form.cameraType = resp.data[0].dicCode;
          }
        });
      }
    },
  };
</script>