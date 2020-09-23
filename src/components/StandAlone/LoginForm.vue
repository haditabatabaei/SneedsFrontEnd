<template>
    <form class="loginForm" @submit.prevent="login()">
        <c-simple-input
            label="Email:"

            :external-label="true"
            :error="emailIsInvalid"
            error-text="Please enter a valid email address."
            v-model.trim="$v.userToLogin.email.$model"
            class="login-input"
        />
        <c-password-input
            label="Password:"

            :external-label="true"
            :error="passwordIsInvalid"
            error-text="Please enter a valid password."
            v-model.trim="$v.userToLogin.password.$model"
            class="login-input"
        />
        <router-link class="reset-password" to="/auth/forget">Reset password?</router-link>

        <button class="loginForm-button gadugiFont">
            {{submitLabel}}
            <moon-loader class="loading-icon" color="#fff" :loading="isLoading" :size="15" sizeUnit="px"/>
        </button>
    </form>
</template>

<script>
    import {required, email, minLength} from 'vuelidate/lib/validators';
    import {MoonLoader} from '@saeris/vue-spinners'
    import SimpleInput from "@/components/Form/SimpleInput";
    import PasswordInput from "@/components/Form/PasswordInput"
    export default {
        name: "LoginForm.vue",
        components: {
            "moon-loader": MoonLoader,
            "c-simple-input": SimpleInput,
            "c-password-input": PasswordInput
        },
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
                isLoading: false
            }
        },
        props: {
            submitLabel: {
                type: String,
                default: () => 'Login'
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
                        this.isLoading = true;
                        //this.$loading(true);
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
                        this.isLoading = false;
                    }
                } else {

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

    .login-input {
        margin: 20px;
    }

    .login-input:not(:first-child) {
        margin-top: 0;
    }

    .reset-password {
        font-size: 12px;
        margin: 0 20px 20px 20px;
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
        display:flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
    }
</style>