<template>
    <nav id="topNavbar" class="navbar navbar-fixed-top navbar-transparent">
        <!--<div class="loadingBox navbar-fixed-top" :class="[{'d-none' : this.$store.getters.getLoadingDisplay}]"-->
        <!--:style="'width:' + this.$store.getters.getLoadingPercent + '%;'"></div>-->
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
    }

</style>