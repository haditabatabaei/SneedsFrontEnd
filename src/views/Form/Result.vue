<template>
    <section class="result gadugiFont">
        <section class="result-container">
            <simple-block title-block="Your Rank" class="rank">
                <template v-slot:data>
                    <score-of-max
                            :score-value="120"
                            :score-max="1000"
                    />
                </template>
                <template v-slot:image>
                    <c-circle-chart
                            :data="rankData"
                            :options="rankOptions"
                    />
                </template>
            </simple-block>
            <simple-block title-block="Your Score" class="score">
                <template v-slot:data>
                    <score-of-max
                            :score-value="3.5"
                            :score-max="5"
                    />
                </template>
                <template v-slot:image>
                    <c-circle-chart
                            :data="scoreData"
                            :options="scoreOptions"
                    />
                </template>
            </simple-block>
            <section class="grades">
                <div class="grades-tabs">
                    <h1 class="grades-title">
                        Your Grades
                    </h1>
                    <result-tab :tabs="resultTabs">
                        <template v-slot:TAB0>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                        <template v-slot:TAB1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                        <template v-slot:TAB2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                        <template v-slot:TAB3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                    </result-tab>
                </div>
                <div class="grades-radar">
                    <c-radar-chart
                        :data="radarData"
                        :options="radarOptions"
                        class="grades-radar-chart"
                    />
                    <p class="grades-radar-text">Total score: 3.5/5</p>
                </div>
            </section>
            <section class="chances">
                <h1 class="chances-title">
                    Admissions Chances
                </h1>
                <p class="chances-desc">
                    Remember! you cant fully rely on these results. talk to
                    <router-link class="chances-desc-link" to="/consultants">our experts</router-link>
                    for more information.
                </p>
                <vertical-tabs
                    :tabs="verticalTabs"
                    class="chances-tabs"
                >
                    <template v-slot:TAB0>
                        <div class="chances-tabs-charts">
                            <div class="charts-box">
                                <c-gauge
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="10"
                                        :separator-step="0"
                                        :inner-radius="80"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="0"
                                />
                                <p class="charts-box-desc">
                                    <span>Low</span>
                                    <span>Admission</span>
                                    <span>High</span>
                                </p>
                            </div>
                            <div class="charts-box">
                                <c-gauge
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="45"
                                        :separator-step="0"
                                        :inner-radius="80"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="0"
                                />
                                <p class="charts-box-desc">
                                    <span>Low</span>
                                    <span>Scholarship</span>
                                    <span>High</span>
                                </p>
                            </div>
                            <div class="charts-box">
                                <c-gauge
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="100"
                                        :separator-step="0"
                                        :inner-radius="80"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="0"
                                />
                                <p class="charts-box-desc">
                                    <span>Low</span>
                                    <span>Full-Fund</span>
                                    <span>High</span>
                                </p>
                            </div>
                        </div>
                    </template>
                    <template v-slot:TAB1>
                        <div class="chances-tabs-charts">
                            <div class="charts-box">
                                <c-gauge
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="100"
                                        :separator-step="0"
                                        :inner-radius="80"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="0"
                                />
                                <p class="charts-box-desc">
                                    <span>Low</span>
                                    <span>Title</span>
                                    <span>High</span>
                                </p>
                            </div>
                        </div>
                    </template>
                </vertical-tabs>

            </section>
        </section>
    </section>
</template>

<script>
    import SimpleBlockScore from "@/components/FormResult/SimpleBlockScore";
    import ScoreOutOfMax from "@/components/FormResult/ScoreOutOfMax";
    import CircleChart from "@/components/FormResult/CircleChart";
    import { VueSvgGauge } from 'vue-svg-gauge'
    import RadarChart from "@/components/FormResult/RadarChart";
    import ResultTab from "@/components/FormResult/ResultTab";
    import VerticalTab from "@/components/FormResult/VerticalTab";

    export default {
        name: "Result",
        components: {
            "simple-block": SimpleBlockScore,
            "score-of-max": ScoreOutOfMax,
            "c-circle-chart": CircleChart,
            "c-radar-chart": RadarChart,
            "result-tab": ResultTab,
            "vertical-tabs": VerticalTab,
            "c-gauge": VueSvgGauge
        },
        data() {
            return {
                resultTabs: [
                    {title: 'GPA & UNIVERSITY'},
                    {title: 'LANG TESTS'},
                    {title: 'PUBLICATIONS'},
                    {title: 'AGE & GAP'},
                ],
                verticalTabs: [
                    {title: '0-150'},
                    {title: '151-200'},
                    {title: '201-250'},
                    {title: '251+'},
                ],
                radarData: {
                    labels: ['Universities', 'GPA', 'Publications', 'Others', 'Languages'],
                    datasets: [
                        {
                            data: [10, 20, 20, 30, 20],
                            backgroundColor: ['#009FB3', '#009FB3', '#009FB3', '#009FB3', '#009FB3', '#009FB3'],
                            label: 'Student dataset'
                        }
                    ]
                },
                radarOptions: {
                    legend: {
                        display: false
                    }
                },
                rankData: {
                    datasets: [
                        {
                            data: [30, 70],
                            backgroundColor: ['#00BFD6', '#007994'],
                            label: 'Rank'
                        }
                    ],
                    labels: ['You ranked Top', 'Other']
                },
                rankOptions: {
                    legend: {
                        display: false
                    }
                },
                scoreData: {
                    datasets: [
                        {
                            data: [20, 10],
                            backgroundColor: ['#00BFD6', '#007994'],
                            label: 'Rank'
                        }
                    ],
                    labels: ['You ranked Top', 'Other']
                },
                scoreOptions: {
                    legend: {
                        display: false
                    }
                }
            }
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped>
    .result {
        display: flex;
        justify-content: center;
        min-height: 100vh;
        background-color: #F5F7FA;
    }

    .result-container {
        width: 100%;
        max-width: 1170px;
        margin-top: 50px;
        display: grid;
        grid-template-areas:
                "rank score"
                "grades grades"
                "chances chances"
                "olympiad recom"
                "paperType impactFactor"
                "prem prem";
        grid-gap: 20px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
    }

    .grades {
        grid-area: grades;
        display: grid;
        grid-template-areas:
                "title title"
                "tabs radar";
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr;
        padding: 20px;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 25px 30px #0000001A;
    }
    .grades-title {
        grid-area: title;
        color: #374957;
        font-size: 26px;
        margin: 0 0 30px 10px;
    }
    .grades-tabs {
        grid-area: tabs;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .grades-radar {
        grid-area: radar;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #F5F5F5;
        border-radius: 24px;
        margin-left: 20px;
    }

    .grades-radar-text {
        font-weight: bold;
        margin-bottom: 20px;
        color: #303143;
    }

    .chances {
        grid-area: chances;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 25px 30px #0000001A;
        padding: 20px;
        height: 500px;

        display: flex;
        flex-direction: column;
    }

    .chances-title {
        color: #374957;
        font-size: 26px;
        margin: 0 0 10px 10px;
    }

    .chances-desc {
        color: #707070;
        margin-left: 10px;
    }

    .chances-desc-link {
        font-weight: bold;
        text-decoration: underline;
        color: #707070;
    }

    .chances-tabs {
        margin-top: 20px;
    }

    .chances-tabs-charts {
        display: grid;
        grid-template-areas: "chart chart chart";
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
    }

    .charts-box {
        display: flex;
        flex-direction: column;
    }

    .charts-box-desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }











</style>