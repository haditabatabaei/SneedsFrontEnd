<template>
    <section class="form-other">
        <h1 class="other-title isansFont">
            سایر موارد و رزومه
            <i class="material-icons">info</i>
        </h1>
        <h3 class="other-desc isansFont">
            این اطلاعات برای مقایسه خیلی به ما کمک می‌کنه.
        </h3>

        <div class="form-other-items">
            <c-collapsable-input title="آدرس لینکدین" :is-open="true" />
            <c-collapsable-input title="سابقه المپیاد" />
            <c-collapsable-input title="آدرس وبسایت شخصی" />
            <c-collapsable-input title="آپلود رزومه" />
            <c-collapsable-input title="سایر توضیحات" />
        </div>
    </section>
</template>

<script>
    import CollapsableInput from "@/components/Form/CollapsableInput";
    export default {
        name: "OtherInformationInput",
        components: {
            'c-collapsable-input': CollapsableInput
        },
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>
    .form-other {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .other-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .other-desc {
        font-size: 14px;
        margin: 0 25px;
        color: #9B9999;
    }

    .form-other-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 20px;
        margin-top: 30px;
    }
</style>