<template>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <h4 class="title isansFont text-right">
                پنل تغییر رمز عبور فعلی شما
            </h4>
            <hr>
            <RectNotifBlock :message="editLoading.message" type="warning" borderRound="true"
                            v-if="editLoading.value"></RectNotifBlock>

            <RectNotifBlock :message="editSuccess.message" type="success" borderRound="true"
                            v-else-if="editSuccess.value"></RectNotifBlock>

            <RectNotifBlock :message="editFailed.message" type="danger" borderRound="true"
                            v-else-if="editFailed.value"></RectNotifBlock>

            <div class="card card-contact">
                <form action="" id="changepass-form" method="post"
                      @submit.prevent="edit()">
                    <div class="card-content">
                        <div class="row mt-0">
                            <div class="col-md-6">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="inputNewPassword" class="isansFont">پسورد
                                            جدید : </label>
                                        <input v-model="inputUser.password"
                                               id="inputNewPassword" :type="passType"
                                               name="inputNewPassword"
                                               class="form-control isansFont">
                                        <span class="text-center isansFont text-danger"
                                              v-if="inputErrors.passwordError">
                              لطفا یک رمز عبور معتبر وارد کنید
                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="confirmInputNewPassword" class="isansFont">تکرار
                                            پسورد جدید :</label>
                                        <input v-model="inputUser.password2"
                                               id="confirmInputNewPassword" :type="passType"
                                               name="confirmInputNewPassword"
                                               class="form-control isansFont">
                                        <span class="text-center isansFont text-danger"
                                              v-if="inputErrors.confirmPasswordError">
                              لطفا تکرار رمز عبور را به درستی وارد کنید
                            </span>
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
                            </div>
                        </div>
                        <div class="row mt-10">
                            <div class="col-md-6"></div>
                            <div class="col-md-6">
                                <input type="submit" value="تغییر رمز عبور"
                                       class="btn btn-success isansFont pull-left">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'

    export default {
        name: "PasswordChange",
        components: {
            RectNotifBlock
        },
        data() {
            return {
                passType: 'password',

                inputUser: {
                    password: '',
                    password2: '',
                },

                inputErrors: {
                    passwordError: false,
                    confirmPasswordError: false,
                },

                editSuccess: {
                    value: false,
                    message: 'رمز عبور شما با موفقیت تغییر کرد،به طور خودکار از حساب خود خارج می شوید...'
                },

                editLoading: {
                    value: false,
                    message:
                        'در حال تغییر رمز عبور، چند لحظه صبر کنید...'
                },

                editFailed: {
                    value: false,
                    message: 'مشکلی در تغییر رمز عبور رخ داد...'
                },
            }
        }, methods: {
            togglePassType: function () {

                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },

            resetInputErrors: function () {
                for (let errorProperty in this.inputErrors) {
                    if (this.inputErrors.hasOwnProperty(errorProperty)) {
                        this.inputErrors[errorProperty] = false;
                    }
                }
            },

            userCanEdit: function () {
                for (let errorProperty in this.inputErrors) {
                    if (this.inputErrors.hasOwnProperty(errorProperty)) {
                        if (this.inputErrors[errorProperty] === true) {
                            return false;
                        }
                    }
                }
                return true;
            },

            inputsValidation: function () {
                if (this.inputUser.password == null || this.inputUser.password.length == 0 || this.inputUser.password.length != 6) {
                    this.inputErrors.passwordError = true;
                }

                if (this.inputUser.password2 == null || this.inputUser.password2.length == 0 || this.inputUser.password2.length != 6 || this.inputUser.password2 != this.inputUser.password) {
                    this.inputErrors.confirmPasswordError = true;
                }

            },

            isEditFormValid: function () {
                //Resetting error object
                this.resetInputErrors();

                //update user validation errors
                this.inputsValidation();

                return this.userCanEdit();
            },

            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.editLoading.value = false;
                this.editFailed.value = false;
                this.editSuccess.value = false;
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.editLoading.value = true;
                this.editFailed.value = false;
                this.editSuccess.value = false;
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.editLoading.value = false;
                this.editFailed.value = true;
                this.editSuccess.value = false;
            },

            successLoadingLogic: function () {
                window.console.log('success loading deploy');
                this.editLoading.value = false;
                this.editFailed.value = false;
                this.editSuccess.value = true;
            },

            edit: function () {
                window.console.log('edit pressed');

                //loading logic updated
                this.startLoadingLogic();

                let editFormValid = this.isEditFormValid();
                window.console.log("user edit is valid : ", editFormValid);
                window.console.log('user input data : ', this.inputUser);
                // window.console.log('apply With rules : ', this.applyWithRules);

                if (editFormValid) {
                    window.console.log("dispatching edit with payload");

                    delete this.inputUser.email;

                    let editPromise = this.$store.dispatch('edit', this.inputUser);

                    editPromise.then((response) => {
                        this.successLoadingLogic();
                        console.log(response);
                        setTimeout(() => {
                            this.resetLoadingLogic();
                            this.$store.dispatch('logout');
                            this.$router.push('/login');
                        }, 2000)
                    }).catch((err) => {
                        console.log(err);
                        this.editFailed.message = 'خطایی در ارتباط با سرور رخ داد.';
                        this.failedLoadingLogic();
                    })
                } else {
                    this.editFailed.message = 'لطفا اطلاعات خود را به درستی پر کنید...';
                    this.failedLoadingLogic();
                }
            },
        }
    }
</script>

<style scoped>

</style>
