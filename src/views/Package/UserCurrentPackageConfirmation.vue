<template>
    <section class="itemBlock">
        <div class="packages-head">
            <h1 class="packages-head-title isansFont">
                نتیجه بررسی اطلاعات فرم درخواست پکیج
            </h1>
        </div>
        <div class="packages-alarm isansFont">
            <i class="material-icons">
                done
            </i>
            <p class="packages-alarm-text">
                <strong>درخواست اولیه شما توسط مشاوران زیر تایید شد</strong>
                <br>
                شما یک هفته فرصت دارین با بررسی مشاوران مناسب ترین مشاور رو انتخاب کنید.
            </p>
        </div>
        <div class="package-request-item isansFont" v-for="request in requests">
            <div class="package-request-item-info">
                <img class="request-item-info-image" src="http://api.sneeds.ir/files/account/images/consultants/24/image/mahtab-rezaie_CHIJEuT.jpeg" alt="هادی طباطبایی ">
                <div class="request-item-info-content">
                    <h2 class="isansFont item-info-content-name">هادیه طباطبایی</h2>
                    <p class="item-info-content-description">دانشجوی مهندس پزشکی در ایران</p>
                    <router-link to="/user/chats" class="info-content-chat">
                        <i class="material-icons">message</i>
                        گفتگو با هادیه
                    </router-link>
                </div>
            </div>
            <router-link to="/" class="package-request-item-aboutaction">
                درباره مشاور
            </router-link>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserCurrentPackageStatus",
        data() {
            return {
                requests: [],
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
        },
        methods: {
            async getAvailableRequests() {
                try {
                    this.$loading(true);
                    let result = await this.$api.get(`${this.api}/store/packages/consultant-sold-store-package-accept-request-list/`, this.httpConfig);
                    console.log(result);
                    this.requests = result.data;
                } catch (e) {

                } finally {
                    this.$loading(false);
                }
            }
        },
        created() {
            this.getAvailableRequests();
        }
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .packages-head {
        background-color: #FCFCFC;
        border-radius: 15px 15px 0 0;
        margin: 0;
        padding: 0;
    }

    .packages-head-title {
        margin: 10px;
        font-size: 16px;
        color: #9B9999;
    }

    .packages-alarm {
        margin: 15px;
        display: flex;
        align-items: center;
        padding: 15px;
        border: 1.5px solid #73BFBA;
        border-radius: 10px;
    }

    .packages-alarm i {
        color: #73BFBA;
        font-size: 22px;
        margin-left: 10px;
        border: 2px solid #73BFBA;
        border-radius: 50%;
        padding: 5px;
    }

    .packages-alarm-text {
        margin: 0;
        color: #707070;
    }

    .packages-alarm-text strong {
        color: #707070;
    }

    .package-request-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 20px 0 20px;
        padding-bottom: 20px;
    }

    .package-request-item:not(:first-child) {
        border-bottom: 2px solid #f9f9f9;
    }

    .package-request-item-info {
        display: flex;
        align-items: center;
    }

    .request-item-info-content {
        display: flex;
        flex-direction: column;
    }

    .request-item-info-image {
        width: 92px;
        height: 92px;
        border-radius: 50%;
        margin-left: 15px;
    }

    .item-info-content-name {
        margin: 0;
        color: #303143;
        font-size: 16px;
        font-weight: bold;
    }

    .item-info-content-description {
        color: #585858;
        margin: 5px 0;
    }

    .info-content-chat {
        background-color: #F2F2F2;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: 12px;
        display: flex;
        align-items: center;
        margin-top: 5px;
        color: #707070;
    }

    .info-content-chat i {
        font-size: 16px;
        margin-left: 5px;
        color: #8C3DDB;
    }

    .package-request-item-aboutaction {
        border: 1px solid #8C3DDB;
        border-radius: 15px;
        padding: 10px 40px;
        font-size: 14px;
    }








</style>