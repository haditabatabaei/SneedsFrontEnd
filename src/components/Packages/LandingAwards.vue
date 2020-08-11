<template>
    <section class="package-section package-section-awards">
        <p class="awards-sup isansFont--faNum">
            در 2 سال گذشته
        </p>
        <h1 class="awards-title isansFont">
            دستاوردهای اسنیدز
        </h1>
        <div class="section-sub section-sub-awards">
            <div class="awards-item">
                <img alt="2000 پذیرش اخذ شده توسط مشاوران اسنیدز" src="/sneedsAssets/img/awards-login.svg"
                     class="awards-item-icon">
                <p class="isansFont--faNum awards-item-amount">56+</p>
                <p class="isansFont awards-item-desc">
                    پذیرش اخذ شده
                    <br>
                    به دست مشاوران اسنیدز
                </p>
            </div>
            <div class="awards-item">
                <img alt="2000 پذیرش اخذ شده توسط مشاوران اسنیدز" src="/sneedsAssets/img/awards-people.svg"
                     class="awards-item-icon">
                <p class="isansFont--faNum awards-item-amount">27,000+</p>
                <p class="isansFont awards-item-desc">
                    دقیقه مشاوره آنلاین
                    <br>
                    انجام شده!
                </p>
            </div>
            <div class="awards-item">
                <img alt="2000 پذیرش اخذ شده توسط مشاوران اسنیدز" src="/sneedsAssets/img/awards-docs.svg"
                     class="awards-item-icon">
                <p class="isansFont--faNum awards-item-amount">540+</p>
                <p class="isansFont awards-item-desc">
                    مدارک ویرایش یا نگارش شده
                    <br>
                    به دست مشاوران اسنیدز
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "LandingAwards"
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

    .section-sub {
        width: 100%;
        max-width: 1170px;
        padding: 0 35px;
    }

    .package-section-awards {
        background-color: #8C3DDB;
        min-height: 250px !important;
        height: 300px !important;
        position: relative;
        display: flex;
        margin-bottom: 175px;
        flex-direction: column;
        align-items: center !important;
        justify-content: flex-start !important;
    }

    .section-sub-awards {
        background-color: white;
        height: 250px;
        position: absolute;
        bottom: -100px;
        border-radius: 10px;
        box-shadow: 0 4px 16px #00000021;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .awards-title {
        color: white;
        font-weight: bold;
        font-size: 24px;
        margin: 10px;
    }

    .awards-sup {
        background-color: white;
        color: #8C3DDB;
        border-radius: 20px;
        padding: 5px 15px;
        margin-top: 30px;
    }

    .awards-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .awards-item-icon {
        width: 40px;
        height: 40px;
    }

    .awards-item-amount {
        color: #303143;
        font-weight: bold;
        margin: 10px 0;
        font-size: 16px;
    }

    .awards-item-desc {
        text-align: center;
        color: #9B9999;
        font-size: 13px;
    }

</style>