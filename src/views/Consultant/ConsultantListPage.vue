<template>
    <div>
        <!--        {{$route.params.pageNumber}}-->
    </div>
</template>

<script>
    export default {
        name: "ConsultantListPage",
        data() {
            return {}
        },
        props: {

        },
        methods: {
            pageIsValid() {
                return !isNaN(this.$route.params.pageNumber);
            }
        },
        created() {
            if (!this.pageIsValid()) {
                this.$router.push('/consultants/page/1');
            }
        }
    }
</script>

<style scoped>

</style>