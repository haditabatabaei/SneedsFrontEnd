<template>
    <nav id="topNavbar" class="navbar">
        <FirstMenu></FirstMenu>
        <SecondMenu></SecondMenu>
    </nav>

</template>

<script>
    import FirstMenu from './FirstMenu';
    import SecondMenu from './SecondMenu';

    export default {
        name: "TopMenu",
        components: {
            FirstMenu, SecondMenu
        },
        data: function () {
            return {}
        },
        computed: {}, watch: {},
        mounted() {
        },
        methods: {},
    }
</script>

<style scoped>

    .navbar {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        position: sticky;
        top: 0;
        z-index: 99;
        margin-bottom: 0;
    }
</style>