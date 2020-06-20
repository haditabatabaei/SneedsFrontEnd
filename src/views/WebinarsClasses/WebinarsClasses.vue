<template>
    <section class="webinars">
        <div class="webinars-overlay"></div>
        <div class="webinars-container">
            <div class="webinars-navbar isansFont">
                <div class="webinars-navbar-switcher">
                    <button class="webinars-navbar-switcher-toggler toggler--active">
                        کلاس های آنلاین
                    </button>
                    <button class="webinars-navbar-switcher-toggler">
                        وبینارها
                    </button>
                </div>
                <label for="webinarandclasssearch" class="webinars-navbar-searchlabel">
                    <input placeholder="جستجو میان وبینار ها و کلاس ها" type="text" id="webinarandclasssearch" class="webinars-navbar-searchinput">
                    <i class="material-icons webinars-navbar-searchicon">search</i>
                </label>
                <button class="webinars-navbar-sortaction">
                    جدیدترین
                    <i class="material-icons">keyboard_arrow_up</i>
                </button>
            </div>
            <div class="webinars-content">
                <div class="webinars-filters">
                    <div class="filterBlock">
                        <div class="filterBlock-head">
                            <div class="filterBlock-head-title">
                                <p class="filterBlock-head-title--text isansFont">
                                    <i class="material-icons">line_weight</i>
                                    فیلتر های اعمال شده
                                </p>
                                <button
                                        class="filterBlock-head-title--action isansFont">
                                    پاکسازی
                                </button>
                            </div>
                        </div>
                        <div class="filterBlock-content">
                            <ul class="filterBlock-active-list isansFont">
                                <li class="filterBlock-active-item" v-for="item in activeFilters">
                                    <button class="filter-active-item-button">
                                        <i class="material-icons">close</i></button>
                                    {{item.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="filterBlock">
                        <div class="filterBlock-head">
                            <div class="filterBlock-head-title">
                                <p class="filterBlock-head-title--text isansFont">
                                    <i class="material-icons">language</i>
                                    محدود کردن بر اساس
                                </p>
                            </div>
                        </div>
                        <div class="filterBlock-content filterBlock-content--checkbox isansFont">
                            <label for="freefilter" class="filterBlock-checkboxlabel">
                                <input type="checkbox" name="freefilter" id="freefilter" class="filterBlock-checkboxinput">
                                رایگان
                            </label>
                            <label for="nofreefilter" class="filterBlock-checkboxlabel">
                                <input type="checkbox" name="nofreefilter" id="nofreefilter" class="filterBlock-checkboxinput">
                                غیر رایگان
                            </label>
                            <span class="filterBLock-content-divider"></span>
                            <label for="noheldfilter" class="filterBlock-checkboxlabel">
                                <input type="checkbox" name="noheldfilter" id="noheldfilter" class="filterBlock-checkboxinput">
                                برگزار نشده
                            </label>
                            <label for="heldfilter" class="filterBlock-checkboxlabel">
                                <input type="checkbox" name="heldfilter" id="heldfilter" class="filterBlock-checkboxinput">
                                برگزار شده (خرید فیلم)
                            </label>
                        </div>
                    </div>
                </div>
                <div class="webinars-items">
                    <webinar-class-block />
                    <webinar-class-block />
                    <webinar-class-block />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import WebinarClassBlock from "@/components/WebinarsClasses/WebinarClassBlock";

    export default {
        name: "WebinarsClasses",
        components: {
            'webinar-class-block': WebinarClassBlock
        },
        data() {
            return {
                classes: [],
                webinars: [],
                activeFilters: [
                    {name: 'فیلتر1'},
                    {name: 'فیلتر2'},
                    {name: 'فیلتر3'}
                ]
            }
        },
        computed: {
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
            api() {
                return this.$store.getters.getApi;
            },
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            isIran() {
                return this.$store.getters.isiran;
            },
            locale() {
                return this.$store.getters.locale;
            }
        },
            methods: {

        },
        created() {

        }
    }
</script>

<style scoped>
    .webinars {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .webinars-container {
        width: 100%;
        max-width: 1140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .webinars-navbar {
        width: 100%;
        height: 75px;
        border-radius: 10px;
        box-shadow: 0 2px 10px #00000029;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .webinars-navbar-switcher {
        margin-right: 15px;
        display: flex;
        align-items: center;
        height: 55px;
    }

    .webinars-navbar-switcher-toggler {
        color: #9B9999;
        background: none;
        border: none;
        padding: 7.5px 25px;
    }

    .webinars-navbar-switcher-toggler.toggler--active {
        background-color: #8C3DDB;
        color: white;
        border-radius: 20px;
    }

    .webinars-navbar-sortaction {
        display: flex;
        align-items: center;
        color: #707070;
        border: none;
        background: none;
        margin-left: 15px;
    }

    .webinars-navbar-sortaction i {
        color: #8C3DDB;
    }

    .webinars-navbar-searchlabel {
        width: 100%;
        max-width: 600px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .webinars-navbar-searchicon {
        width: 20px;
        height: 20px;
        color: #B3B3B3;
        position: absolute;
        left: 10px;
    }

    .webinars-navbar-searchinput {
        height: 50px;
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        color: #B3B3B3;
        border-radius: 10px;
        width: 100%;
        padding-right: 10px;
    }

    .webinars-content {
        display: flex;
        width: 100%;
        margin-top: 20px;
        justify-content: space-between;
    }

    .webinars-filters {
        width: 280px;
    }
    .webinars-items {
        width: calc(100% - 300px);
    }

    .filterBlock {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background-color: white;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    }

    .filterBlock:not(:first-child) {
        margin-top: 15px;
    }

    .filterBlock-head {
        background-color: #fcfcfc;
        border-radius: 15px 15px 0 0;
    }

    .filterBlock-head-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        font-size: 12px;
    }

    .filterBlock-head-title--text {
        margin: 0;
        display: flex;
        align-items: center;
        padding-right: 10px;
        color: #9B9999;
    }

    .filterBlock-head-title--text i {
        font-size: 16px;
        margin-left: 5px;
    }

    .filterBlock-head-title--action {
        margin: 0 0 0 10px;
        background: none;
        cursor: pointer;
        border: none;
        color: #d26f6e;
        outline: none;
    }

    .filterBlock-head-title--action:hover {
        color: red;
    }

    .filterBlock-active-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
    }

    .filterBlock-active-item {
        display: flex;
        align-items: center;
        background-color: #FCFCFC;
        color: #B3B3B3;
        border-radius: 10px;
        padding: 5px 10px;
        font-size: 12px;
        margin: 5px;
    }

    .filter-active-item-button {
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        outline: none;
    }

    .filter-active-item-button i {
        font-size: 14px;
    }

    .filterBlock-content--checkbox {
        display: flex;
        flex-direction: column;
    }

    .filterBlock-checkboxlabel {
        color: #9B9999;
        font-size: 13px;
        margin-right: 15px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .filterBlock-checkboxlabel:first-child {
        margin-top: 15px;
    }

    .filterBlock-checkboxlabel:last-child {
        margin-bottom: 15px;
    }

    .filterBlock-checkboxinput {
        margin: 0 0 0 5px;
    }

    .filterBLock-content-divider {
        width: calc(100% - 20px);
        margin: 15px 10px;
        height: 2px;
        background-color: #F2F2F2;
    }


    @media only screen and (max-width: 991.8px) {
        .webinars-content {
            flex-wrap: wrap;
        }

        .webinars-items {
            width: 100%;
        }

        .webinars-filters {
            width: 100%;
        }
    }
</style>