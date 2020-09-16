<template>
    <section class="reminder">
        <div class="design-details">
            <img  class="light-blue-circle" src="/sneedsAssets/img/circle.png" alt="">
        </div>
        <div class="reminder-container">
            <img class="reminder-img" src="/sneedsAssets/img/email.png">
            <div class="reminder-intro-info">
                <span class="reminder-info-small-title">
                    <div class="reminder-info-title-line"></div>
                    Reminder
                </span>
                <h4 class="reminder-info-title">Don't miss another deadline</h4>
                <p class="reminder-info-text">
                    get weekly reminder on your shortlisted university deadlines and always stay on track.
                </p>
                <div class="reminder-info-links">
                    <a href="#" class=" reminder-link-start">
                        Start your journey
                        <i  class="material-icons">keyboard_arrow_right</i>
                    </a>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        name: "LandingReminder"
    }
</script>

<style scoped>

    .reminder-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
    }
    .reminder-intro-info {
        width: 40%;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background-color: white;
        margin-top: 3%;
        padding: 30px 5%;
        font-size: 14px;
    }
    .reminder-info-small-title {
        margin-bottom: 0px;
        margin-top: 10px;
        color: #374957;
    }
    .reminder-info-title-line {
        display: inline-block;
        width: 20px;
        height: 3px;
        vertical-align: middle;
        background-color: #00D4ED;
        right: -125px;
        border-radius: 2px
    }
    .reminder-info-title {

        color: #303143;
        font-weight: bold;
    }
    .reminder-info-text {
        padding: 5% 0px;
        font-size: 14px;
    }
    .reminder-link-start {
        color: #008DB8;
        min-width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        font-size: 12px;
        font-weight: bolder;
        margin-bottom: 10px;
        padding: 10px 0px;
    }
    .reminder-img {
        width: 50%;
        height: auto;
        padding: 3%;
    }
    .design-details {
        position: absolute;
        z-index: -1;
    }
    .light-blue-circle {
        width: 70%;
        margin-left: -20%;
        margin-top: -10%;
    }
</style>