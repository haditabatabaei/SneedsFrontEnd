<template>
    <div class="page-header"
         style="background-image: url('sneedsAssets/img/bg3.jpg'); background-size: cover; background-position: top center;">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="card card-signup">
                        <form @submit.prevent="setNewPassword()" class="form">
                            <div class="header header-rose text-center">
                                <h4 class="card-title isansFont mb-0">
                                    تغییر رمز عبور
                                </h4>
                                <div class="social-line mt-0 mb-10"></div>
                            </div>
                            <div class="card-content">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">lock</i>
                                    </span>
                                    <div class="form-group form-rose gadugiFont isansFont">
                                        <input required
                                               v-model="$v.inputNewPassword.$model"
                                               :type="passType"
                                               class="form-control"
                                               placeholder="رمز عبور جدید خود را وارد کنید...">
                                        <span class="material-input"></span>
                                    </div>
                                    <span class="input-group-addon" style="border-left:0;">
                                    <button type="button" class="btn btn-xs btn-simple btn-fab btn-fab-mini btn-round"
                                            @click="togglePassType()">
                                        <i class="material-icons" v-if="passType == 'password'">visibility</i>
                                        <i class="material-icons" v-else>visibility_off</i>
                                        <div class="ripple-container"></div>
                                    </button>
                                    </span>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6 col-sm-offset-3 text-center">
                                        <input type="submit" class="btn btn-rose isansFont" value="ثبت رمز عبور جدید">
                                    </div>
                                </div>

                            </div>
                            <div class="footer text-center"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'
    import axios from 'axios'
    import {required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "ResetPassword",
        components: {RectNotifBlock},
        validations: {
            inputNewPassword: {required, minLength: minLength(6)}
        },
        data() {
            return {
                passType: 'password',

                inputNewPassword: '',


            }
        },
        created() {
            console.log("token query parameter :", this.$route.query.token);
        },
        mounted() {
        },
        methods: {
            togglePassType: function () {
                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

            setNewPassword: function () {
                // this.resetLoadingLogic();
                // this.startLoadingLogic();
                this.$loading(true);
                if (!this.$v.inputNewPassword.$invalid) {
                    let payload = {
                        "password": this.inputNewPassword,
                        "token": this.$route.query.token
                    };
                    console.log('payload : ', payload);
                    this.sendResetPassRequest(payload).then(response => {
                        console.log(response);

                        this.$notify({
                            group: 'notif',
                            duration: 5000,
                            type: 'success',
                            title: 'ثبت رمز عبور جدید : موفق',
                            text: 'رمز عبور جدید با موفقیت ثبت شد. به صفحه ورود فرستاده می شوید.'
                        });
                        this.$router.push('/auth/login')
                    }).catch(error => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response);
                        }
                        this.$notify({
                            group: 'notif',
                            duration: 3000,
                            type: 'error',
                            title: 'ثبت رمز عبور جدید : خطا',
                            text: 'خطایی در ارتباط با سرور رخ داد.'
                        });
                    }).finally(() => {
                        this.$loading(false)
                    })
                } else {
                    this.$loading(false);
                    this.$notify({
                        group: 'notif',
                        duration: 3000,
                        type: 'warn',
                        title: 'ثبت رمز عبور جدید : اخطار',
                        text: 'لطفا اطلاعات خود را به درستی پر کنید.'
                    });
                }

            },

            sendResetPassRequest: function (payload) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'auth/password-reset/confirm/',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: payload,
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

        }
    }
</script>

<style scoped>
    .card-signup .card-content {
        padding: 0 20px;
    }
</style>
