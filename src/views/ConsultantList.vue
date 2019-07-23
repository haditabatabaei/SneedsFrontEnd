<template>
    <div>
        <div class="page-header header-small">
            <div class="container">
                <div class="row">
                    <div class="col-md-5">
                        <h2 class="title isansFont" style="margin-top:30px;">
                            در تمام مراحل اپلای
                            <br>
                            کنار شما هستیم
                        </h2>
                        <h3 class="isansFont">
                            مشاوره با افرادی که 0 تا 100 مسیر رو طی کردن و بار مراحل اون آشنایی کامل دارن.
                        </h3>
                    </div>
                    <div class="col-md-7 text-center"
                         style="background:url('../webimages/topConsultantBg.png') no-repeat;background-size:cover;height:calc(100vh - 150px);">
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">

                            <RectNotifBlock :message="fetchLoading.message" type="warning" borderRound="true"
                                            v-if="fetchLoading.value"></RectNotifBlock>

                            <!--                            <CircleLoading  v-if="fetchLoading.value"></CircleLoading>-->

                            <RectNotifBlock :message="fetchSuccess.message" type="success" borderRound="true"
                                            v-else-if="fetchSuccess.value"></RectNotifBlock>

                            <RectNotifBlock :message="fetchFailed.message" type="danger" borderRound="true"
                                            v-else-if="fetchFailed.value"></RectNotifBlock>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3 col-sm-12 col-xs-12 filterColumn">
                            <h3 class="isansFont">پنل فیلترینگ</h3>
                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="countryFilter">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion"
                                           href="#countryFilterCollapse" aria-expanded="false"
                                           aria-controls="collapseOne" class="collapsed">
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
                                                           v-model="country.select">
                                                    <span class="check"></span>
                                                    {{country.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel-heading" role="tab" id="universityFilter"
                                         style="margin-top:25px;">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion"
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
                                                           v-model="university.select">
                                                    <span class="check"></span>
                                                    {{university.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel-heading" role="tab" id="fieldOfStudyFilter"
                                         style="margin-top:25px;">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion"
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
                                                           v-model="field.select">
                                                    <span class="check"></span>
                                                    {{field.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button class="btn btn-rose btn-block isansFont" style="margin-top:30px;"
                                            @click="doFilter()">اعمال فیلتر
                                    </button>
                                    <button class="btn btn-default btn-block isansFont" style="margin-top:30px;"
                                            @click="resetFilter()">
                                        پاکسازی فیلتر ها
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-4" v-for="consultantPerson in consultantList">
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
            }
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
                this.fetchFailed.message = err.response;
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

            doFilter() {
                this.resetLoadingLogic();
                this.startLoadingLogic();
                let promise = this.sendUpdateRequestFilter(this.generateQueryParameters());

                promise.then(newList => {
                    this.resetLoadingLogic();
                    this.consultantList = newList;
                    if (this.consultantList.length == 0) {
                        this.failedLoadingLogic();
                        this.fetchFailed.message = 'مشاوری با این اطلاعات یافت نشد.'
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

            resetFilter: function () {
                this.resetLoadingLogic();
                this.startLoadingLogic();

                this.addSelectPropertyToList(this.countriesList);
                this.addSelectPropertyToList(this.universitiesList);
                this.addSelectPropertyToList(this.fieldOfStudiesList);
                let promise = this.getListOfConsultants();
                promise.then(response => {
                    this.resetLoadingLogic();
                    this.consultantList = response;
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
            }
        }
    }
</script>

<style scoped>


    .page-header {
        min-height: 100vh;
        background-image: url('../../public/webimages/consultantsBg.jpg');
        background-size: cover;
    }

    .filterColumn {
        z-index: 9999999999;
    }

    .row.is-flex > [class*='col-'] {
        display: flex;
        flex-direction: column;
    }

</style>