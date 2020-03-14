<template>
    <form class="loginForm" @submit.prevent="register()">
        <label class="loginForm-label isansFont" for="email">
            ایمیل :
            <input class="loginForm-control" id="email" type="text" v-model="$v.userToRegister.email.$model">
            <span class="loginForm-meta error" v-if="emailIsInvalid">
                لطفا یک ایمیل معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label isansFont" for="phone">
            شماره تلفن :
            <input class="loginForm-control" id="phone" type="text" v-model="$v.userToRegister.phone_number.$model">
            <span class="loginForm-meta error" v-if="phoneNumberIsInvalid">
                لطفا یک شماره تلفن معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label isansFont" for="password">
            رمز عبور :
            <input class="loginForm-control" id="password" :type="passType" v-model="$v.userToRegister.password.$model">
            <span class="loginForm-meta error" v-if="passwordIsInvalid">
                لطفا یک رمز عبور معتبر وارد کنید.
            </span>
        </label>
        <button class="loginForm-button isansFont">
            {{submitLabel}}
        </button>
    </form>
</template>

<script>
    import {required, email, minLength, helpers} from 'vuelidate/lib/validators'
    const iranianPhone = helpers.regex('phone_number', /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig);
    export default {
        name: "RegisterForm.vue",
        validations: {
            userToRegister: {
                email: {required, email, minLength: minLength(1)},
                phone_number: {required, iranianPhone, minLength: minLength(1)},
                password: {required, minLength: minLength(6)},
            },
        },
        data() {
            return {
                passType: 'password',
                userToRegister: {
                    email: '',
                    phone_number: '',
                    password: '',
                },
                submitted: false,
            }
        },
        props: {
            submitLabel: {
                type: String,
                default: () => 'ثبت نام'
            }
        },
        computed: {
            registerFormIsInvalid() {
                return this.$v.userToRegister.$invalid;
            },

            emailIsInvalid() {
                return this.submitted && this.$v.userToRegister.email.$error;
            },

            phoneNumberIsInvalid() {
                return this.submitted && this.$v.userToRegister.phone_number.$error;
            },

            passwordIsInvalid() {
                return this.submitted && this.$v.userToRegister.password.$error;
            },
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
            async register() {
                this.$v.$touch();
                this.submitted = true;

                if (!this.registerFormIsInvalid) {
                    try {
                        this.$loading(true);
                        await this.$store.dispatch('register', this.userToRegister);
                        this.printMessage("شما با موفقیت ثبت نام کردید ، به پروفایل خود منتقل خواهید شد.", "ثبت نام :‌ موفق", "success", 3000, "notif");
                        this.$router.push('/user');
                    } catch (e) {
                        console.log(e.response);
                        if(e.response.data) {
                            this.printMessage( this.stringifyError(e.response.data), "ثبت نام :‌ خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage( "خطایی هنگام ارتباط با سرور رخ داد.", "ثبت نام :‌ خطا", "error", 3000, "notif");
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {
                    this.$loading(false);
                    this.printMessage("لطفا اطلاعات خود را به درستی پر کنید...", "ثبت نام :‌ اخطار", "warn", 3000, "notif");
                }
            },
        },
    }
</script>

<style scoped>
    .loginForm {
        width: 100%;
        /*background-color: blue;*/
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