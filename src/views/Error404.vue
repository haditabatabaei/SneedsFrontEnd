<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="false" id="top" style="transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="brand">
                            <h1 class="title yekanFont text-center">404</h1>
                            <h4 class="yekanFont text-center">
                                متاسفانه صفحه ای که دنبالش بودید پیدا نشد.!
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error404",
        components: {
        },mounted(){
            scrollTo(0,0);
        }
    }
</script>

<style scoped>
    .page-header{
        background-image:url('../../public/webimages/bg3.jpg');
    }
</style>
