<template>
        <div class="col-md-12 infoBlock">
            <form @submit.prevent="updateUser" class="info-form isansFont">
                <div class="row">
                    <div class="col-md-6">
                        <label for="email" class="info-label isansFont--faNum">ایمیل (غیر قابل تغییر) :
                            <input id="email" :placeholder="user.email" type="text" class="info-input" disabled>
                        </label>
                    </div>
                    <div class="col-md-6">
                        <label for="phoneNumber" class="info-label">
                            شماره تماس (غیر قابل تغییر) :
                            <input type="text" :placeholder="user.phone_number" id="phoneNumber" class="info-input" disabled>
                        </label>
                    </div>

                    <div class="col-md-6">
                        <label for="firstName" class="info-label">
                            نام :
                            <input type="text" :placeholder="firstNamePlaceholder" v-model.trim="inputUser.first_name" id="firstName" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="firstNameIsInvalid">نام وارد شده معتبر نیست.</span>
                        </label>
                    </div>

                    <div class="col-md-6">
                        <label for="lastName" class="info-label">
                            نام خانوادگی :
                            <input type="text" :placeholder="lastNamePlaceholder" v-model.trim="inputUser.last_name" id="lastName" class="info-input">
                            <span class="text-danger isansFont--faNum" v-if="lastNameIsInvalid">نام خانوادگی وارد شده معتبر نیست.</span>
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
    export default {
        name: "UserProfile",
        validations :{
            inputUser : {
                first_name : {  },
                last_name : {  },
            }
        },

        data() {
            return {
                submitted : false,
                inputUser : {
                    first_name : '',
                    last_name : '',
                },
            }
        },

        created() {
            console.log(this.$store.getters.getUser);
        },

        methods : {
            async updateUser() {
                this.$v.inputUser.$touch();
                this.submitted = true;
                console.log('update user called ', this.inputUser , 'is invalid : ', this.formIsInvalid);
                if(!this.formIsInvalid) {
                    try {
                        console.log('form is good dispatching requests.')
                        //this.$loading(true);
                        let editResult = await this.$api.put(`${this.$store.getters.getApi}/auth/accounts/${this.$store.getters.getUserInfo.id}/`,this.generatePayload(),this.$store.getters.httpConfig);
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

            firstNameIsInvalid() {
                return this.inputUser.first_name.length !== 0 && this.submitted && this.$v.inputUser.first_name.$error;
            },

            lastNameIsInvalid() {
                return this.inputUser.last_name.length !== 0 && this.submitted && this.$v.inputUser.last_name.$error;
            },

            formIsInvalid() {
                return this.submitted && (this.firstNameIsInvalid || this.lastNameIsInvalid);
            },
            firstNamePlaceholder() {
                if(this.user.first_name == null) {
                    return 'ثبت نشده'
                } else {
                    return this.user.first_name
                }
            },
            lastNamePlaceholder() {
                if(this.user.last_name == null) {
                    return 'ثبت نشده'
                } else {
                    return this.user.last_name
                }
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
