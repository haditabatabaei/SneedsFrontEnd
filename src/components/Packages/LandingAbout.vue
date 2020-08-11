<template>
    <section class="package-section package-section-about">
        <div class="section-sub section-sub-smart">
            <div class="about-info">
                <h4 class="smart-info-suptitle isansFont">
                    درباره اسنیدز
                </h4>
                <h1 class="smart-info-title isansFont">
                    ما کی هستیم؟
                </h1>
                <div class="smart-info-divider"></div>
                <p class="smart-info-text isansFont">
                    حدود ۲ سال پیش با چندتا بچه‌های امیرکبیر جمع شدیم و برای برطرف کردن یکی از مهم‌ترین نیازهای
                    دانشجو‌ها که اپلای و تحصیل در خارج از کشوره یه استارتاپ راه انداختیم. هدفمون وصل کردن
                    دانشجو‌هایی که یک بار اپلای کردن و مسیر رو به طور کامل طی کردن، به شمایی که به تجربه‌ این افراد
                    نیاز دارین، بوده تا با خیال راحت بتونین همون جایی که دوست دارین درس بخونید. توی این مسیر موفق
                    شدیم به صدها دانشجو برای گرفتن پذیرش تحصیلی کمک کنیم و خدارو برای اینکه تونستیم راهنماییشون کنیم، همیشه شکر می‌کنیم.
                </p>
            </div>
            <img class="smart-image" src="/sneedsAssets/img/team.png" alt="تیم اسنیدز">
        </div>
    </section>
</template>

<script>
    export default {
        name: "LandingAbout"
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

    .package-section-about {
        min-height: auto !important;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .section-sub {
        width: 100%;
        max-width: 1170px;
        padding: 0 35px;
    }

    .section-sub-smart {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .about-info {
        display: flex;
        flex-direction: column;
        width: calc(50% - 20px);
    }

    .smart-image {
        width: 50%;
    }

    .smart-info-suptitle {
        margin: 20px 0;
        color: #303143;
        font-size: 14px;
        font-weight: bold;
    }

    .smart-info-title {
        color: #303143;
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }

    .smart-info-divider {
        width: 150px;
        height: 5px;
        border-radius: 20px;
        background-color: #00BFD6;
        margin: 20px 0;
    }

    .smart-info-text {
        color: #707070;
        line-height: 26px;
    }

    @media only screen and (max-width: 991.8px) {
        .smart-info-suptitle {
            text-align: center;
        }

        .smart-info-title {
            text-align: center;
        }

        .smart-info-divider {
            margin: 20px auto;
        }

        .section-sub-smart {
            flex-direction: column;
        }

        .smart-image {
            width: 60%;
        }
        .about-info {
            width: 100%;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .section-sub-smart {
            flex-direction: column;
            margin-top: 100px;
        }

        .smart-image {
            width: 100%;
            display: none;
        }

        .about-info {
            width: 100%;
        }

    }
</style>