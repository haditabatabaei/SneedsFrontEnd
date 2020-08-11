<template>
    <section class="package-section package-section-steps">
        <div class="section-sub section-sub-steps">
            <h1 class="section-steps-title isansFont--faNum">اپلای در 3 مرحله...</h1>
            <h2 class="section-steps-title-subtext isansFont">
                اپلای کردن می‌تونه خیلی راحت تر از اون چیزی که فکر می‌کنی باشه!
            </h2>
            <div class="section-steps-title-divider"></div>
            <div class="step">
                <img class="step-image" src="/sneedsAssets/img/step-1.png" alt="">
                <div class="step-info">
                    <h2 class="step-title isansFont--faNum">
                        1.رزرو پکیج و اعلام آمادگی مشاوران
                    </h2>
                    <p class="step-text isansFont">
                        بعد از رزرو پکیج و پر کردن فرم، اطلاعاتت مشاورای اسنیدز فرستاده میشه و حداکثر بعد از
                        چهار روز مشاورایی که برای پروژت اعلام آمادگی کردن، توی پروفایلت قابل مشاهده هستن.
                    </p>
                </div>
            </div>
            <div class="step">
                <img class="step-image" src="/sneedsAssets/img/step-2.png" alt="">
                <div class="step-info">
                    <h2 class="step-title isansFont--faNum">
                        2.انتخاب مشاور توسط شما و شروع پروسه
                    </h2>
                    <p class="step-text isansFont">
                        بعدش میتونی از بین این مشاورا، که خیلیم کارشون درسته، بررسی کنی و یکی رو انتخاب کنی تا پروسه اپلایت شروع بشه.
                    </p>
                </div>
            </div>
            <div class="step">
                <img class="step-image" src="/sneedsAssets/img/step-3.png" alt="">
                <div class="step-info">
                    <h2 class="step-title isansFont--faNum">
                        3.مراحل پروسه با توجه به پکیج و در نهایت پذیرش و ویزا
                    </h2>
                    <p class="step-text isansFont">
                        با توجه به پکیجی که انتخاب کردی، مشاورت و اسنیدز، در تمام مسیرت کنارت هستن.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "LandingSteps"
    }
</script>

<style scoped>
    .package-section {
        width: 100%;
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .package-section-steps {
        min-height: auto;
        margin-bottom: 50px;
    }

    .section-sub {
        width: 100%;
        max-width: 1170px;
        padding: 0 35px;
    }

    .section-steps-title-subtext {
        text-align: center;
        color: #707070;
        margin: 0 0 15px 0;
        font-size: 16px;
    }

    .section-sub-steps {
        display: flex;
        flex-direction: column;
    }

    .section-steps-title {
        font-size: 24px;
        font-weight: bold;
        margin: 50px 0 25px 0;
        color: #303143;
        text-align: center;
    }

    .section-steps-title-divider {
        width: 100px;
        height: 4px;
        border-radius: 30px;
        background-color: #8C3DDB;
        margin: 20px auto;
    }

    .step {
        display: flex;
        align-items: center;
        margin: 20px 0;
    }

    .step-info {
        margin-right: 20px;
        width: calc(100% - 170px);
    }

    .step-image {
        width: 150px;
        height: 150px;
        border-radius: 50% 0 50% 50%;
    }

    .step-title {
        font-size: 18px;
        margin: 10px 0;
        color: #585858;
        font-weight: bold;
    }

    .step-text {
        color: #9B9999;
        line-height: 25px;
        margin-top: 10px;
    }

    @media only screen and (max-width: 991.8px) {
        .section-steps-title {
            text-align: center;
        }

        .section-steps-title-divider {
            margin: 5px auto;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .step-info {
            text-align: center;
            width: initial;
        }


        .step {
            flex-wrap: wrap;
            justify-content: center;
            margin: 20px 0;
        }
    }
</style>