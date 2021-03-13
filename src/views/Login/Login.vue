<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="front">
      <el-card class="card">
        <div slot="header" class="title">
          <span>前端框架系統</span>
        </div>
        <div>
          <el-form
            :model="login"
            :rules="rules"
            status-icon
            ref="login"
            label-width="0px"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="login.username"
                placeholder="用户名"
                autofocus="off"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="login.password"
                placeholder="密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item size="medium">
              <Verify
                @success="alert('success')"
                @error="alert('error')"
                ref="Verify"
                :type="2"
                :arith="0"
                width="40%"
                height="30px"
                fontSize="18px"
                :showButton="false"
              ></Verify>
            </el-form-item>
            <el-form-item size="medium">
              <el-button @click="onSubmit" style="float: right;" type="primary"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Verify from "vue2-verify";
export default {
  data() {
    return {
      imgSrc: "",
      login: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created: function() {
    if (process.env.VUE_APP_MODE == "dev") {
      this.login.username = "admin";
      this.login.password = "123456";
    }
  },
  methods: {
    onSubmit() {
      //调用验证码认证
      //this.$refs.Verify.checkCode();
      this.$router.push("/Home");
    },
    alert(text) {
      let ve = this;
      if (text == "success") {
        var param = {
          password: ve.login.password,
          username: ve.login.username
        };
        ve.$request
          .postURL(ve.$api.login, JSON.stringify(param), {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          })
          .then(function(res) {
            if (res.status === "200") {
              ve.$storage.ss.set("login", res.data);
              ve.$store.commit("loginInfo", res.data.user);
              ve.$router.push("/Home");
            } else if (res.status == 4304) {
              ve.$message.error("密碼錯誤");
            } else if (res.status == "9002") {
              ve.$message.error("帳號不存在");
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch(function(error) {
            ve.$message.error("请求出错");
          });
      } else {
        ve.$message.error("驗證碼錯誤");
      }
    }
  },
  components: {
    Verify
  }
};
</script>
<style scoped>
.background {
  height: 100%;
  width: 100%;
  z-index: -1;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: "../../../public/image/login.jpg";
}
.front {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.card {
  width: 400px;
  background-color: rgba(
    200,
    200,
    200,
    0.3
  ); /**rgba中的a为alpha通道， 为不透明参数，.0即为完全透明*/
  border-color: rgba(200, 200, 200, 0.5);
  border-radius: 18px;
  z-index: 2;
}
.title {
  text-align: center;
  font-size: 24px;
  color: #ffffff;
}
</style>
<style>
.verify-code {
  float: left;
}
.verify-code-area {
  padding-left: 20px;
  line-height: 30px;
  height: 30px;
}
</style>
