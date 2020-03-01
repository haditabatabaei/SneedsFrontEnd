<template>
        <div class="col-md-12 infoBlock">
            <form @submit.prevent="updateUser" class="info-form isansFont">
                <div class="row">
                    <p style="margin-right: 15px;">نکته : موارد خالی حساب نخواهند شد.</p>
                    <div class="col-md-6">
                        <label for="email" class="info-label isansFont--faNum">ایمیل :
                            <input id="email" :placeholder="user.email" v-model.trim="inputUser.email" type="text" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="emailIsInvalid">ایمیل وارد شده معتبر نیست.</span>
                        </label>
                    </div>
                    <div class="col-md-6">
                        <label for="phoneNumber" class="info-label">
                            شماره تماس :
                            <input type="text" :placeholder="user.phone_number" v-model.trim="inputUser.phone_number" id="phoneNumber" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="phoneNumberIsInvalid">شماره تماس وارد شده معتبر نیست.</span>
                        </label>
                    </div>
                    <div class="col-md-6">
                        <label for="firstName" class="info-label">
                            نام :
                            <input type="text" :placeholder="user.first_name" v-model.trim="inputUser.first_name" id="firstName" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="firstNameIsInvalid">نام وارد شده معتبر نیست.</span>
                        </label>
                    </div>
                    <div class="col-md-6">
                        <label for="lastName" class="info-label">
                            نام خانوادگی :
                            <input type="text" :placeholder="user.last_name" v-model.trim="inputUser.last_name" id="lastName" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="lastNameIsInvalid">نام خانوادگی وارد شده معتبر نیست.</span>

                        </label>
                    </div>
                    <div class="col-md-6">
                        <label for="password" class="info-label">
                            رمز عبور جدید :
                            <input type="password" :placeholder="user.password" v-model="inputUser.password" id="password" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="passwordIsInvalid">رمز عبور وارد شده معتبر نیست.</span>
                        </label>
                    </div>
                    <div class="col-md-6">
                        <label for="confirmPassword" class="info-label">
                            تکرار رمز عبور جدید :
                            <input type="password" :placeholder="user.password2" v-model="inputUser.password2" id="confirmPassword" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="confirmPasswordIsInvalid">تکرار رمز عبور وارد شده معتبر نیست.</span>
                        </label>
                    </div>
                    <div class="col-md-6 col-md-offset-6 text-left mt-10">
                        <button class="btn btn-success isansFont--faNum">ثبت تغییرات</button>
                    </div>
                </div>
            </form>
        </div>
</template>

<script>
    import axios from 'axios'
    import {email, minLength, sameAs, helpers} from 'vuelidate/lib/validators'
    const iranianPhone = helpers.regex('phone_number', /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig);
    export default {
        name: "UserProfile",
        validations :{
            inputUser : {
                first_name : {  },
                last_name : {  },
                phone_number : {iranianPhone },
                email : { email },
                password : { minLength: minLength(6) },
                password2 :  { sameAs : sameAs('password') },
            }
        },

        data() {
            return {
                submitted : false,
                inputUser : {
                    first_name : '',
                    last_name : '',
                    phone_number : '',
                    email : '',
                    password : '',
                    password2 : '',
                },
            }
        },

        created() {
            console.log(this.$store.getters.getUser);
        },

        methods : {
            updateUser:async function() {
                this.$v.inputUser.$touch();
                this.submitted = true;
                console.log('update user called ', this.inputUser , 'is invalid : ', this.formIsInvalid);
                if(!this.formIsInvalid) {
                    //form is ok
                    //remove all empty fields from;
                    try {
                        console.log('form is good dispatching requests.')
                        this.$loading(true);
                        let editResult = await axios.put(`${this.$store.getters.getApi}/auth/accounts/${this.$store.getters.getUserInfo.id}/`,this.generatePayload(),
                            {
                                headers : {
                                    "Authorization" : `JWT ${this.$store.getters.getToken}`
                                },
                                timeout: 5000
                            });
                        console.log(editResult);
                        await this.$store.dispatch('getUserWithId', this.$store.getters.getUserInfo.id);
                        this.printMessage("اطلاعات شما با موفقیت به روز رسانی شد.", "ویرایش : موفق", "success", "4000", "notif")
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                            if(e.response.detail) {
                                this.printMessage(e.response.data.detail, "ویرایش : خطا", "error", 3000, "notif");
                            } else {
                                this.printMessage( this.stringifyError(e.response.data), "ویرایش :‌ خطا", "error", 3000, "notif");
                            }
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {
                    this.printMessage("لطفا اطلاعات ورودی خود را کنترل کنید.", "ویرایش: اخطار", "warn", 3000, "notif");
                }
            },

            generatePayload() {
                console.log(this.inputUser);
                let payload = {};
                for(let item in this.inputUser) {
                    if(this.inputUser[item].length !== 0) {
                        payload[item] = this.inputUser[item];
                    }
                }
                console.log(payload);
                return payload;
            },

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
        },

        computed : {
            user() {
                return this.$store.getters.getUser;
            },

            passwordIsInvalid() {
                return this.inputUser.password.length !== 0 && this.submitted && this.$v.inputUser.password.$error;
            },

            confirmPasswordIsInvalid() {
                return this.submitted && this.$v.inputUser.password2.$error;
            },

            emailIsInvalid() {
                return this.inputUser.email.length !== 0 && this.submitted && this.$v.inputUser.email.$error;
            },

            phoneNumberIsInvalid() {
                console.log('phonnumber input user', this.inputUser.phone_number)
                return this.inputUser.phone_number.length !== 0 && this.submitted && this.$v.inputUser.phone_number.$error;
            },

            firstNameIsInvalid() {
                return this.inputUser.first_name.length !== 0 && this.submitted && this.$v.inputUser.first_name.$error;
            },

            lastNameIsInvalid() {
                return this.inputUser.last_name.length !== 0 && this.submitted && this.$v.inputUser.last_name.$error;
            },

            formIsInvalid() {
                return this.submitted && (this.firstNameIsInvalid || this.lastNameIsInvalid || this.emailIsInvalid
                || this.phoneNumberIsInvalid || this.passwordIsInvalid || this.confirmPasswordIsInvalid);
            }
        }
    }
</script>

<style scoped>
    .infoBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 30px;
        padding-bottom: 15px;
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
