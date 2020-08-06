<template>
    <section class="paper-items isansFont">
        <p class="paper-items-notif">
            <i class="material-icons">done</i>
            اطلاعات این مقصد با موفقیت اضافه شد.
        </p>
        <div class="paper-items-wrapper">
            <div class="paper-items-item">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info">
                    <p class="paper-item-summary">کشور کانادا، سال ۲۰۲۰</p>
                    <p class="paper-item-title">گروه هنر مقطع کارشناسی ارشد رشته نقاشی</p>
                    <div class="paper-item-universitytags">
                        <span class="university-tag">
                            Amirkabir (AUT)
                        </span>
                        <span class="university-tag">
                            Amirkabir uni (AUT)
                        </span>
                    </div>
                </div>
                <button class="paper-item-remove">
                    <i class="material-icons">close</i>
                </button>
            </div>

            <button class="paper-items-addnew">
                افزودن مقصد دیگر
            </button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "DestinationItems"
    }
</script>

<style scoped>
    .paper-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 100px 20px 20px 20px;
    }

    .paper-items-notif {
        color: white;
        background-color: #009FB3;
        border-radius: 15px;
        font-size: 16px;
        display: flex;
        align-items: center;
        min-height: 45px;
    }

    .paper-items-notif i {
        margin: 0 15px 0 10px;
        background-color: white;
        border-radius: 50%;
        color: #009FB3;
        font-size: 20px;
    }

    .paper-items-wrapper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border-radius: 20px;
        background-color: #F5F7FA;
        border: 2px solid #F2F2F2;
        margin-top: 20px;
    }

    .paper-items-item {
        display: flex;
    }

    .paper-item-info {
        margin: 20px 0 0 0;
    }

    .paper-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F4CA64;
        border: 5px solid white;
        width: 60px;
        height: 60px;
        font-size: 26px;
        color: white;
        border-radius: 50%;
        box-shadow: 0 2px 20px #00000029;
        margin: 20px;
    }

    .paper-item-remove {
        margin: 0 auto 0 20px;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        color: #B3B3B3;
    }

    .paper-item-summary {
        margin: 0;
        font-size: 20px;
        color: #173F5F;
    }

    .paper-item-title {
        margin: 5px 0 0 0;
        font-size: 14px;
        color: #9B9999;
    }

    .paper-items-addnew {
        align-self: flex-end;
        margin: 20px;
        background-color: #F5F7FA;
        border: 2px solid #00BFD6;
        color: #009FB3;
        border-radius: 5px;
        padding: 5px 15px;
    }

    .paper-item-universitytags {
        display: flex;
    }

    .paper-item-universitytags {
        margin: 10px 0 0 0;
    }

    .university-tag {
        background-color: #FFFFFF;
        color: #9B9999;
        border-radius: 15px;
        font-size: 13px;
        padding: 3px 12px;
        margin-left: 5px;
    }

</style>