<template>
    <footer class="footer">
        <div class="footer-overlay isansFont">
            <p class="footer-overlay-text">
                برای به دست آوردن کلی اطلاعات به درد بخور در مورد اپلای اسنیدز رو توی
                <mark class="footer-overlay-text-marked">شبکه‌های اجتماعی</mark>
                دنبال کن!
            </p>
            <span class="footer-overlay-divider"></span>
            <div class="footer-overlay-socials">
                <a v-for="social in socials" :href="social.target" target="_blank" class="footer-overlay-socials-link">
                    <img class="footer-overlay-socials-link-img" :src="`/sneedsAssets/img/${social.img}`" :alt="social.alt">
                </a>
            </div>
        </div>
        <div class="footer-content">
            <div class="footer-desc isansFont--faNum">
                <h1 class="desc-title isansFont">
                    اسنیدز - اولین پلتفرم آنلاین مهاجرتی
                </h1>
                <p class="desc-text">
                    اسنیدز یک شرکت مهاجرتی نیست! ما به دنبال اتصال دانشجویانی که اپلای کردن، به دانشجویانی که به تجربه این افراد نیاز دارن، توی یه فضای امن هستیم
                </p>
                <p class="desc-about-switcher-tabs">
                    <button @click="activeFooterItem = item.value" v-for="item in footerSwitcherItems" class="desc-about-switcher-button" :class="[{'about-switcher-button--active': item.value === activeFooterItem}]">
                        {{item.name}}
                    </button>
                </p>
                <div class="desc-about-box" v-if="activeFooterItem === 'aboutus'">
                    <i class="material-icons desc-about-box-icon">
                        location_on
                    </i>
                    <p class="desc-about-box-text">
                        ،تهران، چهار راه ولیعصر، خیابان ولیعصر ،ساختمان مرکز رشد دانشگاه امیرکبیر شتابدهنده سامسونگ
                    </p>
                </div>
                <div class="desc-about-box" v-if="activeFooterItem === 'aboutus'">
                    <i class="material-icons desc-about-box-icon">
                        call
                    </i>
                    <p class="desc-about-box-text box-text--number isansFont--faNum">
                        <span>021 - 2842 8353</span>
                        <br>
                        <mark class="desc-about-box-text-marked">
                            (شنبه تا پنجشنبه ساعت ۹ تا 19)
                        </mark>
                    </p>
                </div>
                <div class="desc-about-box desc-about-box--centered" v-if="activeFooterItem === 'aboutus'">
                    <i class="material-icons desc-about-box-icon">
                        email
                    </i>
                    <p class="desc-about-box-text gadugiFont">
                        info@sneeds.ir
                    </p>
                </div>
            </div>
            <div v-for="link in links" class="footer-links isansFont">
                <h2 class="footer-links-title isansFont">
                    {{link.title}}
                </h2>
                <ul class="footer-links-items">
                    <li v-for="item in link.items" class="footer-links-item" v-if="!item.hidden">
                        <router-link v-if="item.type === 'router'" :to="item.target" class="footer-links-item-link">{{item.name}}</router-link>
                        <a v-else-if="item.type === 'hyper'" target="_blank" :href="item.target" class="footer-links-item-link">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="footer-copyright-container">
                <button class="footer-container-upbutton" @click="smoothScrollToTop">
                    <i class="material-icons">keyboard_arrow_up</i>
                </button>
                <p class="copyright-text isansFont">
                    تمامی حقوق برای شرکت نوآوران نوین پرداز برازمان محفوظ است © |
                    <router-link to="/policy" class="copyright-text-policy">قوانین و مقررات</router-link>
                </p>
                <div class="footer-copyright-certs">
                    <a target="_blank" href="https://trustseal.enamad.ir/?id=114555&Code=7GgIgDLoG5kxYLbjuDlx">
                        <img src="https://trustseal.enamad.ir/Content/Images/Star/star1.png?v=5.0.0.47" alt="" style="cursor:pointer" id="7GgIgDLoG5kxYLbjuDlx">
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                links: [
                    {
                        title: 'خدمات اسنیدز',
                        items: [
                            {name: 'صفحه اصلی', target: 'https://sneeds.ir/', type: 'hyper', hidden: false},
                            {name: 'مشاوره آنلاین اپلای', target: '/consultants', type: 'router', hidden: false},
                            {name: 'صفر تا صد اپلای', target: 'https://sneeds.ir/%d9%be%da%a9%db%8c%d8%ac-%d8%b5%d9%81%d8%b1-%d8%aa%d8%a7-%d8%b5%d8%af/', type: 'hyper', hidden: false},
                            {name: 'پذیرش کالج', target: '/packages/college', type: 'router', hidden: false},
                            {name: 'پکیج ‌نقره‌ای', target: '/packages/silver', type: 'router', hidden: false},
                            {name: 'نگارش و تصحیح انگیز‌نامه', target: 'https://sneeds.ir/%d9%86%da%af%d8%a7%d8%b1%d8%b4-sop-%d8%a7%d9%86%da%af%db%8c%d8%b2%d9%87%e2%80%8c%d9%86%d8%a7%d9%85%d9%87/', type: 'hyper', hidden: false},
                            {name: 'نگارش و تصحیح رزومه', target: 'https://sneeds.ir/%d9%86%da%af%d8%a7%d8%b1%d8%b4-cv-%d8%b1%d8%b2%d9%88%d9%85%d9%87/', type: 'hyper', hidden: false},
                            {name: 'پکیج اخذ ویزا', target: 'https://sneeds.ir/%d9%be%da%a9%db%8c%d8%ac-%d9%88%db%8c%d8%b2%d8%a7/', type: 'hyper', hidden: false},
                            {name: 'نگارش و تصحیح کاورلتر', target: 'https://sneeds.ir/%d8%aa%d8%b5%d8%ad%db%8c%d8%ad-%da%a9%d8%a7%d9%88%d8%b1%d9%84%d8%aa%d8%b1/', type: 'hyper', hidden: false},
                            {name: 'وبینار‌ و همایش‌های آنلاین', target: 'https://sneeds.ir/%D9%81%DB%8C%D9%84%D9%85-%D9%87%D8%A7%DB%8C-%D8%AE%D9%88%D8%AF-%D8%A2%D9%85%D9%88%D8%B2-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/', type: 'hyper', hidden: false},
                            {name: 'کلاس‌های آنلاین اپلای', target: 'https://sneeds.ir/%DA%A9%D9%84%D8%A7%D8%B3%e2%80%8c%D9%87%D8%A7%DB%8C-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/', type: 'hyper', hidden: false}
                        ]
                    },
                    {
                        title: 'منابع رایگان',
                        items: [
                            {name: 'مصاحبه‌های اپلای', target: 'http://blog.sneeds.ir/category/%d9%85%d8%b5%d8%a7%d8%ad%d8%a8%d9%87/', type: 'hyper', hidden: false},
                            {name: 'بلاگ اسنیدز', target: 'http://blog.sneeds.ir/', type: 'hyper', hidden: false},
                            {name: 'لایو‌های اینستاگرامی', target: 'http://blog.sneeds.ir/category/%d9%85%d8%b5%d8%a7%d8%ad%d8%a8%d9%87/', type: 'hyper', hidden: false},
                            {name: 'وبینار‌های رایگان', target: 'https://sneeds.ir/%d8%ab%d8%a8%d8%aa%e2%80%8c%d9%86%d8%a7%d9%85-%d8%b1%d8%a7%db%8c%da%af%d8%a7%d9%86-%d9%88%d8%a8%db%8c%d9%86%d8%a7%d8%b1-%d8%a7%d9%86%d8%aa%d8%ae%d8%a7%d8%a8-%d8%a7%d8%b3%d8%aa%d8%a7%d8%af-%d9%88/', type: 'hyper', hidden: false},
                        ]
                    },
                    {
                        title: 'بیشتر بخوانید',
                        items: [
                            {name: 'آموزش رزرو مشاوره', target: 'http://sneeds.ir/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/', type: 'hyper', hidden: false},
                            {name: 'آموزش شرکت در وبینار', target: '/', hidden: true},
                            {name: 'رزرو مشاوره آنلاین', target: '/', hidden: true},
                            {name: 'درباره‌ ما', target: 'https://sneeds.ir/%D8%AF%D8%B1%D8%A8%D8%A7%D8%B1%D9%87-%D9%85%D8%A7/', type: 'hyper', hidden: false},
                            {name: 'تماس با ما', target: 'https://sneeds.ir/%D8%AA%D9%85%D8%A7%D8%B3/', type: 'hyper', hidden: false},
                            {name: 'فرصت های شغلی', target: 'https://jobinja.ir/companies/sneeds/jobs', type: 'hyper', hidden: false},
                        ]
                    }
                ],
                socials: [
                    {name: 'telegram', alt: 'تلگرام اسنیدز', target: 'http://bit.ly/2FPshaR', img: 'teleg.svg'},
                    {name: 'instagram', alt: 'اینستاگرام اسنیدز', target: 'http://bit.ly/3581UUU', img: 'ins.svg'},
                    {name: 'youtube', alt: 'یوتیوب اسنیدز', target: 'http://bit.ly/2O1cnNm', img: 'you.svg'},
                    {name: 'linkedin', alt: 'لینکداین اسنیدز', target: 'https://www.linkedin.com/company/sneeds/', img: 'linked.svg'},
                    {name: 'aparat', alt: 'آپارات اسنیدز', target: 'https://bit.ly/3fpBq6X', img: 'aparat.svg'}
                ],
                footerSwitcherItems: [
                    {name: 'درباره ما', value: 'aboutus'},
                ],
                activeFooterItem: 'aboutus'
            }
        },
        methods: {
            smoothScrollToTop() {
                const scrollToTop = () => {
                    const c = document.documentElement.scrollTop || document.body.scrollTop;
                    if (c > 0) {
                        window.requestAnimationFrame(scrollToTop);
                        window.scrollTo(0, c - c / 15);
                    }
                };
                scrollToTop();
            }
        }
    }
</script>

<style scoped>
    .footer {
        background-color: #303143;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 0;
    }

    .footer-overlay {
        width: 100%;
        max-width: 1140px;
        background-color: white;
        border-radius: 15px;
        position: absolute;
        top: -100px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 0;
        z-index: 10;
    }

    .footer-overlay-text {
        text-align: center;
        color: #202425;
        align-items: center;
    }

    .footer-overlay-text-marked {
        padding: 0;
        background: none;
        margin: 0 5px;
        color: #8C3DDB;
        font-weight: bold;
    }

    .footer-overlay-divider {
        width: 50px;
        height: 4px;
        border-radius: 10px;
        background-color: #8C3DDB;
        margin: 20px;
    }

    .footer-overlay-socials {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .footer-overlay-socials-link {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #F8F8F8;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #303143;
        margin: 0 10px;
    }

    .footer-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        position: static;
        margin-top: 120px;
        width: 100%;
        max-width: 1140px;
        padding: 0 20px;
    }

    .footer-desc {
        display: flex;
        flex-direction: column;
        max-width: 350px;
    }

    .desc-title {
        font-size: 20px;
        font-weight: bold;
        color: #00D3EC;
        position: relative;
        padding-right: 20px;
        margin: 15px 0;
        display: flex;
    }

    .desc-title:before {
        content: " ";
        position: absolute;
        right: 0;
        top: 5px;
        margin: 0;
        padding: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #00D3EC;
    }

    .desc-text {
        color: #FAFDFF;
        text-align: right;
        margin: 10px 0;
        font-size: 13px;
        line-height: 26px;
    }

    .desc-about-switcher-tabs {
        align-self: flex-start;
        display: flex;
        align-items: center;
    }

    .desc-about-switcher-button {
        background: none;
        padding: 5px 17px;
        color: #E3E3E3;
        border: none;
        margin: 0 10px;
        border-radius: 5px;
    }

    .desc-about-switcher-button:first-child {
        margin-right: 0;
    }

    .about-switcher-button--active {
        background-color: #262738;
        border: 1px solid #00BFD6;
        color: #E3E3E3;
    }

    .desc-about-box {
        display: flex;
        margin: 10px 0;
    }

    .desc-about-box--centered {
        align-items: center;
    }

    .desc-about-box--centered .desc-about-box-text {
        margin-bottom: 0;
    }

    .desc-about-box-icon {
        border-radius: 50%;
        border: 2px solid #00D3EC;
        color: #00D3EC;
        width: 30px;
        height: 30px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .desc-about-box-text {
        margin-right: 10px;
        text-align: right;
        color: #FFFEFA;
        width: calc(100% - 30px);
    }

    .box-text--number {
        direction: ltr !important;
    }

    .desc-about-box-text-marked {
        padding: 0;
        margin: 5px 0 0 0;
        background: none;
        color: #00BFD6;
        font-size: 12px;
    }

    .footer-links {
        display: flex;
        flex-direction: column;
    }

    .footer-links-title {
        font-size: 20px;
        font-weight: bold;
        color: #00D3EC;
        margin: 15px 0;
        display: flex;
    }

    .footer-links-items {
        display: flex;
        flex-direction: column;
        padding: 0;
        list-style: none;
        margin: 0;
    }

    .footer-links-item {
        display: flex;
        justify-content: stretch;
        align-items: stretch;
        margin: 2.5px;
    }

    .footer-links-item-link {
        padding: 2.5px 10px;
        width: 100%;
        text-align: right;
        color: #FCFCFC;
        border-radius: 10px;
    }

    .footer-links-item-link:hover {
        background-color: #00D3EC;
        color: #303143;
    }

    .footer-copyright {
        background-color: #262738;
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: stretch;
        justify-content: center;
        padding: 15px 0;
    }

    .footer-copyright-container {
        width: 100%;
        max-width: 1140px;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0 20px;
    }

    .copyright-text {
        color: #9B9999;
        margin: 15px 0;
        text-align: right;
    }

    .copyright-text-policy {
        color: #E3E3E3;
    }

    .copyright-text-policy:hover {
        color: white;
    }

    .footer-copyright-certs {
        display: flex;
        align-items: center;
    }

    .cert-image {
        width: 75px;
        height: 75px;
        border-radius: 10px;
        margin: 10px;
    }

    .cert-image:first-child {
        margin-right: 0;
    }

    .footer-container-upbutton {
        position: absolute;
        left: 0;
        top: -40px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #00D3EC;
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .footer-container-upbutton:hover {
        box-shadow: 0 5px 30px rgba(0,0,0,0.2);
    }

    @media only screen and (max-width: 767.8px) {
        .footer-overlay-socials-link {
            width: auto;
            height: auto;
        }

        .footer-overlay-socials-link-img {
            width: 40px;
            height: 40px;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .footer-overlay-socials-link-img {
            width: 30px;
            height: 30px;
        }

        .footer-overlay-text {
            padding-right: 15px;
            padding-left: 15px;
        }
    }

</style>
