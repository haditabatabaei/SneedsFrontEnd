<template>
    <section class="consultantDescBlock">
        <div class="consultantDescBlock--head-info">
            <p class="isansFont consultantDescBlock--head-name">{{consultant.first_name + ' ' + consultant.last_name}}</p>
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
            <p class="isansFont--faNum consultantDescBlock--head-minutes">
                <strong>{{Math.floor(Math.random() * 100)}}</strong>
                دقیقه مشاوره برگزار شده
            </p>
            <a v-if="consultant.resume != null" :href="consultant.resume" target="_blank"
               class="consultantDescBlock--head-resume isansFont">دانلود رزومه</a>
        </div>
        <header class="consultantDescBlock--head isansFont--faNum">
            <img :src="consultant.profile_picture" class="consultantDescBlock--head-image"
                 :alt="consultant.first_name + ' ' + consultant.last_name">

            <div class="consultantDescBlock--head_item">
                <i class="material-icons" v-if="currentUniversity == undefined">account_balance</i>
                <img class="consultantDescBlock--head_item_image" :src="currentUniversity.picture"
                     :alt="currentUniversity.name" v-else/>
                <p class="consultantDescBlock--head_item_support">دانشگاه</p>
                <p class="consultantDescBlock--head_item_text">{{currentUniversity.name}}</p>
            </div>

            <div class="consultantDescBlock--head_item">
                <i class="material-icons" v-if="currentCountry == undefined">house</i>
                <img class="consultantDescBlock--head_item_image" :src="currentCountry.picture"
                     :alt="currentCountry.name" v-else/>
                <p class="consultantDescBlock--head_item_support">کشور در حال تحصیل</p>
                <p class="consultantDescBlock--head_item_text">{{currentCountry.name}}</p>
            </div>

            <div class="consultantDescBlock--head_item">
                <i class="material-icons" v-if="consultant.field_of_studies[0] == undefined">add</i>
                <img class="consultantDescBlock--head_item_image" :src="consultant.field_of_studies[0].picture"
                     :alt="consultant.field_of_studies[0].name" v-else/>
                <p class="consultantDescBlock--head_item_support">رشته</p>
                <p class="consultantDescBlock--head_item_text">{{consultant.field_of_studies[0].name}}</p>
            </div>

        </header>
        <main class="consultantDescBlock--main isansFont--faNum">
            <div class="consultantDescBlock--main_video" v-if="consultant.aparat_link">
                <iframe :src="getVideoFrameLink(consultant.aparat_link)"/>
            </div>
            <div class="consultantDescBlock--main_bio" v-html="consultant.bio">
            </div>
        </main>
    </section>
</template>

<script>
    import StarRating from 'vue-star-rating'
    export default {
        name: "ConsultantDescBlock",
        components: {"star-rating": StarRating},
        props: {
            consultant: {
                type: Object,
            }
        },
        computed: {
            currentUniversity() {
                if(this.consultant.universities) {
                    return this.consultant.universities[0];
                }
            },
            currentCountry() {
                if(this.consultant.countries) {
                    return this.consultant.countries[this.consultant.countries.length - 1];
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
        border: 1.5px solid #ccc;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .consultantDescBlock--head {
        position: absolute;
        width: 80%;
        min-height: 135px;
        border-radius: 15px;
        top: -50px;
        background-color: white;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
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
        right: 200px;
        top: -90px;
        color: white;
        display: flex;
        align-items: center;
    }

    .consultantDescBlock--head-name {
        font-weight: bold;
        font-size: 20px;
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
        width: 80%;
        padding-top: 60px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .consultantDescBlock--main_bio {
        width: 100%;
        margin-top: 15px;
    }

    .consultantDescBlock--main_bio p {
        color: #9e9e9e;
        text-align: justify;
        align-self: flex-start;
        padding: 15px;
        line-height: 26px;
        word-break: break-word;
    }

    .consultantDescBlock--main_video {
        align-self: flex-start;
        width: 100%;
        margin-top: 15px;
    }

    .consultantDescBlock--main_video iframe {
        border-radius: 15px;
        width: 100%;
        height: 250px;
        border: none;
    }

    @media only screen and (max-width: 991.8px) {
        .consultantDescBlock {
            margin-top: 30px;
        }

        .consultantDescBlock--main {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .consultantDescBlock--main_video {
            width: 100%;
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
            padding: 10px;
            font-size: 10px;
        }

        .consultantDescBlock--head-info {
            display: none;
        }

        .consultantDescBlock--head-image {
            display: none;
        }

    }
</style>
