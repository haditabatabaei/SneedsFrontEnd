<template>
    <div class="simple-block gadugiFont">
        <div class="simple-block-title">
            <h1 class="simple-block-title-text">
                {{titleBlock}}
            </h1>
        </div>
        <div class="simple-block-content">
            <div class="simple-block-data">
                <slot name="data"></slot>
            </div>
            <div class="simple-block-image">
                <slot name="image"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimpleBlockScore",
        data() {
            return {}
        },
        methods: {},
        props: {
            titleBlock: {
                type: String
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    .simple-block   {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 25px 30px #0000001A;
        height: fit-content;

        display: flex;
        flex-direction: column;
    }

    .simple-block-title {
        min-height: 50px;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        align-items: center;
    }

    .simple-block-title-text {
        color: #707070;
        font-weight: lighter;
        margin-left: 20px;
    }

    .simple-block-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .simple-block-data {
        margin: 20px;
    }

    .simple-block-image {
        margin: 20px;
        width: 150px;
        height: 150px;
    }

    @media only screen and (max-width: 533.8px) {
        .simple-block-content {
            flex-direction: column-reverse;
        }
    }
</style>