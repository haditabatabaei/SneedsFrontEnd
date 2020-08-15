<template>
    <div class="collapsable-wrapper isansFont--faNum">
        <p class="collapsable-title" @click="toggleOpen">
                <i class="material-icons collapsable-open-icon" v-if="isOpen">
                    remove
                </i>
            <i class="material-icons collapsable-open-icon" v-else>
                add_circle_outline
            </i>
            {{title}}
            <i class="material-icons collapsable-done-icon" v-if="isFilled">done</i>
        </p>
        <slot class="collapsable-input" v-if="isOpen"></slot>
    </div>
</template>

<script>
    export default {
        name: "CollapsableInput",
        data() {
            return {
                isOpen: false,
            }
        },
        props: {
            title: {
                type: String,
                default: () => 'عنوان باز شونده'
            },
            isFilled: {
                type: Boolean,
                default: () => false
            },
            isOpenByDefault: {
                type: Boolean,
                default: () => false
            },
        },
        methods: {
            toggleOpen() {
                this.isOpen = !this.isOpen;
            }
        },
        created() {
            this.inputValue = this.defaultValue;
            this.isOpen = this.isOpenByDefault;
        }
    }
</script>

<style scoped>
    .collapsable-title {
        display: flex;
        align-items: center;
        color: #009FB3;
        font-size: 14px;
        cursor: pointer;
    }

    .collapsable-title:hover {
        font-weight: bold;
    }

    .collapsable-open-icon {
        color: #00BFD6;
        font-size: 16px;
        margin: 0 0 0 5px;
    }

    .collapsable-done-icon {
        background-color: #00D4ED;
        color: white;
        font-size: 15px;
        margin: 0 5px 0 0;
        border-radius: 50%;
    }
</style>