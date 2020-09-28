<script>
    import {Radar, mixins} from 'vue-chartjs';

    export default {
        extends: Radar,
        mixins: [mixins.reactiveProp],
        name: "RadarChart",
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