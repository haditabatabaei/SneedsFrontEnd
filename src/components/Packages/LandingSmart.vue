<template>
    <section class="package-section package-section-smart">
        <div class="section-sub section-sub-smart">
            <img class="smart-image" src="/sneedsAssets/img/smart.png" alt="Sneeds">
            <div class="smart-info">
                <h4 class="smart-info-suptitle isansFont">
                    اپلای هوشمند
                </h4>
                <h1 class="smart-info-title isansFont">
                    با استفاده از پلتفرم اسنیدز...
                </h1>
                <div class="smart-info-divider"></div>
                <p class="smart-info-text isansFont">
                    با استفاده از پلتفرم اسنیدز از همه مراحل اپلایت با خبر باش! از زمانی که پکیج رو رزرو می‌کنی تا
                    پایان مراحل اپلای، با یه کلیک همه چیو زیر نظر داشته باش. همین طور می‌تونی هر وقت که خواستی با
                    مشاورت از طریق ناحیه کاربری چت کنی.
                </p>
                <ul class="smart-info-items isansFont">
                    <li class="smart-info-item">
                        <i class="material-icons">done</i>
                        <span>چت با مشاور</span>
                    </li>
                    <li class="smart-info-item">
                        <i class="material-icons">done</i>
                        <span>اطلاع از وضعیت دقیق اپلای</span>
                    </li>
                    <li class="smart-info-item">
                        <i class="material-icons">done</i>
                        <span>مشاوره تصویری در بستر اسنیدز</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "LandingSmart"
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

    .package-section-smart {
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

    .smart-image {
        width: 50%;
    }

    .smart-info {
        display: flex;
        flex-direction: column;
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

    .smart-info-items {
        list-style: none;
        background-color: #00BFD6;
        color: white;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        padding: 0;
    }

    .smart-info-item {
        display: flex;
        align-items: center;
        padding: 15px 0;
        margin: 0 10px;
        font-size: 13px;
    }

    .smart-info-item i {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        margin-left: 5px;
        background-color: white;
        color: #00BFD6;
        border-radius: 50%;
        font-size: 12px;
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

        .smart-info {
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

        .smart-info {
            width: 100%;
        }

        .smart-info-items {
            margin-top: 15px;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 0 5px;
        }
    }
</style>