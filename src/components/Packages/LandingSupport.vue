<template>
    <section class="package-section package-section-support">
        <div class="section-sub section-sub-support">
            <div class="support-overlay"></div>
            <h2 class="support-title-sup isansFont--faNum">
                شنبه تا چهارشنبه، ساعت 10:00 تا 19:00
                <br>
                پنجشبه، ساعت 10:00 تا 14:00
            </h2>
            <h1 class="support-title isansFont">پاسخگوی شما هستیم!</h1>
            <ul class="support-items isansFont--faNum">
                <li class="support-item item--hasLtr">
                    <i class="material-icons">call</i>
                    <span>021 - 2842 8353</span>
                </li>
                <li class="support-item item--link ">
                    <a href="http://bit.ly/2FPshaR" class="gadugiFont item--hasLtr" target="_blank">
                        <i class="material-icons">chat</i>
                        <span>@sneeds_admin</span>
                    </a>
                </li>
                <li class="support-item item--link">
                    <a href="http://bit.ly/3581UUU" class="gadugiFont item--hasLtr" target="_blank">
                        <i class="material-icons">picture_in_picture</i>
                        <span>@sneeds_admin</span>
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "LandingSupport"
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

    .package-section-support {
        min-height: initial !important;
        margin: 50px 0;
    }

    .section-sub {
        width: 100%;
        max-width: 1170px;
        padding: 0 35px;
    }

    .section-sub-support {
        height: 300px;
        background: url("/sneedsAssets/img/support.png") no-repeat center;
        background-size: cover;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
    }

    .support-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 300px;
        z-index: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(31, 31, 31, 1) 50%, rgba(84, 84, 84, 1) 100%);
        opacity: 0.5;
        border-radius: 10px;
    }

    .support-title {
        z-index: 3;
        position: relative;
        color: white;
        font-size: 22px;
        font-weight: bold;
    }

    .support-title-sup {
        color: white;
        margin: 0;
        font-size: 18px;
        position: relative;
        z-index: 3;
        font-weight: bold;
        text-align: center;
        line-height: 26px;
    }

    .support-items {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 3;
        position: relative;
        padding: 0;
        flex-wrap: wrap;
    }

    .support-item {
        background-color: #303143;
        color: #00BFD6;
        display: flex;
        align-items: center;
        direction: ltr;
        margin: 15px;
        padding: 10px 25px;
        border-radius: 20px;
    }

    .support-item i {
        font-size: 16px;
        margin-left: 5px;
    }

    .item--link {
        padding: 0;
    }

    .item--link a {
        width: 100%;
        padding: 10px 25px;
        color: #00BFD6;
        border-radius: 20px;
        transition: all 0.2s ease-in-out;
        display: flex;
        align-items: center;
    }

    .item--link a:hover {
        color: #303143;
        background-color: #00BFD6;
    }

    .item--hasLtr span {
        direction: ltr !important;
    }

    @media only screen and (max-width: 567.8px) {
        .support-items {
            justify-content: center;
        }

        .section-sub-support {
            height: auto;
            border-radius: 0;
        }

        .support-overlay {
            height: 100%;
            border-radius: 0;
        }

        .support-title-sup {
            margin-top: 20px;
            font-weight: normal;
        }
    }
</style>