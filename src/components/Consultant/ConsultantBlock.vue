<template>
    <router-link class="consultant-block" :to="`/consultants/${consultant.slug}`">
        <div class="consultant-block-data">
            <img :src="consultant.profile_picture"
                 size="150"
                 :alt="`${consultant.first_name} ${consultant.last_name}`"
                 class="consultant-block-image"
            />
            <div class="consultant-block-info">
                <div class="consultant-block-info-item">
                    <router-link
                            class="consultant-name"
                            :to="`/consultants/${consultant.slug}`"
                            v-if="consultant.first_name != null && consultant.last_name != null"
                    >{{consultant.first_name + ' ' + consultant.last_name}}</router-link>

                    <router-link class="consultant-name" :to="`/consultants/${consultant.slug}`" v-else>
                        Anonymous
                    </router-link>
                </div>
                <div class="consultant-block-info-item">
                    <p class="consultant-bio">
                        {{studyText}}
                    </p>
                    <p class="consultant-bio--mobile">
                        {{studyTextMobile}}
                    </p>
                    <p class="consultant-bio--mobile">
                        Price per session: {{consultant.time_slot_price}} Tomans
                    </p>
                </div>
                <div class="consultant-block-info-item">
                    <span class="consultant-rate consultant-rate--empty" v-if="consultant.rate == null">No rate</span>
                    <span class="consultant-rate" :style="`background-color:${getRateStyle(consultant.rate)}`" v-else>Rate: {{consultant.rate}} / 5</span>
                </div>
            </div>
        </div>

        <div class="consultant-block-action">
            <router-link :to="`/consultants/${consultant.slug}`" class="consultant-show-button">
                View profile
            </router-link>
            <p class="consultant-price">
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
    .consultant-block {
        background-color: white;
        border-radius: 10px;
        border: 1px solid #ccc;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .consultant-block-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 0;
    }

    .consultant-block:hover {
        border-color: #82eafb;
    }

    .consultant-block-image {
        width: 150px;
        height: 150px;
        border-radius: 10px;
    }

    .consultant-block-info {
        margin: 10px auto 0 40px;
        display: flex;
        align-self: stretch;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
    }

    .consultant-block-info-item {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .consultant-name {
        color: #333;
        font-size: 17px;
        font-weight: bold;
    }
    .consultant-bio {
        color: #666;
        font-size: 12px;
        line-height: 25px;
        max-width: 300px;
    }

    .consultant-rate {
        padding: 5px 15px;
        border-radius: 50px;
        color: white;
        font-size: 12px;
        position: relative;
        z-index: 2;
        top: -2px;
    }

    .consultant-rate--empty {
        background-color: #ccc;
    }

    .consultant-block-action {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .consultant-show-button {
        border: 1px solid #333333;
        color: #333;
        padding: 10px 35px;
        border-radius: 10px;
        transition: all 0.2s ease;
        background-color: white;
    }

    .consultant-show-button:hover {
        background-color: #333;
        color: white;
    }

    .consultant-bio--mobile {
        display: none;
    }

    .consultant-price {
        font-size: 12px;
        margin-top: 5px;
        color: #666;
    }

    @media only screen and (max-width: 576.8px) and (min-width: 0) {
        .consultant-block-image {
            width: 100px;
            height: 100px;
        }

        .consultant-show-button {
            display: none;
        }

        .consultant-block-data {
            padding-right: 0;
            padding-left: 0;
            flex-wrap: nowrap;
        }

        .consultant-name {
            font-size: 15px;
        }

        .consultant-bio {
            font-size: 12px;
            display: none;
        }

        .consultant-rate {
            font-size: 10px;
            padding: 5px 10px;
            margin-top: 10px;
        }

        .consultant-bio--mobile {
            display: initial;
            color: #666;
            margin: 10px 0 0 0;
            font-size: 12px;
        }


        .consultant-price {
            display: none;
        }
    }

</style>
