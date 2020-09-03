<template>
    <router-link class="consultantBlock row" :to="`/consultants/${consultant.slug}`">
        <div class="consultantBlockData col-md-8">
            <img :src="consultant.profile_picture" :alt="`${consultant.first_name} ${consultant.last_name}`"
                 class="consultantBlockImage"/>
            <div class="consultantBlockInfo" style="margin-top:10px;">
                <div class="consultantBlockInfoItem">
                    <router-link class="isansFont consultantName" :to="`/consultants/${consultant.slug}`"
                                 v-if="consultant.first_name != null && consultant.last_name != null">
                        {{consultant.first_name + ' ' + consultant.last_name}}
                    </router-link>
                    <router-link class="isansFont consultantName" :to="`/consultants/${consultant.slug}`" v-else>
                        Anonymous
                    </router-link>
                </div>
                <div class="consultantBlockInfoItem gadugiFont">
                    <p class="consultantBio">
                        {{studyText}}
                    </p>
                    <p class="consultantBio--mobile">
                        {{studyTextMobile}}
                    </p>
                    <p class="consultantBio--mobile">
                        Price per session: {{consultant.time_slot_price}} Tomans
                    </p>
                </div>
                <div class="consultantBlockInfoItem">
                    <span class="rate noRate gadugiFont" v-if="consultant.rate == null">No rate</span>
                    <span class="rate gadugiFont" :style="`background-color:${getRateStyle(consultant.rate)}`">Rate: {{consultant.rate}} / 5</span>
                </div>
            </div>
        </div>

        <div class="consultantBlockAction col-md-4 text-center">
            <router-link :to="`/consultants/${consultant.slug}`" class="btn consultantShowButton isansFont">
                View profile
            </router-link>
            <p class="consultantPrice gadugiFont">
                Price per session:
                {{consultant.time_slot_price}}
                Tomans
            </p>
        </div>

    </router-link>
</template>

<script>
    export default {
        name: "ConsultantBlock",
        props: {
            consultant: {
                type: Object,
                default: () => null
            },
        },
        methods: {
            getRateStyle(rate) {
                if(!isNaN(rate)) {
                    return `hsl(${(rate / 5) * 133}, 64%, 60%);`
                }
            }
        },
        computed: {
            studyText() {
                if (this.consultant != null) {
                    return `Studying ${this.studyInfo.grade} of ${this.studyInfo.field_of_study.name} at ${this.studyInfo.university.name} in ${this.studyInfo.country.name}`
                } else {
                    return " ";
                }
            },

            studyTextMobile() {
                if (this.consultant != null) {
                    return `Studying ${this.studyInfo.field_of_study.name} in ${this.studyInfo.country.name}`;
                } else {
                    return " ";
                }
            },

            studyInfo() {
                return this.consultant.study_info[this.consultant.study_info.length - 1];
            },

            persianGrade() {
                if (this.consultant != null) {
                    switch (this.studyInfo.grade) {
                        case 'phd':
                            return 'Ph.D';
                        case 'master':
                            return 'master';
                        case 'bachelor':
                            return 'bachelor';
                        default :
                            return ' ';
                    }
                } else {
                    return ' ';
                }
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
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        width: 150px !important;
        height: 150px !important;
        min-width: 150px;
        max-width: 150px;
        min-height: 150px;
        max-height: 150px;
        border-radius: 10px;
    }

    .consultantBlockInfo {
        margin-right: auto;
        margin-left: 40px;

        display: flex;
        align-self: stretch;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
    }

    .consultantBlockInfoItem {
        display: flex;
        flex-direction: column;
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

    .consultantBio--mobile {
        display: none;
    }

    .consultantPrice {
        font-size: 12px;
        margin-top: 5px;
        color: #666;
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
            margin-top: 10px;
        }


        .consultantBio {
            display: none;
        }

        .consultantBio--mobile {
            display: initial;
            color: #666;
            margin: 10px 0 0 0;
            font-size: 12px;
        }


        .consultantPrice {
            display: none;
        }
    }

</style>
