<template>
    <div>
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <div class="carousel slide" data-ride="carousel">

                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" :data-slide-to="key"
                        v-bind:class="{'active' : (key === 0)}" v-for="(value, key) in slides"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                    <div class="item" v-for="(slide,key) in slides" v-bind:class="{'active' : (key === 0)}">
                        <div class="page-header header-filter"
                             :style="'background-image: url(\'' + slide.imageStyle + '\');'">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-6 text-left">
                                        <h1 class="title isansFont text-right">{{slide.title}}</h1>
                                        <h4 class="isansFont text-justify">
                                            {{slide.description}}
                                        </h4>
                                        <br>
                                        <div class="buttons" v-if="slide.hasButton">
                                            <router-link :to="slide.button.target" class="btn isansFont btn-lg"
                                                         :class="'btn-' + slide.button.colorTheme">
                                                {{slide.button.value}}
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                    <i class="material-icons">keyboard_arrow_left</i>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                    <i class="material-icons">keyboard_arrow_right</i>
                </a>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Home",
        data: function () {
            return {
                slides: [
                    {
                        title: 'به اسنیدز خوش آمدید',
                        description: 'اسنیدز، پلتفرم بهینه رفع نیاز دانشجویی در سطح بالای فناوری امروز است.',
                        imageStyle: 'webimages/bg3.jpg',
                        hasButton: true,
                        button: {value: 'ازاینجا شروع کنید', target: '/login', colorTheme: 'primary'},
                    },
                    {
                        title: 'جزوات برتر',
                        description: 'اسنیدز، دیتابیس بزرگی از جزوات دانشگاه در رشته های تخصصی به صورت رایگان',
                        imageStyle: 'webimages/note.jpg',
                        hasButton: true,
                        button: {value: 'جزوات رو ببینید!', target: '/booklets', colorTheme: 'info'},
                    },
                    {
                        title: 'مصاحبه ها',
                        description: 'اسنیدز، آِینده خود را با فکر انتحاب کنید',
                        imageStyle: 'webimages/userbg.jpg',
                        hasButton: true,
                        button: {value: 'بلاگ!', target: '/blog', colorTheme: 'rose'},
                    },
                ]
            }
        },
        mounted() {
            //scroll to up
            scrollTo(0, 0);
            // this.$store.dispatch('saveCurrentLocation', this.$route.path);
        }
    }
</script>

<style scoped>
    .datetimepicker {
        margin-top: 30px !important;
    }
</style>
