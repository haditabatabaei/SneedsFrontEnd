<template>
    <section class="consultantDescBlock">
        <div class="consultantDescBlock--head-info">
            <p class="isansFont consultantDescBlock--head-name">{{consultant.first_name + ' ' +
                consultant.last_name}}</p>
            <!-- rate -->
            <star-rating
                    v-if="consultant.rate != null"
                    :rtl="$store.getters.isiran"
                    :star-size="12"
                    :padding="5"
                    :read-only="true"
                    style="background: none;margin-left: 15px;display:flex;align-items:center"
                    inactive-color="rgba(0,0,0,0)"
                    active-color="#fff"
                    :showRating="false"
                    v-model="consultant.rate"/>

            <!-- consultant minutes -->
            <p v-if="showMinutesOfConsultations" class="isansFont--faNum consultantDescBlock--head-minutes">
                <strong>{{Math.floor(Math.random() * 100)}}</strong>
                دقیقه مشاوره برگزار شده
            </p>
            <a v-if="consultant.resume != null" :href="consultant.resume" target="_blank"
               class="consultantDescBlock--head-resume isansFont">دانلود رزومه</a>
        </div>
        <header class="consultantDescBlock--head isansFont--faNum">
            <img :src="consultant.profile_picture" class="consultantDescBlock--head-image"
                 :alt="consultant.first_name + ' ' + consultant.last_name">

            <div class="consultantDescBlock--head_item" v-if="hasStudyInfo">
                <i class="material-icons" v-if="studyInfo.university == undefined">account_balance</i>
                <img class="consultantDescBlock--head_item_image" :src="studyInfo.university.picture"
                     :alt="studyInfo.university.name" v-else/>
                <p class="consultantDescBlock--head_item_support">دانشگاه</p>
                <p class="consultantDescBlock--head_item_text">{{studyInfo.university.name}}</p>
            </div>

            <div class="consultantDescBlock--head_item" v-if="hasStudyInfo">
                <i class="material-icons" v-if="studyInfo.country == undefined">house</i>
                <img class="consultantDescBlock--head_item_image" :src="studyInfo.country.picture"
                     :alt="studyInfo.country.name" v-else/>
                <p class="consultantDescBlock--head_item_support">کشور در حال تحصیل</p>
                <p class="consultantDescBlock--head_item_text">{{studyInfo.country.name}}</p>
            </div>

            <div class="consultantDescBlock--head_item" v-if="hasStudyInfo">
                <i class="material-icons" v-if="studyInfo.field_of_study == undefined">add</i>
                <img class="consultantDescBlock--head_item_image" :src="studyInfo.field_of_study.picture"
                     :alt="studyInfo.field_of_study.name" v-else/>
                <p class="consultantDescBlock--head_item_support">رشته</p>
                <p class="consultantDescBlock--head_item_text">{{studyInfo.field_of_study.name}}</p>
            </div>

        </header>
        <main class="consultantDescBlock--main isansFont--faNum">
            <div class="consultantDescBlock--main_video" v-if="consultant.aparat_link">
                <iframe allowfullscreen="true" :src="getVideoFrameLink(consultant.aparat_link)"/>
            </div>
            <div class="consultantDescBlock--main_bio" v-html="consultant.bio">
            </div>
            <div class="consultantBlock-calendar-warn">
                <i class="material-icons consultantBlock-calendar-warn-icon">
                    info
                </i>
                مدت زمان هر جلسه مشاوره 40 دقیقه می باشد و هزینه هر جلسه مبلغ {{consultant.time_slot_price}} تومان است.
            </div>
        </main>
    </section>
</template>

<script>
    import StarRating from 'vue-star-rating'

    export default {
        name: "ConsultantDescBlock",
        components: {"star-rating": StarRating },
        data() {
          return {
              showMinutesOfConsultations: false
          }
        },
        props: {
            consultant: {
                type: Object,
                default: () => null
            }
        },
        computed: {

            hasStudyInfo() {
              return this.consultant.study_info.length > 0;
            },

            studyInfo() {
                return this.consultant.study_info[this.consultant.study_info.length - 1];
            },

            persianGrade() {
                if (this.consultant != null && this.hasStudyInfo) {
                    switch (this.studyInfo.grade) {
                        case 'phd':
                            return 'دکترا';
                        case 'master':
                            return 'کارشناسی ارشد';
                        case 'bachelor':
                            return 'کارشناسی';
                        default :
                            return ' ';
                    }
                } else {
                    return ' ';
                }
            }
        },
        created() {
            console.log("current consultant:", this.consultant);
        },
        methods: {
            getVideoFrameLink(aparatLink) {
                if (aparatLink != null) {
                    return 'https://www.aparat.com//video/video/embed/videohash/' + aparatLink.replace('https://www.aparat.com/v/', '') + '/vt/frame'
                } else return "";
            },
        }
    }
</script>

<style scoped>
    .consultantDescBlock {
        width: 100%;
        min-height: 300px;
        background-color: white;
        border-radius: 15px 15px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        margin-top: 15px;
    }

    .consultantDescBlock--head {
        position: absolute;
        width: 85%;
        min-height: 112px;
        border-radius: 15px;
        top: -50px;
        background-color: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
    }

    .consultantDescBlock--head-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 5px solid white;
        position: absolute;
        right: 15px;
        top: -50px;
    }

    .consultantDescBlock--head-info {
        position: absolute;
        right: 185px;
        top: -88px;
        color: white;
        display: flex;
        align-items: center;
    }

    .consultantDescBlock--head-name {
        font-weight: bold;
        font-size: 18px;
        margin: 0 0 0 15px;
    }

    .consultantDescBlock--head-minutes {
        font-size: 12px;
        margin: 0;
    }

    .consultantDescBlock--head-minutes strong {
        font-size: 16px;
    }

    .consultantDescBlock--head-resume {
        color: white;
        border: 2px solid white;
        margin-right: 10px;
        border-radius: 10px;
        font-size: 12px;
        padding: 5px 15px;
        transition: all 100ms ease-in-out;
    }

    .consultantDescBlock--head-resume:hover {
        background-color: white;
        color: rgba(32, 184, 163, 0.8);
    }

    .consultantDescBlock--head_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .consultantDescBlock--head_item i {
        color: #8C3DDB;
        background-color: #F4E9FF;
        font-size: 17px;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 0;
    }

    .consultantDescBlock--head_item_support {
        color: #B3B3B3;
        font-size: 12px;
        margin: 5px 0 0 0;
    }

    .consultantDescBlock--head_item_text {
        color: #707070;
        margin: 5px 0 0 0;
        font-weight: bold;
        font-size: 12px;
    }

    .consultantDescBlock--head_item_image {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .consultantDescBlock--main {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        flex-wrap: wrap;
        padding-top: 60px;
    }

    .consultantDescBlock--main_bio {
        width: 100%;
        padding: 30px;
    }

    .consultantDescBlock--main_bio p {
        text-align: right;
        align-self: flex-start;
    }

    .consultantDescBlock--main_video {
        width: calc(100% - 60px);
        margin: 30px;
    }

    .consultantDescBlock--main_video iframe {
        border-radius: 15px;
        width: 100%;
        height: 350px;
        border: none;
    }

    .consultantBlock-calendar-warn {
        background-color: #FFFCF4;
        color: #8C6D1F;
        display: flex;
        align-items: center;
        margin: 0 15px;
        padding: 15px;
        border-radius: 5px;
    }

    .consultantBlock-calendar-warn-icon {
        color: #CAA53D;
        margin-left: 10px;
    }

    @media only screen and (max-width: 991.8px) {
        .consultantDescBlock {
            margin-top: 0;
        }

        .consultantDescBlock--main {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-top: 0;
        }

        .consultantDescBlock--main_video {
        }

        .consultantDescBlock--main_bio {
            width: 100%;
            margin-top: 10px;
            margin-right: 0;
        }

        .consultantDescBlock--main_bio button, p {
            margin-right: 0;
        }

        .consultantDescBlock--main_bio p {
            padding-right: 0;
        }

        .consultantDescBlock--head {
            font-size: 10px;
            position: static;
            width: 100%;
            border-radius: 0;
        }


        .consultantDescBlock--head-info {
            right: initial;
            top: -75px;
        }

        .consultantDescBlock--head-minutes {
            display: none;
        }

        .consultantDescBlock--head-resume {
            margin-right: 5px;
        }

        .consultantDescBlock--head-name {
            font-size: 16px;
        }

        .consultantDescBlock--head-image {
            display: none;
        }

    }
</style>
