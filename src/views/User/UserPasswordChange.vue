<template>
    <div class="col-md-12 infoBlock">
        <form @submit.prevent="updateUser" class="info-form isansFont">
            <div class="row">
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
    import {minLength, sameAs} from 'vuelidate/lib/validators'
    export default {
        name: "UserPasswordChange",
        validations :{
            inputUser : {
                password : { minLength: minLength(6) },
                password2 :  { sameAs : sameAs('password') },
            }
        },

        data() {
            return {
                submitted : false,
                inputUser : {
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
                        //this.$loading(true);
                        let editResult = await this.$api.put(`${this.$store.getters.getApi}/auth/accounts/${this.$store.getters.getUserInfo.id}/`,this.generatePayload(),
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

            formIsInvalid() {
                return this.submitted && (this.passwordIsInvalid || this.confirmPasswordIsInvalid);
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
