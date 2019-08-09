<template>
    <div class="item">
        <i class="material-icons">{{item.icon}}</i>
        <p class="isansFont">{{item.text}}</p>
    </div>
</template>

<script>
    export default {
        name: "ConsultantInfoItem",
        props : {
            item: {},
        }
    }
</script>

<style scoped>
    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        margin-left: 10px;
    }

    .item p {
        color: #B4B4B4;
        margin-top: 10px;
    }

    .item i.material-icons {
        margin-top: 10px;
        color: #B4B4B4;
    }
</style>