<template>
    <section class="infoBlock">
        <div class="authWrapper">
            <div class="authFormWrapper">
                <div class="authFormWrapper-switcher isansFont">
                    <button v-for="filter in availableFilters"
                            @click="filterBy(filter)"
                            class="switcher"
                            :class="[{'switcher--active' : activeFilter.value === filter.value}]">
                        {{filter.name}}
                    </button>
                </div>
            </div>
        </div>
        <div class="package-items">
            <div v-if="activeFilter.value === 'marketplace'">
                <considering-package v-for="marketPackage in packages" :package="marketPackage"/>
                <p class="package-items-noresult isansFont--faNum" v-if="packages.length === 0">
                    پکیجی در این دسته برای شما وجود ندارد.
                </p>
            </div>
            <div v-else-if="activeFilter.value === 'soldpackage'">
                <considering-package v-for="marketPackage in packages" :package="marketPackage"/>
                <p class="package-items-noresult isansFont--faNum" v-if="packages.length === 0">
                    پکیجی در این دسته برای شما وجود ندارد.
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    import ConsultantConsideringPackageBlock from "@/components/Packages/ConsultantConsideringPackageBlock";

    export default {
        name: "ConsPackages",
        components: {
            'considering-package': ConsultantConsideringPackageBlock
        },
        data() {
            return {
                packages: [],
                activeFilter: {name: 'پکیج های قابل بررسی', value: "marketplace"},
                availableFilters: [
                    {name: 'پکیج های قابل بررسی', value: "marketplace"},
                    {name: 'پکیج های شما', value: "soldpackage"}
                ]
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            }
        },
        methods: {
            filterBy(filter) {
                this.activeFilter = filter;
                switch (this.activeFilter.value) {
                    case 'marketplace' :
                        console.log('market place switch');
                        this.getConsideringPackages();
                        break;
                    case 'soldpackage' :
                        console.log('sold package switch');
                        this.getAcceptedPackages();
                        break;
                }
            },

            async getAcceptedPackages() {
                try {
                    //this.$loading(true);
                    let packagesResult = (await this.$api.get(`${this.api}/store/packages/sold-store-package-list/`, this.httpConfig));
                    console.log(packagesResult);
                    let packagesFormsReqs = [];
                    packagesResult.data.forEach(soldPackage => {
                        packagesFormsReqs.push(
                            this.$api.get(`${this.api}/account/user-student-detailed-info/${soldPackage.sold_to.id}/`, this.httpConfig)
                        )
                    });
                    await this.getPackagesForms(packagesFormsReqs, packagesResult.data);
                    this.packages = packagesResult.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            getPackagesForms(packagesFormsReqs, currentPackages) {
                return new Promise((resolve, reject) => {
                    Promise
                        .all(packagesFormsReqs)
                        .then(packagesFormsResponses => {
                            for (let i = 0; i < currentPackages.length; i++) {
                                currentPackages[i].userDetailedInfo = packagesFormsResponses[i].data;
                            }
                            console.log('packages after user detailed forms', currentPackages);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            if (error.response) {
                                console.log(error.response);
                            }
                            reject();
                        })
                })
            },

            async getConsideringPackages() {
                try {
                    //this.$loading(true);
                    let packagesResult = (await this.$api.get(`${this.api}/store/packages/marketplace-list/`, this.httpConfig));
                    let packagesFormsReqs = [];
                    console.log(packagesResult);
                    packagesResult.data.forEach(soldPackage => {
                        packagesFormsReqs.push(
                            this.$api.get(`${this.api}/account/user-student-detailed-info/${soldPackage.sold_to.id}/`, this.httpConfig)
                        )
                    });
                    await this.getPackagesForms(packagesFormsReqs, packagesResult.data);
                    this.packages = packagesResult.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },
        },
        created() {
            this.getConsideringPackages();
        }
    }
</script>

<style scoped>
    .infoBlock {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 30px;
        padding-bottom: 15px;
    }

    .authFormWrapper-switcher {
        border-bottom: 3px solid #eee;
        min-height: 50px;
        margin: 15px 0 0 0;
        display: flex;
        align-items: stretch;
    }

    .authWrapper {
        width: 100%;
        background: white;
        border-radius: 10px 10px 0 0;
    }

    .switcher {
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        color: #aaa;
        background: none;
        border: none;
    }

    .switcher--active {
        border-bottom: 3px solid #9038CC;
        color: #9038CC;
    }

    .package-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        min-height: 400px;
    }

    .package-items--text {
        text-align: center;
        margin-top: 30px;
    }

    .package-items-noresult {
        text-align: center;
        width: 100%;
        border-radius: 0 0 10px 10px;
        background-color: white;
        padding: 5px 0;
        font-size: 13px;
    }

</style>