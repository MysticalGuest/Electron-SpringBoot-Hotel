<template>
  <div class='login-container'>
    <div class='connect'>
      <p>系统账号登录</p>
    </div>
    <form method='post' id='loginForm' v-on:submit.prevent='validateLimit'>
      <input type='text' ref='AdmId' name='AdmId' class='AdmId' placeholder='账号' autocomplete='off'/>
      <input type='password' name='aPassword' class='aPassword' placeholder='密码' oncontextmenu='return false' />
      <div class='rdo'>
        <input type='radio' name='rdo' class='rdolist' value='front' checked='checked' />
        <label class='rdobox'>
          <img class='check-image'>
          <!-- <span class='check-image'></span> -->
          <span class='radiobox-content'>前台</span>
        </label>
        <input type='radio' name='rdo' class='rdolist' value='administrator' />
        <label class='rdobox'>
          <img class='check-image'>
          <!-- <span class='check-image'></span> -->
          <span class='radiobox-content'>经理</span>
        </label>
      </div>
      <button id='submit' type='submit'>登 陆</button>
    </form>
  </div>
</template>

<script>
import '@/assets/js/jquery.validate.min.js'
import $ from 'jquery'
import '@/assets/css/style-login.css'
import unchecked from '@/assets/img/login/input-unchecked.png'
import checked from '@/assets/img/login/input-checked.png'
import { Loading } from 'element-ui';

export default {
  // 'lint': 'vue-cli-service lint',
  name: '',
  data() {
    return {
      admId: '',
      checked,
      unchecked,
      fullscreenLoading: false
    }
  },
  methods: {
    validateLimit() {
      // const AdmId = $('#loginForm input[name='AdmId']').val();
      const AdmId = this.$refs.AdmId.value;
      const aPassword = $("#loginForm input[name='aPassword']").val();
      const limit = $("input:radio[name='rdo']:checked").val();
      if (limit === 'administrator') {
        this.$confirm('系统仍在完善!暂不支持\'经理\'权限!', '提示', {
          confirmButtonText: '确定'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '先试试其他功能吧!'
          });
        });
        return;
      }
      console.log('limit:' + limit);
      let booldata = '';
      if (AdmId !== '' && aPassword !== '') {
        $.ajax({
          url: 'validateLimit',
          type: 'post',
          data: {AdmId: AdmId, aPassword: aPassword, limit: limit},
          dataType: 'json',
          async: false, // 同步请求
          success: function(data) {
            booldata = data;
          },
          error: function(xhr, type, errorThrown) {
            console.log(errorThrown);
          }
        });
        if (booldata === false) {
          // create the notification
          this.$notify({
            title: '提示',
            message: '无效登录!请检查信息!'
          });
          return false;
        } else {
          console.log('booldata.aName: ', booldata);
          console.log('登录成功啦!');
          // 将用户token保存到vuex中
          this.$store.commit('changeLogin', {token: booldata });
          this.$router.push({ path: '/front'});
        }
      }
      return booldata;
    }
  },
  mounted() {
    let Domain;
    if (process.env.NODE_ENV === 'development') {
      Domain = ''
    } else {
      Domain = 'http://localhost:8360'
    }
    /** !
     * labelauty.js
     */
    (function($) {
      $.fn.labelauty = function(tag, tag2) {
        rdochecked(tag);
        if (tag2 === 'rdo') {
          $('.rdobox').click(function() {
            $(this).prev().prop('checked', 'checked');
            rdochecked(tag);
          });
        } else {
          $('.chkbox').click(function() {
            if ($(this).prev().prop('checked') === true) {
              $(this).prev().removeAttr('checked');
            } else {
              $(this).prev().prop('checked', 'checked');
            }
            rdochecked(tag);
          });
        }
        function rdochecked(tag) {
          $('.' + tag).each(function(i) {
            var rdobox = $('.' + tag).eq(i).next();
            if ($('.' + tag).eq(i).prop('checked') === false) {
              rdobox.removeClass('checked');
              rdobox.addClass('unchecked');
              rdobox.find('.check-image')[0].src = unchecked;
            } else {
              rdobox.removeClass('unchecked');
              rdobox.addClass('checked');
              rdobox.find('.check-image')[0].src = checked;
            }
          });
        }
      }
    }($));
    // 参数{input类名，选择类型(单选or多选)}
    $('.rdolist').labelauty('rdolist', 'rdo');
    // 登陆表单验证
    $('#loginForm').validate({
      rules: {
        AdmId: {
          required: true, // 必填
          minlength: 3, // 最少3个字符
          maxlength: 32, // 最多32个字符
          // 使用ajax方法调用映射方法验证输入值
          remote: {
            url: Domain + '/validateId', // 用户名有效性检查，别跨域调用
            type: 'post'
          }
        },
        aPassword: {
          required: true,
          minlength: 3,
          maxlength: 32,
          remote: {
            url: Domain + '/validatePassword', // 该用户的密码有效性检查，别跨域调用
            type: 'post',
            data: {
              AdmId: function() { return $("#loginForm input[name='AdmId']").val(); },
              aPassword: function() { return $("#loginForm input[name='aPassword']").val(); }
            }
          }
        }
      },
      // 错误信息提示
      messages: {
        AdmId: {
          required: '必须填写用户名',
          minlength: '用户名至少为3个字符',
          maxlength: '用户名至多为32个字符',
          remote: '用户名不存在'
        },
        aPassword: {
          required: '必须填写密码',
          minlength: '密码至少为3个字符',
          maxlength: '密码至多为32个字符',
          remote: '密码错误'
        }
      }
    });
  },
  created() {
    if (this.$store.state.loadState === 0) {
      this.$store.dispatch('setloadingState');
      const loadingInstance = Loading.service({ text: '后台服务启动中...请稍等!', fullscreen: true });
      // this.fullscreenLoading = true;
      // setTimeout(() => {
      //   // this.fullscreenLoading = false;
      //   loadingInstance.close();
      // }, 2000);
      // console.log('', this.$store.getters.getLoading);
      // console.log('', this.$store.state.loadState);
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.on('loading', (event, arg) => {
        console.log('loading', arg)
        loadingInstance.close();
      })
      // ipcRenderer.send('renderer-msg', '')
    }
  },
  // 组件内路由--进入组件时
  beforeRouteEnter(to, form, next) {
    window.document.body.className = 'login_body'
    next();
  },
  beforeRouteLeave(to, form, next) {
    window.document.body.className = '';
    next();
  }
}
</script>

<style scoped>
/*!
 * style-login.css
 * Create by MysticalGuest
 * https://github.com/MysticalGuest
 */
@charset "UTF-8";
a,abbr,acronym,address,applet,article,aside,audio,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
ol,ul{list-style:none}
blockquote,q{quotes:none}
blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}
table{border-collapse:collapse;border-spacing:0}
.login-container{margin:10% auto 0 auto}
.register-container{margin:6% auto 0 auto}
@media (min-width:670px){ .login-container {margin: 8% auto 0 auto;} }
h1{font-size:30px;font-weight:700;text-shadow:0 1px 4px rgba(0,0,0,.2)}
form{position:relative;width:305px;margin:15px auto 0 auto;text-align:center}
input{width:270px;height:42px;line-height:42px;margin-top:25px;padding:0 15px;background:#2d2d2d;background:rgba(45,45,45,.15);-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #3d3d3d;border:1px solid rgba(255,255,255,.15);-moz-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;-webkit-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;font-family:"Microsoft YaHei",Helvetica,Arial,sans-serif;font-size:14px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.1);-o-transition:all .2s;-moz-transition:all .2s;-webkit-transition:all .2s;-ms-transition:all .2s}
input:-moz-placeholder{color:#fff}
input:-ms-input-placeholder{color:#fff}
input::-webkit-input-placeholder{color:#fff}
input:focus{outline:0;-moz-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset,0 2px 7px 0 rgba(0,0,0,.2);-webkit-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset,0 2px 7px 0 rgba(0,0,0,.2);box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset,0 2px 7px 0 rgba(0,0,0,.2)}
button{cursor:pointer;width:300px;height:44px;margin-top:25px;padding:0;  background: rgba(6, 127, 228, 0.71);-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:0;-moz-box-shadow:0 15px 30px 0 rgba(255,255,255,.25) inset,0 2px 7px 0 rgba(0,0,0,.2);font-family:"Microsoft YaHei",Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.1);-o-transition:all .2s;-moz-transition:all .2s;-webkit-transition:all .2s;-ms-transition:all .2s}
button:hover{-moz-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);-webkit-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2)}
button:active{-moz-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);-webkit-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);box-shadow:0 5px 8px 0 rgba(0,0,0,.1) inset,0 1px 4px 0 rgba(0,0,0,.1);border:0 solid #016FCB}
.connect{margin-top: 18px; width: 100%; font-size: 40px; text-shadow: 0 1px 3px rgba(0,0,0,.2);}
.alert{width:310px;height:200px;background:#000;position:absolute;top:-40%;left:50%;margin:-101px 0 0 -151px}
.alert h2{height:40px;padding-left:8px;font-size:14px;background:#FF0543;text-align:left;line-height:40px}
.alert .alert_con{background:#fff;height:160px}
.alert .alert_con p{color:#000;line-height:90px}
.alert .alert_con .btn{padding:3px 10px;color:#fff;cursor:pointer;background:#72D1FF;border:1px solid #72D1FF;border-radius:4px}
.alert .alert_con .btn:hover{background:#4FB2EF;border:1px solid #4FB2EF;border-radius:4px}

/* radio labelauty css */
.rdo{height:40px;line-height:40px;margin-top: 20px;}
.rdolist,.chklist{display:none;}
.rdobox,.chkbox{cursor:pointer;display:inline-block;padding:10px;height:16px;line-height:16px;background:#eee;border-radius:3px;color:#666;}
.check-image{display:inline-block;width:16px;height:16px;margin-top:-4px;vertical-align:middle}
/* background:url(../img/login/input-unchecked.png) no-repeat; */

.unchecked{background:rgba(0, 0, 0, 0.4);color:#fff;transition-property:background;transition-delay:0s;transition-duration:.1s;transition-timing-function:linear}
.unchecked:hover{background:#dedfe0;color:#666;}
.checked{background:rgba(6, 127, 228, 0.71);color:#fff}
</style>
