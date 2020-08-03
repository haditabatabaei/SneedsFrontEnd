<template>
    <header class="header">
        <top-meta-bar />
        <top-menu />
    </header>
</template>

<script>
    import TopMetaBar from "@/components/TopMenus/TopMetaBar";
    import TopMenu from "@/components/TopMenus/TopMenu";
    export default {
        name: "SneedsHeader",
        components: {
            "top-menu": TopMenu,
            "top-meta-bar": TopMetaBar
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
    .header {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>