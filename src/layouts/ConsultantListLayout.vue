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
            <bottom-filter
                v-if="consultants.length > 0"
                :countries="countries"
                :universities="universities"
                :majors="fields"
                :activeFilters="activeFilters"
                @select-item="doFilter(true, true)"
            />
        </div>
    </section>
</template>

<script>
    import ConsultantBlock from '@/components/Consultant/ConsultantBlock';
    import FilterBlock from "@/components/Consultant/FilterBlock";
    import ActiveFilterBlock from "@/components/Consultant/ActiveFilterBlock"
    import Pagination from "@/components/Consultant/Pagination";
    import SimpleInput from "@/components/Form/SimpleInput";
    import CollapsibleFilters from "@/components/Consultant/CollapsibleFilters";
    import {MoonLoader} from "@saeris/vue-spinners";

    export default {
        name: "ConsultantListLayout",
        components: {
            ConsultantBlock,
            'moon-loader': MoonLoader,
            'c-simple-input': SimpleInput,
            "filter-block": FilterBlock,
            "active-filter-block": ActiveFilterBlock,
            "consultants-pagination": Pagination,
            "bottom-filter": CollapsibleFilters
        },
        data() {
            return {
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
            this.doFilter(true);
        },
        methods: {
            toggleRateSort() {
                this.orderRateDescending = !this.orderRateDescending;
                this.doFilter(false, true);
            },

            pageSwitched(newPage) {
                this.currentPage = newPage;
                this.doFilter( false);
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

            async doFilter(resetCurrentPage) {
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
        }
    }
</script>

<style scoped>
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

    .consultants-pagination {
        grid-area: paging;
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

    .consultants-list-item:not(:first-child) {
        margin-top: 15px;
    }
    @media only screen and (max-width: 991.8px) {
        .consultants-container {
            grid-gap: 15px 15px;
            grid-template-columns: 25% 1fr 1fr;
            grid-template-rows: 75px auto auto 60px;
            grid-template-areas:
                    "topFilter topFilter topFilter"
                    "list list list"
                    "filters filters filters"
                    "paging paging paging";
            margin-top: 15px;
        }

        .consultants-filters {
            display: none;
        }
    }
</style>
