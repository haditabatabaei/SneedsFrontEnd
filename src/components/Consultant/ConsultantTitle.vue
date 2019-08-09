<template>
    <div class="profile">
        <div class="avatar">
            <img :src="consultant.profile_picture"
                 :alt="consultant.first_name + ' ' + consultant.last_name"
                 class="img-circle img-responsive img-raised">
        </div>
        <div class="name">
            <h3 class="title isansFont">
                {{consultant.first_name + ' ' + consultant.last_name}}
            </h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConsultantTitle",
        props : {
            consultant : {},
        }
    }
</script>

<style scoped>

</style>