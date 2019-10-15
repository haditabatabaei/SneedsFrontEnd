<template>
    <footer class="footer footer-big footer-black">
        <div class="container mainContainer">
            <div class="content">
                <div class="row">
                    <div class="col-md-12 text-center isansFont goUpWrapper">
                        <a @click.prevent="smoothScrollToTop()" class="btn btn-info btn-fab btn-fab-mini">
                            <i class="material-icons">keyboard_arrow_up</i>
                        </a>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-3">
                        <router-link to="/">
                            <h5 class="isansFont text-right">
                                <img class="brand-image" src="http://195.248.243.68/sneedsAssets/img/sneedsLogo.png"
                                     alt="لوگو اسنیدز">
                                اسنیدز
                            </h5>
                        </router-link>
                        <p class="isansFont text-justify sneedsDescription">
                            اسنیدز یک گروه دانشجویی متشکل از دانشجویان دانشگاه صنعتی امیرکبیر است. هدف ما ارائه خدمات
                            آموزشی برای دانشجویان و آگاهی بخشی در مورد اپلای از طریق مصاحبه با دانشجویان پذیرش گرفته
                            می‌باشد.
                        </p>
                    </div>
                    <div class="col-md-2">
                        <router-link to="/">
                            <h5 class="isansFont text-right">قوانین اسنیدز</h5>
                        </router-link>
                        <ul class="links-vertical text-right isansFont">
                            <li v-for="serviceItem in customerServiceMenuItems">
                                <router-link :to="serviceItem.target">{{serviceItem.itemName}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2">
                        <router-link to="/">
                            <h5 class="isansFont text-right">همراه با اسنیدز</h5>
                        </router-link>
                        <ul class="links-vertical text-right isansFont">
                            <li v-for="inTouchItem in withSneedsMenuItems">
                                <router-link :to="inTouchItem.target">{{inTouchItem.itemName}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-2">
                        <router-link to="/">
                            <h5 class="isansFont text-right">دوره های آموزشی</h5>
                        </router-link>
                        <ul class="links-vertical text-right isansFont">
                            <li v-for="courseItem in courseMenuItems">
                                <router-link :to="courseItem.target">{{courseItem.itemName}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-3">
                        <router-link to="/">
                            <h5 class="isansFont text-right">آموزش بخش های اسنیدز</h5>
                        </router-link>
                        <ul class="links-vertical text-right isansFont">
                            <li v-for="guideItem in guideMenuItems">
                                <router-link :to="guideItem.target">{{guideItem.itemName}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6 text-right">
                        <h4 class="isansFont">
                            از آخرین های اسنیدز با خبر باشید :
                        </h4>
                        <a href="http://instagram.com/sneeds_ir" target="_blank"
                           class="btn btn-rose isansFont instaButton">
                            <i class="fa fa-instagram"></i>
                            اینستاگرام اسنیدز
                        </a>
                        <a href="https://t.me/sneeds_ir" target="_blank" class="btn btn-info isansFont">
                            <i class="fa fa-telegram"></i>
                            تلگرام اسنیدز
                        </a>
                    </div>
                    <div class="col-md-6">
                        <h4 class="isansFont text-center">
                            نماد های اعتماد الکترونیک :
                        </h4>
                        <div class="gallery-feed">
                            <img src="http://195.248.243.68/sneedsAssets/img/samandehi.png" alt="نماد ساماندهی"
                                 class="img img-raised">
                            <img src="http://195.248.243.68/sneedsAssets/img/samandehi.png" alt="نماد ساماندهی"
                                 class="img img-raised">
                            <img src="http://195.248.243.68/sneedsAssets/img/samandehi.png" alt="نماد ساماندهی"
                                 class="img img-raised">
                            <img src="http://195.248.243.68/sneedsAssets/img/samandehi.png" alt="نماد ساماندهی"
                                 class="img img-raised">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="copyright pull-center">
                            <strong class="isansFont">
                                © تمامی حقوق برای
                                <router-link to="/">شرکت نوآوران نوین پرداز برازمان ( اسنیدز )</router-link>
                                محفوظ است.
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data: function () {
            return {
                courseMenuItems: [
                    {itemName: 'متخصص فوتوشاپ', target: '/courses/photoshop', hasDropdown: false, dropdownItems: []},
                    {itemName: 'متخصص طراحی سایت', target: '/courses/web', hasDropdown: false, dropdownItems: []},
                    {itemName: 'متخصص اندروید', target: '/courses/android', hasDropdown: false, dropdownItems: []},
                    {itemName: 'متخصص متلب', target: '/courses/matlab', hasDropdown: false, dropdownItems: []},
                ],
                customerServiceMenuItems: [
                    {itemName: 'پرسش های متداول', target: '/services/faq', hasDropdown: false, dropdownItems: []},
                    {itemName: 'شرایط استفاده', target: '/services/terms', hasDropdown: false, dropdownItems: []},
                    {itemName: 'حریم خصوصی', target: '/services/privacy', hasDropdown: false, dropdownItems: []},
                ], withSneedsMenuItems: [
                    {itemName: 'تماس با اسنیدز', target: '/in-touch/contact', hasDropdown: false, dropdownItems: []},
                    {itemName: 'همکاری شرکتی', target: '/in-touch/osm', hasDropdown: false, dropdownItems: []},
                    {itemName: 'همکاری مدرس خصوص', target: '/courses/private/asTeacher', hasDropdown: false, dropdownItems: []},
                    {itemName: 'فرصت های شغلی', target: '/in-touch/jobs', hasDropdown: false, dropdownItems: []},
                ], guideMenuItems: [
                    {itemName: 'جزوات', target: '/guide/booklet', hasDropdown: false, dropdownItems: []},
                    {itemName: 'دوره های آموزشی', target: '/guide/courses', hasDropdown: false, dropdownItems: []},
                    // {itemName: 'تخفیفات کافه ها', target: '/guide/discounts', hasDropdown: false, dropdownItems: []},
                    {itemName: 'مصاحبه ها', target: '/guide/interviews', hasDropdown: false, dropdownItems: []},
                    {itemName: 'کلاس های خصوصی', target: '/guide/interviews', hasDropdown: false, dropdownItems: []},
                ]
            }
        },
        methods: {
            smoothScrollToTop: function () {
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
    .goUpWrapper {
        padding: 5px 10px;
    }

    .sneedsDescription {
        line-height: 25px;
    }

    .instaButton {
        background: #f09433;
        background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
    }

    i.fa-instagram {
        margin-left: 5px;
    }

    i.fa-telegram {
        margin-left: 5px;
    }

    .gallery-feed img {
        max-width: 70px;
        max-height: 70px;
    }

    .mainContainer {
        padding-top: 0;
    }
</style>
