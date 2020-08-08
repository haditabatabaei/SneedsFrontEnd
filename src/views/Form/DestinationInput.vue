<template>
    <section class="form-destination">
        <h1 class="destination-title isansFont">
            کجا می خوای بری؟
            <i class="material-icons">info</i>
        </h1>
        <div class="form-destination-wrapper">
            <c-searchable-input class="dest-input" />
            <c-dropdown class="dest-input" />
            <c-searchable-input class="dest-input" />
            <c-searchable-input class="dest-input" />
        </div>
    </section>

</template>

<script>
    import SearchableInput from "@/components/Form/SearchableInput.vue";
    import DropdownInput from "@/components/Form/DropdownInput.vue";
    export default {
        name: "DestinationInput",
        components: {
            "c-searchable-input": SearchableInput,
            "c-dropdown": DropdownInput
        },
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>
    .form-destination {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .destination-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .form-destination-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .dest-input {
        width: calc(50% - 40px);
        margin: 0 20px 20px 20px;
    }
    
    @media only screen and (max-width: 767.8px) {
        .form-destination-wrapper {
            flex-wrap: nowrap;
            flex-direction: column;
        }

        .dest-input {
            width: auto;
        }
    }
</style>