<template>
    <router-link to="/" class="logo isansFont--faNum">
        <img class="logoImage" src="http://195.248.243.68/sneedsAssets/img/sneedsLogo.png" alt="Sneeds Logo">
        <span class="logoName">اسنیدز</span>
    </router-link>
</template>

<script>
    export default {
        name: "LogoComponent"
    }
</script>

<style scoped>

    .logo {
        display:flex;
        align-items:center;
        justify-content : flex-start;

        margin-left:10px;
    }

    .logoImage {
        width:50px;
        height:50px;
    }

    .logoName {
        font-size:19px;
        color:#333;
        margin-right:5px;
    }



    .navbar-brand img {
        margin: 0 0 0 5px;
    }

</style>