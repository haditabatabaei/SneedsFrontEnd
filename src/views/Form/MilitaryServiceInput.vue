<template>
    <section class="form-militaryservice">
        <h1 class="militaryservice-title">
            <i class="material-icons">help_outline</i>
            How is your military service status?
        </h1>
        <div class="militaryservice-wrapper">
            <input v-model="selectedMilitaryserviceStatus" id="militaryservice-have" type="radio" name="militaryservice" value="have">
            <input v-model="selectedMilitaryserviceStatus" id="militaryservice-donthave" type="radio" name="militaryservice" value="donthave">
            <label for="militaryservice-have" class="militaryservice-holder" :class="[{'holder--selected': selectedMilitaryserviceStatus == 'have'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedMilitaryserviceStatus == 'have'">done</i>
                <img draggable="false" src="/sneedsAssets/img/militaryservice.svg" class="militaryservice-holder-image" alt="Without military service concerns">
                <p class="militaryservice-holder-text">I passed</p>
            </label>
            <label for="militaryservice-donthave" class="militaryservice-holder" :class="[{'holder--selected': selectedMilitaryserviceStatus == 'donthave'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedMilitaryserviceStatus == 'donthave'">done</i>
                <img draggable="false" src="/sneedsAssets/img/nomilitaryservice.svg" class="militaryservice-holder-image" alt="With military service concerns">
                <p class="militaryservice-holder-text">I didn't pass</p>
            </label>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MilitaryServiceInput',
    data() {
        return {
            selectedMilitaryserviceStatus: null
        }
    },
    computed: {
        user() {
            return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
        },

        detailedForm() {
            return this.$store.getters.detailedForm;
        },

        api() {
            return this.$store.getters.getApi
        },

        httpConfig() {
            return this.$store.getters.httpConfig
        },

        multipartHttpConfig() {
            return this.$store.getters.multipartHttpConfig
        }
    },
    watch: {
        selectedMilitaryserviceStatus(newStatusValue) {
            console.log(newStatusValue);
            let value = newStatusValue == 'donthave' ? 'PASSED' : 'UNDID'
            this.$store.commit('setDetailedFormProperty', {prop: 'military_service_status', value })
        },
        detailedForm(newDetailedForm) {
            console.log('detailed form changed ', newDetailedForm);
            this.init();
        }
    },
    methods: {
        init() {
            console.log('in ms input', this.detailedForm);
            if(this.detailedForm) {
                this.selectedMilitaryserviceStatus = this.detailedForm.military_service_status == 'PASSED' ? 'donthave' : 'have'
            }
        }
    },
    created() {
        this.init();
    }
}
</script>

<style scoped>
    input[type="radio"] {
        display: none;
    }

    .form-militaryservice {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        /* padding-right: 50px; */
    }

    .militaryservice-wrapper  {
        display: flex;
    }

    .militaryservice-holder {
        width: calc(100% - 360px);
        border-radius: 12px;
        background-color: white;
        box-shadow:0 3px 26px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 20px;
        padding: 20px;
        cursor: pointer;
        transition: all 100ms ease-in-out;
    }

    .holder-selected-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 18px;
        color: white;
        border-radius: 50%;
        background-color: #00D4ED;
        padding: 2px;
    }

    .militaryservice-holder-text {
        margin: 20px 0 10px 0;
        color: #9B9999;
    }

    .holder--selected {
        position: relative;
        box-shadow: none;
        border: 3px solid #00BFD6;
    }

    .militaryservice-holder-image {
        opacity: 0.5;
    }

    .holder--selected .militaryservice-holder-text {
        color: #00BFD6;
    }

    .holder--selected .militaryservice-holder-image {
        opacity: 1;
    }

    .militaryservice-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .militaryservice-title i {
        margin-right: 10px;
        color: #707070;
        border-radius: 50%;
    }

    @media only screen and (max-width: 767.8px) {
        .militaryservice-wrapper {
            margin: 0 20px;
        }

        .militaryservice-holder {
            margin: 0;
            padding: 10px;
            width: calc(50%);
        }

        .militaryservice-holder[for*="-have"] {
            margin-left: 10px;
        }

        .militaryservice-holder[for*="-donthave"] {
            margin-right: 10px;
        }

        .militaryservice-holder-image {
            width: 80%;
        }
    }
</style>