<template>
    <div class="filter-block">
        <div class="filter-block-head">
            <div class="filter-block-head-title gadugiFont">
                <p class="filter-block-head-title-text">
                    <i class="material-icons">line_weight</i>
                    Active filters
                </p>
                <button @click="clearActiveFilters"
                        class="filter-block-head-title-action">
                    clear
                </button>
            </div>
        </div>
        <div class="filter-block-content gadugiFont">
            <ul class="filter-block-active-list">
                <li class="filter-block-active-item" v-for="(filter, index) in activeFilters"
                    :key="index">
                    <button @click="removeFilter(filter)" class="filter-active-item-button">
                        {{filter.name}}
                        <i class="material-icons">close</i>
                    </button>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ActiveFilterBlock",
        props: {
            activeFilters: {
                type: Array
            }
        },
        methods: {
            clearActiveFilters() {
                this.activeFilters.forEach(filter => filter.select = false);
            },
            removeFilter(filter) {
                filter.select = false;
            }
        },
    }
</script>

<style scoped>
    .filter-block {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background-color: white;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    }

    .filter-block:not(:first-child) {
        margin-top: 15px;
    }

    .filter-block-head {
        background-color: #fcfcfc;
        border-radius: 15px 15px 0 0;
    }

    .filter-block-head-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        font-size: 12px;
    }

    .filter-block-head-title-text {
        margin: 0;
        display: flex;
        align-items: center;
        padding-left: 10px;
        color: #9B9999;
    }

    .filter-block-head-title-text i {
        font-size: 16px;
        margin-right: 5px;
    }

    .filter-block-active-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        padding-left: 0;
    }

    .filter-block-active-item {
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

    .filter-block-head-title-action {
        margin: 0 10px 0 0;
        background: none;
        cursor: pointer;
        border: none;
        color: #d26f6e;
        outline: none;
    }

    .filter-block-head-title-action:hover {
        color: red;
    }
</style>