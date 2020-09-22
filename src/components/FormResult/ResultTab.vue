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
        name: "ResultTab",
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
        display: flex;
        flex-direction: column;
    }

    .tabs-selectors {
        display: flex;
        border-bottom: 5px solid #ccc;
    }

    .tabs-selector {
        background: none;
        padding: 10px 15px;
        border: none;
        font-weight: bold;
        color: #374957;
        position: relative;
    }

    .tabs-selector--active {
        color: #009FB3;
    }

    .tabs-selector--active::after {
        content: " ";
        width: 100%;
        position: absolute;
        height: 5px;
        background-color: #009FB3;
        bottom: -5px;
    }

    .tabs-content {
        margin: 10px;
        color: #707070;
    }
</style>