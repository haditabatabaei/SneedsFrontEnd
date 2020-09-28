<script>
    import { Bar, mixins } from 'vue-chartjs'
    export default {
        name: "BarChart",
        extends: Bar,
        mixins: [mixins.reactiveProp],
        props: ['chartData', 'options'],
        watch: {
            options(newVal) {
                this.renderChart(this.chartData, newVal);
            }
        },
        mounted() {
            this.renderChart(this.chartData, this.options);
        }
    }
</script>

<style scoped>

</style>