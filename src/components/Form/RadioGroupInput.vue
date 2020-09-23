<template>
    <div class="radio-wrapper isansFont--faNum" :class="[{'radio--column': direction == 'column'}]">
        <input v-model="selectedRadio" class="radio-input" type="radio" v-for="(item, index) in items" :value="item" :name="name" :id="correspondingIds[index]" >
        <label @click="selectOption(item)" class="radio-holder" :class="[{'holder--selected': selectedRadio == item, 'holder--column': direction == 'column'}]" v-for="(item, index) in items" :for="correspondingIds[index]" >
            {{item.name}}
            <i class="material-icons" v-if="selectedRadio == item">done</i>
        </label>
        <transition name="fade">
            <p class="number-input-error isansFont--faNum" v-if="error">
                <i class="material-icons-outlined">info</i>
                {{errorText}}
            </p>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "RadioGroupInput",
        data() {
            return {
                name: Math.floor(Math.random() * 1000),
                selectedRadio: null
            }
        },
        props: {
            items: {
                type: Array,
                default: () => [
                    {name: 'مورد اول', id: 1},
                    {name: 'مورد دوم', id: 2},
                ]
            },
            direction: {
                type: String,
                default: () => 'row'
            },
            error: {
                type: Boolean,
                default: () => false
            },
            errorText: {
                type: String,
                default: () => "لطفاً ورودی را کنترل کنید."
            }
        },
        watch: {
            selectedRadio(newSelectedRadioOption) {
                // this.$emit('update', newSelectedRadioOption)
            }
        },
        computed: {
            correspondingIds() {
                return this.items.map(() => Math.floor(Math.random() * 1000));
            }
        },
        methods: {
            selectOption(item) {
                this.selectedRadio = item;
                this.$emit('select-option', item)
            }

        },

    }
</script>

<style scoped>
    .radio-input {
        display: none;
    }

    .radio-wrapper {
        display: flex;
        align-items: center;
    }

    .radio-wrapper.radio--column {
        flex-direction: column;
        align-items: stretch;
    }

    .radio-holder {
        cursor: pointer;
        margin: 0 10px 0 0;
        position: relative;
    }

    .radio-holder:first-child {
        margin-right: 0;
    }

    .radio-holder.holder--column {
        margin: 10px 0 0 0;
        background-color: #F8F8F8;
        color: #9B9999;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        height: 50px;
    }

    .radio-holder.holder--column:first-child {
        margin-top: 0;
    }

    .radio-holder.holder--selected {
        color: #00BFD6;
        border: 1px solid #00BFD6;
    }

    .radio-holder i {
        left: 10px;
        top: 10px;
        border-radius: 50%;
        padding: 1px;
        color: white;
        background-color: #00BFD6;
        font-size: 14px;
        margin-right: 5px;
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