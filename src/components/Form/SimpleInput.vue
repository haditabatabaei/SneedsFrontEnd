<template>
    <div class="input-wrapper">
        <input class="simple-input"
               :class="[{'simple-input--ltr': isLtr, 'isansFont': isLtr, 'isansFont--faNum': !isLtr, 'input--error': error}]"
               type="text" :placeholder="label" :value="value" @change="$emit('change', $event.target.value)"
               @input="$emit('input', $event.target.value)">
        <transition name="fade">
            <p class="number-input-error isansFont" :class="[{'isansFont--faNum': !isLtr}]" v-if="error">
                <i class="material-icons-outlined">info</i>
                {{errorText}}
            </p>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SimpleInput",
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
            },
            error: {
                type: Boolean,
                default: () => false
            },
            errorText: {
                type: String,
                default: () => "لطفاً ورودی را دوباره کنترل کنید."
            },
            value: {
                type: String
            }
        },
        methods: {},
        created() {
            if(this.defaultValue) {
                this.value = this.defaultValue;
            }
        }
    }
</script>

<style scoped>
    .input-wrapper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .simple-input {
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        border-radius: 10px;
        min-height: 40px;
        padding: 0 10px;
        color: #9B9999;
    }

    .simple-input.input--error {
        border-color: #DC3030;
    }

    .simple-input--ltr {
        direction: ltr !important;
    }

    .number-input-error {
        margin: 5px 0;
        border-radius: 10px;
        padding: 5px;
        font-size: 12px;
        color: #891B1B;
        background-color: #FFECEC;
        display: flex;
        align-items: center;
    }

    .number-input-error i {
        font-size: 18px;
        margin: 0 5px;
    }
</style>