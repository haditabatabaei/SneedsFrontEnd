<template>
    <router-link to="/" class="logo gadugiFont">
        <img class="logoImage" src="/sneedsAssets/img/sneedsLogo.png" alt="Sneeds Logo">
        <span class="logoName gadugiFont">Sneeds</span>
    </router-link>
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
        margin-right: 20px;
    }

    .logoImage {
        width: 40px;
        height: 40px;
    }

    .logoName {
        font-size: 19px;
        color: #333;
        margin-left: 5px;
    }

</style>
