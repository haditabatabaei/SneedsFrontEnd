<template>
  <div class="page-header "
       style="background-image: url('webimages/bg3.jpg'); background-size: cover; background-position: top center;">
    <div class="container">
      <div class="row" v-if="loginOrReset">
        <div class="col-md-6 col-md-offset-3" v-if="loginOrReset">
          <div class="card card-signup">
            <form class="form" @submit.prevent="login()">
              <div class="header header-rose text-center">
                <h4 class="card-title isansFont mb-0">
                  ورود کاربر
                  <br>
                  یا
                </h4>
                <div class="social-line mt-0 mb-10">
                  <router-link to="/register" class="btn customRegisterBtn isansFont pull-center">
                    ثبت نام
                  </router-link>
                </div>
              </div>
              <div class="card-content">
                <p class="card-description"></p>
                <div class="alert alert-danger content-round" v-if="loginFailed.value">
                  <div class="container-fluid isansFont">
                    <div class="alert-icon">
                      <i class="material-icons">block</i>
                    </div>
                    {{loginFailed.message}}
                  </div>
                </div>

                <div class="alert alert-warning content-round" v-if="loginLoading.value">
                  <div class="container-fluid isansFont">
                    <div class="alert-icon">
                      <img src="webimages/loading.svg" alt="loading icon"
                           class="loadingIcon">
                    </div>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true"><i class="material-icons">clear</i></span>
                    </button>
                    {{loginLoading.message}}
                  </div>
                </div>

                <div class="alert alert-success content-round" v-if="loginSuccess.value">
                  <div class="container-fluid isansFont">
                    <div class="alert-icon">
                      <i class="material-icons">done</i>
                    </div>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true"><i class="material-icons">clear</i></span>
                    </button>
                   {{loginSuccess.message}}
                  </div>
                </div>

                <div class="input-group">
									<span class="input-group-addon">
										<i class="material-icons">email</i>
									</span>
                  <div class="form-group form-rose gadugiFont isansFont">
                    <input required
                           v-model="userToLogin.email"
                           type="email"
                           class="form-control"
                           placeholder="ایمیل...">
                    <span class="material-input"></span>
                    <span class="text-center isansFont text-danger"
                          v-if="inputErrors.emailError">
                                                                          لطفا یک ایمیل معتبر وارد کنید

                                        </span>
                  </div>
                </div>

                <div class="input-group">
									<span class="input-group-addon">
										<i class="material-icons">lock_outline</i>
									</span>
                  <div class="form-group form-rose isansFont gadugiFont"><input required
                                                                                v-model="userToLogin.password"
                                                                                type="password"
                                                                                placeholder="رمز عبور..."
                                                                                class="form-control"><span
                    class="material-input"></span>
                    <span class="text-center isansFont text-danger" v-if="inputErrors.passwordError">
                                           لطفا یک رمز عبور معتبر وارد کنید
                                        </span>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6 text-center">
                    <input type="submit" class="btn btn-rose isansFont" value="ورود">

                  </div>
<!--                  <div class="col-sm-6 text-center">-->
<!--                    <button @click.prevent="toggleResetPassword()"-->
<!--                            class="forgetPassButton btn btn-rose isansFont btn-simple btn-sm">-->
<!--                      رمز عبور خود را فراموش کردم-->
<!--                    </button>-->
<!--                  </div>-->
                </div>
              </div>

              <div class="footer text-center">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data: function () {
      return {
        userToLogin: {
          email: '',
          password: '',
        },

        inputErrors: {
          emailError: false,
          passwordError: false,
        },

        inputEmailForgetPass: '',

        loginOrReset: true,

        loginSuccess: {
          value: false,
          message: 'با موفقیت وارد شدید،چند لحظه صبر کنید...'
        },

        loginLoading: {
          value: false,
          message:
            'در حال ورود، چند لحظه صبر کنید...'
        },

        loginFailed: {
          value: false,
          message: 'مشکلی در ورود رخ داد...'
        },
      }
    },
    components: {},
    methods: {
      /*
        Input : -
        Output : -
        Functionality : resets input errors object to default false value
      */
      resetInputErrors: function () {
        for (let errorProperty in this.inputErrors) {
          if (this.inputErrors.hasOwnProperty(errorProperty)) {
            this.inputErrors[errorProperty] = false;
          }
        }
      },

      /*
        Input : -
        Output : true / false
        Functionality : checks whether all errors are false or not
      */
      userCanLogin: function () {
        for (let errorProperty in this.inputErrors) {
          if (this.inputErrors.hasOwnProperty(errorProperty)) {
            if (this.inputErrors[errorProperty] === true) {
              return false;
            }
          }
        }
        return true;
      },

      /*
        Input : -
        Output : -
        Functionality : updates user errors upon user input and validation
      */
      inputsValidation: function () {
        if (this.userToLogin.email == null || this.userToLogin.email.length == 0) {
          this.inputErrors.emailError = true;
        }

        if (this.userToLogin.password == null || this.userToLogin.password.length == 0 || this.userToLogin.password.length != 6) {
          this.inputErrors.passwordError = true;
        }

      },

      resetLoadingLogic: function () {
        window.console.log('no loading deploy');
        this.loginLoading.value = false;
        this.loginFailed.value = false;
        this.loginSuccess.value = false;
        scrollTo(0, 0);
      },

      startLoadingLogic: function () {
        window.console.log('start loading deploy');
        this.loginLoading.value = true;
        this.loginFailed.value = false;
        this.loginSuccess.value = false;
        scrollTo(0, 0);
      },

      failedLoadingLogic: function () {
        window.console.log('failed loading deploy');
        this.loginLoading.value = false;
        this.loginFailed.value = true;
        this.loginSuccess.value = false;
        scrollTo(0, 0);
      },

      successLoadingLogic: function () {
        window.console.log('success loading deploy');
        this.loginLoading.value = false;
        this.loginFailed.value = false;
        this.loginSuccess.value = true;
      },
      
      
      isLoginFormValid: function () {
        //Resetting error object
        this.resetInputErrors();

        //update user validation errors
        this.inputsValidation();

        return this.userCanLogin();
      },

      login: function () {
        window.console.log('login pressed');

        //loading logic updated
        this.startLoadingLogic();

        let loginFormValid = this.isLoginFormValid();
        window.console.log("user login is valid : ", loginFormValid);
        window.console.log('user input data : ', this.userToLogin);

        if (loginFormValid) {
          window.console.log("dispatching login with payload");
          let loginPromise = this.$store.dispatch('login', this.userToLogin);

          loginPromise.then((response) => {
            this.successLoadingLogic();
            this.userToLogin = {
              email: '',
              password: '',
            };
            console.log(response);
            setTimeout(() => {
              this.resetLoadingLogic();
              this.$router.push('/');
            }, 2000)
          }).catch((err) => {
            console.log(err);
            console.log(err.response);
            if(err.response !== undefined){
              this.loginFailed.message =  'خطایی در ارتباط با سرور رخ داد.' + '\n' + err.response.data.detail;
            }else{
              this.loginFailed.message =  'خطایی در ارتباط با سرور رخ داد.';
            }

            this.failedLoadingLogic();
          })
        } else {
          this.loginFailed.message = 'لطفا اطلاعات خود را به درستی پر کنید...';
          this.failedLoadingLogic();
        }
      },

      toggleResetPassword: function () {
        this.loginOrReset = !this.loginOrReset;
      }
    },
    mounted() {
      scrollTo(0, 0);
    }
  }
</script>

<style scoped>
  .forgetPassButton {
    margin-top: 15px;
  }

  .card-signup .header {
    padding: 15px 0 !important;

  }

  .page-header {
    min-height: 100vh;
  }

  .card-content {
    padding: 0 20px !important;
  }

  .customRegisterBtn {
    background: none !important;
    color: white !important;
    border: 1px solid white;
    transition: all 0.3s ease-in-out;
  }

  .customRegisterBtn:hover {
    background-color: white !important;
    color: #e91e63 !important;
  }
</style>
