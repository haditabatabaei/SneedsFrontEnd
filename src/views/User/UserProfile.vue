<template>
        <section class="profile-wrapper">
            <form @submit.prevent="updateUser" class="profile-form isansFont--faNum">
                <label for="email" class="profile-label">
                    <span class="profile-label-name">ایمیل (غیر قابل تغییر)</span>
                    <input id="email" :placeholder="user.email" type="text" class="profile-input" disabled>
                </label>
                <label for="phoneNumber" class="profile-label">
                    <span class="profile-label-name">شماره تماس (غیر قابل تغییر)</span>
                    <input id="phoneNumber" :placeholder="user.phone_number" type="text" class="profile-input" disabled>
                </label>
                <label for="firstName" class="profile-label">
                    <span class="profile-label-name">نام:</span>
                    <input id="firstName" :placeholder="user.first_name" type="text" class="profile-input" v-model="inputUser.first_name">
                    <span class="profile-label-error" v-if="firstNameIsInvalid">
                        لطفا یک نام معتبر وارد کنید.
                    </span>
                </label>
                <label for="lastName" class="profile-label">
                    <span class="profile-label-name">نام خانوادگی:</span>
                    <input id="lastName" :placeholder="user.last_name" type="text" class="profile-input" v-model="inputUser.last_name">
                    <span class="profile-label-error" v-if="lastNameIsInvalid">
                        لطفا یک نام خانوادگی معتبر وارد کنید.
                    </span>
                </label>
                <button class="profile-submit">ثبت تغییرات</button>
            </form>
            <div class="profile-password isansFont">
                <button class="profile-password-toggler" @click="isShowingPasswordChange = !isShowingPasswordChange">
                    <span v-if="!isShowingPasswordChange">میخواهم رمز عبور خود را تغییر دهم</span>
                    <span v-else>مخفی کردن تغییر رمز عبور</span>
                    <i class="material-icons" v-if="!isShowingPasswordChange">keyboard_arrow_left</i>
                    <i class="material-icons" v-else>keyboard_arrow_up</i>
                </button>
                <form v-if="isShowingPasswordChange" class="profile-form" @submit.prevent="changePassword">
                    <label for="password" class="profile-label">
                        <span class="profile-label-name">رمز عبور:</span>
                        <input id="password" placeholder="رمز عبور" type="password" class="profile-input" v-model="auth.password">
                        <span class="profile-label-error" v-if="passwordIsInvalid">
                        لطفا رمز عبور معتبر وارد کنید.
                    </span>
                    </label>
                    <label for="confirmPassword" class="profile-label">
                        <span class="profile-label-name">تکرار رمز عبور:</span>
                        <input id="confirmPassword" placeholder="تکرار رمز عبور" type="password" class="profile-input" v-model="auth.password2">
                        <span class="profile-label-error" v-if="confirmPasswordIsInvalid">
                        لطفا تکرار رمز عبور را معتبر وارد کنید.
                    </span>
                    </label>
                    <button class="profile-submit">ویرایش رمز عبور</button>
                </form>
            </div>
            <button v-if="!isConsultant" class="profile-password-toggler isansFont" style="margin-top: 20px;" @click="isShowingCompleteForm = !isShowingCompleteForm">
                <span v-if="!isShowingCompleteForm">مشاهده اطلاعات تکمیلی</span>
                <span v-else>مخفی کردن اطلاعات تکمیلی</span>
                <i class="material-icons" v-if="!isShowingCompleteForm">keyboard_arrow_left</i>
                <i class="material-icons" v-else>keyboard_arrow_up</i>
            </button>
            <package-form v-if="isShowingCompleteForm && !isConsultant" />
        </section>
</template>

<script>
    import PackageForm from "@/components/Packages/PackageForm";
    import {required, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
    export default {
        name: "UserProfile",
        components: {
            'package-form': PackageForm
        },
        validations :{
            inputUser : {
                first_name : {required, minLength: minLength(1), maxLength: maxLength(100)},
                last_name : {required, minLength: minLength(1), maxLength: maxLength(100)},
            },
            auth: {
                password: {required, minLength: minLength(6), maxLength: maxLength(100)},
                password2: {required, samAs: sameAs('password')}
            },
        },

        data() {
            return {
                profileSubmitted : false,
                passwordSubmitted: false,
                isShowingPasswordChange: false,
                isShowingCompleteForm: false,
                inputUser : {
                    first_name : '',
                    last_name : '',
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

        methods : {
            async changePassword() {
                this.$v.auth.$touch();
                this.passwordSubmitted = true;
                if(!this.passwordFormIsInvalid) {
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
                console.log('update user called ', this.inputUser , 'is invalid : ', this.formIsInvalid);
                if(!this.profileFormIsInvalid) {
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
                        if(e.response) {
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

        computed : {
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
        margin-top: 30px;
        padding-bottom: 15px;
    }

    .profile-form {
        margin: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .profile-label {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 5px;
        width: calc(50% - 20px);
    }

    .profile-input {
        margin-top:5px;
        padding:0 5px;
        height: 40px;
        border-radius: 10px;
        border:1px solid #ccc;
        color: #222;
    }

    .profile-submit {
        border: none;
        background-color: #3CAEA3;
        color: white;
        border-radius: 10px;
        padding: 7.5px 30px;
        margin:5px auto 5px 10px;
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
        margin-right: 20px;
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

    .info-label {
        width: 100%;
        display: flex;
        flex-direction:column;
        margin-top: 10px;
    }

    .info-input {
        width: 100%;
        margin-top:5px;
        padding:0 5px;
        height: 40px;
        border-radius: 10px;
        border:1px solid #ccc;
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
