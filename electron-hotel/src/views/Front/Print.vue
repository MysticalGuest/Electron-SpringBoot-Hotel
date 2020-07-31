<template>
  <div>
    <table border='1'>
      <tr>
        <td class='td-1' colspan='11'>尊品360宾馆欢迎您！</td>
      </tr>
      <tr>
        <td class='td-2-1' colspan='2'><strong>日期：</strong></td>
        <td class='td-2-3' colspan='2'><div id='nowdate' v-html="nowdate"></div></td>
        <td class='td-2-5'><strong>客人姓名：</strong></td>
        <td class='td-2-6'>
          <div id='cName' contenteditable='plaintext-only' ref="cName"></div>
          <input  type='hidden' name='forcName' id='forcName' />
        </td>
        <td class='td-2-7'><strong>房号：</strong></td>
        <td class='td-2-8' colspan='2'>
          <el-select
            v-model="room"
            value-key="roomNum"
            multiple
            collapse-tags
            placeholder="请选择">
            <el-option
              v-for="item in roomoptions"
              :key="item.roomNum"
              :label="item.roomNum"
              :value="item">
              <span style="float: left">{{ item.roomNum }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.price }}</span>
            </el-option>
          </el-select>
        </td>
        <td class='td-2-10'><strong>操作员：</strong></td>
        <td class='td-2-11'>{{aName}}</td>
      </tr>
      <tr>
        <td class='td-3-1' colspan='2'><strong>记账项目</strong></td>
        <td><strong>入住时间</strong></td>
        <td><strong>总计天数</strong></td>
        <td><strong>房间价格</strong></td>
        <td><strong>数量</strong></td>
        <td><strong>押金</strong></td>
        <td class='td-3-8' colspan='4'><strong>其他消费</strong></td>
      </tr>
      <tr>
        <td class='td-4-1' colspan='2'>
          <input name='roomType' type='radio' checked='checked' value='allDay'/>
          <strong>日住全天房：</strong>
        </td>
        <td rowspan='2'><div id='nowtime' v-html="nowtime"></div></td>
        <!-- 总计天数 -->
        <td class='td-4-4'><input type='number' min='0'></td>
        <!-- 房间价格 -->
        <td class='td-4-5'><div id='sumOfPrice1'></div>元</td>
        <!-- 数量 -->
        <td class='td-4-6'><div id='sumOfRooms1'></div>间</td>
        <!-- 押金 -->
        <td class='td-4-7'><div id='deposit1'></div>元</td>
        <td class='td-4-8' colspan='4'></td>
      </tr>
      <tr>
        <td class='td-5-1' colspan='2'>
          <input name='roomType' type='radio' value='hour'/><strong>日住钟点房：</strong>
        </td>
        <!-- 上一行td时间占了2行rowspan=2 -->
        <!-- 总计天数 -->
        <td class='td-5-4'><input type='number' min='0'></td>
        <!-- 房间价格 -->
        <td class='td-5-5'><div id='sumOfPrice2'></div>元</td>
        <!-- 数量 -->
        <td class='td-5-6'><div id='sumOfRooms2'></div>间</td>
        <!-- 押金 -->
        <td class='td-5-7'><div id='deposit2'></div>元</td>
        <td class='td-5-8' colspan='4'></td>
      </tr>
      <tr>
        <td class='td-6-1' colspan='2'><strong>房费和押金：</strong></td>
        <td class='td-6-3'>
          <div id='chargeAndDeposit' contenteditable='true' ref="chargeAndDeposit">200</div>元
          <input name='fee' id='fee' type='hidden' />
        </td>
        <td colspan='3'></td>
        <td class='td-6-7' colspan='5'><strong>欢迎光临尊品360宾馆！</strong></td>
      </tr>
      <tr>
        <td class='td-7-1'><strong>地址：</strong></td>
        <td class='td-7-2' colspan='4'>湖北省襄阳市襄州区航空路铁十一局旁</td>
        <td class='td-7-6'><strong>服务电话：</strong></td>
        <td class='td-7-7' >0710-2919966</td>
        <td class='td-7-8' colspan='4'><strong>欢迎再次光临尊品360宾馆！</strong></td>
      </tr>
    </table>
    <div id='button' class='main-box'>
      <ul class='index-tserver'>
        <li class='tserver-list1'>
          返回首页
          <p class='animated zoomin'>
            <router-link to='/front'>返回首页，执行其他选项操作</router-link>
            <!-- <a th:href='@{HomeOfFront}'>返回首页，执行其他选项操作</a> -->
          </p>
        </li>
        <li class='tserver-list2'>
          打印发票
          <p class='animated zoomin'>
            <a href = 'javascript:void(0)' v-on:click='datasubmit()'>点击打印发票</a>
          </p>
        </li>
      </ul>
      <div id='cardbox'>
        <el-input id='cardID' name='cardID' type='text' placeholder='身份证号:' v-model="cardID"></el-input>
      </div>
      <div id='paymentbox'>
        支付方式:<br>
        现金<input name='paymentMethod' type='radio' value='现金' />
        微信<input name='paymentMethod' type='radio' value='微信' />
        支付宝<input name='paymentMethod' type='radio' value='支付宝' /><br>
        刷卡<input name='paymentMethod' type='radio' value='刷卡' />
        其他<input name='paymentMethod' type='radio' value='其他' />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'home',
  data() {
    return {
      nowdate: '',
      nowtime: '',
      aName: '',
      room: {},
      roomoptions: [],
      cName: '',
      cardID: ''
    }
  },
  methods: {
    NowTime: function() {
      // 获取年月日
      var time = new Date();
      var year = time.getFullYear();
      // 月份是从0开始计算的，取值为0-11，所以会小1
      var month = time.getMonth() + 1;
      var day = time.getDate();
      // 获取时分秒
      var h = time.getHours();
      var m = time.getMinutes();
      var s = time.getSeconds();
      // 检查是否小于10
      h = check(h);
      m = check(m);
      s = check(s);
      console.log('sdsd');
      this.nowtime = h + ':' + m + ':' + s;
      this.nowdate = year + '-' + month + '-' + day;
      // 时间数字小于10，则在之前加个“0”补位。
      function check(i) {
        // 方法一，用三元运算符
        var num;
        i < 10 ? num = '0' + i : num = i;
        return num;
      }
      // 根据房间apartment表格输出房间数
      var count = 0;
      // 根据房间apartment表格输出房价
      var type = $("input[name='roomType']:checked").val();
      var price = 0;
      for (var i in this.room) {
        if (type === 'hour') { // 钟点房
          price += 50;
        } else {
          price += this.room[i].price;
        }
      }
      // 计算押金
      var chargeAndDeposit = $('#chargeAndDeposit').html();
      if (type === 'allDay') {
        document.getElementById('sumOfRooms1').innerHTML = count;
        document.getElementById('sumOfPrice1').innerHTML = price;
        document.getElementById('deposit1').innerHTML = chargeAndDeposit - price;
        document.getElementById('sumOfRooms2').innerHTML = '';
        document.getElementById('sumOfPrice2').innerHTML = '';
        document.getElementById('deposit2').innerHTML = '';
      } else if (type === 'hour') {
        document.getElementById('sumOfRooms1').innerHTML = '';
        document.getElementById('sumOfPrice1').innerHTML = '';
        document.getElementById('deposit1').innerHTML = '';
        document.getElementById('sumOfRooms2').innerHTML = count;
        document.getElementById('sumOfPrice2').innerHTML = price;
        document.getElementById('deposit2').innerHTML = chargeAndDeposit - price;
      } else {}
    },
    datasubmit: function() {
      // 身份证和支付方式
      let paymentMethod = $("input[name='paymentMethod']:checked").val();
      if (paymentMethod === undefined) {
        paymentMethod = '';
      }
      // 发票
      if (this.$refs.cName.innerHTML === '' || this.$refs.cName.innerHTML === null) {
        this.$confirm('请填写客人姓名!', '提示', {
          confirmButtonText: '确定'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '请确认提示!'
          });
        });
      } else if (this.room === '') {
        this.$confirm('请选择房间!', '提示', {
          confirmButtonText: '确定'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '请确认提示!'
          });
        });
      } else {
        let roomlist = '';
        // 处理房间数据
        console.log('room ' + this.room[0].roomNum);
        for (var i in this.room) {
          roomlist += this.room[i].roomNum + ',';
        }
        console.log('roomlist ' + roomlist);
        const param = new URLSearchParams();
        param.append('paymentMethod', paymentMethod);
        param.append('cardID', '');
        param.append('cName', this.$refs.cName.innerHTML);
        param.append('chargeAndDeposit', this.$refs.chargeAndDeposit.innerHTML);
        param.append('roomNum', roomlist);
        console.log('param: ', param);
        this.$api.postData('front/Bill', param)
          .then(res => {
            console.log('write: ', res);
            this.roomoptions = res;
          })
          .catch(err => {
            console.log(err);
          });
        // 打印的时候将按钮隐藏
        document.getElementById('button').style.display = 'none';
        console.log('this.$refs.cName ' + this.$refs.cName.innerHTML);
        // window.print();
        // 将所填信息清空或还原
        this.$refs.cName.innerHTML = '';
        this.room = '';
        this.$refs.chargeAndDeposit.innerHTML = 200;
        //   document.getElementById('cardID').value='';
        this.cardID = '';
        $("input[name='paymentMethod']:checked").prop('checked', false);
        // 再将隐藏的按钮显示出来
        document.getElementById('button').style.display = 'block';
      }
    }
  },
  created() {
    // 每1秒刷新时间
    // this.a();
    // this.NowTime();
    this.timer = setInterval(this.NowTime, 1000);
    // 获取token;
    const token = sessionStorage.getItem('token');
    const searchtoken = new URLSearchParams(token);
    this.aName = searchtoken.get('aName');
    this.$api.postData('front/getRoomOptions')
      .then(res => {
        console.log('dddd: ', res);
        this.roomoptions = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style src='../../assets/css/button-bill.css'  scoped></style>
<style src='../../assets/css/style-bill.css'  scoped></style>
