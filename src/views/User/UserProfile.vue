<template>
    <section class="">
        <section class="profile-wrapper">
            <form @submit.prevent="updateUser" class="profile-form gadugiFont">
                <c-simple-input
                    label="Email (not-editable):"
                    :external-label="true"
                    v-model="user.email"
                    :is-disabled="true"

                    class="profile-input"
                />

                <c-simple-input
                        label="Phone (not-editable):"
                        :external-label="true"
                        v-model="user.phone_number"
                        :is-disabled="true"

                        class="profile-input"
                />

                <c-simple-input
                        label="First name:"
                        :external-label="true"
                        v-model="inputUser.first_name"

                        :placeholder="user.first_name"
                        :error="firstNameIsInvalid"
                        error-text="Please enter a valid first name."
                        class="profile-input"
                />

                <c-simple-input
                        label="Last name:"
                        :external-label="true"
                        v-model="inputUser.last_name"
                        :placeholder="user.last_name"

                        :error="lastNameIsInvalid"
                        error-text="Please enter a valid last name."
                        class="profile-input"
                />
                <button class="profile-submit">Submit changes</button>
            </form>
            <div class="profile-password gadugiFont">
                <button class="profile-password-toggler" @click="isShowingPasswordChange = !isShowingPasswordChange">
                    <span v-if="!isShowingPasswordChange">I want to change my password</span>
                    <span v-else>Hide changing password</span>
                    <i class="material-icons" v-if="!isShowingPasswordChange">keyboard_arrow_down</i>
                    <i class="material-icons" v-else>keyboard_arrow_up</i>
                </button>
                <transition name="fade">
                    <form v-if="isShowingPasswordChange" class="profile-form" @submit.prevent="changePassword">
                        <c-password-input
                                label="Password:"
                                :external-label="true"
                                v-model="auth.password"

                                :error="passwordIsInvalid"
                                error-text="Please enter a valid password."
                                class="profile-input"
                        />

                        <c-password-input
                                label="Confirm password:"
                                :external-label="true"
                                v-model="auth.password2"

                                :error="confirmPasswordIsInvalid"
                                error-text="Please enter a valid password confirmation."
                                class="profile-input"
                        />
                        <button class="profile-submit">Submit new password</button>
                    </form>
                </transition>
            </div>
        </section>
<!--        <package-form class="profile-wrapper" style="margin-top: 30px;" v-if="!isConsultant"/>-->

    </section>

</template>

<script>
    // import PackageForm from "@/components/Packages/PackageForm";
    import {required, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
    import SimpleInput from "@/components/Form/SimpleInput";
    import PasswordInput from "@/components/Form/SimpleInput";
    export default {
        name: "UserProfile",
        components: {
            // 'package-form': PackageForm
            "c-password-input": PasswordInput,
            "c-simple-input": SimpleInput
        },
        validations: {
            inputUser: {
                first_name: {required, minLength: minLength(1), maxLength: maxLength(100)},
                last_name: {required, minLength: minLength(1), maxLength: maxLength(100)},
            },
            auth: {
                password: {required, minLength: minLength(6), maxLength: maxLength(100)},
                password2: {required, samAs: sameAs('password')}
            },
        },

        data() {
            return {
                profileSubmitted: false,
                passwordSubmitted: false,
                isShowingPasswordChange: false,
                isShowingCompleteForm: true,
                inputUser: {
                    first_name: '',
                    last_name: '',
                },
                auth: {
                    password: '',
                    password2: ''
                }
            }
        },

        created() {
            console.log(this.$store.getters.getUser);
        },

        methods: {
            async changePassword() {
                this.$v.auth.$touch();
                this.passwordSubmitted = true;
                if (!this.passwordFormIsInvalid) {
                    //password form is valid continue
                    let payload = {
                        "password": this.auth.password,
                        "password2": this.auth.password2
                    };
                    try {
                        let editResult = await this.$api.put(`${this.api}/auth/accounts/${this.userInfo.id}/`, payload, this.httpConfig);
                        console.log(editResult);
                        this.auth.password = '';
                        this.auth.password2 = '';
                        this.$notify({
                            group: 'notif',
                            type: 'success',
                            title: 'رمز عبور: موفق',
                            text: 'رمز عبور شما با موفقیت ویرایش شد.'
                        })
                    } catch (e) {
                        this.$notify({
                            group: 'notif',
                            type: 'error',
                            title: 'رمز عبور: خطا',
                            text: 'خطایی هنگام ویرایش رمز عبور شما رخ داد.'
                        })
                    }
                } else {
                    //password form is invalid show error
                    this.$notify({
                        group: 'notif',
                        type: 'warn',
                        title: 'رمز عبور: اخطار',
                        text: 'لطفاً ورودی های رمز عبور خود را کنترل کنید.'
                    })
                }
            },


            async updateUser() {
                this.$v.inputUser.$touch();
                this.profileSubmitted = true;
                console.log('update user called ', this.inputUser, 'is invalid : ', this.formIsInvalid);
                if (!this.profileFormIsInvalid) {
                    let payload = {
                        "first_name": this.inputUser.first_name,
                        "last_name": this.inputUser.last_name,
                    };
                    try {
                        let editResult = await this.$api.put(`${this.api}/auth/accounts/${this.userInfo.id}/`, payload, this.httpConfig);
                        console.log(editResult);
                        await this.$store.dispatch('getUserWithId', this.$store.getters.getUserInfo.id);
                        this.$notify({
                            group: 'notif',
                            type: 'success',
                            title: 'اطلاعات کاربری: موفق',
                            text: 'اطلاعات کاربری شما با موفقیت ویرایش شد.'
                        })
                    } catch (e) {
                        console.log(e);
                        if (e.response) {
                            console.log(e.response);
                        }
                        this.$notify({
                            group: 'notif',
                            type: 'error',
                            title: 'اطلاعات کاربری: خطا',
                            text: 'خطایی هنگام ویرایش اطلاعات کاربری شما رخ داد.'
                        })
                    }
                } else {
                    this.$notify({
                        group: 'notif',
                        type: 'warn',
                        title: 'اطلاعات کاربری: اخطار',
                        text: 'لطفاً ورودی های نام و نام خانوادگی خود را کنترل کنید.'
                    })
                }
            },

        },

        computed: {
            user() {
                return this.$store.getters.getUser;
            },

            userInfo() {
                return this.$store.getters.getUserInfo;
            },

            api() {
                return this.$store.getters.getApi;
            },

            isConsultant() {
                return this.$store.getters.isConsultant;
            },

            httpConfig() {
                return this.$store.getters.httpConfig;
            },

            firstNameIsInvalid() {
                return this.profileSubmitted && this.$v.inputUser.first_name.$error;
            },

            lastNameIsInvalid() {
                return this.profileSubmitted && this.$v.inputUser.last_name.$error;
            },

            passwordIsInvalid() {
                return this.passwordSubmitted && this.$v.auth.password.$error;
            },

            confirmPasswordIsInvalid() {
                return this.passwordSubmitted && this.$v.auth.password2.$error;
            },

            profileFormIsInvalid() {
                return this.profileSubmitted && (this.firstNameIsInvalid || this.lastNameIsInvalid);
            },

            passwordFormIsInvalid() {
                return this.passwordSubmitted && (this.passwordIsInvalid || this.confirmPasswordIsInvalid);
            },
        }
    }
</script>

<style scoped>

    .profile-wrapper {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        flex-direction: column;
        padding-bottom: 15px;
    }

    .profile-form {
        margin: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .profile-input {
        margin: 5px;
        width: calc(50% - 20px);
    }

    .profile-label {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 5px;
        width: calc(50% - 20px);
    }

    .profile-input {
        /*margin-top: 5px;*/
        /*padding: 0 5px;*/
        /*height: 40px;*/
        /*border-radius: 10px;*/
        /*border: 1px solid #ccc;*/
        /*color: #222;*/
    }

    .profile-submit {
        border: none;
        background-color: #3CAEA3;
        color: white;
        border-radius: 10px;
        padding: 7.5px 30px;
        margin: 5px auto 5px 10px;
    }

    .profile-submit:hover {
        background-color: #3ba499;
    }

    .profile-label-error {
        font-size: 12px;
        color: #c9737c;
        margin-top: 5px;
    }

    .profile-password-toggler {
        background: none;
        border: none;
        margin-left: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 13px;
        color: #585858;
    }

    .profile-password-toggler:hover {
        color: #8C3DDB;
    }

    .info-form {
        width: 100%;
        margin-top: 15px;
    }

    .text-bold {
        font-weight: bold;
        background-color: #8C3DDB;
        border-radius: 5px;
        padding: 5px 10px;
        color: white;
    }

    .info-label {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }

    .info-input {
        width: 100%;
        margin-top: 5px;
        padding: 0 5px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #ccc;
        color: #222;
    }

    .info-input:focus {
        border-color: #9038CC
    }

    @media only screen and (max-width: 991.8px) {
        .infoBlock {
            box-shadow: none;
        }
    }
</style>
