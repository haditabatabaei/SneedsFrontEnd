<template>
    <form class="loginForm" @submit.prevent="requestReset()" v-if="!$route.query.token">
        <c-simple-input
            label="Email:"
            :external-label="true"
            v-model.trim="$v.email.$model"
            :error="emailIsInvalid"
            error-text="Please enter a valid email address."
            :is-ltr="true"
            class="forget-input"
        />
        <button class="loginForm-button gadugiFont">
            {{submitRequestResetLabel}}
        </button>
    </form>
    <form class="loginForm" @submit.prevent="updatePassword()" v-else>
        <c-password-input
                label="Password:"
                :is-ltr="true"
                :external-label="true"
                :error="newPasswordIsInvalid"
                error-text="Please enter a valid password."
                v-model.trim="$v.newPassword.$model"
                class="forget-input"
        />
        <c-password-input
                label="Confirm password:"
                :is-ltr="true"
                :external-label="true"
                :error="confirmNewPasswordIsInvalid"
                error-text="Please enter a valid password confirmation."
                v-model.trim="$v.confirmNewPassword.$model"
                class="forget-input"
        />
        <button class="loginForm-button gadugiFont">
            {{submitChangeLabel}}
            <moon-loader class="loading-icon" color="#fff" :loading="isLoading" :size="15" sizeUnit="px"/>
        </button>
    </form>
</template>

<script>
    import {required, email, minLength, maxLength, sameAs} from 'vuelidate/lib/validators';
    import {MoonLoader} from "@saeris/vue-spinners";
    import SimpleInput from "@/components/Form/SimpleInput";
    import PasswordInput from "@/components/Form/PasswordInput";
    export default {
        name: "ForgetPassForm.vue",
        components: {
            "moon-loader": MoonLoader,
            "c-simple-input": SimpleInput,
            "c-password-input": PasswordInput
        },
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
                default: () => 'Get reset password instructions on email'
            },
            submitChangeLabel: {
                type : String,
                default: () => 'Submit new password'
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
                        this.isLoading = true;

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
                        this.isLoading = false;
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

    .forget-input {
        margin: 20px;
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