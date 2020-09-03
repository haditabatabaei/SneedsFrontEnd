<template>
    <section>
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 topFilter">
                        <ul class="topFilter-list gadugiFont">
                            <li class="topFilter-item topFilter-item--active">
                                Normal apply consulting
                            </li>
                        </ul>
                        <button class="topFilter-sort-button gadugiFont" @click="toggleRateSort">
                            Rate
                            <i class="material-icons" v-if="!orderRateDescending">keyboard_arrow_down</i>
                            <i class="material-icons" v-else>keyboard_arrow_up</i>
                        </button>
                    </div>
                </div>
                <div class="row" style="margin-top:15px;">
                    <div class="col-sm-3 col-xs-12 filterColumn" v-if="windowWidth > 991.8">
                        <!-- Filter panel in desktop -->
                        <div class="filterBlock">
                            <div class="filterBlock-head">
                                <div class="filterBlock-head-title">
                                    <p class="filterBlock-head-title--text gadugiFont">
                                        <i class="material-icons">line_weight</i>
                                        Active filters
                                    </p>
                                    <button @click="clearActiveFilters"
                                            class="filterBlock-head-title--action gadugiFont">
                                        clear
                                    </button>
                                </div>
                            </div>
                            <div class="filterBlock-content">
                                <ul class="filterBlock-active-list gadugiFont">
                                    <li class="filterBlock-active-item" v-for="(item, index) in activeFilters"
                                        :key="index">
                                        <button @click="toggleSelectItem(item)" class="filter-active-item-button">
                                            {{item.name}}
                                            <i class="material-icons">close</i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="filterBlock">
                            <div class="filterBlock-head">
                                <div class="filterBlock-head-title">
                                    <p class="filterBlock-head-title--text gadugiFont">
                                        <i class="material-icons">insert_photo</i>
                                        Studying country
                                    </p>
                                </div>
                            </div>
                            <div class="filterBlock-search">
                                <div class="filterBlock-search-form">
                                    <input v-model.trim="countryQuery"
                                           @input="searchByIn('countryQuery', 'countries', 'start')"
                                           type="text"
                                           class="gadugiFont"
                                           placeholder="Search">
                                    <i class="material-icons">search</i>
                                </div>
                            </div>
                            <div class="filterBlock-content">
                                <ul class="filterBlock-list gadugiFont">
                                    <li class="filterBlock-item" @click="toggleSelectItem(country)"
                                        v-for="(country, index) in shownCountries" :key="index">
                                        {{country.name}}
                                        <i class="material-icons filterBlock-item-selected"
                                           v-if="country.select">done</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="filterBlock">
                            <div class="filterBlock-head">
                                <div class="filterBlock-head-title">
                                    <p class="filterBlock-head-title--text gadugiFont">
                                        <i class="material-icons">insert_photo</i>
                                        Studying major
                                    </p>
                                </div>
                            </div>
                            <div class="filterBlock-search">
                                <div class="filterBlock-search-form">
                                    <input v-model.trim="fieldQuery"
                                           @input="searchByIn('fieldQuery', 'fields', 'middle')"
                                           type="text" class="gadugiFont" placeholder="Search">
                                    <i class="material-icons">search</i>
                                </div>
                            </div>
                            <div class="filterBlock-content">
                                <ul class="filterBlock-list gadugiFont">
                                    <li class="filterBlock-item" @click="toggleSelectItem(field)"
                                        v-for="(field, index) in shownFields" :key="index">
                                        {{field.name}}
                                        <i class="material-icons filterBlock-item-selected"
                                           v-if="field.select">done</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="filterBlock">
                            <div class="filterBlock-head">
                                <div class="filterBlock-head-title">
                                    <p class="filterBlock-head-title--text gadugiFont">
                                        <i class="material-icons">insert_photo</i>
                                        Studying university
                                    </p>
                                </div>
                            </div>
                            <div class="filterBlock-search">
                                <div class="filterBlock-search-form">
                                    <input v-model="universityQuery"
                                           @input="searchByIn('universityQuery', 'universities', 'middle')" type="text"
                                           class="isansFont" placeholder="Search">
                                    <i class="material-icons">search</i>
                                </div>
                            </div>
                            <div class="filterBlock-content">
                                <ul class="filterBlock-list isansFont">
                                    <li class="filterBlock-item" @click="toggleSelectItem(university)"
                                        v-for="(university, index) in shownUniversities" :key="index">
                                        {{university.name}}
                                        <i class="material-icons filterBlock-item-selected"
                                           v-if="university.select">done</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="bottomFilter-overlay" @click="toggleFilterPanel" v-if="windowWidth < 991.8 && showFilterPanel"></div>
                    <div class="bottomFilter" v-if="windowWidth < 991.8">
                        <div class="bottomFilter-head" :class="[{'bottomFilter-head--open': showFilterPanel}]"
                             @click="toggleFilterPanel">
                            <button class="bottomFilter-head-title-close" v-if="showFilterPanel">
                                <i class="material-icons">close</i>
                            </button>
                            <p class="gadugiFont bottomFilter-head-title">
                                Filter result
                                <i class="material-icons">line_weight</i>
                            </p>
                            <button @click="clearActiveFilters" v-if="showFilterPanel"
                                    class="filterBlock-head-title--action gadugiFont">
                                Clear active filters
                                <span v-if="activeFilters.length > 0">( {{activeFilters.length}} )</span>
                            </button>
                        </div>
                        <div class="bottomFilter-content gadugiFont" v-if="showFilterPanel">
                            <div class="bottomFilter-content-tabs">
                                <button @click="toggleMobileFilterTab('countries')"
                                        class="bottomFilter-content-tabs-button"
                                        :class="[{'active': activeMobileFilterTab === 'countries'}]">
                                    Countries
                                </button>
                                <button @click="toggleMobileFilterTab('fields')"
                                        class="bottomFilter-content-tabs-button"
                                        :class="[{'active': activeMobileFilterTab === 'fields'}]">
                                    Majors
                                </button>
                                <button @click="toggleMobileFilterTab('universities')"
                                        class="bottomFilter-content-tabs-button"
                                        :class="[{'active': activeMobileFilterTab === 'universities'}]">
                                    Universities
                                </button>
                            </div>
                            <div class="filterBlock-content" v-if="activeMobileFilterTab === 'countries'">
                                <div class="filterBlock-search">
                                    <div class="filterBlock-search-form">
                                        <input v-model.trim="countryQuery"
                                               @input="searchByIn('countryQuery', 'countries', 'start')"
                                               type="text"
                                               class="gadugiFont"
                                               placeholder="Search">
                                        <i class="material-icons">search</i>
                                    </div>
                                </div>
                                <ul class="filterBlock-list gadugiFont">
                                    <li class="filterBlock-item" @click="toggleSelectItem(country)"
                                        v-for="(country, index) in shownCountries" :key="index">
                                        {{country.name}}
                                        <i class="material-icons filterBlock-item-selected"
                                           v-if="country.select">done</i>
                                    </li>
                                </ul>
                            </div>

                            <div class="filterBlock-content" v-else-if="activeMobileFilterTab === 'fields'">
                                <div class="filterBlock-search">
                                    <div class="filterBlock-search-form">
                                        <input v-model.trim="fieldQuery"
                                               @input="searchByIn('fieldQuery', 'fields', 'middle')"
                                               type="text" class="isansFont" placeholder="جستجو">
                                        <i class="material-icons">search</i>
                                    </div>
                                </div>
                                <ul class="filterBlock-list isansFont">
                                    <li class="filterBlock-item" @click="toggleSelectItem(field)"
                                        v-for="(field, index) in shownFields" :key="index">
                                        {{field.name}}
                                        <i class="material-icons filterBlock-item-selected"
                                           v-if="field.select">done</i>
                                    </li>
                                </ul>
                            </div>

                            <div class="filterBlock-content" v-else-if="activeMobileFilterTab === 'universities'">
                                <div class="filterBlock-search">
                                    <div class="filterBlock-search-form">
                                        <input v-model="universityQuery"
                                               @input="searchByIn('universityQuery', 'universities', 'middle')"
                                               type="text"
                                               class="isansFont" placeholder="جستجو">
                                        <i class="material-icons">search</i>
                                    </div>
                                </div>
                                <ul class="filterBlock-list isansFont">
                                    <li class="filterBlock-item" @click="toggleSelectItem(university)"
                                        v-for="(university, index) in shownUniversities" :key="index">
                                        {{university.name}}
                                        <i class="material-icons filterBlock-item-selected"
                                           v-if="university.select">done</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div :class="[{'col-md-12' : windowWidth < 991.8, 'col-md-9' : windowWidth >= 991.8}]">
                        <moon-loader class="loading-icon" style="align-self:center;margin:20px auto;" color="purple" :loading="isLoading" :size="20" sizeUnit="px"/>
                        <div class="row consultantListRow">
                            <div class="col-sm-12" v-for="(consultant, index) in activeConsultants"
                                 :key="index">
                                <consultant-block :consultant="consultant"/>
                            </div>
                            <div class="col-md-12 consultantList-pagination gadugiFont">
                                <button v-if="currentPage != 1 && this.consultants.length != 0"
                                        class="consultantList-pagination-button"
                                        @click="goPrevPage"><i class="material-icons">keyboard_arrow_left</i></button>
                                <button v-else
                                        class="consultantList-pagination-button consultantList-pagination-button--disabled"
                                        disabled><i class="material-icons">keyboard_arrow_left</i></button>
                                <button class="consultantList-pagination-button"
                                        :class="[{'consultantList-pagination-button--active' : currentPage == page}]"
                                        v-for="page in pagesNeeded" @click="togglePage(page)">
                                    {{page}}
                                </button>
                                <button v-if="currentPage != pagesNeeded && this.consultants.length != 0"
                                        class="consultantList-pagination-button"
                                        @click="goNextPage"><i class="material-icons">keyboard_arrow_right</i></button>
                                <button v-else
                                        class="consultantList-pagination-button consultantList-pagination-button--disabled"
                                        disabled><i class="material-icons">keyboard_arrow_left</i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ConsultantBlock from '@/components/Consultant/ConsultantBlock';
    import {MoonLoader} from "@saeris/vue-spinners";

    export default {
        name: "ConsultantListLayout",
        components: {
            ConsultantBlock,
            'moon-loader': MoonLoader
        },
        data() {
            return {
                showFilterPanel: false,
                consultants: [],
                countries: [],
                universities: [],
                fields: [],
                shownCountries: [],
                shownUniversities: [],
                shownFields: [],
                countryQuery: '',
                fieldQuery: '',
                universityQuery: '',
                orderRateDescending: false,
                activeMobileFilterTab: 'countries',
                itemsPerPage: 10,
                currentPage: 1,
                allItems: 1,
                isLoading: false,
            }
        },
        computed: {
            pagesNeeded() {
                if (this.allItems % this.itemsPerPage === 0) {
                    return Math.floor(this.allItems / this.itemsPerPage);
                } else {
                    return Math.floor(this.allItems / this.itemsPerPage) + 1;
                }
            },

            activeConsultants() {
                return this.consultants.filter(consultant => consultant.active);
            },

            activeFilters() {
                return this.countries.filter(country => country.select).concat(this.universities.filter(uni => uni.select)).concat(this.fields.filter(field => field.select));
            },
        },
        created() {
            this.getListOfCountries();
            this.getListOfFields();
            this.getListOfUniversities();
            this.doFilter(false, true);
        },
        methods: {
            toggleSelectItem(item) {
                if (item.select != undefined) {
                    item.select = !item.select;
                    this.doFilter(false, true);
                }
            },

            toggleRateSort() {
                this.orderRateDescending = !this.orderRateDescending;
                this.doFilter(false, true);
            },

            toggleMobileFilterTab(tabName) {
                if (this.activeMobileFilterTab === tabName) {
                    this.activeMobileFilterTab = 'none'
                } else {
                    this.activeMobileFilterTab = tabName;
                }
            },

            clearActiveFilters() {
                this.countries.forEach(country => country.select = false);
                this.universities.forEach(uni => uni.select = false);
                this.universities.forEach(uni => uni.select = false);
                this.fields.forEach(field => field.select = false);
                this.doFilter(false, true);
            },

            togglePage(pageNumber) {
                if (pageNumber <= 1) {
                    this.currentPage = 1;
                } else if (pageNumber >= this.pagesNeeded) {
                    this.currentPage = this.pagesNeeded;
                } else {
                    this.currentPage = pageNumber;
                }
                this.doFilter(false, false);
            },

            goPrevPage() {
                this.togglePage(this.currentPage - 1);
            },

            goNextPage() {
                this.togglePage(this.currentPage + 1)
            },

            searchByIn(query, list, type) {
                switch (type) {
                    case "start" :
                        this[`shown${list[0].toUpperCase()}${list.slice(1)}`] = this[list].filter(item => item.name.toLowerCase().startsWith(this[query].toLowerCase()));
                        break;
                    case "middle" :
                        this[`shown${list[0].toUpperCase()}${list.slice(1)}`] = this[list].filter(item => item.name.toLowerCase().includes(this[query].toLowerCase()));
                        break;
                }
            },


            generateQueryParameters(resetCurrentPage) {
                if(resetCurrentPage) {
                    this.currentPage = 1;
                }
                let query = `page=${this.currentPage}&page_size=${this.itemsPerPage}`;
                this.countries.forEach(item => {
                    if (item.select) {
                        query += `&country=${item.id}`;
                    }
                });

                this.universities.forEach(item => {
                    if (item.select) {
                        query += `&university=${item.id}`;
                    }
                });

                this.fields.forEach(item => {
                    if (item.select) {
                        query += `&field_of_study=${item.id}`;
                    }
                });

                if (this.orderRateDescending) {
                    query += '&ordering=rate'
                } else {
                    query += '&ordering=-rate'
                }

                console.log('query to fire:', query);
                return query;
            },

            async doFilter(toggleIndicator, resetCurrentPage) {
                console.log('do filter called');
                this.isLoading = true;
                try {
                    window.scrollTo(0, 0);
                    let result = await this.$api.get(`${this.$store.getters.getApi}/consultant/consultant-profiles/?${this.generateQueryParameters(resetCurrentPage)}`);
                    console.log(result);
                    this.consultants = result.data.results;
                    this.allItems = result.data.count;
                    if (result.data.results.length === 0) {
                        this.printMessage("متاسفانه مشاوری با این اطلاعات یافت نشد.", "لیست مشاوران : اخطار", "warn", 4000, "notif");
                    }
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "لیست مشاوران : خطا", "error", 3000, "notif");
                } finally {
                    this.isLoading = false;
                    if (toggleIndicator) {
                        this.toggleFilterPanel();
                    }
                }
            },

            resetFilter(toggleIndicator) {
                this.addSelectPropertyToList(this.countries);
                this.addSelectPropertyToList(this.universities);
                this.addSelectPropertyToList(this.fields);
                this.getListOfConsultants(toggleIndicator);
            },

            addSelectPropertyToList(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].select = false;
                }
            },

            async getListOfConsultants(toggleIndicator) {
                //this.$loading(true);
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/consultant/consultant-profiles/`);
                    this.consultants = result.data;
                    if (toggleIndicator) {
                        this.toggleFilterPanel();
                    }
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "لیست مشاوران : خطا", "error", 3000, "notif")
                } finally {

                }
            },

            async getListOfCountries() {
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/account/countries/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.countries = result.data;
                    this.shownCountries = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                }
            },

            async getListOfUniversities() {
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/account/universities/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.universities = result.data;
                    this.shownUniversities = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                }
            },

            async getListOfFields() {
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/account/field-of-studies/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.fields = result.data;
                    this.shownFields = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
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
        }
    }
</script>

<style scoped>
    .section {
        min-height: 100vh;
        position: relative;
        padding-top: 0;
    }

    .filterColumn {
        padding: 5px 5px 15px 5px;
    }


    .filterColumn::-webkit-scrollbar {
        width: 4px;
        border-radius: 15px;
    }

    .filterColumn::-webkit-scrollbar-track {
        left: 4px;
        border-radius: 15px;
    }

    .filterColumn::-webkit-scrollbar-thumb {
        background-color: #ccc;
        outline: 1px solid gray;
        border-radius: 15px;
    }

    .bottomFilter-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1013;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.2);
    }

    .bottomFilter {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: white;
        width: 100%;
        z-index: 1014;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    }

    .bottomFilter-head {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        height: 50px;
        background-color: #8C3DDB;
        color: white;
    }

    .bottomFilter-head--open {
        background-color: white;
        color: #666;
    }

    .bottomFilter-head-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        margin: 0;
    }

    .bottomFilter-head-title i {
        margin-left: 5px;
        font-size: 16px;
    }

    .bottomFilter-content-tabs {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }

    .bottomFilter-content-tabs-button {
        background: none;
        font-size: 12px;
        border: none;
        color: #777;
        margin: 0 10px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
    }

    .bottomFilter-content-tabs-button.active {
        color: white;
        background-color: #8C3DDB;
    }

    .bottomFilterColumn p:first-child i {
        margin-left: 5px;
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

    .ratesort {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .ratesort span {
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
        border: 2px solid #999;
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
        padding-left: 10px;
        color: #9B9999;
    }

    .filterBlock-head-title--text i {
        font-size: 16px;
        margin-right: 5px;
    }

    .filterBlock-head-title--action {
        margin: 0 10px 0 0;
        background: none;
        cursor: pointer;
        border: none;
        color: #d26f6e;
        outline: none;
    }

    .filterBlock-head-title--action:hover {
        color: red;
    }

    .filterBlock-search {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid #f7f7f7;
    }

    .filterBlock-search-form {
        background-color: #F8F8F8;
        margin: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 15px;
        border-radius: 10px;
        width: 100%;
        border: 1px solid #F2F2F2;
    }

    .filterBlock-search-form input {
        border: none;
        background: none;
        outline: none;
        color: #B3B3B3;
        font-size: 12px;
        width: 100%;
    }

    .filterBlock-search-form i {
        margin-left: 10px;
        font-size: 18px;
        color: #B3B3B3;
    }

    .filterBlock-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        padding: 0;
        margin: 10px 0;
        max-height: 150px;
        overflow-y: auto;
    }

    .filterBlock-list::-webkit-scrollbar {
        width: 4px;
        border-radius: 15px;
    }

    .filterBlock-list::-webkit-scrollbar-track {
        left: 4px;
        border-radius: 15px;
    }

    .filterBlock-list::-webkit-scrollbar-thumb {
        background-color: #ccc;
        outline: 1px solid gray;
        border-radius: 15px;
    }

    .filterBlock-item {
        display: flex;
        align-items: center;
        color: #B3B3B3;
        margin: 5px 10px;
        border-radius: 10px;
        padding: 5px 0;
        font-size: 12px;
        min-height: 30px;
    }

    .filterBlock-item:hover {
        background-color: #FCFCFC;
        cursor: pointer;
    }

    .filterBlock-item-image {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 0 10px;
    }

    .filterBlock-item-selected {
        margin: 0 10px 0 auto;
        font-size: 13px;
        background-color: #B3B3B3;
        color: white;
        border-radius: 50%;
        padding: 2px;
    }


    .filterBlock-active-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        padding-left: 0;
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
        margin-left: 5px;
    }

    .topFilter {
        margin-top: 15px;
        background-color: white;
        border-radius: 15px;
        height: 75px;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .topFilter-list {
        list-style: none;
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
    }

    .topFilter-item {
        font-size: 14px;
        margin-right: 15px;
        color: #9B9999;
        padding: 10px 25px;
        border-radius: 15px;
    }

    .topFilter-item--active {
        color: white;
        background-color: #8C3DDB;
    }

    .topFilter-sort-button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #707070;
        background: none;
        padding: 5px;
        border: none;
        outline: none;
    }

    .topFilter-sort-button i {
        color: #8C3DDB;
    }

    .consultantList-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        background-color: white;
        border-radius: 10px;
        padding: 15px 0;
        border: 1px solid #ccc;
    }

    .consultantList-pagination-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: 1px solid #777;
        color: #777;
        font-size: 14px;
        height: 30px;
        width: 30px;
        border-radius: 5px;
        margin: 0 5px;
    }

    .consultantList-pagination-button i {
        font-size: 14px;
    }

    .consultantList-pagination-button:hover {
        color: #8C3DDB;
        border-color: #8C3DDB;
    }

    .consultantList-pagination-button--active {
        color: white;
        background-color: #8C3DDB;
        border: none;
    }

    .consultantList-pagination-button--disabled {
        color: #ccc;
        border-color: #ccc;
    }


    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .row.consultantListRow {
            margin-right: -10px;
            padding-bottom: 50px;
        }

        .topFilter-item {
            font-size: 12px;
        }

        .topFilter-sort-button {
            font-size: 12px;
        }

        .topFilter-sort-button i {
            font-size: 14px;
        }

        .filterBlock-search {
            border-bottom: none;
        }

        .bottomFilter-head--open {
            justify-content: space-between;
        }

        .filterBlock-head-title--action {
            font-size: 12px;
            margin-left: 15px;
        }

        .bottomFilter-head-title-close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 25px;
            height: 25px;
            padding: 0;
            margin-left: 15px;
            background: none;
            border: none;
            color: #666;
        }

        .bottomFilter-head-title-close i {
            margin: 0;
        }
    }

    @media only screen and (max-width: 576.8px) {
        .topFilter-item {
            display: none;
        }

        .topFilter-item--active {
            display: flex;
        }

        .section-bg {
            display: none;
        }

        .section {
            padding-top: 0;
        }
    }
</style>
