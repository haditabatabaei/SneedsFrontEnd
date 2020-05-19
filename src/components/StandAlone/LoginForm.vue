<template>
    <form class="loginForm" @submit.prevent="login()">
        <label class="loginForm-label isansFont" for="email">
            ایمیل :
            <input class="loginForm-control" id="email" type="text" v-model.trim="$v.userToLogin.email.$model">
            <span class="loginForm-meta error" v-if="emailIsInvalid">
                لطفا یک ایمیل معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label isansFont" for="password">
            رمز عبور :
            <input class="loginForm-control" id="password" :type="passType" v-model.trim="$v.userToLogin.password.$model">
            <span class="loginForm-meta error" v-if="passwordIsInvalid">
                لطفا یک رمز عبور معتبر وارد کنید.
            </span>
            <span class="loginForm-meta">
                <router-link to="/auth/forget">رمز عبور خود را فراموش کرده ام؟</router-link>
            </span>

        </label>
        <button class="loginForm-button isansFont">
            {{submitLabel}}
        </button>
    </form>
</template>

<script>
    import {required, email, minLength} from 'vuelidate/lib/validators';

    export default {
        name: "LoginForm.vue",
        validations: {
            userToLogin: {
                email: {required, email, minLength: minLength(1)},
                password: {required, minLength: minLength(6)}
            },
        },
        data() {
            return {
                passType: 'password',
                userToLogin: {
                    email: '',
                    password: '',
                },
                loginOrReset: true,
                submitted: false,
            }
        },
        props: {
            submitLabel: {
                type: String,
                default: () => 'ورود'
            },
            customAction: {
                type: Boolean,
                default: () => false
            },
        },
        computed: {
            loginFormIsInvalid() {
                return this.submitted && this.$v.userToLogin.$invalid;
            },

            emailIsInvalid() {
                return this.submitted && this.$v.userToLogin.email.$error;
            },

            passwordIsInvalid() {
                return this.submitted && this.$v.userToLogin.password.$error;
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
            togglePassType() {
                if (this.passType == 'password') {
                    this.passType = 'text'
                } else {
                    this.passType = 'password'
                }
            },
            stringifyError(errorObj) {
                let string = '<br>';
                for (let item in errorObj) {
                    string += errorObj[item].join('<br>') + '<br>';
                }
                return string;
            },
            async login() {
                window.console.log('login pressed');
                this.$v.$touch();
                this.submitted = true;

                console.log(this.loginFormIsInvalid);

                if (!this.loginFormIsInvalid) {
                    window.console.log("dispatching login with payload");
                    try {
                        this.$loading(true);
                        await this.$store.dispatch('login', this.userToLogin);
                        this.printMessage("شما با موفقیت وارد شدید.", "ورود: موفق", "success", 3000, "notif");
                        if(this.customAction) {
                            this.$emit('custom-action-call');
                        } else {
                            this.$router.push('/user')
                        }
                    } catch (e) {
                        console.log(e.response);
                        if (e.response && e.response.data) {
                            this.printMessage(e.response.data.detail, "ورود: خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "ورود: خطا", "error", 3000, "notif");
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {
                    this.$loading(false);
                    this.printMessage("لطفا اطلاعات ورودی خود را کنترل کنید.", "ورود: اخطار", "warn", 3000, "notif");
                }
            },
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
        display:flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
    }
</style>