<template>
    <section class="consultants">
        <div class="consultants-container gadugiFont">
            <div class="consultants-top-filter">
                <ul class="top-filter-list">
                    <li class="top-filter-item top-filter-item--active">
                        Normal apply consulting
                    </li>
                </ul>
                <button class="top-filter-sort-button" @click="toggleRateSort">
                    Rate
                    <i class="material-icons" v-if="!orderRateDescending">keyboard_arrow_down</i>
                    <i class="material-icons" v-else>keyboard_arrow_up</i>
                </button>
            </div>
            <div class="consultants-list">
                <consultant-block class="consultants-list-item" v-for="(consultant, index) in activeConsultants" :key="index" :consultant="consultant"/>
            </div>
            <div class="consultants-filters">
                <active-filter-block
                    :active-filters="activeFilters"
                    @remove-filter="doFilter(true, true)"
                    @clear-filters="doFilter(true, true)"
                />
                <filter-block
                    filter-title="Studying countries"
                    :items="countries"
                    search-type="start"
                    @select-item="doFilter(true, true)"
                />
                <filter-block
                    filter-title="Studying majors"
                    :items="fields"
                    @select-item="doFilter(true, true)"
                />
                <filter-block
                    filter-title="Studying universities"
                    :items="universities"
                    @select-item="doFilter(true, true)"
                />
            </div>
            <div class="consultants-pagination">
                <consultants-pagination
                    :itemsPerPage="itemsPerPage"
                    :allItemsCount="allItems"
                    @page-switched="pageSwitched"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import ConsultantBlock from '@/components/Consultant/ConsultantBlock';
    import FilterBlock from "@/components/Consultant/FilterBlock";
    import ActiveFilterBlock from "@/components/Consultant/ActiveFilterBlock"
    import Pagination from "@/components/Consultant/Pagination";
    import SimpleInput from "@/components/Form/SimpleInput";
    import {MoonLoader} from "@saeris/vue-spinners";

    export default {
        name: "ConsultantListLayout",
        components: {
            ConsultantBlock,
            'moon-loader': MoonLoader,
            'c-simple-input': SimpleInput,
            "filter-block": FilterBlock,
            "active-filter-block": ActiveFilterBlock,
            "consultants-pagination": Pagination
        },
        data() {
            return {
                showFilterPanel: false,

                consultants: [],
                countries: [],
                universities: [],
                fields: [],

                orderRateDescending: false,
                activeMobileFilterTab: 'countries',

                itemsPerPage: 10,
                allItems: 1,
                currentPage: 1,

                isLoading: false,
            }
        },
        computed: {
            activeConsultants() {
                return this.consultants.filter(consultant => consultant.active);
            },

            activeFilters() {
                return this.countries.filter(country => country.select).concat(this.universities.filter(uni => uni.select)).concat(this.fields.filter(field => field.select));
            },

            api() {
                return this.$store.getters.getApi;
            }
        },
        created() {
            this.getListOfCountries();
            this.getListOfFields();
            this.getListOfUniversities();
            this.doFilter(false, true);
        },
        methods: {
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

            pageSwitched(newPage) {
                this.currentPage = newPage;
                this.doFilter(true, false);
            },

            generateQueryParameters(resetCurrentPage) {
                if (resetCurrentPage) {
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
                    let result = await this.$api.get(`${this.api}/consultant/consultant-profiles/?${this.generateQueryParameters(resetCurrentPage)}`);
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

            addSelectPropertyToList(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].select = false;
                }
            },

            async getListOfCountries() {
                try {
                    let result = await this.$api.get(`${this.api}/account/countries/?with-time-slot-consultants=true`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.countries = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                }
            },

            async getListOfUniversities() {
                try {
                    let result = await this.$api.get(`${this.api}/account/universities/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.universities = result.data;
                } catch (e) {
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "خطا", "error", 3000, "notif");
                }
            },

            async getListOfFields() {
                try {
                    let result = await this.$api.get(`${this.api}/account/field-of-studies/`);
                    this.addSelectPropertyToList(result.data);
                    console.log(result);
                    this.fields = result.data;
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
    /** Overall layout design **/
    .consultants {
        min-height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .consultants-container {
        max-width: 1170px;
        width: 100%;
        display: grid;
        grid-gap: 15px 15px;
        grid-template-columns: 25% 1fr 1fr;
        grid-template-rows: 75px auto 60px;
        grid-template-areas:
            "topFilter topFilter topFilter"
            "filters list list"
            "paging paging paging";
        margin-top: 15px;
    }

    .consultants-top-filter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        grid-area: topFilter;
        box-shadow: 0 0 10px 1px rgba(0,0,0,.2);
        background-color: white;
        border-radius: 5px;
    }

    .consultants-list {
        display: flex;
        flex-direction: column;
        grid-area: list;
    }

    .consultants-filters {
        display: flex;
        flex-direction: column;
        grid-area: filters;
    }

    .consultants-pagination {
        grid-area: paging;
    }

    /** Top filter styles **/
    .top-filter-list {
        list-style: none;
        padding: 0;
        margin: 0 15px;
    }

    .top-filter-item {
        font-size: 14px;
        margin-right: 15px;
        color: #9b9999;
        padding: 10px 25px;
        border-radius: 15px;
    }

    .top-filter-item--active {
        color: #fff;
        background-color: #8c3ddb;
    }

    .top-filter-sort-button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #707070;
        background: none;
        padding: 5px;
        border: none;
        outline: none;
        margin-right: 15px;
    }

    .top-filter-sort-button i {
        color: #8C3DDB;
    }

    /** consultants list styles **/
    .consultants-list-item:not(:first-child) {
        margin-top: 15px;
    }

    /** Sidebar filter styles **/
    .bottomFilter-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1013;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
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
