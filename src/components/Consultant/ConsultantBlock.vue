<template>
    <div class="card card-profile">
        <div class="card-image">
            <router-link to="/">
                <img :alt="consultant.first_name + ' ' + consultant.last_name" class="img"
                     :src="consultant.profile_picture" style="max-width:300px">

                <div class="card-title">
                    <h4 class="isansFont">
                        {{consultant.first_name + ' ' + consultant.last_name}}
                    </h4>

                </div>
            </router-link>
            <div class="colored-shadow"
                 style="background-image: url(&quot;assets/img/examples/card-profile4.jpg&quot;); opacity: 1;"></div>
            <div class="ripple-container"></div>
        </div>

        <div class="card-content">
            <h6 class="category text-info">

            </h6>

            <p class="card-description text-justify isansFont">
                توضیحات کوتاه درباره این مشاور
                <br>

                رشته ها :
                <br>
                <span :title="field.description" v-for="field in consultant.field_of_studies">
                    {{field.name}}
                    <br>
                </span>
                <br>

                دانشگاه ها :
                <br>
                <span :title="university.description" v-for="university in consultant.universities">
                    {{university.name}}
                    <br>
                </span>
                <br>

                کشور ها :
                <br>
                <span v-for="country in consultant.countries">
                    {{country.name}},
                </span>
            </p>

            <div class="footer">
                <a href="#" class="btn btn-just-icon btn-simple btn-twitter"><i
                        class="fa fa-linkedin"></i></a>
                <a href="#" class="btn btn-just-icon btn-simple btn-instagram"><i
                        class="fa fa-instagram"></i></a>
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
    .card {
        min-height: 400px;
    }

    .card-title {
        left: 0 !important;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>