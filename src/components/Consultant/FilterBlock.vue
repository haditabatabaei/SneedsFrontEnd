<template>
    <div v-if="items.length > 0" class="filter-block" :class="[{'filter-block--noShadow': noShadow, 'filter-block--noRaduis': noRadius}]">
        <div class="filter-block-head" v-if="!noTitle">
            <div class="filter-block-head-title">
                <p class="filter-block-head-title-text">
                    <i class="material-icons">insert_photo</i>
                    {{filterTitle}}
                </p>
            </div>
        </div>
        <div class="filter-block-search">
            <div class="filter-block-search-form">
                <input v-model.trim="query"
                       @input="searchInItems"
                       type="text"
                       placeholder="Search">
                <i class="material-icons">search</i>
            </div>
        </div>
        <div class="filter-block-content">
            <ul class="filter-block-list">
                <li class="filter-block-item" @click="selectItem(item)"
                    v-for="(item, index) in shownItems" :key="index">
                    {{item.name}}
                    <i class="material-icons filter-block-item-selected"
                       v-if="item.select">
                        done
                    </i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FilterBlock",
        data() {
            return {
                query: '',
                shownItems: []
            }
        },
        props: {
            items: {
                type: Array
            },
            filterTitle: {
                type: String,
                default: () => "Filter block title"
            },
            noTitle: {
                type: Boolean,
                default: () => false
            },
            noShadow: {
                type: Boolean,
                default: () => false
            },
            noRadius: {
                type: Boolean,
                default: () => false
            },
            searchType: {
                type: String,
                default: () => 'middle'
            }
        },
        watch: {
            items(newItems) {
                //try to fix asynchronous problem of items coming late
                if(newItems.length > 0) {
                    this.shownItems = newItems;
                }
            }
        },
        created() {
            this.searchInItems();
        },
        methods: {
            searchInItems() {
                switch (this.searchType) {
                    case "start" :
                        this.shownItems = this.items.filter(item => item.name.toLowerCase().startsWith(this.query.toLowerCase()));
                        break;
                    case "middle" :
                        this.shownItems = this.items.filter(item => item.name.toLowerCase().includes(this.query.toLowerCase()));
                        break;
                }
                this.$emit('updated-shown-items', this.shownItems)
            },
            selectItem(item) {
                item.select = !item.select;
                this.$emit('select-item', item)
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

    .filter-block--noShadow {
        box-shadow: none;
    }

    .filter-block--noRadius {
        border-radius: 0;
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

    .filter-block-search {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid #f7f7f7;
    }

    .filter-block-search-form {
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

    .filter-block-search-form input {
        border: none;
        background: none;
        outline: none;
        color: #B3B3B3;
        font-size: 12px;
        width: 100%;
    }

    .filter-block-search-form i {
        margin-left: 10px;
        font-size: 18px;
        color: #B3B3B3;
    }

    .filter-block-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        padding: 0;
        margin: 10px 0;
        max-height: 150px;
        overflow-y: auto;
    }

    .filter-block-list::-webkit-scrollbar {
        width: 4px;
        border-radius: 15px;
    }

    .filter-block-list::-webkit-scrollbar-track {
        right: 4px;
        border-radius: 15px;
    }

    .filter-block-list::-webkit-scrollbar-thumb {
        background-color: #ccc;
        outline: 1px solid gray;
        border-radius: 15px;
    }

    .filter-block-item {
        display: flex;
        align-items: center;
        color: #B3B3B3;
        margin: 5px 10px;
        border-radius: 10px;
        padding: 5px 0;
        font-size: 12px;
        min-height: 30px;
    }

    .filter-block-item:hover {
        background-color: #FCFCFC;
        cursor: pointer;
    }

    .filter-block-item-selected {
        margin: 0 10px 0 auto;
        font-size: 13px;
        background-color: #B3B3B3;
        color: white;
        border-radius: 50%;
        padding: 2px;
    }
</style>