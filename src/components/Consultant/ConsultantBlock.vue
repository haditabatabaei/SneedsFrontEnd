<template>
    <div class="card card-profile">
        <div class="card-image" :style="'background: url(' + consultant.profile_picture + ')'">
            <router-link to="/">
                <!--                <img :alt="consultant.first_name + ' ' + consultant.last_name" class="img"-->
                <!--                     :src="consultant.profile_picture">-->

                <div class="card-title">
                    <h4 class="isansFont">
                        {{consultant.first_name + ' ' + consultant.last_name}}
                    </h4>

                </div>
            </router-link>
            <div class="ripple-container"></div>
        </div>

        <div class="card-content">
            <h6 class="category text-info">

            </h6>

            <p class="card-description text-justify isansFont" v-if="consultant.bio != null">
                {{consultant.bio}}
            </p>

            <div class="rate">
                <span class="text-white isansFont label label-success">5 / 3.9</span>
                <span class="text-dark isansFont comments">(20 نظر)</span>
            </div>
            <!--                رشته ها :-->
            <!--                <br>-->

            <!--                <span :title="field.description" v-for="field in consultant.field_of_studies">-->
            <!--                    {{field.name}}-->
            <!--                    <br>-->
            <!--                </span>-->
            <!--                <br>-->

            <!--                دانشگاه ها :-->
            <!--                <br>-->
            <!--                <span :title="university.description" v-for="university in consultant.universities">-->
            <!--                    <img style="width:30px;height:30px;border-radius:10px;margin:5px"-->
            <!--                         :src="'https://dummyimage.com/70X70/000/fff&text=' + university.slug" :alt="university.slug"-->
            <!--                         :title="university.description">-->
            <!--                </span>-->
            <!--                <br>-->

            <!--                کشور ها :-->
            <!--                <br>-->
            <!--                <span v-for="country in consultant.countries">-->
            <!--                    <img style="width:30px;height:30px;border-radius:10px;margin: 5px;"-->
            <!--                         :src="'https://dummyimage.com/70X70/000/fff&text=' + country.slug" :alt="country.slug"-->
            <!--                         :title="country.description">-->
            <!--                </span>-->
            <div class="footer">
                <a href="#" class="btn btn-just-icon btn-simple btn-twitter">
                    <i class="fa fa-linkedin"></i>
                </a>
                <a href="#" class="btn btn-just-icon btn-simple btn-instagram">
                    <i class="fa fa-instagram"></i>
                </a>
            </div>

            <router-link to="/" class="btn btn-info isansFont">رزرو مشاور
                <div class="ripple-container"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConsultantBlock",
        props: {
            consultant: {},
        }

    }
</script>

<style scoped>

    .comments {
        font-size: 12px;
        color: gray;
    }

    .rate {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .card .card-image {
        background-position: center !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        min-height: 200px;
        min-width: 200px;
        margin-right: 7.5px;
        margin-left: 7.5px;
    }

    .card-title {
        left: 0 !important;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .footer {
        display: flex;
        justify-content: space-around;
    }

    @media only screen and (min-width: 0) and (max-width: 992px) {
        .card .card-image {
            min-height: 500px;
            min-width: 200px;
        }
    }
</style>