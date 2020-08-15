<template>
    <input class="simple-input" :class="[{'simple-input--ltr': isLtr, 'isansFont': isLtr, 'isansFont--faNum': !isLtr}]" type="text" :placeholder="label" v-model="inputValue" @change="$emit('change', inputValue)" @input="$emit('input', inputValue)">
</template>

<script>
    export default {
        name: "SimpleInput",
        data() {
            return {
                inputValue: null
            }
        },
        props: {
            label: {
                type: String,
                default: () => 'ورودی ساده'
            },
            defaultValue: {
                type: String,
                default: () => null
            },
            isLtr: {
                type: Boolean,
                default: () => false
            }
        },
        methods: {},
        created() {
            if(this.defaultValue) {
                this.inputValue = this.defaultValue;
            }
        }
    }
</script>

<style scoped>
    .simple-input {
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        border-radius: 10px;
        min-height: 40px;
        padding: 0 10px;
        color: #9B9999;
    }
    .simple-input--ltr {
        direction: ltr !important;
    }
</style>