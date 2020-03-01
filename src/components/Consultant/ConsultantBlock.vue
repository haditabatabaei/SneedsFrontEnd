<template>
    <div class="consultantBlock row" @click="$router.push('/consultants/' + consultant.slug)">
        <div class="consultantBlockData col-md-8">
            <router-link class="consultantBlockImage" :to="'/consultants/' + consultant.slug"
                         :style="'background-image: url(' + consultant.profile_picture + ')'">
                <div class="ripple-container"></div>
            </router-link>

            <div class="consultantBlockInfo" style="margin-top:10px;">
                <div class="consultantBlockInfoItem">
                    <router-link class="isansFont consultantName" :to="'/consultants/' + consultant.slug">
                        {{consultant.first_name + ' ' + consultant.last_name}}
                    </router-link>
                    <router-link class="isansFont consultantCalendarLink"
                                 :to="'/consultants/' + consultant.slug ">
                        <i class="material-icons">assignment</i>
                        مشاهده تقویم مشاور
                    </router-link>
                </div>
                <div class="consultantBlockInfoItem">
                    <p class="isansFont consultantBio">
                        دانشجوی
                        {{consultant.field_of_studies[0].name}}
                        در
                        {{consultant.countries[0].name}}
                    </p>
                </div>
                <div class="consultantBlockInfoItem">
                <span class="rate noRate isansFont--faNum"
                      v-if="consultant.rate == null || consultant.rate.length == 0">بدون امتیاز</span>
                    <span class="rate goodRate isansFont--faNum" v-else-if="consultant.rate >= 3.5">5 / {{consultant.rate.toFixed(1)}}</span>
                    <span class="rate badRate isansFont--faNum" v-else>5 / {{consultant.rate.toFixed(1)}}</span>
                    <router-link class="isansFont--faNum comments"
                                 :to="'/consultants/' + consultant.slug">{{consultant.comment_number}}
                        نظر ثبت شده
                    </router-link>
                </div>
            </div>
        </div>

        <div class="consultantBlockAction col-md-4 text-center">
            <router-link :to="'/consultants/' + consultant.slug" class="btn consultantShowButton isansFont">
                مشـاهده مشاور
            </router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ConsultantBlock",
        props: {
            consultant: {},
        }

    }
</script>

<style scoped>

    .consultantBlock {
        background-color: white;
        border-radius: 10px;
        border: 1px solid #ccc;
        padding: 15px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        cursor: pointer;
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
        width: 150px;
        height: 150px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

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
        align-items: center;
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
        border: 1px solid #333333;
        color: #333;
        padding: 10px 35px;
        border-radius: 10px;
        transition: all 0.2s ease;
        background-color: white;
    }

    .consultantCalendarLink i {
        color: #bd79c9bf;
        font-size: 18px;
    }

    .consultantShowButton:hover {
        background-color: #333;
        color: white;
    }

    .consultantBlockAction {
        display: block;
    }

    @media only screen and (max-width: 576.8px) and (min-width: 0) {
        .consultantBlockImage {
            width: 100px;
            height: 100px;
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

    }

</style>
