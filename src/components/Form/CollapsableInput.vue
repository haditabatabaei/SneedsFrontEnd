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
        <transition name="fade">
            <textarea name="collapsable-input" class="collapsable-input-textarea" :id="`collapsable-text-${id}`" :style="`resize:${resize};`" cols="30" rows="10" :placeholder="inputPlaceholder" v-if="isOpen" v-model="inputValue" />
        </transition>
    </div>
</template>

<script>
    export default {
        name: "CollapsableInput",
        data() {
            return {
                id: Math.round(Math.random() * 100),
                inputValue: null,
            }
        },
        computed: {
            resize() {
                if(this.resizableHorizontal && this.resizableVertical) {
                    return 'both'
                } else if(this.resizableHorizontal) {
                    return 'horizontal'
                } else if(this.resizableVertical) {
                    return 'vertical'
                } else {
                    return 'none'
                }
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
            inputPlaceholder: {
                type: String,
                default: () => 'پلیس هولدر باکس متن'
            },
            isOpen: {
                type: Boolean,
                default: () => false
            },

            resizableHorizontal: {
                type: Boolean,
                default: () => false
            },

            resizableVertical: {
                type: Boolean,
                default: () => false
            },

            defaultValue: {
                type: String,
                default: () => null
            }
        },
        methods: {
            toggleOpen() {
                this.isOpen = !this.isOpen;
            }
        },
        created() {
            this.inputValue = this.defaultValue
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

    .collapsable-input-textarea {
        background-color: #F8F8F8;
        border-radius: 10px;
        border: 1px solid #F2F2F2;
        padding: 5px;
        color: #9B9999;
        width: 100%;
    }
</style>