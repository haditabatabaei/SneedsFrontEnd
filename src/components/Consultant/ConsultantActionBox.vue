<template>
    <div class="actionBox isansFont">
        <a :href="consultant.resume" class="btn btn-simple btn-default mb-0" target="_blank" v-if="consultant.resume">
            <i class="material-icons" style="color:#b3b3b3">done</i>
            دانلود رزومه
        </a>
        <a href="#" class="btn btn-simple btn-default mt-0">
            <i class="material-icons" style="color:#ff9494">play_circle_filled</i>
            مشاهده مصاحبه با {{consultant.first_name + ' ' + consultant.last_name}}
        </a>
    </div>
</template>

<script>
    export default {
        name: "ConsultantActionBox",
        props: {
            consultant: {}
        }
    }
</script>

<style scoped>
    .actionBox {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
    }

    .actionBox .btn {
        padding: 5px;
    }

</style>