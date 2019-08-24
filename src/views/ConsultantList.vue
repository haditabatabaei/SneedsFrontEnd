<template>
    <div>
        <div class="main">
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3 col-xs-12 filterColumn" v-if="!minimizedFiltering" :class="[]">
                            <h3 class="isansFont">پنل فیلترینگ</h3>
                            <div class="panel-group filterPanel" id="filterPanel" role="tablist"
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
                                            <h4 class="panel-title isansFont"
                                                style="display:flex;align-items:center;justify-content:space-between">
                                                <span class="float-right">
                                                    <i class="material-icons">flag</i>
                                                    کشور
                                                </span>
                                                <i class="material-icons float-left">keyboard_arrow_down</i>
                                            </h4>
                                        </a>
                                    </div>

                                    <div id="countryFilterCollapse" class="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="countryFilter" aria-expanded="true" style="height: 0px;">
                                        <div class="panel-body" style="background-color:#f7f7f7">
                                            <div class="checkbox isansFont" v-for="country in countriesList">
                                                <label>
                                                    <input type="checkbox" name="country" :value="country.name"
                                                           v-model="country.select" @change="doFilter()">
                                                    <span class="check"></span>
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
                                            <h4 class="panel-title isansFont"
                                                style="display:flex;align-items:center;justify-content:space-between">
                                                <span class="float-right">
                                                    <i class="material-icons">account_balance</i>
                                                    دانشگاه
                                                </span>
                                                <i class="material-icons float-left">keyboard_arrow_down</i>
                                            </h4>
                                        </a>
                                    </div>

                                    <div id="universityFilterCollapse" class="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="universityFilter" aria-expanded="true" style="height: 0px;">
                                        <div class="panel-body" style="background-color:#f7f7f7">

                                            <div class="checkbox isansFont" v-for="university in universitiesList">
                                                <label>
                                                    <input type="checkbox" name="country" :value="university.name"
                                                           v-model="university.select" @change="doFilter()">
                                                    <span class="check"></span>
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
                                            <h4 class="panel-title isansFont"
                                                style="display:flex;align-items:center;justify-content:space-between">
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
                                        <div class="panel-body" style="background-color:#f7f7f7">
                                            <div class="checkbox isansFont" v-for="field in fieldOfStudiesList">
                                                <label :title="field.description">
                                                    <input type="checkbox" name="country" :value="field.name"
                                                           v-model="field.select" @change="doFilter()">
                                                    <span class="check"></span>
                                                    {{field.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <RectNotifBlock :message="fetchLoading.message" type="warning" borderRound="true"
                                            v-if="fetchLoading.value"></RectNotifBlock>
                            <RectNotifBlock :message="fetchSuccess.message" type="success" borderRound="true"
                                            v-else-if="fetchSuccess.value"></RectNotifBlock>
                            <RectNotifBlock :message="fetchFailed.message" type="danger" borderRound="true"
                                            v-else-if="fetchFailed.value"></RectNotifBlock>
                        </div>
                        <div class="bottomFilterColumn" :class="[{'fullHeightBottomFilter' : showFilterPanel}]" v-else>
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

                            <div class="panel-group filterPanel" v-if="showFilterPanel" id="filterPanel" role="tablist"
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
                                            <div class="checkbox isansFont" v-for="country in countriesList">
                                                <label>
                                                    <input type="checkbox" name="country" :value="country.name"
                                                           v-model="country.select">
                                                    <span class="check"></span>
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
                                    <div id="universityFilterCollapse" class="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="universityFilter" aria-expanded="true" style="height: 0px;">
                                        <div class="panel-body" style="background-color:#f7f7f7">

                                            <div class="checkbox isansFont" v-for="university in universitiesList">
                                                <label>
                                                    <input type="checkbox" name="country" :value="university.name"
                                                           v-model="university.select">
                                                    <span class="check"></span>
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
                                         aria-labelledby="fieldOfStudyFilter" aria-expanded="true" style="height: 0;">
                                        <div class="panel-body" style="background-color:#f7f7f7">
                                            <div class="checkbox isansFont" v-for="field in fieldOfStudiesList">
                                                <label :title="field.description">
                                                    <input type="checkbox" name="country" :value="field.name"
                                                           v-model="field.select">
                                                    <span class="check"></span>
                                                    {{field.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottomActionPanel">
                                    <button class="btn btn-default btn-simple isansFont" @click="resetFilter(true)">
                                        پاکسازی فیلتر ها
                                    </button>
                                    <button class="btn btn-primary isansFont" @click="doFilter(true)">اعمال فیلترها
                                    </button>
                                </div>
                            </div>
                            <RectNotifBlock :message="fetchLoading.message" type="warning" borderRound="true"
                                            v-if="fetchLoading.value"></RectNotifBlock>
                            <RectNotifBlock :message="fetchSuccess.message" type="success" borderRound="true"
                                            v-else-if="fetchSuccess.value"></RectNotifBlock>
                            <RectNotifBlock :message="fetchFailed.message" type="danger" borderRound="true"
                                            v-else-if="fetchFailed.value"></RectNotifBlock>
                        </div>
                        <div class="col-sm-9 col-xs-12">
                            <div class="row listingRow">
                                <div class="col-sm-12" v-for="consultantPerson in consultantList">
                                    <ConsultantBlock :consultant="consultantPerson"></ConsultantBlock>
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
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'
    import CircleLoading from '@/components/NotifBlocks/CirlceLoading';

    export default {
        name: "ConsultantList",
        components: {
            ConsultantBlock,
            RectNotifBlock,
            CircleLoading
        },
        data() {
            return {
                showFilterPanel: false,
                consultantList: [],
                countriesList: [],
                universitiesList: [],
                fieldOfStudiesList: [],

                fetchSuccess: {
                    value: false,
                    message: 'اطلاعات شما با موفقیت ویرایش شد،چند لحظه صبر کنید...'
                },

                fetchLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید...'
                },

                fetchFailed: {
                    value: false,
                    message: 'مشکلی در دریافت اطلاعات رخ داد...'
                },
                tempScroll: window.scrollY,
            }
        },
        mounted() {
            scrollTo(0, 0);
            this.tempScroll = window.scrollY;
            console.log(this.tempScroll);
        },
        computed: {
            minimizedFiltering: function () {
                if (window.innerWidth < 768) {
                    console.log(window.innerWidth);
                    return true;
                } else return false;
            },
        },
        created() {
            this.resetLoadingLogic();
            this.startLoadingLogic();

            let listPromise = this.getListOfConsultants();
            listPromise.then(response => {
                window.console.log(response);
                let countriesPromise = this.getListOfCountries();

                countriesPromise.then(countriesRes => {
                    window.console.log(countriesRes);
                    let universityPromise = this.getListOfUniversities();

                    universityPromise.then(uniResponse => {
                        window.console.log(uniResponse);
                        let fieldPromise = this.getListOfFields();


                        fieldPromise.then(fieldResponse => {

                            this.consultantList = response;
                            this.countriesList = countriesRes;
                            this.universitiesList = uniResponse;
                            this.fieldOfStudiesList = fieldResponse;

                            this.resetLoadingLogic();


                        }).catch(fieldErr => {
                            this.failedLoadingLogic();
                            this.fetchFailed.message = (fieldErr.response);
                        })


                    }).catch(uniError => {
                        this.failedLoadingLogic();
                        this.fetchFailed.message = (uniError.response);
                    });

                }).catch(countriesErr => {
                    this.failedLoadingLogic();
                    this.fetchFailed.message = (countriesErr.response);
                })
            }).catch(err => {
                this.failedLoadingLogic();
                if (err.response) {
                    this.fetchFailed.message = err.response;
                }
            })
        },
        methods: {
            generateQueryParameters: function () {
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
                return query;
            },

            doFilter(toggleIndicator) {
                this.resetLoadingLogic();
                this.startLoadingLogic();
                console.log(this.generateQueryParameters());
                let promise = this.sendUpdateRequestFilter(this.generateQueryParameters());

                promise.then(newList => {
                    this.resetLoadingLogic();
                    this.consultantList = newList;
                    if (this.consultantList.length == 0) {
                        this.failedLoadingLogic();
                        this.fetchFailed.message = 'مشاوری با این اطلاعات یافت نشد.'
                    }
                    if (toggleIndicator) {
                        this.toggleFilterPanel();
                    }
                }).catch(err => {
                    this.failedLoadingLogic();
                    this.fetchFailed.message = err.response;
                })
            },

            sendUpdateRequestFilter: function (query) {

                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/consultant-profiles/?' + query,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        resolve(response.data);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            resetFilter: function (toggleIndicator) {
                this.resetLoadingLogic();
                this.startLoadingLogic();

                this.addSelectPropertyToList(this.countriesList);
                this.addSelectPropertyToList(this.universitiesList);
                this.addSelectPropertyToList(this.fieldOfStudiesList);
                let promise = this.getListOfConsultants();
                promise.then(response => {
                    this.resetLoadingLogic();
                    this.consultantList = response;
                    if (toggleIndicator) {
                        this.toggleFilterPanel();
                    }
                }).catch(error => {
                    this.failedLoadingLogic();
                    this.fetchFailed.message = 'خطایی رخ داد. ' + error.response;
                })
            },

            addSelectPropertyToList(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].select = false;
                }
            },
            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.fetchLoading.value = false;
                this.fetchFailed.value = false;
                this.fetchSuccess.value = false;
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.fetchLoading.value = true;
                this.fetchFailed.value = false;
                this.fetchSuccess.value = false;
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.fetchLoading.value = false;
                this.fetchFailed.value = true;
                this.fetchSuccess.value = false;
            },
            getListOfConsultants: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/consultant-profiles/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        resolve(response.data);
                    }).catch(err => {
                        reject(err);
                    })
                })
            },

            getListOfCountries: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/countries/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        this.addSelectPropertyToList(response.data);
                        resolve(response.data);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getListOfUniversities: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/universities/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        this.addSelectPropertyToList(response.data);
                        resolve(response.data);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getListOfFields: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/field-of-studies/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        this.addSelectPropertyToList(response.data);
                        resolve(response.data);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            toggleFilterPanel: function () {
                this.showFilterPanel = !this.showFilterPanel;
                // if (document.getElementById('filterPanel').style.display == "none") {
                //     document.getElementById('filterPanel').style.display = "block"
                // } else {
                //     document.getElementById('filterPanel').style.display = "none"
                // }
            }
        }, watch: {
            tempScroll: function (newValue) {
                console.log(newValue);
            }
        },
    }
</script>

<style scoped>

    .section {
        margin-top: 100px;
        background-color: #eeeeee;
    }

    .page-header {
        min-height: 100vh;
        background-image: url('http://193.176.241.131/sneedsAssets/img/consultantsBg.jpg');
        background-size: cover;
    }

    .filterColumn {
        z-index: 999;
        position: sticky;
        top: 100px;
        background-color:white;
        border-radius:10px;
        padding:10px;
    }

    .row.is-flex > [class*='col-'] {
        display: flex;
        flex-direction: column;
    }

    .card .card-content {
        padding: 10px;
    }

    .filterPanel {
        display: block;
    }

    @media only screen and (min-width: 0) and (max-width: 1024px) {
        .listingRow div[class*="col-sm"] {
            display: block;
            width: 100%;
            /*max-height: 250px;*/
        }
    }


    .bottomFilterColumn {
        position: fixed;
        bottom: 0;
        background-color: white;
        width: 100%;
        z-index: 9999;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        border-top: 1px solid #ccc;
        overflow-y: scroll;
    }

    .fullHeightBottomFilter {
        /*height:calc(100vh - 110px);*/
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


</style>