<template>
    <div>
        <div class="page-header"
             style="background-image:url('http://195.248.243.68/sneedsAssets/img/homebg.jpg'); background-repeat:no-repeat; background-size:cover">
            <div class="container" style="display:flex;justify-content:flex-end;align-items:center">
                <div class="homeTitleBox" style="color:rgb(51,51,51)">
                    <h1 class="isansFont" style="font-weight:bold;line-height:70px;">
                        برای آیندت <br> آگاهانه تصمیم بگیر
                    </h1>
                    <h3 class="isansFont">
                        اولین پلتفرم آنلاین مشاوره در زمینه <br> اپلای، مهاجرت و کارآفرینی
                    </h3>
                    <router-link to="/consultants" class="btn btn-lg btn-warning isansFont" style="color: #434343;">
                        <i class="material-icons">keyboard_arrow_left</i>
                        مشاهده مشاوران
                    </router-link>
                </div>
            </div>
        </div>
        <div class="cd-section main" id="features">

            <div class="container">
                <div class="features-1">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h2 class="title isansFont">3 ویژگی که خدمات مشاوره اسنیدز رو متفاوت میکنه</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="info">
                                <div class="icon icon-info">
                                    <i class="material-icons">money_off</i>
                                </div>
                                <h4 class="info-title isansFont">پرداخت کمترین هزینه</h4>
                                <p class="isansFont text-justify">
                                    با توجه به اینکه ما یک پلتفرم دانشجویی هستیم، شما می‎تونید با پرداخت کم‎ترین هزینه
                                    از خدمات ما با بالاترین سطح کیفیت استفاده کنید.
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="info">
                                <div class="icon icon-success">
                                    <i class="material-icons">verified_user</i>
                                </div>
                                <h4 class="info-title isansFont">بهترین مشاوران</h4>
                                <p class="text-justify isansFont">
                                    همه‎ی مشاوران ما صفر تا صد مسیر اپلای رو خودشون طی کردن و با آگاهی از تمامی مراحل و
                                    شرایط، بهترین راهنمایان شما در مسیر اپلای هستند
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="material-icons">alarm</i>
                                </div>
                                <h4 class="info-title isansFont">مشاوره آنلاین</h4>
                                <p class="text-justify isansFont">بدون هیچگونه اتلاف وقت، می‎تونید در هرجایی که هستید از
                                    خدمات مشاوره‎ی اسنیدز به صورت کاملا آنلاین و تصویری استفاده کنید.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="pricing-1 main" style="background-color:white">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">تعرفه خدمات مشاوره آنلاین اسنیدز</h2>
                        <div class="section-space"></div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-md-4">
                        <div class="card card-pricing card-plain">
                            <div class="card-content">
                                <h6 class="category isansFont">بسته برنزی</h6>
                                <div class="icon">
                                    <i class="material-icons">border_style</i>
                                </div>
                                <h3 class="card-title isansFont">1 جلسه مشاوره</h3>
                                <p class="card-description isansFont">
                                    مشاوره به صورت تصویری و آنلاین
                                    <br>
                                    زمان هر جلسه : 60 دقیقه
                                </p>
                                <p class="card-price isansFont">80 هزار تومان</p>
                                <router-link to="/consultants" class="btn btn-white btn-round isansFont">مشاهده لیست
                                    مشاوران
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card card-pricing card-raised">
                            <div class="card-content">
                                <h6 class="category isansFont">بسته اقتصادی</h6>
                                <div class="icon icon-success">
                                    <i class="material-icons">data_usage</i>
                                </div>
                                <h3 class="card-title isansFont">2 جلسه مشاوره</h3>
                                <p class="card-description isansFont">
                                    مشاوره به صورت تصویری و آنلاین
                                    <br>
                                    زمان هرجلسه ۶۰ دقیقه
                                </p>
                                <p class="card-price isansFont">140 هزار تومان</p>
                                <router-link to="/consultants" class="btn btn-success btn-round isansFont">مشاهده لیست مشاوران</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card card-pricing card-plain">
                            <div class="card-content">
                                <h6 class="category isansFont">بسته طلایی</h6>
                                <div class="icon">
                                    <i class="material-icons">border_style</i>
                                </div>
                                <h3 class="card-title isansFont">3 جلسه مشاوره</h3>
                                <p class="card-description isansFont">
                                    مشاوره به صورت تصویری و آنلاین
                                    <br>
                                        <mark> + بررسی و تصحیح رزومه</mark>
                                    <br>
                                    زمان هر جلسه : 60 دقیقه
                                </p>
                                <p class="card-price isansFont">240 هزار تومان</p>
                                <router-link to="/consultants" class="btn btn-white btn-round isansFont">مشاهده لیست
                                    مشاوران
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data: function () {
            return {
                slides: [
                    {
                        title: 'به اسنیدز خوش آمدید',
                        description: 'اسنیدز، پلتفرم بهینه رفع نیاز دانشجویی در سطح بالای فناوری امروز است.',
                        imageStyle: 'webimages/bg3.jpg',
                        hasButton: true,
                        button: {value: 'ازاینجا شروع کنید', target: '/login', colorTheme: 'primary'},
                    },
                    {
                        title: 'جزوات برتر',
                        description: 'اسنیدز، دیتابیس بزرگی از جزوات دانشگاه در رشته های تخصصی به صورت رایگان',
                        imageStyle: 'webimages/note.jpg',
                        hasButton: true,
                        button: {value: 'جزوات رو ببینید!', target: '/booklets', colorTheme: 'info'},
                    },
                    {
                        title: 'مصاحبه ها',
                        description: 'اسنیدز، آِینده خود را با فکر انتحاب کنید',
                        imageStyle: 'webimages/userbg.jpg',
                        hasButton: true,
                        button: {value: 'بلاگ!', target: '/blog', colorTheme: 'rose'},
                    },
                ]
            }
        },
        mounted() {
            //scroll to up
            scrollTo(0, 0);
            // this.$store.dispatch('saveCurrentLocation', this.$route.path);
        }
    }
</script>

<style scoped>

    .page-header {
        height: calc(100vh);
    }

    .homeTitleBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    .homeTitleBox a.btn {
        border-radius: 25px;
        font-weight: bold;
    }

    .datetimepicker {
        margin-top: 30px !important;
    }
</style>
