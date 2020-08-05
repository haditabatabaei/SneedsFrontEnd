<template>
    <div class="number-input-wrapper" :class="[{'wrapper--ltr': isLtr, 'isansFont': isLtr, 'isansFont--faNum' : !isLtr}]">
        <input :id="`number-input-${inputId}`" class="number-input-value" type="number" :min="minValue" :max="maxValue" v-model="value">
        <label :for="`number-input-${inputId}`" class="number-input-label" v-if="hasLabel">{{label}}</label>
        <div class="number-input-controls gadugiFont" v-if="hasKeys">
            <button class="number-input-action" @click="incrementValueByStep">+</button>
            <button class="number-input-action" @click="decrementValueByStep">-</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NumberInput",
        data() {
            return {
                value: null,
                inputId: Math.floor(Math.random() * 100)
            }
        },
        props: {
            step: {
                type: Number,
                default: () => 1
            },
            label: {
                type: String,
                default: () => "وارد کنید"
            },
            hasKeys: {
                type: Boolean,
                default: () => true
            },
            defaultValue: {
                type: Number,
                default: () => null
            },
            minValue: {
                type: Number,
                default: () => 0
            },
            maxValue: {
                type: Number,
                default: () => 1000
            },
            hasLabel: {
                type: Boolean,
                default: () => true
            },
            isLtr: {
                type: Boolean,
                default: () => false
            }
        },
        watch: {
            value(newVal) {
                this.$emit('set-number', newVal)
            }
        },
        methods: {
            incrementValueByStep() {
                let newValue = Number(this.value) + Number(this.step);
                if (newValue > this.maxValue) {
                    this.value = this.maxValue;
                } else {
                    this.value = newValue;
                }
            },
            decrementValueByStep() {
                let newValue = Number(this.value) - Number(this.step);
                if (newValue < this.minValue) {
                    this.value = this.minValue;
                } else {
                    this.value = newValue;
                }
            }
        },
        created() {
            this.value = this.defaultValue;
        }
    }
</script>

<style scoped>
    .number-input-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        border-radius: 10px;
        padding: 5px;
        height: 40px;
    }

    .number-input-controls {
        display: flex;
        align-items: center;
    }

    .number-input-action {
        margin: 0 5px;
        width: 25px;
        height: 25px;
        font-size: 20px;
        background-color: #FFFFFF;
        border-radius: 7px;
        display: flex;
        align-items: center;
        color: #009FB3;
        border: none;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        transition: all 100ms ease-in-out;
    }

    .number-input-action:hover {
        background-color: #009FB3;
        color: white;
    }

    .number-input-label {
        margin: 10px;
        flex-grow: 4;
        display: flex;
        align-items: center;
        color: #707070;
        font-size: 12px;
    }

    .number-input-value {
        padding: 0 10px 0 0;
        margin: 0 5px 0 0;
        color: #9B9999;
        font-weight: bold;
        background: none;
        border: none;
        border-left: 2px solid #9B9999;
    }

    /** LTR Config **/

    .number-input-wrapper.wrapper--ltr {
        flex-direction: row-reverse;
    }

    .number-input-wrapper.wrapper--ltr .number-input-value {
        border-left: none;
        border-right: 2px solid #9B9999;
        text-align: center;
    }

    .number-input-wrapper.wrapper--ltr .number-input-label {
        justify-content: flex-end;
    }


</style>