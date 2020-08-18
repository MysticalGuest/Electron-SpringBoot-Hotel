<template>
  <div class="guest">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-arrow-left" @click="goback" id="back-button">返回首页</el-button>
      </el-col>
      <el-col :span="20">
        <p class="theme">尊品360宾馆服务平台</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" center="true" id="col-search">
        <el-input placeholder="根据房号查询:" v-model="room" @input="doSearch" class='input-room'></el-input>
        <el-select
          v-model="selectprice"
          placeholder="请选择"
          style="width: 150px"
          @change="doSearch">
          <el-option
            v-for="item in priceJSON"
            :key="item.num"
            :label="item.price"
            :value="item.price">
            <span style="float: left">{{ item.num }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.price }}</span>
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-info" @click="showAll" id="all-button">显示全部</el-button>
        <el-button type="success" icon="el-icon-finished" @click="checkOutChecked" id="all-button">多选退房</el-button>
        <el-button type="info" icon="el-icon-s-promotion" @click="allCheckOut" id="all-button">全部退房</el-button>
      </el-col>
      <el-col :span="20" id="col-table">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="apartData.slice((currentPage-1) * pagesize, currentPage * pagesize)"
          border
          style="width: 95%"
          @selection-change="handleSelectionChange"
          highlight-current-row @row-click="handleCurrentChange">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column prop="roomNum" label="房号" align="center"></el-table-column>
          <el-table-column prop="price" label="房价" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.show">
                  <el-input size="small" v-model="scope.row.price"></el-input>
              </span>
              <span v-else>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="房间状态" align="center"
            :filters="[{ text: '已开出', value: true }, { text: '未开出', value: false }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === true ? 'primary' : 'success'"
                disable-transitions>{{scope.row.state === true ? '已开出' : '未开出'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="checkOut(scope.$index, scope.row)"
                v-if="scope.row.state && !scope.row.show">退房</el-button>
              <el-button
                v-if="!scope.row.show"
                size="mini"
                type="primary"
                @click="scope.row.show = true">修改</el-button>
              <span v-else>
                <el-button
                  size="mini"
                  type="primary"
                  @click="save(scope.row)">保存</el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="cancel(scope.row)">取消</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'
// import Vue from 'vue'

export default {
  name: 'guest',
  data() {
    return {
      room: '',
      apartData: [
        {roomNum: '6003', price: 108, state: false, show: false}
      ],
      total: 0,
      pagesize: 8,
      currentPage: 1,
      thestate: '',
      // 定义数组
      priceJSON: [],
      selectprice: '',
      pricetotal: 0,
      multipleSelection: [],
      loading: true,
      price: 0
    }
  },
  methods: {
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    filterTag(value, row) {
      return row.state === value;
    },
    goback() {
      this.$router.push({ path: '/front'});
    },
    handleCurrentChange(row, event, column) {
      // console.log(row, event, column, event.currentTarget)
    },
    checkOut(index, rows) {
      // rows.splice(index, 1);
      const param = new URLSearchParams();
      param.append('roomNum', rows.roomNum);
      // console.log('index: ', index);
      console.log('rows: ', rows.roomNum);
      this.$api.postData('/commonOperation/checkOut', param)
        .then(res => {
          this.apartData = res;
          this.$notify({
            title: '提示',
            message: rows.roomNum + '退房成功!'
          });
        })
        .catch(err => {
          console.log(err);
          this.$confirm('退房失败!', '提示', {
            confirmButtonText: '确定'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '返回重试!'
            });
            location.reload();
          });
        });
    },
    save(rows) {
      console.log(rows.roomNum);
      console.log(rows.price);
      const param = new URLSearchParams();
      param.append('roomNum', rows.roomNum);
      param.append('price', rows.price);
      this.$api.postData('/commonOperation/ResetPrice', param)
        .then(res => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          });
        })
        .catch(err => {
          this.$message.error('修改失败!返回重试!');
          console.log(err);
        });
      rows.show = false;
    },
    cancel(rows) {
      // '取消'操作下
      // 当用户修改房价后如果点'取消'
      // 虽然后台不会修改房价,但前端修改了
      // 为解决问题从后台拿数据重新显示
      console.log(rows.roomNum);
      console.log(rows.price);
      const param = new URLSearchParams();
      param.append('roomNum', rows.roomNum);
      this.$api.postData('/commonOperation/getApartmentByRoomNum', param)
        .then(res => {
          rows.price = res.price;
          this.$message({
            message: '取消成功!',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
        });
      rows.show = false;
    },
    doSearch: function() {
      const param = new URLSearchParams();
      param.append('roomNum', this.room);
      param.append('price', this.selectprice);
      this.$api.postData('/commonOperation/SearchApartmentInfo', param)
        .then(res => {
          this.apartData = res;
          this.total = res.length;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 对数据加序号
     * @param item 被加序号的对象
     * @param index 序号
     */
    addSerialNum(item, index) {
      const data = {}
      data.num = index + 1;
      data.price = item;
      this.priceJSON.push(data);
    },
    // 显示全部,将所有输入置空
    showAll: function() {
      // 将搜索框的输入清空,还原input的状态
      this.room = '';
      this.selectprice = '';
      const param = new URLSearchParams();
      param.append('roomNum', '');
      param.append('price', '');
      this.$api.postData('/commonOperation/SearchApartmentInfo', param)
        .then(res => {
          this.apartData = res;
          this.total = res.length;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.$confirm('显示失败!', '提示', {
            confirmButtonText: '确定'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '返回重试!'
            });
          });
        });
    },
    // 多选退房
    checkOutChecked: function() {
      console.log('this.multipleSelection: ', this.multipleSelection);
      const rooms = [];
      $.each(this.multipleSelection, function (index, item) {
        rooms.push(item.roomNum);
      });
      console.log('rooms: ', rooms);
      // 将rooms数组转为字符串传到后台
      var strRoom = rooms.join(',')
      if (rooms.length === 0) {
        this.$confirm('您未选中任何房间!', '提示', {
          confirmButtonText: '确定'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '返回重试!'
          });
        });
      } else {
        const param = new URLSearchParams();
        param.append('strRoom', strRoom);
        console.log('strRoom: ', strRoom);
        this.$api.postData('/commonOperation/checkOutChecked', param)
          .then(res => {
            this.apartData = res;
            this.$notify({
              title: '提示',
              message: '选中退房成功!'
            });
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.$confirm('显示失败!', '提示', {
              confirmButtonText: '确定'
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '返回重试!'
              });
            });
          });
      }
    },
    // 全部退房调用函数
    allCheckOut: function() {
      this.$api.postData('/commonOperation/allCheckOut')
        .then(res => {
          this.apartData = res;
          this.$notify({
            title: '提示',
            message: '全部退房成功!'
          });
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.$confirm('退房失败!', '提示', {
            confirmButtonText: '确定'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '返回重试!'
            });
            location.reload();
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {
    this.$api.postData('/front/apartmentList')
      .then(res => {
        console.log('res', res);
        this.apartData = res;
        for (var item in this.apartData) {
          this.apartData[item].show = false;
          console.log('item', this.apartData[item]);
        }
        this.total = res.length;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
    this.$api.postData('/front/priceList')
      .then(res => {
        // 对价格列表添加序号
        // this.priceList.forEach(this.addSerialNum);
        for (var i = 0; i < res.length; i++) {
          this.addSerialNum(res[i], i);
        }
        console.log('priceList: ', this.priceJSON);
        // this.apartData = res;
        // this.pricetotal = res.length;
      })
      .catch(err => {
        console.log(err);
      });
    console.log('apartData', this.apartData);
  }
}
</script>

<style scoped>
.input-room{
  width: 150px;
  margin-bottom: 20px;
}
.theme{
  font-family: HYChaoJiZhanJiaW;
  font-size: 40px;
  color: black;
}
#all-button{
  margin: 0 auto;
  margin-top: 20px;
}
#back-button{
  margin-right: 30px;
}
.el-pagination{
  padding-top: 15px;
}
</style>

<style>
/* 设置表主体的高度 */
td{
  padding:6px 0 !important;
}
</style>
