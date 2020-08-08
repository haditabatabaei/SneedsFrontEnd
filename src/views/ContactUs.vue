<template>
    <section class="contactus isansFont">
        <div class="curve"></div>
        <div class="dots"></div>
        <div class="card">
            <div class="card-info isansFont--faNum">
                <h2 class="card-title isansFont">
                    تماس با ما
                    <div class="card-title-line"></div>
                </h2>

                <div class="card-info-box">
                    <i class="material-icons info-box-icon">local_phone</i>
                    <p class="info-box-text info-box-text--hasLtr">
                        021 2842 8353
                        <br>
                        <span class="box-text-sub">
                            شنبه تا چهارشنبه ساعت 10 الی 19
                            <br>
                            پنجشنبه ساعت 10 الی 14
                        </span>
                    </p>
                </div>



                <div class="card-info-box card-info-box--centered">
                    <i class="material-icons info-box-icon">mail</i>
                    <p class="info-box-text">
                        info@sneeds.ir
                    </p>
                </div>


                <div class="card-info-box">
                    <i class="material-icons info-box-icon">location_on</i>
                    <p class="info-box-text">
                        تهران، چهار راه ولیعصر، خ ولیعصر ،
                        ساختمان مرکز رشد دانشگاه امیرکبیر شتابدهنده سامسونگ
                    </p>
                </div>


                <a href="#" class="card-info-link link--telegram"> پشتیبانی تلگرام</a>
                <a href="#" class="card-info-link link--insta">پشتیبانی اینستاگرام</a>
                <a href="#" class="card-info-link">همکاری با اسنیزد</a>

            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.935633226956!
                2d51.41175488553077!3d35.703201536375715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!
                1s0x3f8e010d267b1425%3A0xe28f491d82aa8c83!2z2K_Yp9mG2LTar9in2YfigIwg2LXZhti52KrbjCDYp9mF
                24zYsdqp2KjbjNix!5e0!3m2!1sfa!2s!4v1595505949474!5m2!1sfa!2s" width="98%" height="585px"
                    frameborder="0" allowfullscreen="true" aria-hidden="false" tabindex="0" class="card-info-map">
            </iframe>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ContactUs"
    }
</script>

<style scoped>
    section {
        margin-top: 120px;
        font-size: 18px;
        background-color: #F5F7FA;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column-reverse;
        position: relative;
        min-height: 100vh;
        direction: rtl;
    }

    .curve {
        width: 100%;
        min-height: 300px;
        background: linear-gradient(-2deg,#00D5EE 22%,#009FB3 22.5%);
        color: bisque;
        clip-path: polygon(0 0, 100% 0, 100% 83%, 0% 100%);
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
    }

    .card {
        position: relative;
        z-index: 15;

        display: flex;
        justify-content: flex-end;
        padding-bottom: 10px;

        margin-top: 70px;

        min-height: 550px;
        width: 80%;
        max-width: 1000px;
        min-width: 400px;
        color: #303143;
        text-align: right;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 8px 46px #6E6E6E29;
    }

    .card-info {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        width: 30%;
    }


    .dots {
        width: 150px;

        min-height: 120px;

        margin-top: 30px;
        background-color:#F5F7FA ;
        background-image: radial-gradient(#9B9999 1px,transparent 1px);
        background-size: 20px 20px;

        justify-self: center;

    }

    .card-title {
        font-size: 20px;
        margin: 20px 0;
        position: relative;
        display: flex;
        align-items: center;
    }

    .card-title-line {
        position: absolute;
        width: 120px;
        height: 3px;
        background-color: #00D4ED;
        right: -125px;
    }

    .card-info-box {
        display: flex;
        flex-direction: flex-end;
        margin-bottom: 20px;
    }

    .card-info-box--centered {
        align-items: center;
    }

    .info-box-text {
        margin: 0;
        padding-left: 10px;
        font-size: 16px;
    }

    .info-box-text.info-box-text--hasLtr {
        direction: ltr !important;
    }

    .box-text-sub {
        font-size: 13px;
    }

    .info-box-icon {
        margin-left: 5px;
        color: #00D5EE;
    }

    .card-info-link {
        margin: 0 0 10px 10px;
        padding: 5px 15px;
        text-align: center;
        border-radius: 5px;
        background-color: #F7FFFF;
        color: #009FB3;
        font-size: 16px;
    }

    .card-info-link.link--telegram {
        background-color: #eff8ff;
        color: #00D4ED;
        margin-top: auto
    }

    .card-info-link.link--insta {
        background-color: #F8F5F8;
        color: #FF64F9;
    }

    .card-info-map {
        position: absolute;
        height: calc(100% + 100px);
        top: -50px;
        width: 70%;
        right: -35px;
        border-radius: 20px;
        border: 5px solid white;
    }


    @media only screen and (max-width: 767.8px) {
        .dots {
            display: none;
        }

        .card {
            flex-direction: column;
            padding-bottom: 0;
            align-items: stretch;
        }

        .card-info {
            width: initial;
            max-width: none;
            padding: 0 20px;
        }

        .card-info-map {
            position: static;
            right: initial;
            top: initial;
            height: 300px;
            width: 100%;
            border: none;
            border-radius: 20px 20px 0 0;
        }

        .card-title-line {
            display: none;
        }

        .card-info-link {
            margin-left: 0;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .card {
            width: 100%;
            min-width: initial;
        }

        .card-title-line {
            display: block;
        }
    }

</style>