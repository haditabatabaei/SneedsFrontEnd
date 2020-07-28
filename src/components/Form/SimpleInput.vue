<template>
    <input class="simple-input isansFont--faNum" type="text" :placeholder="label" v-model="inputValue" @change="$emit('change', inputValue)" @input="$emit('input', inputValue)">
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
            }
        },
        methods: {},
        created() {}
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
</style>