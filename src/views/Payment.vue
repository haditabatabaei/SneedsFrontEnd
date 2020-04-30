<template>
    <div class="itemBlock">
        <div class="payment" v-if="showResult">
            <i v-if="isSuccess" class="material-icons payment-icon payment-icons--success">
                done
            </i>
            <i v-else class="material-icons payment-icon payment-icons--error">
            close
            </i>
            <p v-if="isSuccess" class="payment-text payment-text--success isansFont">
                سفارش شما با موفقیت ثبت شد!
                <br>
                <span v-if="this.refld == '00000000'">
                    سفارش شما رایگان لحاظ شده است.
                </span>
            </p>
            <p v-else class="payment-text payment-text--error isansFont">
                خطایی هنگام پرداخت رخ داد.
            </p>

            <p v-if="isSuccess" class="payment-result payment-result--success">
                <span class="payment-result-info isansFont">کد پیگیری سفارش :</span>
                <span class="payment-result-code gadugiFont">{{this.refld}}</span>
            </p>

            <p v-else class="payment-result payment-result--error">
                <span class="payment-result-info isansFont--faNum">
                    خطایی هنگام احراز پرداخت شما رخ داد و یا توسط شما کنسل شد. اگر تا 5 دقیقه دیگر پیامک موفق بودن خرید برایتان نیامد و مبلغی از حسابتان کم شده، جای نگرانی نیست و ظرف 72 ساعت به حسابتان بر می گردد. در صورتی که مبلغ مورد نظر بعد از 72 ساعت به حسابتان بازنگشت، با پشتیبانی اسنیدز تماس بگیرید.
                    <mark class="payment-result-info--marked">برای پیگیری های بعدی لطفاً کد زیر را همراه خود داشته باشید.</mark>
                </span>
                <span class="payment-result-code payment-result-code--error gadugiFont">
                    Authority Code : {{$route.query.Authority}}
                </span>
            </p>


            <router-link v-if="isSuccess" to="/user/sessions" class="payment-action payment-action--success isansFont">
                مشاهده جلسات رزرو شده <i class="material-icons">keyboard_arrow_left</i></router-link>

            <router-link v-else to="/" class="payment-action payment-action--error isansFont">بازگشت به صفحه نخست</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Payment",
        methods: {
            async verifyPayment() {
                try {
                    this.$loading(true);
                    this.showResult = false;
                    let result = await axios.post(
                        `${this.$store.getters.getApi}/payment/verify/`,
                        {"authority": this.$route.query.Authority, "status": this.$route.query.Status},
                        this.$store.getters.httpConfig
                    );
                    this.detail = result.data.detail;
                    this.refld = result.data.ReflD;
                    console.log(result);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                    this.showResult = true;
                }
            }
        },
        computed: {
            isSuccess() {
                if(this.detail.length != 0) {
                    return this.detail.toLowerCase() === 'success';
                } else {
                    return false;
                }
            },
        },
        created() {
            console.log(this.$route.query);
            if(this.$route.query.refld && this.$route.query.refld == "00000000") {
                console.log("REFLD 00000000 & payment is good");
                this.refld = this.$route.query.refld;
                this.showResult = true;
                this.detail = "success";
                console.log(this.isSuccess);
                console.log(this.showResult);
            } else {
                this.verifyPayment();

                }

            }
        },
        computed: {
            isSuccess() {
                if(this.detail.length != 0) {
                    return this.detail.toLowerCase === 'success';
                } else {
                    return false;
                }
            },
        },
        created() {
            this.verifyPayment();
        },

        data() {
            return {
                refld: '',
                detail: '',
                showResult: false,
            }
        },
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 30px #00000029;
        border: 1px solid #B3B3B3;
        margin-top: 30px;
        padding-bottom: 15px;
    }

    .payment {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .payment-icon {
        font-size: 40px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        padding: 0;
        border-radius: 50%;
        margin-top: 15px;
    }

    .payment-icons--success {
        background-color: #3CAEA3;
        color: white;

    }

    .payment-icons--error {
        color: white;
        background-color: #E46464;
    }

    .payment-text {
        font-weight: bold;
        margin: 15px 0;
        font-size: 20px;
    }

    .payment-text--success {
        color: #3CAEA3;
    }

    .payment-text--error {
        color: #585858;
    }

    .payment-result {
        background-color: #FCFCFC;
        border-radius: 15px;
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    }

    .payment-text--error {
        color: #585858;
    }

    .payment-result {
        background-color: #FCFCFC;
        border-radius: 15px;
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .payment-result-info {
        color: #707070;
        font-weight: bold;
        line-height: 25px;
    }

    .payment-result-code {
        color: #3CAEA3;
        margin: 10px 0;
        font-weight: bold;
    }

    .payment-result-code--error {
        color: #c9737c;
    }

    .payment-result-info--marked {
        color: #c9737c;
        padding: 0;
        background: none;
    }

    .payment-action {
        display: flex;
        align-items: center;
        transition: box-shadow 0.1s ease-in-out;
        padding: 15px 20px;
        border-radius: 15px;
    }

    .payment-action i {
        margin-right: 10px;
    }

    .payment-action--success {
        background-color: #3CAEA3;
        color: white;
    }

    .payment-action--error {
        background-color: #9B9999;
        color: white;
    }

    .payment-action:hover {
        box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.2);
    }

    @media only screen and (max-width: 991.8px) {
        .itemBlock {
            border-radius: 0;
            border: none;
            background-color: white;
            box-shadow: none;
        }
    }
</style>
