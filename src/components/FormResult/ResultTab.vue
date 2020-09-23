<template>
    <div class="tabs gadugiFont">
        <div class="tabs-selectors">
            <button class="tabs-selector" :class="[{'tabs-selector--active': activeTab == tab}]" v-for="tab in tabs" @click="activeTab = tab">{{tab.title}}</button>
        </div>
        <c-dropdown
            :options="dropDownItems"
            :defaultIndex="-1"
            label="Select tab"
            @select-option="selectTab"
            v-if="windowWidth <= 533.8"
        />
        <div class="tabs-content">
            <slot v-for="(tab, index) in tabs" :name="`TAB${index}`" v-if="activeTab == tab"></slot>
        </div>
    </div>
</template>

<script>
    import DropdownInput from "@/components/Form/DropdownInput";
    export default {
        name: "ResultTab",
        components: {
            "c-dropdown": DropdownInput
        },
        data() {
            return {
                activeTab: null
            }
        },
        computed: {
            dropDownItems() {
                return this.tabs.map(item => {return {tab: item, name: item.title}})
            }
        },
        props: {
            tabs: {
                type: Array,
            }
        },
        methods: {
            selectTab(item) {
                this.activeTab = item.tab;
            }
        },
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

    @media only screen and (max-width: 533.8px) {
        .tabs-selectors {
            display: none;
        }
    }
</style>