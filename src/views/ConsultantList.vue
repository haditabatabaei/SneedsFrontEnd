<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            لیست مشاوران
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">

                            <RectNotifBlock :message="fetchLoading.message" type="warning" borderRound="true" v-if="fetchLoading.value"></RectNotifBlock>

                            <RectNotifBlock :message="fetchSuccess.message" type="success" borderRound="true" v-else-if="fetchSuccess.value"></RectNotifBlock>

                            <RectNotifBlock :message="fetchFailed.message" type="danger" borderRound="true" v-else-if="fetchFailed.value"></RectNotifBlock>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4" v-for="consultantPerson in consultantList">
                            <ConsultantBlock :consultant="consultantPerson"></ConsultantBlock>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import ConsultantBlock from '@/components/Consultant/ConsultantBlock';
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'

    export default {
        name: "ConsultantList",
        components : {
            ConsultantBlock,
            RectNotifBlock
        },
        data() {
            return {
                consultantList: [],
                fetchSuccess: {
                    value: false,
                    message: 'اطلاعات شما با موفقیت ویرایش شد،چند لحظه صبر کنید...'
                },

                fetchLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید...'
                },

                fetchFailed: {
                    value: false,
                    message: 'مشکلی در دریافت اطلاعات رخ داد...'
                },
            }
        },
        created() {
            this.resetLoadingLogic();
            this.startLoadingLogic();
            let listPromise = this.getListOfConsultants();
            listPromise.then(response => {
                window.console.log(response.data);
                this.resetLoadingLogic();
                this.consultantList = response.data;
            }).catch(err => {
                this.failedLoadingLogic();
                this.fetchFailed.message =
                console.log(err.response);
            })
        },
        methods: {
            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.fetchLoading.value = false;
                this.fetchFailed.value = false;
                this.fetchSuccess.value = false;
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.fetchLoading.value = true;
                this.fetchFailed.value = false;
                this.fetchSuccess.value = false;
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.fetchLoading.value = false;
                this.fetchFailed.value = true;
                this.fetchSuccess.value = false;
            },
            getListOfConsultants: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/consultant-profiles/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(err => {
                        reject(err);
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>