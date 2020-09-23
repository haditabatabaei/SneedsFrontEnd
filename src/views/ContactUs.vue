<template>
    <section class="contactus gadugiFont">
        <div class="curve"></div>
        <div class="dots"></div>
        <div class="card">
            <div class="card-info">
                <h2 class="card-title">
                    Contact Us
                    <div class="card-title-line"></div>
                </h2>

                <div class="card-info-box">
                    <i class="material-icons info-box-icon">local_phone</i>
                    <p class="info-box-text info-box-text--bold">
                        +9821 2842 8353
                        <br>
                        <span class="box-text-sub">
                            Saturdays to Wednesdays, from 10:00 to 19:00
                            <br>
                            Thursdays from 10:00 to 14:00
                        </span>
                    </p>
                </div>


                <div class="card-info-box card-info-box--centered">
                    <i class="material-icons info-box-icon">mail</i>
                    <p class="info-box-text info-box-text--bold ">
                        info@sneeds.ir
                    </p>
                </div>


                <div class="card-info-box">
                    <i class="material-icons info-box-icon">location_on</i>
                    <p class="info-box-text">
                        Samsung accelerator, AUT growth center, Valiasr st, Tehran, Iran.
                    </p>
                </div>


                <a href="http://bit.ly/2FPshaR" target="_blank" class="card-info-link link--telegram">
                    Telegram
                </a>
                <a href="http://bit.ly/3581UUU" target="_blank" class="card-info-link link--insta">
                    Instagram
                </a>
                <a href="https://jobinja.ir/companies/sneeds/jobs" target="_blank" class="card-info-link link--sneeds">
                    Careers
                    <i class="material-icons">keyboard_arrow_right</i>
                </a>

            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10897.77831034992!2d51.414102256476326!3d35.703367810843105!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe28f491d82aa8c83!2z2K_Yp9mG2LTar9in2YfigIwg2LXZhti52KrbjCDYp9mF24zYsdqp2KjbjNix!5e0!3m2!1sfa!2sus!4v1597061352663!5m2!1sfa!2sus"
                    width="98%" height="585px"
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
    .contactus {
        margin-top: 120px;
        font-size: 18px;
        background-color: #F5F7FA;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column-reverse;
        position: relative;
        min-height: 100vh;
    }

    .curve {
        width: 100%;
        min-height: 300px;
        background: linear-gradient(-2deg, #00D5EE 22%, #009FB3 22.5%);
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
        padding-bottom: 10px;
        justify-content: flex-end;
        margin-top: 70px;
        min-height: 550px;
        width: 80%;
        max-width: 1000px;
        min-width: 400px;
        color: #303143;
        text-align: left;
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
        background-color: #F5F7FA;
        background-image: radial-gradient(#9B9999 1px, transparent 1px);
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
        left: -125px;
    }

    .card-info-box {
        display: flex;
        margin-bottom: 20px;
        margin-top: 40px;
    }

    .card-info-box--centered {
        align-items: center;
    }

    .info-box-text {
        margin: 0;
        padding-right: 10px;
        font-size: 16px;
        width: calc(100% - 30px);
    }

    .info-box-text.info-box-text--bold {
        font-weight: bold;
    }

    .box-text-sub {
        font-size: 13px;
        font-weight: normal;
    }

    .info-box-icon {
        color: #00D5EE;
        height: 30px;
        width: 30px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #00D5EE;
        border-radius: 50%;
        margin-right: 15px;
    }

    .card-info-link {
        margin: 0 10px 10px 0;
        padding: 10px 15px;
        text-align: center;
        border-radius: 5px;
        background-color: #F7FFFF;
        color: #009FB3;
        font-size: 16px;
        transition: all 100ms ease-in-out;
    }

    .card-info-link.link--telegram {
        background-color: #eff8ff;
        color: #00D4ED;
        margin-top: auto;
        font-size: 13px;
    }

    .card-info-link.link--insta {
        background-color: #F8F5F8;
        color: #FF64F9;
        font-size: 13px;
    }

    .card-info-link.link--sneeds {
        box-shadow: 0 8px 46px #6E6E6E29;
        margin-bottom: -30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-info-link:hover {
        filter: brightness(95%);
    }

    .card-info-link.link--sneeds i {
        margin-right: 10px;
    }

    .card-info-map {
        position: absolute;
        height: calc(100% + 100px);
        top: -50px;
        width: 70%;
        left: -35px;
        border-radius: 20px;
        border: 5px solid white;
        background-color: white;
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
            margin-right: 0;
        }

        .card-info-link.link--sneeds {
            margin-bottom: 10px;
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