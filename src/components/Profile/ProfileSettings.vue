<template>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <h4 class="title isansFont text-right">
                پنل تنظیمات اطلاعات کاربری
            </h4>
            <hr>
            <h5 class="isansFont text-right pull-right">
                اطلاعات فردی :
            </h5>
            <div class="card card-contact">
                <form action="" id="contact-form" method="post"
                      @submit.prevent="edit()">
                    <div class="card-content">
                        <div class="row mt-0">
                            <div class="col-md-6">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="firstname" class="isansFont">نام : </label>
                                        <input v-model="$v.inputUser.first_name.$model"
                                               id="firstname" type="text"
                                               name="firstname" class="form-control isansFont">
                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.inputUser.first_name.$error">
                      لطفا یک نام معتبر وارد کنید
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="lastname" class="isansFont">نام خانوادگی
                                            : </label>
                                        <input v-model="$v.inputUser.last_name.$model"
                                               id="lastname" type="text"
                                               name="lastname" class="form-control isansFont">
                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.inputUser.last_name.$error">
                      لطفا یک نام خانوادگی معتبر وارد کنید
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-10">
                            <div class="col-md-12">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="email" class="isansFont">ایمیل (غیر قابل تغییر) : </label>
                                        <input id="email" type="email"
                                               v-model="$v.inputUser.email.$model" name="email"
                                               class="form-control isansFont"
                                               disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-10">
                            <div class="col-md-12">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="phonenum" class="isansFont">شماره تماس
                                            : </label>
                                        <input id="phonenum" type="number"
                                               v-model="$v.inputUser.phone_number.$model"
                                               name="phonenum" class="form-control isansFont">
                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.inputUser.phone_number.$error">
                      لطفا یک شماره تماس معتبر وارد کنید
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="input-group w-100">
                                    <div class="form-group mt-0">
                                        <label for="address" class="isansFont">آدرس
                                            : </label>
                                        <input id="address" type="text"
                                               v-model="$v.inputUser.address.$model"
                                               name="address" class="form-control isansFont">
                                        <span class="text-center isansFont text-danger"
                                              v-if="$v.inputUser.address.$error">
                      لطفا یک آدرس معتبر وارد کنید
                                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-10">
                            <div class="col-md-6"></div>
                            <div class="col-md-6">
                                <input type="submit" value="ذخیره تغییرات"
                                       class="btn btn-success isansFont pull-left"
                                       :disabled="$v.inputUser.$anyError || !$v.inputUser.$anyDirty">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'
    import {required, email, helpers} from 'vuelidate/lib/validators'

    const iranianPhone = helpers.regex('phone_number', /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig)

    export default {
        name: "ProfileSettings",
        components: {
            RectNotifBlock
        },
        validations: {
            inputUser: {
                first_name: {required},
                last_name: {required},
                phone_number: {required, iranianPhone},
                email : {required,email},
                address : {},
            },
        },
        data() {
            return {

            }
        }, props: {
            user: {}, inputUser: {}
        },
        methods: {

            edit: function () {
                window.console.log('edit pressed');
                //this.$loading(true);
                window.console.log('user input data : ', this.inputUser);

                if (!(this.$v.inputUser.$anyError || !this.$v.inputUser.$anyDirty)) {
                    window.console.log("dispatching edit with payload");

                    delete this.inputUser.email;

                    let editPromise = this.$store.dispatch('edit', this.inputUser);

                    editPromise.then((response) => {
                        console.log(response);
                        setTimeout(() => {
                            let promise = this.$store.dispatch('getUserKey');
                            promise.then(() => {
                                this.$store.dispatch('getUserWithKey', this.$store.getters.getUserInfo.user_pk)
                            });
                        }, 2000);
                        this.$notify({
                            group : 'notif',
                            duration: 3000,
                            type : 'success',
                            title : 'ویرایش : موفق',
                            text : 'اطلاعات شما با موفقیت ویرایش شد.'
                        });
                    }).catch((err) => {
                        console.log(err);
                        console.log(err.response);

                        this.$notify({
                            group : 'notif',
                            duration: 3000,
                            type : 'error',
                            title : 'ویرایش : خطا',
                            text : 'خطایی هنگام ارتباط با سرور رخ داد.'
                        });
                    }).finally( () => {})
                } else {

                    this.$notify({
                        group : 'notif',
                        duration: 3000,
                        type : 'warn',
                        title : 'ویرایش : اخطار',
                        text : 'لطفا اطلاعات خود را به درستی پر کنید.'
                    });
                }
            },
        }
    }
</script>

<style scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

</style>
