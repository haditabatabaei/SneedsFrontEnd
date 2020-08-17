<template>
    <div>
        <div class="form-dropdown isansFont--faNum" :class="[{'dropdown-opened': isDropdownOpen, 'dropdown--error': error}]" @click.self="toggleDropdown">
            <div class="overlay-dropdown-closable" v-if="isDropdownOpen" @click="isDropdownOpen = false"></div>
            <p class="dropdown-selectdoption" @click.self="toggleDropdown" v-if="selectedOption">{{selectedOption.name}}</p>
            <p class="dropdown-selectdoption" @click.self="toggleDropdown" v-else>{{label}}</p>
            <select style="display:none;" v-model="selectedOption" name="dropdown-input" id="dropdown-input">
                <option :value="option.id" v-for="option in options">
                    {{option.name}}
                </option>
            </select>
            <transition name="fade">
                <ul class="dropdown-items" v-if="isDropdownOpen">
                    <li class="dropdown-item" :class="[{'dropdown-item-selected': selectedOption == option}]" v-for="option in options" @click="selectOption(option)">{{option.name}}</li>
                </ul>
            </transition>
            <transition name="fade">
                <i class="material-icons" @click.self="toggleDropdown" v-if="isDropdownOpen">
                    keyboard_arrow_up
                </i>
                <i class="material-icons" @click.self="toggleDropdown" v-else>
                    keyboard_arrow_down
                </i>
            </transition>
        </div>
        <transition name="fade">
            <p class="number-input-error isansFont--faNum" v-if="error">
                {{errorText}}
            </p>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "DropdownInput",
        data() {
            return {
                selectedOption: null,
                isDropdownOpen: false
            }
        },
        props: {
            options: {
                type: Array,
                default: () => [
                    {name: 'آپشن 1', id: 1},
                    {name: 'آپشن 2', id: 2},
                ]
            },
            label: {
                type: String,
                default: () => "منو دراپ داون"
            },
            defaultSelectedIndex: {
                type: Number,
                default: () => -1
            },
            clearSelect: {
                type: Boolean,
                default: () => false
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
        computed: {},
        methods: {
            toggleDropdown() {
                this.isDropdownOpen = !this.isDropdownOpen;
            },

            selectOption(option) {
                this.selectedOption = option;
                this.isDropdownOpen = false;
                this.$emit('select-option', option)
                if(this.clearSelect) {
                    this.selectedOption = null;
                }
            }
        },
        mounted() {
            // document.body.addEventListener('click', () => {
            //     this.isDropdownOpen = false;
            // })
        },
        beforeDestroy() {
            // document.body.onclick = null;
        },
        created() {
            if(this.defaultSelectedIndex != -1) {
                this.selectOption(this.options[this.defaultSelectedIndex])
            }
        }
    }
</script>

<style scoped>
    .form-dropdown {
        min-height: 40px;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        position: relative;
        background-color: #F8F8F8;
        border: 1px solid #F2F2F2;
        border-radius: 10px;
        cursor: pointer;
    }

    .form-dropdown.dropdown--error {
        border-color: #963a38;
    }

    .overlay-dropdown-closable {
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 14;
        background: rgba(255, 255, 255, 0);
        cursor: default;
    }

    .form-dropdown.dropdown-opened {
        border-radius: 10px 10px 0 0;
    }

    .form-dropdown i {
        color: #9B9999;
        display: flex;
        align-items: center;
        margin: 0 10px;
    }

    .dropdown-selectdoption {
        color: #9B9999;
        display: flex;
        align-items: center;
        margin: 0 10px;
    }

    .dropdown-items {
        position: absolute;
        top: 40px;
        list-style: none;
        max-height: 400px;
        overflow: auto;
        background-color: #F8F8F8;
        align-self: stretch;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 0;
        margin: 0;
        border-radius: 0 0 10px 10px;
        z-index: 15;
    }

    .dropdown-item {
        min-height: 40px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        transition: all 100ms ease-in-out;
        color: #9B9999;
    }

    .dropdown-item:hover {
        background-color: #d7d5d5;
    }

    .dropdown-item.dropdown-item-selected {
        background-color: #eeecec;
    }

    .dropdown-item:last-child {
        border-bottom: none;
        border-radius: 0 0 10px 10px;
    }

    .number-input-error {
        margin: 5px 0;
        font-size: 12px;
        color: #963a38;
    }
</style>