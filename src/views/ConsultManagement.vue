<template>
    <div class="main profile-page">
        <div class="profile-content">
            <div class="container-fluid">
                <div class="row">
                    <consultant-calendar :consultantId="$store.getters.getUserInfo.consultant.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ConsultantCalendar from '@/components/Consultant/ConsultantCalendar'

    export default {
        name: "ConsultManagement",
        components: {ConsultantCalendar},
        data() {
            return {

            }
        },
        mounted() {
        },
        methods: {

        },

        computed: {
            user: function () {
                return this.$store.getters.getUser;
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo;
            }
        }
    }
</script>

<style scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    .stickyPanel {
        position: sticky;
        top: 150px;
        margin-top: 60px;
    }

    .main {
        margin-top:30px;
        border-radius: 15px;
        margin-bottom: 30px;
    }

    @media only screen and (min-width: 767px) and (max-width: 992px) {

        .form-group button {
            font-size: 9px;
        }
    }

    @media only screen and (min-width: 0) and (max-width: 766.8px) {
        .stickyPanel {
            position: static;
        }

        .form-group button {
            font-size: 9px;
        }
    }

</style>
