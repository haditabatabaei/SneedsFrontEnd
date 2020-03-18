<template>
    <div>
        <div class="page-header"
             style="background-image:url('http://37.152.182.253/sneedsAssets/img/homebg.jpg'); background-repeat:no-repeat; background-size:cover">
            <div class="container" style="display:flex;justify-content:flex-end;align-items:center">
                <div class="homeTitleBox" style="color:rgb(51,51,51)">
                    <h1 class="isansFont" style="font-weight:bold;line-height:70px;">
                        برای آیندت <br> آگاهانه تصمیم بگیر
                    </h1>
                    <h3 class="isansFont">
                        اولین پلتفرم آنلاین مشاوره در زمینه <br> اپلای، مهاجرت و کارآفرینی
                    </h3>
                    <router-link to="/consultants" class="btn btn-lg btn-warning isansFont" style="color: #434343;">
                        <i class="material-icons">keyboard_arrow_left</i>
                        مشاهده مشاوران
                    </router-link>
                </div>
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
                        button: {value: 'ازاینجا شروع کنید', target: '/auth/login', colorTheme: 'primary'},
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
            // this.$store.dispatch('saveCu rrentLocation', this.$route.path);
        }
    }
</script>

<style scoped>

    .page-header {
        height: calc(100vh);
    }

    .homeTitleBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    .homeTitleBox a.btn {
        border-radius: 25px;
        font-weight: bold;
    }

    .datetimepicker {
        margin-top: 30px !important;
    }
</style>
