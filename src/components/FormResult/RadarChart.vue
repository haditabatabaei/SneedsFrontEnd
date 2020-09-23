<script>
    import { Radar } from 'vue-chartjs';
    export default {
        extends: Radar,
        name: "RadarChart",
        data() {
            return {}
        },
        props: {
            options: {
                type: Object,
                default: () => null
            },
            data: {
                type: Object,
                default: () => null
            }
        },
        methods: {},
        mounted() {
            this.renderChart(this.data, this.options);
    }
    }
</script>

<style scoped>

</style>