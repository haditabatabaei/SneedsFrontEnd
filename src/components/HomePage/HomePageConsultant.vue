<template>
    <div class="consultant-info-container ">
        <img class="consultant-avatar" src="consultant.profile_picture" :alt="`${consultant.first_name} ${consultant.last_name}`">
        <div class="consultant-info">
            <star-rating
                    :star-size="8"
                    :padding="3"
                    :showRating="false"
                    :read-only="true"
                    style="background-color: #ffffff;padding:10px 0px 5px 0px; border-radius:20px"
                    inactive-color="#FCFCFC"
                    active-color="#F4CA64"
                    :border-width="2"
                    v-model="rate"
            />
            <p class="consultant-name">
                {{consultant.first_name + ' ' + consultant.last_name}}
                <span><img  src="/sneedsAssets/img/canada.png" alt=""></span>
            </p>
            <p class="cosultant-major">{{consultant.major}}</p>


        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    export default {
        name: "HomePageConsultant",
        components: {
            "star-rating": StarRating
        },
        data() {
            return {
                rate: 2.5
            }
        },
        props: {
            consultant: {
                type: Object,
                default: () => null
            }

        }
    }
</script>

<style scoped>
    .consultant-info-container {
        width: 30%;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 0px 7px 46px #0000001F;
        margin-bottom: 3%;

    }

    .consultant-info {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding-left: 10px;

    }
    .consultant-avatar {
        width: 45%;
        height: 45%;
    }
    .consultant-name {
        color: #303143;
        font-weight: bold;
    }
    .cosultant-major {
        color: #707070;
        font-size: 10px;
    }
    @media only screen and (max-width: 567.8px) {
        .consultant-info-container {
            width: 70%;
        }
    }

</style>