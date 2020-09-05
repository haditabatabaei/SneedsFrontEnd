<template>
    <form class="loginForm" @submit.prevent="register()">
        <c-simple-input
                label="Email:"
                :is-ltr="true"
                :external-label="true"
                :error="emailIsInvalid"
                error-text="Please enter a valid email address."
                v-model.trim="$v.userToRegister.email.$model"
                class="register-input"
        />
        <c-password-input
                label="Password:"
                :is-ltr="true"
                :external-label="true"
                :error="passwordIsInvalid"
                error-text="Please enter a valid password."
                v-model.trim="$v.userToRegister.password.$model"
                class="register-input"
        />
        <c-simple-input
                label="Phone:"
                :is-ltr="true"
                :external-label="true"
                :error="phoneNumberIsInvalid"
                error-text="Please enter a valid phone number."
                v-model.trim="$v.userToRegister.phone_number.$model"
                class="register-input"
        />
        <label class="loginForm-label label--checkbox gadugiFont" for="acceptPolicy">
            <span class="label--checkbox--wrapper">
                <input type="checkbox" class="loginForm-control control--checkbox" id="acceptPolicy"
                    v-model="$v.userToRegister.acceptPolicy.$model">
                <span class="label--checkbox--toggler">
                    <i class="material-icons" v-if="userToRegister.acceptPolicy">done</i>
                </span>
                <span class="label--checkbox--text">
                    I Agree with <router-link to="/policy">Sneeds privacy policy and terms of use</router-link>.
                </span>
            </span>
            <span class="loginForm-meta meta--checkbox error gadugiFont" v-if="acceptPolicyIsInvalid">
                You must agree with Sneeds privacy policy and terms of use.
            </span>
        </label>
        <button class="loginForm-button gadugiFont">
            {{submitLabel}}
            <moon-loader class="loading-icon" color="#fff" :loading="isLoading" :size="15" sizeUnit="px"/>

        </button>
    </form>
</template>

<script>
    import {required, email, minLength, helpers} from 'vuelidate/lib/validators'
    import {MoonLoader} from '@saeris/vue-spinners'
    import SimpleInput from "@/components/Form/SimpleInput";
    import NumberInput from "@/components/Form/NumberInput";
    import PasswordInput from "@/components/Form/PasswordInput";

    const iranianPhone = helpers.regex('phone_number', /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig);
    const acceptPolicyValidator = (value, vm) => value === true;
    export default {
        name: "RegisterForm.vue",
        components: {
            "moon-loader": MoonLoader,
            "c-simple-input": SimpleInput,
            "c-number-input": NumberInput,
            "c-password-input": PasswordInput
        },
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
                isLoading: false,
                submitted: false,
            }
        },
        props: {
            submitLabel: {
                type: String,
                default: () => 'Register'
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
                        this.isLoading = true;
                        //his.$loading(true);
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
                        this.isLoading = false;
                    }
                } else {

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

    .register-input {
        margin: 20px;
    }

    .register-input:not(:first-child) {
        margin-top: 0;
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
        margin-right: 5px;
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