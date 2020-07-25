<template>
    <section class="analysis-form"> 
        <section class="form-container">
            <aside class="form-title">
                <div class="form-title-circle"></div>
                <h1 class="form-title-text" style="font-family: Sans-Serif !important">
                    sneeds.ir
                </h1>
                <p class="form-title-desc danaFont">
                    برای رسید به اهدافت نیاز به کمک داری؟
                    <br>
                    <span class="form-title-desc-emphase">
                        درست اومدی!
                        <span class="form-title-desc-star"></span>
                    </span>
                </p>
            </aside>
            <router-view :key="$route.fullPath" class="form-layout-view"></router-view> 
        </section>
    </section>
</template>

<script>
export default {
    name: 'AnalysisFormLayout',
    data() {
        return {
            
        }
    },
    created() {

    }
}
</script>

<style scoped>
    .analysis-form {
        width: 100%;
        /*background-color: orange;*/
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-container {
        width: 100%;
        min-height: 100vh;
        /*background: red;*/
        display: flex;
        justify-content: space-between;
    }

    .form-title {
        width: 35%;
        max-width: 600px;
        align-self: stretch;
        background: url('/sneedsAssets/img/takhmin.jpg') no-repeat 100% center;
        background-size: cover;
        position: relative;
    }

    .form-title-circle {
        position: absolute;
        right: 0;
        top: 0;
        width: 120px;
        height: 110px;
        background-color: #0F4775;
        border-radius: 50% 0 50% 50%;
        z-index: 5;
    }

    .form-title-text {
        position: absolute;
        right: 30px;
        top: 30px;
        z-index: 10;
        color: #EFF8FF;
        background-color: #20639B;
        border-radius: 30px;
        font-size: 22px;
        padding: 5px 15px;
        margin: 0;
    }

    .form-title-desc {
        font-size: 19px;
        color: #F5F7FA;
        background-color: #1A5D8E;
        box-shadow: 0 13px 23px rgba(0,0,0,0.1);
        border-radius: 15px;
        margin: 150px 50px 0 50px;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .form-title-desc-emphase {
        position: relative;
        font-weight: bold;
        font-size: 24px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding-right: 16px;
    }

    .form-title-desc-emphase:before {
        position: absolute;
        right: 0;
        top: 10px;
        width: 5px;
        height: 5px;
        content: " \2726";
        font-size: 15px;
    }

    .form-layout-view {
        min-height: 100vh;
        width: 70%;
        /* background-color: blue; */
        height: 400px;
    }

</style>