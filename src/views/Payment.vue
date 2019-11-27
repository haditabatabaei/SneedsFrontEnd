<template>
    <div class="page-header header-filter header-small" data-parallax="false" id="top">
        <div class="container">
            <div class="brand text-center">
                <h1 class="title isansFont text-center">تاییدیه پرداخت</h1>

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
            // this.startLoadingLogic();
            this.$loading(true);
            this.acceptPayment().then(response => {
                this.refId = response.data.ReflD;
                this.detail = response.data.detail;
                this.$notify({
                    group : 'notif',
                    type : 'success',
                    title : 'پرداخت : موفق',
                    duration:10000,
                    text : 'پرداخت و رزرو شما با موفقیت انجام شد. برای مشاهده و ورود به جلسه به صفحه جلسات رزرو شده مراجعه کنید. با تشکر'
                })
            }).catch(error => {
                this.$notify({
                    group : 'notif',
                    type : 'error',
                    title : 'پرداخت : نا موفق',
                    duration:10000,
                    text : 'خطایی هنگام پرداخت و رزرو شما رخ داد و یا پرداخت توسط شما لغو شد.'
                })
            }).finally(() => {this.$loading(false)})
        },
        data() {
            return {
                authority: this.$route.query.Authority,
                status: this.$route.query.Status,
                refId: '',
                detail: '',
            }
        },
        created() {
            console.log('Bank Authority id:', this.authority);
            console.log('Bank Status :', this.status);
        },
        methods: {
            acceptPayment: function () {
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
                        if(error.response){
                            console.log(error.response);
                        }
                        reject(error);
                    })
                })
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
        background-image: url('http://185.209.243.97/sneedsAssets/img/bg3.jpg');
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