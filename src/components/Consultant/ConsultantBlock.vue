<template>
    <div class="consultantBlock">
        <router-link class="consultantBlockImage" :to="'/consultants/' + consultant.slug"
                     :style="'background-image: url(' + consultant.profile_picture + ')'">
            <div class="ripple-container"></div>
        </router-link>

        <div class="consultantBlockInfo">
            <div class="consultantBlockInfoItem">
                <router-link class="isansFont consultantName" :to="'/consultants/' + consultant.slug">
                    {{consultant.first_name + ' ' + consultant.last_name}}
                </router-link>
                <router-link class="isansFont consultantCalendarLink" :to="'/consultants/' + consultant.slug">
                    <i class="material-icons">assignment</i>
                    مشاهده تقویم مشاور
                </router-link>
            </div>
            <div class="consultantBlockInfoItem">
                <p class="isansFont consultantBio">
                    دانشجوی معماری دانشگاه بریتیش کلمبیا
                </p>
            </div>
            <div class="consultantBlockInfoItem">
                <span class="rate noRate isansFont" style="font-size:12px;top:-2px;"
                      v-if="consultant.rate == null || consultant.rate.length == 0">بدون امتیاز</span>
                <span class="rate goodRate" v-else-if="consultant.rate >= 3.5">5 / {{consultant.rate.toFixed(1)}}</span>
                <span class="rate badRate" v-else>5 / {{consultant.rate.toFixed(1)}}</span>
                <span class="isansFont comments"> {{consultant.comment_number}} نظر ثبت شده</span>
            </div>
        </div>

        <div class="consultantBlockAction">
            <router-link :to="'/consultants/' + consultant.slug" class="consultantShowButton isansFont">
                مشاهده مشاور
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
        justify-content: flex-start;
        flex-wrap: wrap;
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
        margin-right: 15px;

        display: flex;
        align-self: stretch;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
    }

    .consultantBlockInfoItem {
        display: flex;
        align-items: center;
        justify-content: flex-start;
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
        font-size: 15px;
        position: relative;
        z-index: 2;
    }

    .comments {
        font-size: 12px;
        background-color: #f2f2f2;
        color: #808080;
        padding: 5px 15px;
        border-radius: 50px 0 0 50px;
        position: relative;
        top: -2px;
        margin-right: -12px;
        z-index: 1;
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

    .consultantBlockAction {
        margin-right: auto;
    }

    .consultantShowButton {
        border: 1px solid #333333;
        color: #333;
        padding: 10px 20px;
        border-radius: 10px;
        transition: all 0.2s ease;
        margin-right: auto;
        margin-left: auto;
    }

    .consultantShowButton:hover {
        background-color: #333;
        color: white;
    }

    @media only screen and (max-width: 767.8px ) and (min-width: 0) {
        .consultantBlock {
            justify-content: center;
        }

        .consultantBlockInfoItem {
            margin-top: 10px;
        }
    }

</style>