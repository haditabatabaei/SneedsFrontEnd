<template>
    <div class="page-header">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <button class="btn btn-lg btn-success" @click="acceptPayment()">ACCEPT PAYMENT</button>
        <p>ref id : {{this.refId}}</p>
        <p>detail : {{this.detail}}</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Payment",
        data() {
            return {
                authority: this.$route.query.Authority,
                status: this.$route.query.Status,
                refId: '',
                detail: ''
            }
        },
        created() {
            console.log('Bank Authority id:', this.authority);
            console.log('Bank Status :', this.status);
        },
        mounted() {

        },
        methods: {

            acceptPayment: function () {
                console.log('accept payment called.');
                this.sendAcceptRequest().then(response => {
                    console.log(response);
                    this.refId = response.data.ReflD;
                    this.detail = response.data.detail;

                }).catch(error => {
                    console.log(error);
                    if (error.response)
                        console.log(error.response);
                })
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
            }
        }
    }
</script>

<style scoped>

</style>