<template>
    <router-link class="consultantBlock row" :to="clickTarget">
        <div class="consultantBlockData col-md-8">
            <img :src="package.image" :alt="package.title" class="consultantBlockImage" v-if="package.image"/>
            <img src="/sneedsAssets/img/plane.jpg" :alt="package.title" class="consultantBlockImage" v-else/>
            <div class="consultantBlockInfo" style="margin-top:10px;">
                <div class="consultantBlockInfoItem">
                    <router-link class="isansFont--faNum consultantName" :to="clickTarget">
                        {{package.title}}
                    </router-link>
                </div>
                <div class="consultantBlockInfoItem">
                    <p class="isansFont--faNum consultantBio" v-if="hasConsultant">
                        وضعیت:
                        مشاور تایید شده. در حال انجام.
                    </p>
                    <p class="isansFont--faNum consultantBio" v-else>
                        وضعیت:
                        منتظر تایید یکی از مشاوران توسط شما.
                    </p>
                    <p class="isansFont--faNum consultantBio">
                        تاریخ ایجاد:
                        {{getJalali(package.created).locale($store.getters.locale).format('dddd DD MMMM YYYY HH:mm')}}
                    </p>
                </div>
            </div>
        </div>

        <div class="consultantBlockAction col-md-4 text-center">
            <router-link :to="clickTarget" class="btn consultantShowButton isansFont" v-if="!hasConsultant">
                مشاهده درخواست های مشاورین
            </router-link>
            <router-link :to="clickTarget" class="btn consultantShowButton isansFont" v-else>
                مشاهده وضعیت پکیج
            </router-link>
        </div>
    </router-link>
</template>

<script>
    import jalali from 'jalali-moment'
    export default {
        name: "UserSoldPackageBlock",
        props: {
            package: {
                type: Object,
            },
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            }
        },
        computed: {
            clickTarget() {
                if(this.package.consultant == null) {
                    return `/user/userpackages/requestlist/${this.package.id}`
                } else {
                    return `/user/userpackages/manager/${this.package.id}`
                }
            },
            hasConsultant() {
                return !!this.package.consultant;
            }
        }
    }
</script>

<style scoped>
    .consultantBlock {
        background-color: white;
        border-radius: 10px;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 0 0 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        cursor: pointer;
    }

    .consultantBlock:first-child {
        border-radius: 0 0 10px 10px;
    }

    .consultantBlockData {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 0;
    }

    .consultantBlock:hover {
        border-color: #82eafb;
    }

    .consultantBlockImage {
        width: 150px !important;
        height: 150px !important;
        min-width: 150px;
        max-width: 150px;
        min-height: 150px;
        max-height: 150px;
        border-radius: 10px;
    }

    .consultantBlockInfo {
        margin-left: auto;
        margin-right: 40px;
        display: flex;
        align-self: stretch;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
    }

    .consultantBlockInfoItem {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
    }

    .consultantName {
        color: #333;
        font-size: 17px;
        font-weight: bold;
    }

    .consultantCalendarLink {
        color: #BD79C9;
        font-size: 10px;
        font-weight: bold;
        margin-right: 5px;
        border-right: 1px solid #f2f2f2;
        padding-right: 5px;
    }

    .consultantBio {
        color: #666;
        font-size: 12px;
        line-height: 25px;
    }

    .rate {
        padding: 5px 15px;
        border-radius: 50px;
        color: white;
        font-size: 12px;
        position: relative;
        z-index: 2;
        top: -2px;
    }

    .comments {
        font-size: 12px;
        background-color: #f2f2f2;
        color: #808080;
        padding: 5px 20px;
        border-radius: 50px 0 0 50px;
        position: relative;
        top: -2px;
        margin-right: -12px;
        z-index: 1;
    }

    .comments:hover {
        background-color: #e9e9e9;
    }

    .goodRate {
        background-color: #68BD6B;
    }

    .normalRate {
        background-color: orange;
    }

    .badRate {
        background-color: #9d0000;
    }

    .noRate {
        background-color: #ccc;
    }

    .consultantShowButton {
        border: 1px solid #8E39CC;
        color: #8E39CC;
        padding: 10px 35px;
        border-radius: 10px;
        transition: all 0.2s ease;
        background-color: white;
        font-size: 12px;
        text-align: center;
    }

    .consultantCalendarLink i {
        color: #bd79c9bf;
        font-size: 18px;
    }

    .consultantShowButton:hover {
        background-color: #8E39CC;
        color: white;
    }

    .consultantBlockAction {
        display: block;
    }

    .consultantBio--mobile {
        display: none;
    }

    @media only screen and (max-width: 576.8px) and (min-width: 0) {
        .consultantBlockImage {
            width: 100px !important;
            height: 100px !important;
            min-width: 100px;
            min-height: 100px;
            max-width: 100px;
            max-height: 100px;
        }

        .consultantCalendarLink {
            display: none;
        }

        .consultantShowButton {
            display: none;
        }

        .consultantBlockData {
            padding-right: 0;
            padding-left: 0;
            flex-wrap: nowrap;
            margin-left: auto;
        }

        .consultantName {
            font-size: 15px;
        }

        .consultantBio {
            font-size: 12px;
        }

        .comments {
            font-size: 10px;
        }

        .rate {
            font-size: 10px;
            padding: 5px 10px;
        }


        .consultantBio {
            display: none;
        }

        .consultantBio--mobile {
            display: initial;
            color: #666;
        }
    }
</style>