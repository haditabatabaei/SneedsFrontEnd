<template>
    <div class="searchable-wrapper isansFont--faNum" :class="[{'searchable--open': isSearchableOpen}]">
        <div class="overlay-dropdown-closable" v-if="isSearchableOpen" @click="isSearchableOpen = false"></div>
        <input type="text" autocomplete="off" :style="openInputStyle" v-model="inputValue" class="searchable-input" :id="`searchable-input-${id}`" @focus="focusOnInput" @input="inputEmitter" @change="$emit('change', inputValue)">
        <label :for="`searchable-input-${id}`" class="searchable-input-label" v-if="inputValue == null || inputValue.length == 0">{{label}}</label>
        <i class="material-icons" v-if="!loading">
            search
        </i>
        <moon-loader class="loading-icon searchable-loading-icon" color="purple" :loading="loading" :size="15" sizeUnit="px" v-else />

        <ul class="searchable-items" v-if="isSearchableOpen">
            <li class="searchable-item item-blocked" v-if="dataset.length == 0">متاسفانه موردی پیدا نشد.</li>
            <li class="searchable-item" :class="[{'searchable-item-selected': inputValue == item.name}]" v-for="item in dataset" @click="setInputValue(item)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
    import {MoonLoader} from "@saeris/vue-spinners";
    export default {
        name: "SearchableInput",
        data() {
            return {
                inputValue: null,
                isSearchableOpen: false,
                id: Math.floor(Math.random() * 1000)
            }
        },
        components: {
            "moon-loader": MoonLoader
        },
        props: {
            label: {
                type: String,
                default: () => "اینپوت با جستجو"
            },
            dataset: {
                type: Array,
                default: () => [
                    {name: 'مقدار تست 1', id: 1},
                    {name: 'علاقه تست 2', id: 2},
                    {name: 'نقی', id: 3},
                ]
            },
            loading: {
                type: Boolean,
                default: () => false,
            }
        },
        computed: {
            openInputStyle() {
                if(this.isSearchableOpen) {
                    return 'position:relative;z-index:15'
                } else {
                    return ''
                }
            }
        },
        methods: {
            focusOnInput(e) {
                console.log(e);
            },
            setInputValue(item) {
                this.inputValue = item.name;
                this.isSearchableOpen = false;
                this.$emit('select-option', item);
            },

            inputEmitter(){
                this.isSearchableOpen = true;
                this.$emit('input', this.inputValue);
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    .searchable-wrapper {
        display: flex;
        min-height: 40px;
        align-items: stretch;
        justify-content: space-between;
        position: relative;
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        border-radius: 10px;
    }

    .overlay-dropdown-closable {
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 14;
        background: rgba(255, 255, 255, 0);
    }

    .searchable-wrapper.searchable--open {
        border-radius: 10px 10px 0 0;
    }

    .searchable-wrapper i, .searchable-loading-icon {
        display: flex;
        align-items: center;
        margin-left: 10px;
        color: #00D4ED;
        font-size: 18px;
    }

    .searchable-input-label {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor:pointer;
        position: absolute;
        right: 0;
        top: 7.5px;
        color: #9B9999;
        font-weight: normal;
    }

    .searchable-input {
        flex-grow: 4;
        border: none;
        background: none;
        padding-right: 10px;
    }

    .searchable-input:focus {
        display: flex;
    }

    .searchable-input:focus ~ .searchable-input-label {
        display: none;
    }

    .searchable-items {
        position: absolute;
        top: 40px;
        width: 100%;
        max-height: 300px;
        overflow: auto;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        background-color: #F8F8F8;
        align-items: stretch;
        margin: 0;
        border-radius: 0 0 10px 10px;
        z-index: 15;
    }

    .searchable-item {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        transition: all 100ms ease-in-out;
        color: #9B9999;
    }

    .searchable-item:hover {
        background-color: #d7d5d5;
    }

    .searchable-item.searchable-item-selected {
        background-color: #eeecec;
    }

    .searchable-item.item-blocked {
        cursor: default;
    }

    .searchable-item:last-child {
        border-bottom: none;
        border-radius: 0 0 10px 10px;
    }
</style>