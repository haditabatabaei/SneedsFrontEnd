<template>
    <section class="form-edulevel">
        <h1 class="edulevel-title isansFont">
            آخرین مقطع تحصیلی
            <i class="material-icons">info</i>
        </h1>
        <div class="edulevel-wrapper">
            <c-dropdown-input class="edulevel-input"/>
            <c-searchable-input class="edulevel-input" @input="searchByVal" :dataset="searchRes"/>
            <c-searchable-input class="edulevel-input" @input="searchByVal" :dataset="searchRes"/>
            <c-number-input class="edulevel-input" :defaultValue="16.25" :step="0.25" label="معدل از 20" :has-keys="false" />
            <c-number-input class="edulevel-input" :defaultValue="2020"  label="سال فراقت از تحصیل" :max-value="10000" />
        </div>
    </section>
</template>

<script>
    import DropdownInput from "@/components/Form/DropdownInput";
    import NumberInput from "@/components/Form/NumberInput";
    import SearchableInput from "@/components/Form/SearchableInput";
    export default {
        name: "LastEducationalLevel",
        components: {
            "c-number-input": NumberInput,
            "c-dropdown-input": DropdownInput,
            "c-searchable-input": SearchableInput
        },
        data() {
            return {
                searchRes: [],
                dataset: []
            }
        },
        methods: {
            searchByVal(query) {

                if(!!query) {
                    console.log('search by ', query);
                    this.searchRes = this.dataset.filter(item => item.name.includes(query));
                } else {
                    return this.searchRes = [];
                }
            }
        },
        created() {
            this.dataset = []
            for(let i = 0; i < 100; i++) {
                this.dataset.push({name: `تست ${i}`, id: i})
            }
        }
    }
</script>

<style scoped>
    .form-edulevel {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .edulevel-title {
        color: #173F5F;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin: 20px;
    }

    .edulevel-title i {
        margin-right: 5px;
    }

    .edulevel-wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .edulevel-input {
        width: calc(50% - 40px);
        margin: 10px 20px;
    }


    
    @media only screen and (max-width: 767.8px) {
        .edulevel-wrapper {
            flex-wrap: nowrap;
            flex-direction: column;
            align-items: stretch;
        }

        .edulevel-input {
            width: auto;
            matgin: 10px 0;
        }
    }
</style>