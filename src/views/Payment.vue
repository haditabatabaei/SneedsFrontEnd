<template>
    <div class="container-fluid itemBlock">
        <div class="brand text-center">
            <h2 class="title isansFont text-center">تاییدیه پرداخت</h2>
            <br>
            <i v-if="this.detail.toLowerCase() == 'success'" class="material-icons text-success" style="font-size:40px">
                done
            </i>
            <i v-else-if="this.detail == undefined || this.detail.toLowerCase() == 'error'" class="material-icons text-danger" style="font-size:40px">
                close
            </i>
            <br>
            <p class="refId isansFont">شماره پیگیری پرداخت ( لطفا این شماره را در محلی ثبت کنید ) :
                {{this.refId}}
            </p>
            <p class="detail isansFont">توضیحات نتیجه : {{this.detail}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Payment",
        async mounted() {
            scrollTo(0, 0);
            try {
                this.$loading(true);
                let result = await axios.post(
                    `${this.$store.getters.getApi}/payment/verify/`,
                    {"authority": this.$route.query.Authority, "status": this.$route.query.Status},
                    this.$store.getters.httpConfig
                );
                this.refId = result.data.ReflD;
                this.detail = result.data.detail;
                console.log(result);
            } catch (e) {
                console.log(e);
                if (e.response) {
                    console.log(e.response);
                }
            } finally {
                this.$loading(false);
            }
        },

        data() {
            return {
                refId: '',
                detail: '',
            }
        },
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-bottom: 15px;
    }

    .container .btn {
        color: rgb(51, 51, 51);
        font-weight: bold;
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
