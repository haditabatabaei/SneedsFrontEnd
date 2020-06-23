<template>
    <form class="loginForm" @submit.prevent="register()">
        <label class="loginForm-label isansFont" for="email">
            ایمیل :
            <input class="loginForm-control control--ltr" id="email" type="text" v-model.trim="$v.userToRegister.email.$model">
            <span class="loginForm-meta error" v-if="emailIsInvalid">
                لطفا یک ایمیل معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label isansFont" for="phone">
            شماره تلفن :
            <input class="loginForm-control control--ltr" id="phone" type="text"
                   v-model.trim="$v.userToRegister.phone_number.$model">
            <span class="loginForm-meta error" v-if="phoneNumberIsInvalid">
                لطفا یک شماره تلفن معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label isansFont" for="password">
            رمز عبور :
            <input class="loginForm-control control--ltr" id="password" :type="passType"
                   v-model.trim="$v.userToRegister.password.$model">
            <span class="loginForm-meta error" v-if="passwordIsInvalid">
                لطفا یک رمز عبور معتبر وارد کنید.
            </span>
        </label>
        <label class="loginForm-label label--checkbox isansFont" for="acceptPolicy">
            <span class="label--checkbox--wrapper">
                <input type="checkbox" class="loginForm-control control--checkbox" id="acceptPolicy"
                    v-model="$v.userToRegister.acceptPolicy.$model">
                <span class="label--checkbox--toggler">
                    <i class="material-icons" v-if="userToRegister.acceptPolicy">done</i>
                </span>
                <span class="label--checkbox--text">
                    با
                    <router-link to="/policy"> شرایط و ضوابط استفاده از وبسایت اسنیدز </router-link>
                    به طور کامل موافقم.
                </span>
            </span>
            <span class="loginForm-meta meta--checkbox error" v-if="acceptPolicyIsInvalid">
                برای ثبت نام باید شرایط و ضوابط را بپذیرید.
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
    const acceptPolicyValidator = (value, vm) => value === true;
    export default {
        name: "RegisterForm.vue",
        validations: {
            userToRegister: {
                email: {required, email, minLength: minLength(1)},
                phone_number: {required, iranianPhone, minLength: minLength(1)},
                password: {required, minLength: minLength(6)},
                acceptPolicy: {required, acceptPolicyValidator}
            },
        },
        data() {
            return {
                passType: 'password',
                userToRegister: {
                    email: '',
                    phone_number: '',
                    password: '',
                    acceptPolicy: false
                },
                submitted: false,
            }
        },
        props: {
            submitLabel: {
                type: String,
                default: () => 'ثبت نام'
            },
            customAction: Boolean,
            default: () => false
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

            acceptPolicyIsInvalid() {
                return this.submitted && this.$v.userToRegister.acceptPolicy.$error;
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
            async register() {
                this.$v.$touch();
                this.submitted = true;

                if (!this.registerFormIsInvalid) {
                    try {
                        //this.$loading(true);
                        await this.$store.dispatch('register', this.userToRegister);
                        if (this.customAction) {
                            this.printMessage("شما با موفقیت ثبت نام کردید ، در این مرحله نام و نام خانوادگی خود را وارد کنید.", "ثبت نام :‌ موفق", "success", 3000, "notif");

                        } else {
                            this.printMessage("شما با موفقیت ثبت نام کردید ، به پروفایل خود منتقل خواهید شد.", "ثبت نام :‌ موفق", "success", 3000, "notif");
                        }
                        if (this.customAction) {
                            this.$emit('custom-action-call')
                        } else {
                            this.$router.push('/user');
                        }
                    } catch (e) {
                        console.log(e.response);
                        if (e.response.data) {
                            this.printMessage(this.stringifyError(e.response.data), "ثبت نام :‌ خطا", "error", 3000, "notif");
                        } else {
                            this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "ثبت نام :‌ خطا", "error", 3000, "notif");
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

    .loginForm-label.label--checkbox {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
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

    .label--checkbox--toggler {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
        cursor: pointer;
    }

    .label--checkbox--wrapper {
        width: 100%;
        display: flex;
    }

    .label--checkbox--toggler i.material-icons {
        font-size: 16px;
        color: #8C3DDB;
    }

    .label--checkbox--text {
        width: calc(100% - 25px);
    }

    .loginForm-control.control--checkbox {
        display: none;
    }

    .loginForm-meta {
        font-size: 12px;
        margin-top: 10px;
    }

    .loginForm-meta.meta--checkbox {
        width: 100%;
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