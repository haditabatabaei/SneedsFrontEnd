<template>
    <section class="request-list-wrapper">
        <package-staging current-stage-value="choosecons" />
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
                    <img class="request-item-info-image" :src="request.consultant_info.profile_picture" :alt="`${request.consultant_info.first_name} ${request.consultant_info.last_name}`">
                    <div class="request-item-info-content">
                        <h2 class="isansFont item-info-content-name">{{`${request.consultant_info.first_name} ${request.consultant_info.last_name}`}}</h2>
                        <router-link to="/user/chatroom" class="info-content-chat">
                            <i class="material-icons">message</i>
                            گفتگو با
                            {{request.consultant_info.first_name}}
                        </router-link>
                    </div>
                </div>
                <router-link :to="`/user/userpackages/requestlist/${request.sold_store_package}/${request.id}`" class="package-request-item-aboutaction">
                    درباره مشاور
                </router-link>
            </div>
            <p class="package-request--empty isansFont" v-if="requests.length === 0">
                هنوز مشاوری برای انجام پکیج شما اعلام آمادگی نکرده است.
            </p>
        </section>
    </section>
</template>

<script>
    import PackageStaging from "@/components/Packages/PackageStaging";

    export default {
        name: "PackageRequestList",
        components: {
            'package-staging': PackageStaging
        },
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
                    //this.$loading(true);
                    let result = await this.$api.get(`${this.api}/store/packages/consultant-sold-store-package-accept-request-list/?sold_store_package=${this.$route.params.packageId}`, this.httpConfig);
                    console.log(result);
                    this.requests = result.data;
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            }
        },
        created() {
            this.getAvailableRequests();
        }
    }
</script>

<style scoped>

    .request-list-wrapper {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }

    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 15px;
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

    .package-request--empty {
        text-align: center;
        font-size: 13px;
        color: #707070;
    }

    @media only screen and (max-width: 567.8px) {
        .request-item-info-image {
            width: 60px;
            height: 60px;
        }

        .package-request-item-info {
            flex-wrap: wrap;
        }

        .item-info-content-name {
            font-size: 12px;
        }

        .info-content-chat {
            display: none;
        }

        .package-request-item-aboutaction {
            font-size: 12px;
            padding: 5px 20px;
        }
    }
</style>