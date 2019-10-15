<template>
    <div class="page-header header-filter header-small" data-parallax="false" id="top"
         style="transform: translate3d(0px, 0px, 0px);">
        <div class="container">
            <div class="brand text-center">
                <h1 class="title isansFont text-center">تاییدیه پرداخت</h1>
                <h4 class="isansFont text-center">
                    <RectNotifBlock :message="payLoading.message" type="warning" borderRound="true"
                                    v-if="payLoading.value"></RectNotifBlock>

                    <RectNotifBlock :message="paySuccess.message" type="success" borderRound="true"
                                    v-else-if="paySuccess.value"></RectNotifBlock>

                    <RectNotifBlock :message="payFailed.message" type="danger" borderRound="true"
                                    v-else-if="payFailed.value"></RectNotifBlock>
                </h4>

                <p class="refId isansFont">شماره پیگیری پرداخت ( لطفا این شماره را در محلی ثبت کنید ) :
                    {{this.refId}}
                </p>
                <p class="detail isansFont">توضیحات نتیجه : {{this.detail}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock';

    export default {
        name: "Payment",
        components: {
            RectNotifBlock,
        },
        mounted() {
            scrollTo(0, 0);
            this.startLoadingLogic();
            this.acceptPayment().then(response => {
                this.successLoadingLogic();
            }).catch(error => {
                this.failedLoadingLogic();
            })
        },
        data() {
            return {
                authority: this.$route.query.Authority,
                status: this.$route.query.Status,
                refId: '',
                detail: '',

                paySuccess: {
                    value: false,
                    message: 'پرداخت موفقیت آمیز بود. با تشکر از انتخاب شما. برای مشاهده جلسه به "جلسات رزرو شده" مراجعه کنید'
                },

                payLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید...'
                },

                payFailed: {
                    value: false,
                    message: 'مشکلی در تایید پرداخت رخ داد...'
                },
            }
        },
        created() {
            console.log('Bank Authority id:', this.authority);
            console.log('Bank Status :', this.status);
        },
        methods: {
            acceptPayment: function () {
                return new Promise((resolve, reject) => {
                    console.log('accept payment called.');
                    this.sendAcceptRequest().then(response => {
                        console.log(response);
                        this.refId = response.data.ReflD;
                        this.detail = response.data.detail;
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response){
                            console.log(error.response);
                            this.payFailed.message += error.response.data.detail;
                        }
                        reject(error);
                    })
                });
            },

            sendAcceptRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'payment/verify/',
                        method: 'POST',
                        data: {
                            "authority": this.authority,
                            "status": this.status,
                        },
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.payLoading.value = false;
                this.payFailed.value = false;
                this.paySuccess.value = false;
                this.paySuccess.message = 'با موفقیت وارد شدید،چند لحظه صبر کنید...'
                this.payFailed.message = 'مشکلی در ورود رخ داد...'
                this.payLoading.message = 'در حال ورود، چند لحظه صبر کنید...'
                scrollTo(0, 0);
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.payLoading.value = true;
                this.payFailed.value = false;
                this.paySuccess.value = false;
                scrollTo(0, 0);
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.payLoading.value = false;
                this.payFailed.value = true;
                this.paySuccess.value = false;
                scrollTo(0, 0);
            },

            successLoadingLogic: function () {
                window.console.log('success loading deploy');
                this.payLoading.value = false;
                this.payFailed.value = false;
                this.paySuccess.value = true;
            },
        }
    }
</script>

<style scoped>
    .container {
        padding-top: 220px;
    }

    .container .btn {
        color: rgb(51, 51, 51);
        font-weight: bold;
    }

    .page-header {
        height: 100vh;
        background-image: url('http://195.248.243.68/sneedsAssets/img/bg3.jpg');
    }

    .refId {
        font-size: 22px;
        font-weight: bold;
        padding: 10px;
        border-radius: 10px;
        background-color: white;
        color: black;
    }

    .detail {
        margin-top: 5px;
        font-size: 22px;
        font-weight: bold;
        padding: 10px;
        border-radius: 10px;
        background-color: white;
        color: black;
    }
</style>