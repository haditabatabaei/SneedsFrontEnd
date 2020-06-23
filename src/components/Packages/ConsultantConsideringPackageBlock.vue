<template>
    <router-link class="consultantBlock row" :to="clickTarget">
        <div class="consultantBlockData col-md-8">
            <div class="package-image-wrapper">
                <img class="package-image" :src="package.image" :alt="package.title" v-if="package.image">
                <img class="package-image" src="/sneedsAssets/img/plane.jpg" :alt="package.title" v-else>
            </div>
            <div class="consultantBlockInfo" style="margin-top:10px;">
                <div class="consultantBlockInfoItem">
                    <p class="package-title-country isansFont" v-if="hasUserDetailedInfo">
                        {{package.userDetailedInfo.apply_country.name}}
                    </p>
                    <router-link class="isansFont--faNum consultantName" :to="clickTarget">
                        {{package.title}}
                    </router-link>
                </div>
                <div class="consultantBlockInfoItem">
                    <p class="isansFont consultantBio">
                        رزرو توسط:
                        {{`${package.sold_to.first_name} ${package.sold_to.last_name}`}}
                        <br>
                        <span v-if="hasUserDetailedInfo">
                            برای رشته :
                            {{package.userDetailedInfo.apply_major}}
                        </span>
                    </p>
                    <p class="isansFont consultantBio--mobile">
                        رزرو توسط:
                        {{`${package.sold_to.first_name} ${package.sold_to.last_name}`}}
                    </p>
                </div>
            </div>
        </div>

        <div class="consultantBlockAction col-md-4 text-center">
            <router-link :to="clickTarget" class="consultantShowButton isansFont" v-if="!hasConsultant">
                مشاهده جزئیات پکیج و اعلام آمادگی
            </router-link>
            <p class="package-budget isansFont--faNum" v-if="!hasConsultant">
                درآمد خام پکیج :
                {{package.total_price}}
                تومان
            </p>
            <router-link :to="clickTarget" class="consultantShowButton isansFont" v-else>
                مدیریت پکیج
            </router-link>
        </div>

    </router-link>
</template>

<script>
    export default {
        name: "ConsultantConsideringPackageBlock",
        props: {
            package: {
                type: Object,
            },
        },
        computed: {
            clickTarget() {
                if(!this.hasConsultant) {
                    return `/user/conspackages/marketplace/${this.package.id}`
                } else {
                    return `/user/conspackages/manager/${this.package.id}`
                }
            },
            hasUserDetailedInfo() {
                return !!this.package.userDetailedInfo;
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

    .package-image {
        width: 150px;
        height: 150px ;
        min-width: 150px;
        max-width: 150px;
        min-height: 150px;
        max-height: 150px;
        border-radius: 10px;
    }

    .package-budget {
        padding: 3px 5px;
        border-radius: 10px;
        color: #666;
        font-size: 10px;
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
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
    }

    .consultantName {
        color: #333;
        font-size: 17px;
        font-weight: bold;
    }

    .consultantBio {
        color: #666;
        font-size: 12px;
        line-height: 25px;
    }

    .field-icon {
        font-size: 16px;
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
        display: flex;
        flex-direction: column;;
    }

    .consultantBio--mobile {
        display: none;
    }

    @media only screen and (max-width: 576.8px) and (min-width: 0) {
        .package-image-wrapper {
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