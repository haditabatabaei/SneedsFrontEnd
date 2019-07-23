<template>
    <div class="icon-round">

    </div>
</template>

<script>
    export default {
        name: "CirlceLoading"
    }
</script>

<style scoped>

    .icon-round {
        width: 100px;
        height: 100px;
        position: fixed;
        top: 50%;
        left: 50%;
        background-color: red;
        transform: translate(-50%, -50%);
        z-index: 9999999;
        border-radius: 50%;
    }
</style>