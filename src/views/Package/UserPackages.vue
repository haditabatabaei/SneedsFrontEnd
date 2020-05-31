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
            <div v-if="activeFilter.value === 'soldpackages'">
                <user-sold-package-block v-for="soldPackage in packages" :package="soldPackage" />
            </div>
        </div>
    </section>
</template>

<script>
    import UserSoldPackageBlock from "@/components/Packages/UserSoldPackageBlock";
    export default {
        name: "UserPackages",
        components: {
            UserSoldPackageBlock,
            'sold-package-block': UserSoldPackageBlock
        },
        data() {
            return {
                packages: [],
                activeFilter: {name: 'پکیج ها', value: "soldpackages"},
                availableFilters: [
                    {name: 'پکیج ها', value: "soldpackages"},
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
                        // this.getAllSessions();
                        console.log('market place switch');
                        // this.getConsideringPackages();
                        break;
                    case 'soldpackage' :
                        console.log('sold package switch');
                        // this.getUsedSessions();
                        break;
                }
                // this.getCurrentTimeInTimezone();
            },
            async getSoldPackages() {
                try {
                    this.$loading(true);
                    let packagesResult = (await this.$api.get(`${this.api}/store/packages/sold-store-package-list/`, this.httpConfig));
                    console.log(packagesResult);
                    this.packages = packagesResult.data;
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },
        },
        created() {
            this.getSoldPackages();
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
</style>