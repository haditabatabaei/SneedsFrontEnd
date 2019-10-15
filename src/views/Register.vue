<template>
    <div class="page-header"
         style="background-image: url('http://195.248.243.68/sneedsAssets/img/bg3.jpg'); background-size: cover; background-position: top center;">
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
                                                                v-model="$v.userToRegister.first_name.$model"
                                                                class="form-control gadugiFont isansFont"
                                                                name="fullName"
                                                                placeholder="نام">
                                                        <span class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="$v.userToRegister.first_name.$error">
                              لطفا نام خود را وارد کنید.
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
                                                                v-model="$v.userToRegister.last_name.$model"
                                                                class="form-control gadugiFont isansFont"
                                                                name="fullName"
                                                                placeholder="نام خانوادگی">
                                                        <span class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="$v.userToRegister.last_name.$error">
                              لطفا نام خانوادگی خود را وارد کنید.
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
                                                    <div class="form-group englishInput form-rose"><input
                                                            name="emailAddress"
                                                            v-model="$v.userToRegister.email.$model"
                                                            class="form-control isansFont"
                                                            placeholder="ایمیل"><span
                                                            class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="$v.userToRegister.email.$error">
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
                                                                v-model="$v.userToRegister.phone_number.$model"
                                                                class="form-control gadugiFont isansFont englishInput"
                                                                placeholder="شماره تماس"
                                                                name="phoneNumber"
                                                        >
                                                        <span class="material-input"></span></div>
                                                    <span class="text-center isansFont text-danger"
                                                          v-if="$v.userToRegister.phone_number.$error">لطفا یک شماره تماس موبایل معتبر ایران وارد کنید</span>
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
                                                                v-model="$v.userToRegister.password.$model"
                                                                :type="passType"
                                                                placeholder="رمز عبور"
                                                                class="form-control isansFont"><span
                                                            class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="$v.userToRegister.password.$error">
                              لطفا یک رمز عبور معتبر وارد کنید. حداقل 6 کاراکتر
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
                                                                v-model="$v.userToRegister.password2.$model"
                                                                name="passwordConfirm"
                                                                data-vv-as="password"
                                                                :type="passType"
                                                                placeholder="تکرار رمز عبور"
                                                                class="form-control isansFont">
                                                        <span class="material-input"></span>
                                                        <span class="text-center isansFont text-danger"
                                                              v-if="$v.userToRegister.password2.$error">
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
                                                <div class="filterCheckWrapper isansFont--faNum">
                                                    <label>
                                                        <input type="checkbox" name="optionsCheckboxes"
                                                               v-model="$v.applyWithRules.$model">
                                                        با
                                                        <router-link to="/services/terms" class="isansFont text-info">
                                                            قوانین و
                                                            مقررات اسنیدز
                                                        </router-link>
                                                        موافقم.
                                                    </label>
                                                </div>
                                                <span class="text-center isansFont text-danger"
                                                      v-if="$v.applyWithRules.$error">
                              برای ثبت نام باید حتما قوانین ما را خوانده و بپذیرید
                                                </span>
                                            </div>

                                            <div class="col-sm-6 text-center">
                                                <input type="submit" class="btn btn-rose isansFont" value="ثبت نام"
                                                       :disabled="$v.userToRegister.$anyError || $v.applyWithRules.$error || !$v.applyWithRules.$dirty || !$v.userToRegister.$anyDirty">
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
    import {required, email, minLength, sameAs, helpers} from 'vuelidate/lib/validators'

    const iranianPhone = helpers.regex('phone_number', /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig)


    const trueBoolCheck = (value) => {
        return value == true;
    };

    export default {
        name: "Register",
        validations: {
            userToRegister: {
                first_name: {required},
                last_name: {required},
                email: {required, email},
                phone_number: {required, iranianPhone},
                password: {required, minLength: minLength(6)},
                password2: {required, sameAs: sameAs('password')},
            },
            applyWithRules: {trueBoolCheck}
        },
        data: function () {
            return {
                passType: 'password',


                emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

                userToRegister: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    address: '',
                    password: '',
                    password2: '',
                },

                applyWithRules: false,

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
            register: function () {
                window.console.log('register pressed');

                this.$loading(true);

                window.console.log('user input data : ', this.userToRegister);
                window.console.log('apply With rules : ', this.applyWithRules);

                if (!(this.$v.userToRegister.$anyError || this.$v.applyWithRules.$error || !this.$v.applyWithRules.$dirty || !this.$v.userToRegister.$anyDirty)) {
                    window.console.log("dispatching register with payload");
                    this.$store.dispatch('register', this.userToRegister).then((response) => {
                        console.log(response);
                        this.$loading(false);
                        this.$notify({
                            group: 'notif',
                            duration: 3000,
                            type: 'success',
                            title : 'ثبت نام : موفق',
                            text: 'شما با موفقیت ثبت نام کردید ، به پروفایل خود منتقل خواهید شد.'
                        });
                        this.$router.push('/user/profile');
                    }).catch((err) => {
                        console.log(err);
                        console.log(err.response);
                        this.$loading(false);
                        this.$notify({
                            group: 'notif',
                            duration: 3000,
                            type: 'error',
                            title : 'ثبت نام : خطا',
                            text: 'خطایی هنگام ارتباط با سرور رخ داد.'
                        });
                    })
                } else {
                    this.$loading(false);
                    this.$notify({
                        group: 'notif',
                        duration: 3000,
                        type: 'warn',
                        title : 'ثبت نام : اخطار',
                        text: 'لطفا اطلاعات خود را به درستی پر کنید..'
                    });
                }
            }
        },
        mounted() {
            scrollTo(0, 0)
        }
        ,
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

    .filterCheckWrapper label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .filterCheckWrapper input[type="checkbox"] {
        width: 15px;
        height: 15px;
        margin: 5px;
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

    .englishInput {
        direction: ltr !important;
        text-align: right !important;
    }
</style>
