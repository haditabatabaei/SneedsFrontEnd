<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="false" id="top"
             style="transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="brand text-center">
                    <h1 class="title isansFont text-center">404</h1>
                    <h4 class="isansFont text-center">
                        متاسفانه صفحه ای که دنبالش بودید پیدا نشد.!
                    </h4>
                    <router-link to="/" class="btn btn-warning btn-lg isansFont">
                        <i class="material-icons">keyboard_arrow_left</i>
                        بازگشت به صفحه اول
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error404",
        components: {}, mounted() {
            scrollTo(0, 0);
        }
    }
</script>

<style scoped>
    .container{
        padding-top:220px;
    }

    .container .btn{
        color:rgb(51,51,51);
        font-weight:bold;
    }

    .page-header {
        height: 100vh;
        background-image: url('http://195.248.243.68/sneedsAssets/img/bg3.jpg');
    }
</style>
