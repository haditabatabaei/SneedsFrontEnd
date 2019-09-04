<template>
    <router-link to="/" class="navbar-brand isansFont">
        <img class="brand-image miniMarginBottom"
             src="http://193.176.241.131/sneedsAssets/img/sneedsLogo.png"
             alt="Logo">
        <div class="ripple-container"></div>
        <span class="logoFontSize">اسنیدز</span>
    </router-link>
</template>

<script>
    export default {
        name: "LogoComponent"
    }
</script>

<style scoped>
    .navbar-brand {
        margin: 0 !important;
        padding-right: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .navbar-brand img {
        margin: 0 0 0 5px;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .navbar-brand {
            order: 1;
        }
    }

</style>