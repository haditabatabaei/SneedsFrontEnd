<script>
    import { Pie } from 'vue-chartjs'
    export default {
        extends: Pie,
        name: "CircleChart",
        data() {
            return {

            }
        },
        props: {
            data: {
                type: Object,
                default: () => null,
            },
            options: {
                type: Object,
                default: () => null
            }
        },
        mounted() {
            this.renderChart(this.data, this.options);
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>

</style>