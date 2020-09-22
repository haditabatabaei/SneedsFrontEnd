<template>
    <div class="scoreofmax gadugiFont">
        <p class="score-value">{{scoreValue}}</p>
        <p class="score-max">/{{scoreMax}}</p>
    </div>
</template>

<script>
    export default {
        name: "ScoreOutOfMax",
        data() {
            return {}
        },
        props: {
            scoreValue: {
                type: Number
            },
            scoreMax: {
                type: Number
            }
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>
    .scoreofmax {
        display: flex;
    }

    .score-value {
        color: #173F5F;
        font-size: 32px;
        font-weight: 900;
    }

    .score-max {
        color: #007994;
        font-size: 18px;
        font-weight: 900;
        margin-left: 2px;
        align-self: flex-end;
        margin-bottom: 5px;
    }
</style>