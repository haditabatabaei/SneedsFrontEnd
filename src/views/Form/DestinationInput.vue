<template>
    <section class="form-destination">
        <h1 class="destination-title isansFont">
            کجا می خوای بری؟
            <i class="material-icons">info</i>
        </h1>
        <div class="form-destination-wrapper">
            <c-searchable-input class="dest-input" :loading="countryLoading" @input="searchCountryByVal" label="کشور مقصد" :dataset="availableCountries" @select-option="setSelectedCountry" />
            <c-dropdown class="dest-input" label="مقطع مورد نظر" :options="gradeOptions" @select-option="setSelectedGrade" />
            <c-dropdown class="dest-input" label="ترم مورد نظر" :options="semesterOptions" @select-option="setSelectedSemester" />
            <c-searchable-input class="dest-input" :loading="majorLoading" @input="searchMajorByVal" label="رشته" :dataset="availableMajors" @select-option="setSelectedMajor"/>
            <c-searchable-input class="dest-input" :loading="uniLoading" @input="searchUniversityByVal" label="دانشگاه" :dataset="availableUniversities" @select-option="addSelectedUniversity"/>

<!--            <p v-if="selectedCountry">{{selectedCountry.name}}</p>w-->
<!--            <p v-if="selectedMajor">{{selectedMajor.name}}</p>-->
<!--            <p v-if="selectedGrade">{{selectedGrade.name}}</p>-->
        </div>
        <div class="destination-universities isansFont">
            <p class="selected-item item--valid" v-for="uni in selectedUniversities">
                {{uni.name}}
                <button class="selected-item-remove" @click="removeSelectedUni(uni)"><i class="material-icons">close</i></button>
            </p>
        </div>
        <div class="destination-universities isansFont" v-if="selectedMajor != null">
            <p class="selected-item item--valid">
                {{selectedMajor.name}}
                <button class="selected-item-remove" @click="selectedMajor = null"><i class="material-icons">close</i></button>
            </p>
        </div>
    </section>

</template>

<script>
    import SearchableInput from "@/components/Form/SearchableInput.vue";
    import DropdownInput from "@/components/Form/DropdownInput.vue";

    export default {
        name: "DestinationInput",
        components: {
            "c-searchable-input": SearchableInput,
            "c-dropdown": DropdownInput
        },
        data() {
            return {
                availableMajors: [],
                availableUniversities: [],
                availableCountries: [],
                selectedGrade: null,
                selectedMajor: null,
                selectedCountry: null,
                selectedSemester: null,
                selectedUniversities: [],
                majorLoading: false,
                uniLoading: false,
                countryLoading: false,
                gradeOptions: [
                    {name: 'کارشناسی', nameEnglish: 'BACHELOR'},
                    {name: 'کارشناسی ارشد', nameEnglish: 'MASTER'},
                    {name: 'دکتری', nameEnglish: 'PHD'},
                    {name: 'پسا دکتری', nameEnglish: 'POST_DOC'}
                ],
                semesterOptions: [
                    {name: 'زمستان 2021', nameEnglish: 'Winter_2020'}
                ]
            }
        },
        computed: {
            user() {
                return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
            },

            detailedForm() {
                return this.$store.getters.detailedForm;
            },

            api() {
                return this.$store.getters.getApi
            },

            httpConfig() {
                return this.$store.getters.httpConfig
            },

            multipartHttpConfig() {
                return this.$store.getters.multipartHttpConfig
            }
        },
        methods: {
            async searchCountryByVal(query) {
                try {
                    if(!!query && query.length > 3) {
                        this.countryLoading = true;
                        console.log('search by ', query);
                        this.availableCountries = (await this.$api.get(`${this.api}/account/countries/?&search=${query}`, this.httpConfig)).data;
                        // console.log(this.availableCountries)
                        // this.dataset.filter(item => item.name.includes(query));
                    } else {
                        return this.availableCountries = [];
                    }
                } catch (e) {

                } finally {
                    this.countryLoading = false;
                }
            },
            async searchMajorByVal(query) {
                try {
                    if(!!query && query.length > 3) {
                        console.log('search by ', query);
                        this.majorLoading = true;
                        this.availableMajors = (await this.$api.get(`${this.api}/account/form-field-of-studies/?&search=${query}`, this.httpConfig)).data;
                        // this.dataset.filter(item => item.name.includes(query));
                    } else {
                        return this.availableMajors = [];
                    }
                } catch (e) {

                } finally {
                    this.majorLoading = false;
                }
            },
            async searchUniversityByVal(query) {
                try {
                    if(!!query && query.length > 3) {
                        this.uniLoading = true;
                        console.log('search by ', query);
                        this.availableUniversities = (await this.$api.get(`${this.api}/account/form-universities/?&search=${query}`, this.httpConfig)).data;
                        // this.dataset.filter(item => item.name.includes(query));
                    } else {
                        return this.availableUniversities = [];
                    }
                } catch (e) {

                } finally {
                    this.uniLoading = false;
                }
            },
            setSelectedCountry(country) {
                this.selectedCountry = country;
            },
            setSelectedGrade(grade) {
                this.selectedGrade = grade;
            },
            setSelectedMajor(major) {
                this.selectedMajor = major;
            },
            setSelectedSemester(semester) {
                this.selectedSemester = semester
            },
            addSelectedUniversity(uni) {
                let dupIndex = this.selectedUniversities.findIndex(currentUni => currentUni.id == uni.id);
                if(dupIndex == -1) {
                    this.selectedUniversities.push(uni)
                } else {
                    console.log('duplicate uni to add')
                }
            },
            removeSelectedUni(uni) {
                this.selectedUniversities = this.selectedUniversities.filter(currentUni => currentUni.id != uni.id);
            }

        },
        created() {

        }
    }
</script>

<style scoped>
    .form-destination {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .destination-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .form-destination-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .dest-input {
        width: calc(50% - 40px);
        margin: 0 20px 20px 20px;
    }

    .destination-universities {
        width: calc(50% - 40px);
        display: flex;
        flex-wrap: wrap;
        margin: 0 20px;
    }

    .selected-item {
        border-radius: 10px;
        padding: 5px 17px;
        font-size: 12px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }

    .selected-item.item--valid {
        background-color: #DDF3FC;
        border: 1px solid #00D4ED;
        color: #009FB3;
    }

    .selected-item-remove {
        border: none;
        background: none;
        color: #00BFD6;
        font-size: 16px;
    }

    @media only screen and (max-width: 767.8px) {
        .form-destination-wrapper {
            flex-wrap: nowrap;
            flex-direction: column;
        }

        .dest-input {
            width: auto;
        }
    }
</style>