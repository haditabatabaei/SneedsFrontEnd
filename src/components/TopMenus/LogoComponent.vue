<template>
    <a href="http://sneeds.ir" target="_blank" class="logo gadugiFont">
        <img class="logoImage" src="/sneedsAssets/img/sneedsLogo.png" alt="Sneeds Logo">
        <span class="logoName">Sneeds</span>
    </a>
</template>

<script>
    export default {
        name: "LogoComponent"
    }
</script>

<style scoped>

    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 10px;
    }

    .logoImage {
        width: 50px;
        height: 50px;
    }

    .logoName {
        font-size: 19px;
        color: #333;
        margin-left: 5px;
    }



    .navbar-brand img {
        margin: 0 5px 0 0;
    }

</style>
