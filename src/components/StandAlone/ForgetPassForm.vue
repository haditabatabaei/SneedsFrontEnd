<template>
    <form class="loginForm" @submit.prevent="requestReset()" v-if="!$route.query.token">
        <label class="loginForm-label isansFont" for="email">
            ایمیل :
            <input class="loginForm-control control--ltr" id="email" type="text" v-model.trim="$v.email.$model">
            <span class="loginForm-meta error" v-if="emailIsInvalid">
                لطفا یک ایمیل معتبر وارد کنید.
            </span>
        </label>
        <button class="loginForm-button isansFont">
            {{submitRequestResetLabel}}
        </button>
    </form>
    <form class="loginForm" @submit.prevent="updatePassword()" v-else>
        <label class="loginForm-label isansFont" for="password">
            رمز عبور جدید :
            <input class="loginForm-control control--ltr" id="password" type="password" v-model.trim="$v.newPassword.$model">
            <span class="loginForm-meta error" v-if="newPasswordIsInvalid">
                لطفا یک رمز عبور معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label isansFont" for="confirmPassword">
            تکرار رمز عبور جدید :
            <input class="loginForm-control control--ltr" id="confirmPassword" type="password" v-model.trim="$v.confirmNewPassword.$model">
            <span class="loginForm-meta error" v-if="confirmNewPasswordIsInvalid">
                لطفا تکرار رمز عبور معتبر وارد کنید.
            </span>
        </label>
        <button class="loginForm-button isansFont">
            {{submitChangeLabel}}
        </button>
    </form>
</template>

<script>
    import axios from 'axios';
    import {required, email, minLength, maxLength, sameAs} from 'vuelidate/lib/validators';

    export default {
        name: "ForgetPassForm.vue",
        validations: {
            email: {required, email, minLength: minLength(1)},
            newPassword : {required, minLength: minLength(6), maxLength: maxLength(50)},
            confirmNewPassword : {required, sameAs: sameAs('newPassword')},
        },
        data() {
            return {
                passType: 'password',
                email: '',
                submitted: false,
                newPassword : '',
                confirmNewPassword : '',
            }
        },
        props: {
            submitRequestResetLabel: {
                type: String,
                default: () => 'بازیابی رمز عبور'
            },
            submitChangeLabel: {
                type : String,
                default: () => 'ثبت رمز عبور جدید'
            }
        },
        computed: {
            emailIsInvalid() {
                return this.submitted && this.$v.email.$error;
            },
            newPasswordIsInvalid() {
                return this.submitted && this.$v.newPassword.$error;
            },
            confirmNewPasswordIsInvalid() {
                return this.submitted && this.$v.confirmNewPassword.$error;
            }
        },
        methods: {
            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },
            stringifyError(errorObj) {
                let string = '<br>';
                for (let item in errorObj) {
                    string += errorObj[item].join('<br>') + '<br>';
                }
                return string;
            },
            async requestReset() {
                window.console.log('login pressed');
                this.$v.$touch();
                this.submitted = true;

                if (!this.emailIsInvalid) {
                    window.console.log("dispatching login with payload");
                    try {
                        //this.$loading(true);
                        let resetResult = await this.$api.post(`${this.$store.getters.getApi}/auth/password-reset/`, {"email": this.email}, this.$store.getters.httpConfig);
                        console.log('reset result', resetResult);
                        this.printMessage("ایمیلی شامل مراحل بازیابی رمز عبور برایتان ارسال شد. لطفا پوشه اسپم خود را نیز بررسی کنید", "بازیابی: موفق", "success", 10000, "notif");
                    } catch (e) {
                        console.log(e.response);
                        if (e.response && e.response.data) {
                            this.printMessage(e.response.data.detail, "بازیابی: خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "بازیابی: خطا", "error", 3000, "notif");
                        }
                    } finally {

                    }
                } else {

                    this.printMessage("لطفا اطلاعات ورودی خود را کنترل کنید.", "بازیابی: اخطار", "warn", 3000, "notif");
                }
            },

            async updatePassword() {
                this.$v.$touch();
                this.submitted = true;

                if(!this.newPasswordIsInvalid && !this.confirmNewPasswordIsInvalid) {
                    //form is valid
                    try {
                        //this.$loading(true);
                        let changeResult = await this.$api.post(`${this.$store.getters.getApi}/auth/password-reset/confirm/`, {"password" : this.newPassword, "token" : this.$route.query.token},this.$store.getters.httpConfig);
                        console.log(changeResult);
                        this.printMessage("رمز جدید شما با موفقیت ثبت شد.", "ثبت رمز جدید: موفق", "success", 10000, "notif");
                        this.$router.push('/auth/login');
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                        }
                        this.printMessage("خطایی هنگام ارتباط با سرور رخ داد و یا اطلاعات وارد شده نا معتبر است.", "ثبت رمز جدید: خطا", "error", 3000, "notif");
                    } finally {

                    }

                } else {
                    this.printMessage("لطفا اطلاعات ورودی خود را کنترل کنید.", "ثبت رمز جدید: اخطار", "warn", 3000, "notif");
                }
            }
        },
    }
</script>

<style scoped>
    .loginForm {
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-direction: column;
    }

    .loginForm-label {
        margin: 20px;
        display: flex;
        flex-direction: column;
    }

    .loginForm-label:not(:first-child) {
        margin-top: 0;
    }

    .loginForm-control {
        border-radius: 10px;
        padding: 10px;
        border: none;
        background-color: #F8F8F8;
        margin-top: 10px;
        color: #999;
    }

    .loginForm-control.control--ltr {
        direction: ltr !important;
    }

    .loginForm-meta {
        font-size: 12px;
        margin-top: 10px;
    }

    .loginForm-meta.error {
        color: #c9737c;
    }

    .loginForm-button {
        margin: 0 20px;
        border-radius: 10px;
        border: none;
        background-color: #9038CC;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
    }
</style>