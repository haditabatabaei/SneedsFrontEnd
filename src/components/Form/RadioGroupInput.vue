<template>
    <div class="radio-wrapper isansFont--faNum" :class="[{'radio--column': direction == 'column'}]">
        <input v-model="selectedRadio" class="radio-input" type="radio" v-for="(item, index) in items" :value="item" :name="name" :id="correspondingIds[index]" >
        <label class="radio-holder" :class="[{'holder--selected': selectedRadio == item, 'holder--column': direction == 'column'}]" v-for="(item, index) in items" :for="correspondingIds[index]" >
            {{item}}
            <i class="material-icons" v-if="selectedRadio == item">done</i>
        </label>
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
            }
        },
        watch: {
            selectedRadio(newSelectedRadioOption) {
                this.$emit('update', newSelectedRadioOption)
            }
        },
        computed: {
            correspondingIds() {
                return this.items.map(() => Math.floor(Math.random() * 1000));
            }
        },
        methods: {},

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
</style>