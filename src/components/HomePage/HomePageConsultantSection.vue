<template>
    <div class="consultants-box">
        <div class="consultants-section-rows --consultants-images">
            <home-page-consultant  v-for="(consultant, index) in consultantsInput"
                                   :key="index" :consultant="consultant" />
        </div>
     </div>
</template>

<script>
    import HomePageConsultant from "@/components/HomePage/HomePageConsultant";

    export default {
        name: "HomePageConsultantSection",

        components: {
           HomePageConsultant :HomePageConsultant,
        },
        data  () {
            return {}
        },
        props : {
            consultantsInput :{
                type: Array,
                default: () => []
            }

        },

    }
</script>

<style scoped>

    .consultants-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
    }
    .consultants-section-rows {
        width: 80%;
        display: flex;
        flex-direction:row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
        margin: 40px 0px;
    }

    .--consultants-images {
        width: 100%;
        flex-wrap: wrap;
    }
    @media only screen and (max-width: 567.8px) {
        .consultants-section-rows {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

</style>