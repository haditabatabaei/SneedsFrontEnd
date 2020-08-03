<template>
    <div class="top-meta">
        <div class="meta-container isansFont">
            <p class="meta-slogan">
                تمام سرمایه ما کاربرانمان هستند، همیشه پاسخگوی شما هستیم
                |
                <a href="https://sneeds.ir/%d8%aa%d9%85%d8%a7%d8%b3/" class="slogan-link">تماس با ما</a>
            </p>
            <ul class="meta-socials">
                <li class="social-item" v-for="social in socials">
                    <a class="social-link" :href="social.target" target="_blank">
                        <img class="social-image" :src="`/sneedsAssets/img/${social.img}`" :alt="social.alt">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopMetaBar",
        data() {
            return {
                socials: [
                    {name: 'telegram', alt: 'تلگرام اسنیدز', target: 'http://bit.ly/2FPshaR', img: 'teleg.svg'},
                    {name: 'instagram', alt: 'اینستاگرام اسنیدز', target: 'http://bit.ly/3581UUU', img: 'ins.svg'},
                    {name: 'youtube', alt: 'یوتیوب اسنیدز', target: 'http://bit.ly/2O1cnNm', img: 'you.svg'},
                    {name: 'linkedin', alt: 'لینکداین اسنیدز', target: 'https://www.linkedin.com/company/sneeds/', img: 'linked.svg'},
                    {name: 'aparat', alt: 'آپارات اسنیدز', target: 'https://bit.ly/3fpBq6X', img: 'aparat.svg'}
                ],
            }
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>
    .top-meta {
        height: 43px;
        width: 100%;
        background-color: #6b42ca;
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    .meta-container {
        width: 100%;
        max-width: 1170px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .meta-slogan {
        color: white;
        margin: 0;
    }

    .slogan-link {
        color: #ffab73;
    }

    .meta-socials {
        list-style: none;
        display: flex;
        align-items: center;
        margin: 0;
    }

    .social-image {
        width: 25px;
        height: 25px;
    }

    .social-item:not(:last-child) {
        margin-left: 5px;
    }
    
    @media only screen and (max-width: 767.8px) {
        .meta-container {
            justify-content: center;
        }

        .meta-socials {
            display: none;
        }

        .meta-slogan {
            font-size: 13px;
        }
    }
</style>