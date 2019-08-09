<template>
    <div class="topMessageBox">
        <p class="isansFont">
            تمام سرمایه ما کاربرانمان هستند، همیشه پاسخگوی شما هستیم.
        </p>
    </div>
</template>

<script>
    export default {
        name: "TopMessage"
    }
</script>

<style scoped>
    .topMessageBox {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
        width: 100%;
        margin-top: -10px;
        background-color: #337ab7;
    }

    .topMessageBox p {
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin-bottom: 0;
        padding-right: 10px;
        padding-top: 10px;
    }
</style>