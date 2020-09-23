<template>
    <div class="tabs gadugiFont">
        <div class="tabs-selectors">
            <button class="tabs-selector" :class="[{'tabs-selector--active': activeTab == tab}]" v-for="tab in tabs" @click="activeTab = tab">{{tab.title}}</button>
        </div>
        <div class="tabs-content">
            <slot v-for="(tab, index) in tabs" :name="`TAB${index}`" v-if="activeTab == tab"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VerticalTab",
        data() {
            return {
                activeTab: null
            }
        },
        props: {
            tabs: {
                type: Array,
            }
        },
        methods: {},
        created() {
            this.activeTab = this.tabs[0];
        }
    }
</script>

<style scoped>
    .tabs {
        display: grid;
        grid-template-areas:
            "selectors slots";
        grid-template-rows: auto;
        grid-template-columns: 122px auto;
    }

    .tabs-selectors {
        display: flex;
        flex-direction: column;
        grid-area: selectors;
        padding-right: 5px;
        border-right: 1px solid #00D4ED;
    }

    .tabs-selector {
        background: none;
        padding: 10px 15px;
        margin: 0 15px;
        border: none;
        font-weight: bold;
        color: #374957;
        position: relative;
        border-radius: 5px;
    }

    .tabs-selector--active {
        color: #009FB3;
        background-color: #DDF3FC;
    }

    .tabs-content {
        margin: 0 10px;
        color: #707070;
    }
</style>