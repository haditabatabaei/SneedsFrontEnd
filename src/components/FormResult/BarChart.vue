<script>
    import { Bar, mixins } from 'vue-chartjs'
    export default {
        name: "BarChart",
        extends: Bar,
        mixins: [mixins.reactiveProp],
        props: ['chartData', 'options'],
        watch: {
            options(newVal) {
                this._chart.destroy();
                this.renderChart(this.chartData, newVal);
            }
        },
        methods: {},
        mounted() {
            this.renderChart(this.chartData, this.options);
        }
    }
</script>

<style scoped>

</style>