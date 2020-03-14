<template>
    <div>
        <div class="main">
            <div class="section">
                <div class="container">
                    <div class="row" style="margin-top:30px;">
                        <div class="col-sm-3 col-xs-12 filterColumn" v-if="windowWidth > 991.8">
                            <h3 class="isansFont">پنل فیلترینگ</h3>
                            <div class="panel-group filterPanel" id="filterPanel" role="tablist"
                                 aria-multiselectable="true">
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="countryFilter">
                                        <a role="button" data-toggle="collapse" data-parent="#filterPanel"
                                           href="#countryFilterCollapse"
                                           aria-expanded="false"
                                           aria-controls="collapseOne"
                                           class="collapsed">
                                            <h4 class="panel-title isansFont">
                                                <span class="float-right">
                                                    <i class="material-icons">flag</i>
                                                    کشور
                                                </span>
                                                <i class="material-icons float-left">keyboard_arrow_down</i>
                                            </h4>
                                        </a>
                                    </div>

                                    <div id="countryFilterCollapse" class="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="countryFilter" aria-expanded="true" style="height: 0;">
                                        <div class="panel-body">
                                            <div class="filterCheckWrapper isansFont" v-for="(country, index) in countriesList" :key="index">
                                                <label>
                                                    <input type="checkbox" name="country" :value="country.name"
                                                           v-model="country.select" @change="doFilter()">
                                                    {{country.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel-heading" role="tab" id="universityFilter">
                                        <a role="button" data-toggle="collapse" data-parent="#filterPanel"
                                           href="#universityFilterCollapse" aria-expanded="false"
                                           aria-controls="collapseOne" class="collapsed">
                                            <h4 class="panel-title isansFont">
                                                <span class="float-right">
                                                    <i class="material-icons">account_balance</i>
                                                    دانشگاه
                                                </span>
                                                <i class="material-icons float-left">keyboard_arrow_down</i>
                                            </h4>
                                        </a>
                                    </div>

                                    <div id="universityFilterCollapse" class="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="universityFilter" aria-expanded="true" style="height: 0;">
                                        <div class="panel-body">
                                            <div class="filterCheckWrapper isansFont"
                                                 v-for="(university, index) in universitiesList" :key="index">
                                                <label>
                                                    <input type="checkbox" name="country" :value="university.name"
                                                           v-model="university.select" @change="doFilter()">
                                                    {{university.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel-heading" role="tab" id="fieldOfStudyFilter">
                                        <a role="button" data-toggle="collapse" data-parent="#filterPanel"
                                           href="#fieldOfStudiesCollapse" aria-expanded="false"
                                           aria-controls="collapseOne" class="collapsed">
                                            <h4 class="panel-title isansFont">
                                                <span class="float-right">
                                                    <i class="material-icons">build</i>
                                                    رشته
                                                </span>
                                                <i class="material-icons float-left">keyboard_arrow_down</i>
                                            </h4>
                                        </a>
                                    </div>

                                    <div id="fieldOfStudiesCollapse" class="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="fieldOfStudyFilter" aria-expanded="true" style="height: 0;">
                                        <div class="panel-body">
                                            <div class="isansFont filterCheckWrapper"
                                                 v-for="(field, index) in fieldOfStudiesList" :key="index">
                                                <label :title="field.description">
                                                    <input type="checkbox" name="country" :value="field.name"
                                                           v-model="field.select" @change="doFilter()">
                                                    {{field.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>


                                    <label class="ratesort isansFont--faNum" style="margin-top:20px" for="rateSort">
                                        <span class="checked" v-if="orderRateAscending">
                                            <i class="material-icons">done</i>
                                        </span>
                                        <span v-else class="unchecked">

                                        </span>
                                        مرتب سازی بر اساس امتیاز
                                    </label>
                                    <input style="display:none" id="rateSort" type="checkbox" v-model="orderRateAscending" @change="doFilter()">
                                </div>
                            </div>
                        </div>
                        <div class="bottomFilterColumn" :class="[{'fullHeightBottomFilter' : showFilterPanel}]" v-if="windowWidth < 991.8">
                            <div class="bottomFilterColumnTitle" @click="toggleFilterPanel()">
                                <p class="isansFont filterColumnTitle">
                                    <i class="material-icons">note</i>
                                    فیلتر نتایج
                                </p>
                                <button class="btn btn-simple isansFont">
                                    <span v-if="showFilterPanel" class="isansFont">بستن</span>
                                    <i class="material-icons" v-if="showFilterPanel">close</i>
                                    <i class="material-icons" v-else>keyboard_arrow_up</i>
                                </button>
                            </div>

                            <transition name="slide-fade">
                                <div class="panel-group filterPanel" v-if="showFilterPanel" id="filterPanel"
                                     role="tablist"
                                     aria-multiselectable="true">
                                    <div class="panel panel-default">
                                        <div class="panel-heading" role="tab" id="countryFilter">
                                            <a
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#filterPanel"
                                                    href="#countryFilterCollapse"
                                                    aria-expanded="false"
                                                    aria-controls="collapseOne"
                                                    class="collapsed">
                                                <p class="panel-title isansFont"
                                                   style="display:flex;align-items:center;justify-content:space-between">
                                                <span class="float-right">
                                                    کشور
                                                </span>
                                                    <i class="material-icons float-left">keyboard_arrow_down</i>
                                                </p>
                                            </a>
                                        </div>
                                        <div id="countryFilterCollapse" class="panel-collapse collapse" role="tabpanel"
                                             aria-labelledby="countryFilter" aria-expanded="true" style="height: 0px;">
                                            <div class="panel-body" style="background-color:#f7f7f7">
                                                <div class="filterCheckWrapper isansFont"
                                                     v-for="(country, index) in countriesList" :key="index">
                                                    <label>
                                                        <input type="checkbox" name="country" :value="country.name"
                                                               v-model="country.select">
                                                        {{country.name}}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-heading" role="tab" id="universityFilter"
                                             style="margin-top:25px;">
                                            <a role="button" data-toggle="collapse" data-parent="#filterPanel"
                                               href="#universityFilterCollapse" aria-expanded="false"
                                               aria-controls="collapseOne" class="collapsed">
                                                <p class="panel-title isansFont"
                                                   style="display:flex;align-items:center;justify-content:space-between">
                                                <span class="float-right">
                                                    دانشگاه
                                                </span>
                                                    <i class="material-icons float-left">keyboard_arrow_down</i>
                                                </p>
                                            </a>
                                        </div>
                                        <div id="universityFilterCollapse" class="panel-collapse collapse"
                                             role="tabpanel"
                                             aria-labelledby="universityFilter" aria-expanded="true"
                                             style="height: 0px;">
                                            <div class="panel-body" style="background-color:#f7f7f7">

                                                <div class="filterCheckWrapper isansFont"
                                                     v-for="(university, index) in universitiesList" :key="index">
                                                    <label>
                                                        <input type="checkbox" name="university"
                                                               :value="university.name"
                                                               v-model="university.select">
                                                        {{university.name}}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-heading" role="tab" id="fieldOfStudyFilter"
                                             style="margin-top:25px;">
                                            <a role="button" data-toggle="collapse" data-parent="#filterPanel"
                                               href="#fieldOfStudiesCollapse" aria-expanded="false"
                                               aria-controls="collapseOne" class="collapsed">
                                                <p class="panel-title isansFont"
                                                   style="display:flex;align-items:center;justify-content:space-between">
                                                <span class="float-right">
                                                    رشته
                                                </span>
                                                    <i class="material-icons float-left">keyboard_arrow_down</i>
                                                </p>
                                            </a>
                                        </div>
                                        <div id="fieldOfStudiesCollapse" class="panel-collapse collapse" role="tabpanel"
                                             aria-labelledby="fieldOfStudyFilter" aria-expanded="true"
                                             style="height: 0;">
                                            <div class="panel-body" style="background-color:#f7f7f7">
                                                <div class="filterCheckWrapper isansFont"
                                                     v-for="(field, index) in fieldOfStudiesList" :key="index">
                                                    <label>
                                                        <input type="checkbox" name="field" :value="field.name"
                                                               v-model="field.select">
                                                        {{field.name}}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label class="ratesort isansFont--faNum" style="margin-top:20px" for="rateSort">
                                        <span class="checked" v-if="orderRateAscending">
                                            <i class="material-icons">done</i>
                                        </span>
                                            <span v-else class="unchecked">

                                        </span>
                                            مرتب سازی بر اساس امتیاز
                                        </label>
                                        <input style="display:none" id="rateSort" type="checkbox" v-model="orderRateAscending" @change="doFilter()">
                                    </div>
                                    <div class="bottomActionPanel">
                                        <button class="btn btn-default btn-simple isansFont" @click="resetFilter(true)">
                                            پاکسازی فیلتر ها
                                        </button>
                                        <button class="btn btn-primary isansFont" @click="doFilter(true)">اعمال فیلترها
                                        </button>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div :class="[{'col-md-12' : windowWidth < 991.8, 'col-md-9' : windowWidth >= 991.8}]">
                            <div class="row consultantListRow">
                                <div class="col-sm-12" v-for="(consultantPerson, index) in activeConsultants" :key="index">
                                    <consultant-block :consultant="consultantPerson" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import ConsultantBlock from '@/components/Consultant/ConsultantBlock';

    export default {
        name: "ConsultantList",
        components: {
            ConsultantBlock,
        },
        data() {
            return {
                showFilterPanel: false,
                consultantList: [],
                countriesList: [],
                universitiesList: [],
                fieldOfStudiesList: [],

                orderRateAscending: true,

                tempScroll: window.scrollY,
            }
        },
        mounted() {
            this.tempScroll = window.scrollY;
            console.log(this.tempScroll);
        },
        computed: {
            activeConsultants() {
                return this.consultantList.filter(consultant => consultant.active);
            }
        },
        created() {
            // await this.getListOfConsultants();
            this.getListOfCountries();
            this.getListOfFields();
            this.getListOfUniversities();
            this.doFilter();
        },
        methods: {
            generateQueryParameters() {
                let query = '';

                for (let i = 0; i < this.countriesList.length; i++) {
                    if (this.countriesList[i].select) {
                        query += '&countries=' + this.countriesList[i].id;
                    }
                }

                for (let i = 0; i < this.universitiesList.length; i++) {
                    if (this.universitiesList[i].select) {
                        query += '&universities=' + this.universitiesList[i].id;
                    }
                }

                for (let i = 0; i < this.fieldOfStudiesList.length; i++) {
                    if (this.fieldOfStudiesList[i].select) {
                        query += '&field_of_studies=' + this.fieldOfStudiesList[i].id;
                    }
                }

                if(this.orderRateAscending) {
                    query += '&ordering=-rate'
                } else {
                    query += '&ordering=rate'
                }

                return query;
            },

            async doFilter(toggleIndicator) {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/consultant/consultant-profiles/?${this.generateQueryParameters()}`);
                    console.log(result);
                    this.consultantList = result.data;
                    if(this.consultantList.length === 0) {
                        this.printMessage("متاسفانه مشاوری با این اطلاعات یافت نشد.", "لیست مشاوران : اخطار", "warn", 4000, "notif");
                    }
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "لیست مشاوران : خطا", "error", 3000, "notif");
                } finally {
                    this.$loading(false);
                    if(toggleIndicator) {
                        this.toggleFilterPanel();
                    }
                }
            },

            resetFilter(toggleIndicator) {
                this.addSelectPropertyToList(this.countriesList);
                this.addSelectPropertyToList(this.universitiesList);
                this.addSelectPropertyToList(this.fieldOfStudiesList);
                this.getListOfConsultants(toggleIndicator);
            },

            addSelectPropertyToList(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].select = false;
                }
            },

            async getListOfConsultants(toggleIndicator) {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/consultant/consultant-profiles/`);
                    this.consultantList = result.data;
                    if (toggleIndicator) {
                        this.toggleFilterPanel();
                    }
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "لیست مشاوران : خطا", "error", 3000, "notif")
                } finally {
                    this.$loading(false);
                }
            },

            async getListOfCountries() {
                this.$loading(true);
                try {
                    this.$loading(true);
                    let result = await axios.get(`${this.$store.getters.getApi}/account/countries/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.countriesList = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                } finally {
                    this.$loading(false);
                }
            },

            async getListOfUniversities() {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/account/universities/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.universitiesList = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                } finally {
                    this.$loading(false);

                }
            },

            async getListOfFields() {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/account/field-of-studies/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.fieldOfStudiesList = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                } finally {
                    this.$loading(false);
                }
            },

            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },

            toggleFilterPanel() {
                this.showFilterPanel = !this.showFilterPanel;
            }

        }, watch: {
            tempScroll(newValue) {
                console.log(newValue);
            }
        },
    }
</script>

<style scoped>

    .section {
        background-color: #eeeeee;
        min-height: 100vh;
    }

    .filterCheckWrapper {
        cursor: pointer;
        padding-right: 10px;
    }

    .filterCheckWrapper label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .filterCheckWrapper input[type="checkbox"] {
        width: 15px;
        height: 15px;
        margin: 5px;
    }

    .page-header {
        min-height: 100vh;
        background-image: url('http://185.209.243.97/sneedsAssets/img/consultantsBg.jpg');
        background-size: cover;
    }

    .nav-pills.nav-pills-white > li.active > a {
        background-color: white;
        color: #555555;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    }

    .groupRow {
        margin-bottom: 15px;
        position: sticky;
        top: 70px;
        z-index: 999;
        background-color: white;
        padding-top: 5px;
        border-radius: 10px;
        margin-top: 20px;
    }

    .filterColumn {
        z-index: 999;
        position: sticky;
        top: 85px;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

    .filterColumn > h3 {
        font-weight: bold;
        font-size: 17px;
        margin: 10px 5px 5px 5px;
    }

    .filterColumn .filterPanel {
        padding: 10px;
    }

    .filterColumn .panel-title {
        display: flex;
        align-items: center;
        justify-content: space-between
    }

    .filterColumn .panel-body {
        background-color: #f7f7f7;
    }

    .filterColumn .panel-heading {
        margin-top: 20px;
        padding: 15px 0 10px 0;
    }

    .filterColumn .panel-heading:first-child {
        margin-top: 0;
    }

    .card .card-content {
        padding: 10px;
    }

    .filterPanel {
        display: block;
    }

    .bottomFilterColumn {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: white;
        width: 100%;
        z-index: 9999;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
        border-top: 1px solid #ccc;
        overflow-y: scroll;
        border-radius:10px 10px 0 0;
    }

    .bottomFilterColumnTitle {
        cursor: pointer;
    }

    .bottomFilterColumnTitle p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-right: 5px;
        margin-bottom: 0;
        color: #666;
    }

    .bottomFilterColumnTitle button {
        margin: 10px;
        color: #666;
        padding: 10px 5px;
    }

    .bottomFilterColumn p:first-child i {
        margin-left: 5px;
    }

    .bottomFilterColumnTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    .bottomFilterColumn .panel {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex-wrap: nowrap;
    }

    .bottomFilterColumn .panel div[role="tab"] {
        padding: 5px;
        margin: 20px 20px 0 20px;
    }

    .bottomFilterColumn .panel-heading i.float-left {
        font-size: 15px;
    }

    .bottomFilterColumn .bottomActionPanel {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .bottomFilterColumn .bottomActionPanel button {
        margin-left: 20px;
    }


    /**** University Field List *****/
    .fieldList {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 5px;
    }


    .fieldList li {
        margin-left: 10px;
        margin-right: 10px;
    }

    .row.consultantListRow {
        margin-right: 0;
    }

    .ratesort{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .ratesort span{
        width: 25px;
        height: 25px;
        border-radius: 5px;
        margin-left: 5px;
    }

    .ratesort span.checked {
        background-color: #9038CC;
        color: white;
        display: flex;
        align-items: center;
    }

    .ratesort span.unchecked {
        background-color: white;
        border:2px solid #999;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        /* Enter and leave animations can use different */
        /* durations and timing functions.              */
        .slide-fade-enter-active {
            transition: all 1s ease;
        }

        .slide-fade-leave-active {
            transition: all 1s ease;
        }

        .slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active below version 2.1.8 */
        {
            transform: translateX(10px);
            opacity: 0;
        }

        .row.consultantListRow {
            margin-right: -10px;
        }
    }


</style>
