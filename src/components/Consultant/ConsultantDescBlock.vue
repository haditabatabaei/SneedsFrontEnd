<template>
    <section class="consultantDescBlock">
        <header class="consultantDescBlock--head isansFont--faNum">
            <div class="consultantDescBlock--head_item">
                <i class="material-icons text-pink">account_balance</i>
                <span>{{consultant.universities[0].name}}</span>
            </div>
            <div class="consultantDescBlock--head_item">
                <i class="material-icons text-blue">house</i>
                <span>{{consultant.countries[0].name}}</span>
            </div>
            <div class="consultantDescBlock--head_item">
                <i class="material-icons text-green">class</i>
                <span>{{consultant.field_of_studies[0].name}}</span>
            </div>
        </header>
        <main class="consultantDescBlock--main isansFont--faNum">
            <div class="consultantDescBlock--main_video">
                <iframe :src="getVideoFrameLink(consultant.aparat_link)" />

                <router-link class="consultantDescBlock--main_videoLink" to="">
                    مشاهده مصاحبه کامل با {{consultant.first_name}}
                </router-link>
            </div>
            <div class="consultantDescBlock--main_bio">
                <p>
                    {{consultant.bio}}
                </p>
            </div>
        </main>
    </section>
</template>

<script>
    export default {
        name: "ConsultantDescBlock",
        props: {
            consultant: {}
        },
        created() {
            console.log(this.consultant);
        },
        methods: {
            getVideoFrameLink(aparatLink) {
                if(aparatLink != null) {
                    return 'https://www.aparat.com//video/video/embed/videohash/' + aparatLink.replace('https://www.aparat.com/v/', '') + '/vt/frame'
                } else return "";
            },
        }
    }
</script>

<style scoped>


    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }


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
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .consultantDescBlock--head {
        position: absolute;
        width: 80%;
        height: 100px;
        border-radius: 15px;
        top: -50px;
        background-color: white;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
    }

    .consultantDescBlock--head_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .consultantDescBlock--head_item span {
        color: #666;
        font-weight: bold;
        margin-top: 5px;
    }

    .consultantDescBlock--main {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 80%;
        padding-top: 60px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .consultantDescBlock--main_bio {
        width: calc(50% - 10px);
        margin-right: 10px;
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
        width: 50%;
    }

    .consultantDescBlock--main_video iframe {
        border-radius: 15px;
        width: 100%;
        height: 250px;
        border: none;
    }

    .consultantDescBlock--main_videoLink {
        font-size: 13px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        color: #3ba9a1;
        border: 1.2px solid #e6e6e6;
        border-radius: 10px;
        padding-top: 7px;
        padding-bottom: 7px;
        transition: all 0.1s ease-in-out;
    }

    .consultantDescBlock--main_videoLink:hover {
        background-color: #3ba9a1;
        color: white;
        border-color: white;
    }

    .consultantDescBlock--main_videoLink i {
        font-size: 14px;
        margin-left: 5px;
    }

    .showMoreBtn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        border: none;
        padding: 5px 10px 5px 10px;
        margin-right: 10px;
        background-color: #f0f0f0;
        color: #7F7F80;
        width: 100%;
    }

    .text-pink {
        color: #EB8BB6;
    }

    .text-blue {
        color: #89BEE5;
    }

    .text-green {
        color: #72BDBA;
    }

    .text-purple {
        color: #9083CB;
    }

    @media only screen and (max-width: 991.8px) {
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
            padding:10px;
            font-size:10px;
        }

    }
</style>
