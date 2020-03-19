<template>
    <div class="bugReport" @click="showModal">
        <p class="isansFont" >
            با گزارش باگ ها و خطاهای وبسایت به ما در ارائه سرویس بهتر کمک کنید.
        </p>
    </div>
</template>

<script>
    export default {
        name: "BugReport",
        data() {
            return {}
        },
        methods: {
            showModal() {
                this.$modal.show('bugReportModal')
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    .bugReport {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 50px;
        background-color: #9038CC;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .bugReport:hover {
        background-color: #8534bc;
    }

    .bugReport p {
        color: white;
        margin: 0;
    }

    @media only screen and (max-width: 768px) {
        .bugReport p {
            font-size: 12px;
        }
    }

    @media only screen and (max-width: 400px) {
        .bugReport p {
            font-size: 10px;
        }
    }
</style>