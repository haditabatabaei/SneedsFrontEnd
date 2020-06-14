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
                <a href="#" class="footer-overlay-socials-link">
                    <i class="material-icons">done</i>
                </a>
            </div>
        </div>
        <div class="footer-content">
            <div class="footer-desc isansFont--faNum">
                <h1 class="desc-title isansFont">
                    اسنیدز - اولین پلتفرم آنلاین مهاجرتی
                </h1>
                <p class="desc-text">
                    اسنیدز یک شرکت مهاجرتی نیست! به دنبال وصل کردن شما به دانشجویانی که با شرایط شما یک بار اپلای کردن
                    هستیم سیستم کاری ما به این صورته که بلد نیستم بیشتر از این تفت بدم دیگه
                </p>
                <p class="desc-about">
                    درباره ما
                </p>
                <div class="desc-about-box">
                    <i class="material-icons desc-about-box-icon">
                        location_on
                    </i>
                    <p class="desc-about-box-text">
                        ،تهران، چهار راه ولیعصر، خیابان ولیعصر ،ساختمان مرکز رشد دانشگاه امیرکبیر شتابدهنده سامسونگ
                    </p>
                </div>
                <div class="desc-about-box">
                    <i class="material-icons desc-about-box-icon">
                        call
                    </i>
                    <p class="desc-about-box-text box-text--number isansFont--faNum">
                        <span>021 - 2285 0721</span>
                        <br>
                        <mark class="desc-about-box-text-marked">
                            (هر روز هفته ساعت ۹ تا ۱۰)
                        </mark>
                    </p>
                </div>
                <div class="desc-about-box desc-about-box--centered">
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
                    <li v-for="item in link.items" class="footer-links-item">
                        <router-link :to="item.target"   class="footer-links-item-link">{{item.name}}</router-link>
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
                    <img src="/sneedsAssets/img/plane.jpg" class="cert-image" />
                    <img src="/sneedsAssets/img/plane.jpg" class="cert-image" />
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
                            {name: 'صفحه اصلی', target: '/'},
                            {name: 'مشاوره آنلاین اپلای', target: '/consultants'},
                            {name: 'صفر تا صد اپلای', target: '/'},
                            {name: 'پذیرش کالج', target: '/packages'},
                            {name: 'نگارش و تصحیح انگیز‌نامه', target: '/'},
                            {name: 'نگارش و تصحیح رزومه', target: '/'},
                            {name: 'پکیج اخذ ویزا', target: '/'},
                            {name: 'نگارش و تصحیح کاورلتر', target: '/'},
                            {name: 'وبینار‌ و همایش‌های آنلاین', target: '/'},
                            {name: 'کلاس‌های آنلاین اپلای', target: '/'}
                        ]
                    },
                    {
                        title: 'منابع رایگان',
                        items: [
                            {name: 'مصاحبه‌های اپلای', target: '/'},
                            {name: 'بلاگ اسنیدز', target: '/'},
                            {name: 'لایو‌های اینستاگرامی', target: '/'},
                            {name: 'وبینار‌های رایگان', target: '/'},
                        ]
                    },
                    {
                        title: 'بیشتر بخوانید',
                        items: [
                            {name: 'آموزش رزرو مشاوره', target: '/'},
                            {name: 'آموزش شرکت در وبینار', target: '/'},
                            {name: 'رزرو مشاوره آنلاین', target: '/'},
                            {name: 'درباره‌ ما', target: '/'},
                            {name: 'تماس با ما', target: '/'},
                            {name: 'فرصت های شغلی', target: '/'},
                        ]
                    }
                ],
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
    }

    .footer-overlay-text {
        text-align: center;
        color: #202425;
        display: flex;
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
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #F8F8F8;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #303143;
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

    .desc-about {
        margin: 10px 0;
        background-color: #262738;
        border: 1px solid #00BFD6;
        color: #E3E3E3;
        border-radius: 5px;
        padding: 5px 17px;
        align-self: flex-start;
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
        padding-bottom: 15px;
    }

    .footer-copyright-container {
        width: 100%;
        max-width: 1140px;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .copyright-text {
        color: #9B9999;
        margin-top: 15px;
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
        top: -25px;
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

</style>
