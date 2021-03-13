var version = "v1/";
export default {
  Upload: {
    UploadingStream: version + "api/File/UploadingStream"
  },
  // 登录
  login: version + "api/Auth/Login",
  //刷新授权
  refreshToken: version + "api/Auth/refreshToken"
};
