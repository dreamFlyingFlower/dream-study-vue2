
<template>
  <el-dialog :title="titles" :visible.sync="dialogFormVisible" size="large" :before-close="update">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">基础数据</span>
        </div>
        <div  class="text item">
          <el-row :gutter="24" >
            <el-col :span="8">
              <el-form-item label="名称:" prop="Name" required>
                <el-input v-model="formData.Name" placeholder="请输入名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="别名:"  prop="Alias">
                <el-input v-model="formData.Alias" placeholder="请输入别名" :maxlength="50/4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="位置类型:">
                <el-select  v-model="formData.PositionType"   placeholder="请选择方向" style="width: 100%;">
                  <el-option
                    v-for="item in PositionArr"
                    :key="item.DicID"
                    :label="item.DicName"
                    :value="item.DicName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" >
            <el-col :span="8">
              <el-form-item label="相对偏移:">
                <el-input-number v-model="formData.PositionOffset" :controls="false" placeholder="请输入相对偏移量" style="width: 100%;"  :max="10000" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="方向:">
                <el-select  v-model="formData.Direction"   placeholder="请选择方向" style="width: 100%;">
                  <el-option
                    v-for="item in DirectionArr"
                    :key="item.DicID"
                    :label="item.DicName"
                    :value="item.DicID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属高速:">
                <el-select  v-model="formData.HwyBelongTo"   placeholder="请选择所属高速" style="width: 100%;">
                  <el-option
                    v-for="item in HwyBelongToArr"
                    :key="item.HighWayID"
                    :label="item.Name"
                    :value="item.HighWayID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" >
            <el-col :span="8">
              <el-form-item label="桩号:">
                <el-input type="number" v-model="formData.StakeNum" :controls="false" placeholder="请输入桩号" style="width: 100%;"   :max="10000" :min="0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经度:" prop="PositionX" :rules="[{ required: true, message: '经度不能为空'},{ type: 'number', message: '经度必须为数字值'}]"required>
                <el-input v-model.number="formData.PositionX" :controls="false" placeholder="请输入经度" style="width: 83%;" required></el-input>
                <el-popover ref="showMap" placement="top" width="500" trigger="hover">
                  <Maps @getCoord="getCoords"  :locationX="formData.PositionX" :locationY="formData.PositionY"></Maps>
                </el-popover>
                <el-button  v-popover:showMap  class="rt">+</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纬度:">
                <el-input-number v-model.number="formData.PositionY" :controls="false" placeholder="请输入纬度" style="width: 100%;"   :max="10000" :min="0"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" >
            <el-col :span="8">
              <el-form-item label="位置描述:">
                <el-input v-model="formData.PositionDesc" placeholder="请输入位置" :maxlength="50/4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="大地经度:" prop="PositionXCalc">
                <el-input v-model.number="formData.PositionXCalc" :controls="false" placeholder="请输入大地经度"  style="width: 100%;"  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="大地纬度:">
                <el-input v-model.number="formData.PositionYCalc" :controls="false" placeholder="请输入大地纬度" style="width: 100%;"   :max="10000" :min="0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" >
            <el-col :span="8">
              <el-form-item label="管理机构:" prop="OrgName" :rules="[{required: true, message: '组织机构不能为空', trigger: 'blur'}]">
                <div @click="(()=>{ showTree = true })" @mouseleave="(()=>{ showTree = false })">
                  <el-input v-model="formData.OrgName" :disabled="true" placeholder="请选择所属机构" :maxlength="30" ></el-input>
                  <div v-if="showTree" >
                    <tree :addr="OrgUrl" ref="tree" :lable="labels" :shows="false"></tree>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="描述:">
                <el-input v-model="formData.Description" placeholder="请输入内容" :maxlength="500/4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图片:">
                <el-upload
                  class="upload-demo"
                  :action="action + '/File/Upload'"
                  :file-list="fileListShow"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :on-success="onSuccess"
                  list-type="picture">
                  <el-button size="small" type="primary" >点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传单张jpg/png文件，且不超过2MB</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">扩展数据</span>
        </div>
        <div  class="text item">
          <div v-for="(items, indexs) in formData.nameMaps" >
            <el-row :gutter="24" >
              <div v-for="(item, index) in DynLabels" >
                <el-col :span="8" v-if="item.BaseDataModuleFieldName">
                  <div v-if="item.FieldType == '数据字典类型'">
                    <el-form-item
                      :label="item.BaseDataModuleFieldName"
                      :key="item.key"
                      :rules="{ required: isRequest(item)  ,validator: checkNameMaps,  trigger: 'blur'}"
                      :prop="'nameMaps.' + indexs + '.'+ item.BaseDataModuleFieldName"
                    >
                      <el-select  v-model="items[item.BaseDataModuleFieldName]"    style="width: 100%;">
                        <el-option v-for="dicItem in DicArr" :key="dicItem.DicID" :label="dicItem.DicName" :value="dicItem.DicID"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                  <div v-else>
                    <el-form-item
                      :label="item.BaseDataModuleFieldName"
                      :key="item.key"
                      :rules="{ required: isRequest(item)  ,validator: checkNameMaps,  trigger: 'blur'}"
                      :prop="'nameMaps.' + indexs + '.'+ item.BaseDataModuleFieldName">
                      <el-input  v-model="items[item.BaseDataModuleFieldName]" placeholder="请输入内容" auto-complete="off" @focus="checkNumber(item)" style="width: 85%;" :maxlength="item.FieldLength"></el-input>
                      <span class="rt grid-content" >{{ item.FieldUnit }}</span>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
      </el-card>
      <div style="margin-left: 30%">
        <el-form-item>
          <el-button type="primary" @click="submitFroms"   >确定</el-button>
          <el-button @click="update">返回</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div v-if="mapshow">
      <Maps :mapShow="mapshow"></Maps>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {tree} from 'components'
  import Maps from './seachMap.vue'
  export default {
    props: ['data'],
    data(){
      return {
        action: this.Api,
        mapshow: false,
        showTree: false,
        titles: "编辑菜单",
        labels: {
          defaultId: "OrganizationID",
          treeName: "OrgName"
        },
        DicArr: [],
        DynLabels: [],
        OrgUrl: '',
        HwyBelongToArr: [],
        DirectionArr: [],
        formData: {
          IsDeleted: true,
          BaseDataOnHighway: true,
          HwyBelongTo: '',
          Direction: '',
          PositionType: '',
          PositionDesc: '',
          PositionX: '',
          PositionY: '',
          OrgName: '',
          StakeNum: '',
          Description: '',
          LastModifyTime: new Date(),
          nameMaps: []
        },
        rules: {
          Name: [{ validator: this.name, trigger: 'blur'}],
          Alias: [{ validator: this.alias, trigger: 'blur'}],
        },
        oTest: {},
        fileList: [],
        PositionArr: [],
        fileListShow: []
      }
    },
    created(){
      this.initData()
    },
    components: {
      tree,
      Maps
    },
    watch: {
      'TreeData':  {
        handler:function(data){
          this.formData.OrgName = data.OrgName
          this.formData.OrganizationID = data.OrganizationID
        },
        deep:true
      },
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
        TreeData: 'TreeData',
      }),
    },
    methods: {
      ...mapActions([
        'update',
      ]),
      isRequest(item) {
        return item.AllowNull == 0 ? true : false
      },
      checkNameMaps(rule, value, callback) {
        let AllowNull = this.oTest.AllowNull
        let name = this.oTest.BaseDataModuleFieldName
        let RegulaLimitType = eval(this.oTest.RegulaLimitType)
        if(value == '') {
          if(AllowNull) {
            if(AllowNull == 0) {
              callback(new Error(name + "不能为空"))
            }else {
              callback()
            }
          }else {
            if (rule.required == true) {
              let nameArr = rule.field.split('.')
              callback(new Error(nameArr[nameArr.length - 1] + "不能为空"))
            }else {
              callback()
            }
          }
        } else {
          if(this.oTest.FieldType == "数字" || this.oTest.FieldType == "是否") {
            if(isNaN(value)) {
              callback(new Error(name + "必须为数字"))
            }else {
              if(RegulaLimitType) {
                if(!RegulaLimitType.test(value)) {
                  callback(new Error(name + "验证不通过"))
                }else {
                  callback()
                }
              }else {
                callback()
              }
            }
          }else {
            if(RegulaLimitType) {
              if(!RegulaLimitType.test(value)) {
                callback(new Error(name + "验证不通过"))
              }else {
                callback()
              }
            }else {
              callback()
            }
          }
          this.oTest = []
        }
      },
      checkNumber(item) {
        this.oTest = item
      },
      alias(rule, value, callback) {
        if(value == this.formData.Name) {
          callback(new Error("别名不能与名称相同"))
        }else {
          callback()
        }
      },
      name(rule, value, callback) {
        let $this = this
        if (value === '' || value == undefined) {
          callback(new Error("数据名称不能为空"))
        } else {
          if(value) {
            this.$AjaxPost("Feature/hasValue", {name: value, moduleId: this.formData.BaseDataModuleID}, ((data)=>{
              let result = data.result
              if( data && result.length != 0  ) {
                if(result[0].FeatureBaseID != $this.formData.FeatureBaseID  && result[0].Name == $this.formData.Name) {
                  callback(new Error("数据名称已存在"))
                } else {
                  callback();
                }
              }else {
                callback();
              }
            }))
          }
        }
      },
      refresh(){
        let obj = {}
        for(let i in this.DynLabels) {
          if(this.DynLabels[i].BaseDataModuleFieldName) {
            obj[this.DynLabels[i].BaseDataModuleFieldName] = ''
          }
        }
        this.formData.nameMaps.push(obj)
        if(this.data.pid == 0) {
          this.titles = "新增数据"
          this.formData.pid = this.data.pid
          this.formData.BaseDataModuleName = this.data.BaseDataModuleName
          this.formData.BaseDataModuleID = this.data.BaseDataModuleID
          this.formData.OrgName = this.get_user_info.user.OrgName
          this.formData.OrganizationID = this.get_user_info.user.OrganizationID
        }else {
          this.titles = "编辑数据"
          this.$AjaxGet(`Feature/Detail/${this.data.pid}`, '', function (data) {
            if(data.code != 0) {
              for(let key in data.result) {
                if(data.result.hasOwnProperty(key) === true) {
                  this.formData[key] = data.result[key]
                }
              }
              this.formData.nameMaps[0].FeatureBaseID = this.formData.FeatureBaseID

              if( data.result.picMaps.length != 0 && data.result.picMaps[0].MediaPath != null) {
                for(let i in data.result.picMaps) {
                  this.fileListShow.push( { name: data.result.picMaps[i].MediaPath.slice(data.result.picMaps[i].MediaPath.lastIndexOf('/')+1), url: data.result.picMaps[i].MediaPath})
                }
                this.fileList = data.result.picMaps
              }
            }
          }.bind(this));
        }
      },
      initData() {
        // 初始化下拉框
        let organizationID = this.get_user_info.user.OrganizationID
        this.OrgUrl = "Organization/TreeRoot/" + organizationID
        this.$AjaxGet('HighWay/List', { organizationID: organizationID}, function(data){
          if(data.code ==1) {
            this.HwyBelongToArr = data.result
          }
        }.bind(this))
        this.$AjaxGet('Dictionary/CodeChild/Direction', '' , function(data){  //  初始化方向下拉框
          if(data.code == 1) {

            this.DirectionArr = data.result
          }
        }.bind(this))
        this.$AjaxGet('Dictionary/CodeChild/PositionType', '' , function(data){   //  初始化位置下拉框
          if(data.code == 1) {
            this.PositionArr = data.result
          }
        }.bind(this))
        this.$AjaxGet('Dictionary/CodeChild/cermareType', '', function(data) {  //  初始化情报板下拉框
          if(data.code == 1) {
            this.DicArr = data.result
          }
        }.bind(this))
        this.$AjaxGet(`Feature/FieldByTypeId/${this.data.BaseDataModuleID}`,'', function (ret) {
          if(ret.code != 0){
            let result = ret.result
            this.DynLabels = result
            if(result[0]) {
              this.formData.tableName = {
                tableName: result[0].BaseDataTableName
              }
            }
            this.refresh()
          }
        }.bind(this))
      },
      beforeUpload(file) {
        const isJPG = file.type.split('/')[0] === 'image';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSuccess(response, file, fileList) {   // 上传成功
        if(this.formData.pid == 0) {          // 如果是新增取file对象里的路径
          this.fileList.push(file.raw)
        }else {                               // 如果是编辑取上传后的路径
          this.fileList.push(response.result)
        }
      },
      handleRemove(file, fileList) {
        for(let i in this.fileList) {
          let mediaPath = this.fileList[i].MediaPath;
          if(file.url == mediaPath) {
            this.$RemoveFile(mediaPath, function (data) {
              if (data.code == 1) {
                this.fileList.splice(i, 1)
              }
            }.bind(this))
          }
        }
      },
      getCoords(Lng, Lat) {           // 拿到坐标值
        this.formData.PositionX = Lng
        this.formData.PositionY = Lat
      },
      submitFroms(){  //提交
        this.formData.LoginId = this.get_user_info.user.UserID
        this.$refs.formData.validate((valid) => {
          if (valid) {
            if(this.formData.pid == 0) {
              if(this.fileList != null && this.fileList.length>0){
                this.$AjaxAdd('Feature/CreateFeature', this.formData, this.fileList, function(data) {
                  if(data.code ==1) {
                    this.$message.success("新增成功");
                    this.update(1)
                  }else {
                    this.$message.success("新增失败");
                  }
                }.bind(this))
              }else{

                this.submitFrom(this, this.formData.pid, 'Feature/Create', '', this.formData )
              }
            }else {
              this.formData.files =  this.fileList
              this.submitFrom(this, this.formData.pid, '', 'Feature/Edit', this.formData )

            }
          }
        });
      },
    },
  }
</script>

<style scope>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin-bottom: 10px;
  }
  .rt {
    float: right;
  }
</style>
