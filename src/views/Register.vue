<template>
    <div class="page-header"
         style="background-image: url('webimages/bg3.jpg'); background-size: cover; background-position: top center;">
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="card card-signup">
                        <h2 class="card-title text-center isansFont">ثبت نام</h2>
                        <h6 class="text-center">
                            <router-link to="/login" class="isansFont text-info">
                                حساب کاربری دارید؟ برای ورود کلیک کنید
                            </router-link>
                        </h6>
                        <div class="row">
                            <div class="col-md-12">

                                <RectNotifBlock :message="registerLoading.message" type="warning" borderRound="true"
                                                v-if="registerLoading.value"></RectNotifBlock>

                                <RectNotifBlock :message="registerSuccess.message" type="success" borderRound="true"
                                                v-else-if="registerSuccess.value"></RectNotifBlock>

                                <RectNotifBlock :message="registerFailed.message" type="danger" borderRound="true"
                                                v-else-if="registerFailed.value"></RectNotifBlock>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <form class="form" @submit.prevent="register()">

                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="input-group">
                          <span class="input-group-addon">
												        <i class="material-icons">face</i>
                          </span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                                v-model="userToRegister.first_name"
                                                                type="text"
                                                                class="form-control gadugiFont isansFont"
                                                                name="fullName"
                                                                placeholder="نام...">
                                                        <span class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="inputErrors.firstNameError">
                              لطفا نام خود را وارد کنید
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="input-group">
											<span class="input-group-addon">
												<i class="material-icons">face</i>
											</span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                                v-model="userToRegister.last_name"
                                                                type="text"
                                                                class="form-control gadugiFont isansFont"
                                                                name="fullName"
                                                                placeholder="نام خانوادگی...">
                                                        <span class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="inputErrors.lastNameError">
                              لطفا نام خانوادگی خود را وارد کنید
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="input-group">
											<span class="input-group-addon">
												<i class="material-icons">email</i>
											</span>
                                                    <div class="form-group form-rose"><input
                                                            type="email"
                                                            name="emailAddress"
                                                            v-model="userToRegister.email"
                                                            class="form-control isansFont"
                                                            placeholder="ایمیل..."><span
                                                            class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="inputErrors.emailError">
                              لطفا یک ایمیل معتبر وارد کنید
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="input-group">
											<span class="input-group-addon">
												<i class="material-icons">phone</i>
											</span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                                type="number"
                                                                v-model="userToRegister.phone_number"
                                                                class="form-control gadugiFont isansFont"
                                                                placeholder="شماره تماس...."
                                                                name="phoneNumber"
                                                        >
                                                        <span class="material-input"></span></div>
                                                    <span class="text-center isansFont text-danger"
                                                          v-if="inputErrors.phoneError">لطفا یک شماره تماس معتبر وارد کنید</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="input-group">
											<span class="input-group-addon">
												<i class="material-icons">lock_outline</i>
											</span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                                ref="password"
                                                                name="password"
                                                                v-model="userToRegister.password"
                                                                :type="passType"
                                                                placeholder="رمز عبور..."
                                                                class="form-control isansFont"><span
                                                            class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="inputErrors.passwordError">
                              لطفا یک رمز عبور معتبر وارد کنید
                            </span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-md-6">
                                                <div class="input-group">
											<span class="input-group-addon">
												<i class="material-icons">lock_outline</i>
											</span>
                                                    <div class="form-group form-rose">
                                                        <input
                                                                v-model="userToRegister.password2"
                                                                name="passwordConfirm"
                                                                data-vv-as="password"
                                                                :type="passType"
                                                                placeholder="تکرار رمز عبور..."
                                                                class="form-control isansFont">
                                                        <span class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="inputErrors.confirmPasswordError">
                                                                لطفا تکرار رمز عبور را به درستی وارد کنید
                                                        </span>
                                                    </div>
                                                    <span class="input-group-addon" style="border-left:0;">
                                                        <button type="button"
                                                                class="btn btn-xs btn-simple btn-fab btn-fab-mini btn-round"
                                                                @click="togglePassType()">
                                                            <i class="material-icons" v-if="passType == 'password'">visibility</i>
                                                            <i class="material-icons" v-else>visibility_off</i>
                                                            <div class="ripple-container"></div>
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row actionRows">
                                            <div class="col-sm-6">
                                                <div class="checkbox">
                                                    <label class="isansFont">
                                                        <input type="checkbox" name="optionsCheckboxes"
                                                               v-model="applyWithRules">
                                                        با
                                                        <router-link to="/services/terms" class="isansFont text-info">
                                                            قوانین و
                                                            مقررات اسنیدز
                                                        </router-link>
                                                        موافقم.
                                                    </label>
                                                </div>
                                                <span class="text-center isansFont text-danger"
                                                      v-if="inputErrors.applyWithRulesError">
                              برای ثبت نام باید حتما قوانین ما را خوانده و بپذیرید
                        </span>
                                            </div>

                                            <div class="col-sm-6 text-center">
                                                <input type="submit" class="btn btn-rose isansFont" value="ثبت نام">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'

    export default {
        name: "Register",
        data: function () {
            return {
                passType: 'password',

                userToRegister: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    address: '',
                    password: '',
                    password2: '',
                },

                inputErrors: {
                    firstNameError: false,
                    lastNameError: false,
                    emailError: false,
                    phoneError: false,
                    passwordError: false,
                    confirmPasswordError: false,
                    applyWithRulesError: false,
                },

                applyWithRules: false,

                registerSuccess: {
                    value: false,
                    message: 'ثبت نام شما با موفقیت انجام شد،چند لحظه صبر کنید...'
                },

                registerLoading: {
                    value: false,
                    message:
                        'در حال ثبت نام، چند لحظه صبر کنید...'
                },

                registerFailed: {
                    value: false,
                    message: 'مشکلی در ثبت نام رخ داد...'
                },
            }
        },
        components: {RectNotifBlock},
        methods: {

            togglePassType: function () {
                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

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
            userCanRegister: function () {
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

                if (this.userToRegister.first_name == null || this.userToRegister.first_name.length == 0) {
                    this.inputErrors.firstNameError = true;
                }

                if (this.userToRegister.last_name == null || this.userToRegister.last_name.length == 0) {
                    this.inputErrors.lastNameError = true;
                }

                if (this.userToRegister.email == null || this.userToRegister.email.length == 0) {
                    this.inputErrors.emailError = true;
                }

                if (this.userToRegister.phone_number == null || this.userToRegister.phone_number.length == 0 || this.userToRegister.phone_number.length != 11) {
                    this.inputErrors.phoneError = true;
                }

                if (this.userToRegister.password == null || this.userToRegister.password.length == 0 || this.userToRegister.password.length != 6) {
                    this.inputErrors.passwordError = true;
                }

                if (this.userToRegister.password2 == null || this.userToRegister.password2.length == 0 || this.userToRegister.password2.length != 6 || this.userToRegister.password2 != this.userToRegister.password) {
                    this.inputErrors.confirmPasswordError = true;
                }

                if (!this.applyWithRules) {
                    this.inputErrors.applyWithRulesError = true;
                }
            },

            /*
             Input : -
             Output : true / false
             Functionality : checks if a user can register or not
             */
            isRegisterFormValid: function () {
                //Resetting error object
                this.resetInputErrors();

                //update user validation errors
                this.inputsValidation();

                return this.userCanRegister();
            },

            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.registerLoading.value = false;
                this.registerFailed.value = false;
                this.registerSuccess.value = false;
                scrollTo(0, 0);
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.registerLoading.value = true;
                this.registerFailed.value = false;
                this.registerSuccess.value = false;
                scrollTo(0, 0);
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.registerLoading.value = false;
                this.registerFailed.value = true;
                this.registerSuccess.value = false;
                scrollTo(0, 0);
            },

            successLoadingLogic: function () {
                window.console.log('success loading deploy');
                this.registerLoading.value = false;
                this.registerFailed.value = false;
                this.registerSuccess.value = true;
            },

            register: function () {
                window.console.log('register pressed');

                //loading logic updated
                this.startLoadingLogic();

                let registerFormValid = this.isRegisterFormValid();
                window.console.log("user registration is valid : ", registerFormValid);
                window.console.log('user input data : ', this.userToRegister);
                window.console.log('apply With rules : ', this.applyWithRules);

                if (registerFormValid) {
                    window.console.log("dispatching register with payload");
                    let registerPromise = this.$store.dispatch('register', this.userToRegister);

                    registerPromise.then((response) => {
                        this.successLoadingLogic();
                        console.log(response);
                        setTimeout(() => {
                            this.resetLoadingLogic();
                            this.$router.push('/');
                        }, 2000)
                    }).catch((err) => {
                        console.log(err);
                        console.log(err.response);
                        this.registerFailed.message = 'خطایی در ارتباط با سرور رخ داد.' + ' ' + err.response.data.email[0];
                        this.failedLoadingLogic();
                    })
                } else {
                    this.registerFailed.message = 'لطفا اطلاعات خود را به درستی پر کنید...';
                    this.failedLoadingLogic();
                }
            }
        },
        mounted() {
            scrollTo(0, 0)
        }
        ,
        computed: {}
    }
</script>

<style scoped>
    .page-header {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page-header > .container {
        margin-bottom: 25px;
    }

    .card-signup .card-content {
        padding: 0 10px;
    }


    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    .container {
        padding-top: 140px;
    }

    .card {
        margin-bottom: 0;
    }

    .page-header {
        height: initial;
    }

    span.check:before {
        margin-right: 10px !important;
        margin-left: -10px !important;
    }

    p.description {
        line-height: 25px;
        padding-left: 15px;
    }

    .row {
        margin-left: 0;
        margin-right: 0;
    }

    .actionRows {
        margin-bottom: 20px;
    }
</style>
