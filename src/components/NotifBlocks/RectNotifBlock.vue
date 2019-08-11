<template>
    <div class="alert" :class="[ 'alert-' + type , {'content-round' : borderRound}]">
        <div class="container-fluid isansFont">
            <div class="alert-icon">
                <img src="http://193.176.241.131/sneedsAssets/img/loading.svg" alt="loading icon" class="loadingIcon" v-if="type === 'warning'">
                <i class="material-icons" v-else-if="type === 'success'">done</i>
                <i class="material-icons" v-else="type === 'danger' ">block</i>
            </div>
            {{message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "RectNotifBlock",
        props: {
            message: '',
            type: '',
            borderRound: true,
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>