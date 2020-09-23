<template>
    <div class="top-meta">
        <div class="meta-container gadugiFont">
            <p class="meta-slogan">
                We care for our users. get into a problem ?
                <router-link to="/contactus" class="slogan-link">
                    <i class="material-icons">
                        local_phone
                    </i>
                    +9821 - 2842 8353
                </router-link>
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
                    {name: 'telegram', alt: 'Telegram', target: 'http://bit.ly/2FPshaR', img: 'teleg.svg'},
                    {name: 'instagram', alt: 'Instagram', target: 'http://bit.ly/3581UUU', img: 'ins.svg'},
                    {name: 'youtube', alt: 'Youtube', target: 'http://bit.ly/2O1cnNm', img: 'you.svg'},
                    {name: 'linkedin', alt: 'Linkedin', target: 'https://www.linkedin.com/company/sneeds/', img: 'linked.svg'},
                    {name: 'aparat', alt: 'Aparat', target: 'https://bit.ly/3fpBq6X', img: 'aparat.svg'}
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
        background-color: #A347FF;
        display: flex;
        justify-content: center;
        align-items: stretch;
        z-index: 1015;
        position: relative;
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
        display: flex;
        align-items: center;
    }

    .slogan-link {
        color: white;
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: #8C3DDB;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 5px;
        margin-left: 20px;
    }

    .slogan-link i {
        border: 1px solid white;
        font-size: 10px;
        border-radius: 50%;
        padding: 2px;
        margin-right: 5px;
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
        margin-right: 5px;
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