<template>
    <div>
        <div class="bottom-filter-overlay" @click="toggleFilterPanel" v-if="showFilterPanel"></div>
        <div class="bottom-filter">
            <div class="bottomFilter-head" :class="[{'bottomFilter-head--open': showFilterPanel}]"
                 @click="toggleFilterPanel">
                <button class="bottomFilter-head-title-close" v-if="showFilterPanel">
                    <i class="material-icons">close</i>
                </button>
                <p class="bottomFilter-head-title">
                    <i class="material-icons" v-if="!showFilterPanel">line_weight</i>
                    Results Filtering
                </p>
                <button @click="clearActiveFilters" v-if="showFilterPanel"
                        class="filterBlock-head-title--action">
                    Clear all filters
                    <span v-if="activeFilters.length > 0"> ({{activeFilters.length}})</span>
                </button>
            </div>
            <div class="bottomFilter-content" v-if="showFilterPanel">
                <div class="bottomFilter-content-tabs">
                    <button @click="openTab(tab)"
                            class="bottomFilter-content-tabs-button"
                            v-for="tab in tabs"
                            :class="[{'active': currentTab === tab}]">
                        {{tab.name}}
                    </button>
                </div>
                <filter-block
                        :no-title="true"
                        :items="universities"
                        v-if="currentTab != null && currentTab.value === 'universities'"
                        @select-item="selectItemProxy"
                        :no-shadow="true"
                />
                <filter-block
                        :no-title="true"
                        :items="countries"
                        v-else-if="currentTab != null && currentTab.value === 'countries'"
                        @select-item="selectItemProxy"
                        search-type="start"
                        :no-shadow="true"
                />
                <filter-block
                        :no-title="true"
                        :items="majors"
                        v-else-if="currentTab != null && currentTab.value === 'majors'"
                        @select-item="selectItemProxy"
                        :no-shadow="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import FilterBlock from "@/components/Consultant/FilterBlock";
    export default {
        name: "CollapsibleFilters",
        components: {
            "filter-block": FilterBlock
        },
        data() {
            return {
                showFilterPanel: false,
                tabs: [
                    {name: 'Countries', value: 'countries'},
                    {name: 'Universities', value: 'universities'},
                    {name: 'Majors', value: 'majors'}
                ],
                currentTab: null
            }
        },
        props: {
            countries: {
                type: Array,
                default: () => []
            },
            universities: {
                type: Array,
            },
            majors: {
                type: Array,
            },
            activeFilters: {
                type: Array,
            }
        },
        methods: {
            openTab(tab) {
                this.currentTab = tab;
            },

            toggleFilterPanel() {
                this.showFilterPanel = !this.showFilterPanel;
            },
            clearActiveFilters() {
                this.activeFilters.forEach(filter => filter.select = false)
            },
            selectItemProxy(item) {
                this.$emit('select-item', item);
                this.showFilterPanel = false;
            }
        },
        created() {
            // this.openTab(this.tabs[0]);
        }
    }
</script>

<style scoped>
    .bottom-filter {
        display: none;
    }

    .bottom-filter {
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

    .filterBlock-head-title--action {
        margin: auto 10px auto auto;
        background: none;
        color: #c9737c;
        border: none;
        cursor: pointer;
    }

    .bottomFilter-head-title-close {
        background: none;
        border: none;
        margin: auto 10px;
        color: #666;
        cursor: pointer;
    }

    .bottomFilter-head-title i {
        margin-right: 5px;
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

    @media only screen and (max-width: 991.8px) {
        .bottom-filter-overlay {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1013;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
        }

        .bottom-filter {
            display: block;
        }
    }

</style>