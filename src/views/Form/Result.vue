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
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                        <template v-slot:TAB1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                        <template v-slot:TAB2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </template>
                        <template v-slot:TAB3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
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
                                        class="chart-gauge"
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="10"
                                        :separator-step="0"
                                        :inner-radius="85"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="10"
                                />
                                <p class="charts-box-desc">
                                    <span>Low</span>
                                    <span>Admission</span>
                                    <span>High</span>
                                </p>
                            </div>
                            <div class="charts-box">
                                <c-gauge
                                        class="chart-gauge"
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="45"
                                        :separator-step="0"
                                        :inner-radius="85"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="10"
                                />
                                <p class="charts-box-desc">
                                    <span>Low</span>
                                    <span>Scholarship</span>
                                    <span>High</span>
                                </p>
                            </div>
                            <div class="charts-box">
                                <c-gauge
                                        class="chart-gauge"
                                        :start-angle="-90"
                                        :end-angle="90"
                                        :value="100"
                                        :separator-step="0"
                                        :inner-radius="85"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="10"
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
                                        :inner-radius="85"
                                        :min="0"
                                        :max="100"
                                        :gauge-color="[
                                            {offset: 0, color: '#891B1B'},
                                            {offset: 50, color: '#F4CA64'},
                                            {offset: 100, color: '#00A2C6'}
                                        ]"
                                        :scale-interval="10"
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

                <h2 class="chances-destinations-title">
                    Your Destinations
                </h2>

                <div class="grid-table-responsive">
                    <table class="grid-table">
                        <thead class="grid-head">
                        <tr class="grid-row">
                            <th class="grid-head-cell">Rank</th>
                            <th class="grid-head-cell">University</th>
                            <th class="grid-head-cell cell--centered">
                                Admission Chance
                                <i class="material-icons">airplanemode_active</i>
                            </th>
                            <th class="grid-head-cell cell--centered">
                                Scholarship
                                <i class="material-icons">attach_money</i>
                            </th>
                            <th class="grid-head-cell cell--centered">
                                Full-Fund
                                <i class="material-icons">attach_money</i>
                                <i class="material-icons">attach_money</i>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="grid-body">
                        <tr class="grid-row">
                            <td class="grid-cell">2</td>
                            <td class="grid-cell">Amirkabir University Of Technology</td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--medium">
                                    Medium
                                </p>
                            </td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--low">
                                    Low
                                </p>
                            </td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--high">
                                    High
                                </p>
                            </td>
                        </tr>
                        <tr class="grid-row">
                            <td class="grid-cell">2</td>
                            <td class="grid-cell">Amirkabir University Of Technology</td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--medium">
                                    Medium
                                </p>
                            </td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--low">
                                    Low
                                </p>
                            </td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--high">
                                    High
                                </p>
                            </td>
                        </tr>
                        <tr class="grid-row">
                            <td class="grid-cell">2</td>
                            <td class="grid-cell">Amirkabir University Of Technology</td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--medium">
                                    Medium
                                </p>
                            </td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--low">
                                    Low
                                </p>
                            </td>
                            <td class="grid-cell cell--centered">
                                <p class="chance-prob prob--high">
                                    High
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <router-link to="/" class="boost-link">
                    Boost my Chance!
                </router-link>

                <h2 class="chances-title">
                    Similar Admissions
                </h2>
                <p class="chances-desc">
                    Rejected and accepted students who had similar CVs.
                </p>

                <div class="grid-table-responsive">
                    <table class="grid-table table-similar">
                        <thead class="grid-head">
                        <tr class="grid-row">
                            <th class="grid-head-cell">Home University</th>
                            <th class="grid-head-cell">Dest. University</th>
                            <th class="grid-head-cell">
                                Latest Degree
                            </th>
                            <th class="grid-head-cell">
                                GPA (of 20)
                            </th>
                            <th class="grid-head-cell">
                                Scholarships
                            </th>
                        </tr>
                        </thead>
                        <tbody class="grid-body">
                        <tr class="grid-row">
                            <td class="grid-cell">Amirkabir University of Technology</td>
                            <td class="grid-cell">Amirkabir University Of Technology</td>
                            <td class="grid-cell">
                                Bachelor of computer science
                            </td>
                            <td class="grid-cell">
                                16.5
                            </td>
                            <td class="grid-cell">
                                23,000 $
                            </td>
                        </tr>
                        <tr class="grid-row">
                            <td class="grid-cell">Amirkabir University of Technology</td>
                            <td class="grid-cell">Amirkabir University Of Technology</td>
                            <td class="grid-cell">
                                Bachelor of computer science
                            </td>
                            <td class="grid-cell">
                                16.5
                            </td>
                            <td class="grid-cell">
                                23,000 $
                            </td>
                        </tr>
                        <tr class="grid-row">
                            <td class="grid-cell">Amirkabir University of Technology</td>
                            <td class="grid-cell">Amirkabir University Of Technology</td>
                            <td class="grid-cell">
                                Bachelor of computer science
                            </td>
                            <td class="grid-cell">
                                16.5
                            </td>
                            <td class="grid-cell">
                                23,000 $
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <router-link to="/" class="showMore-link">
                    Show More (Premium)
                </router-link>


                <div class="comparisons-head">
                    <div class="comp-title">
                        <h2 class="chances-title">
                            Comparisons
                        </h2>
                        <p class="chances-desc">
                            See exactly where you are among your competitors.
                        </p>
                    </div>
                    <div class="comparisons-dropdown">
                        <c-dropdown
                                label="Select category"
                                :defaultSelectedIndex="0"
                                @select-option="selectComparisonCategory"
                        />
                    </div>
                </div>
                <div class="chart-bar">
                    <c-bar-chart
                            :data="comparisonData"
                            :options="comparisonOptions"
                    />
                </div>
                <div class="chart-guide">
                    <div class="guide-item">
                        <span class="guide-progress">
                            <span class="guide-progress-value">

                            </span>
                        </span>
                        <div class="guide-item-content">
                            <mark class="guide-item-title">GPA:</mark>
                            <p class="guide-item-text">
                                Your GPA score is better than <strong class="guide-item-value">73%</strong> of the
                                participants.
                            </p>
                        </div>
                    </div>
                    <div class="guide-item">
                        <span class="guide-progress">
                            <span class="guide-progress-value">

                            </span>
                        </span>
                        <div class="guide-item-content">
                            <mark class="guide-item-title">GPA:</mark>
                            <p class="guide-item-text">
                                Your GPA score is better than <strong class="guide-item-value">73%</strong> of the
                                participants.
                            </p>
                        </div>
                    </div>
                    <div class="guide-item">
                        <span class="guide-progress">
                            <span class="guide-progress-value">

                            </span>
                        </span>
                        <div class="guide-item-content">
                            <mark class="guide-item-title">GPA:</mark>
                            <p class="guide-item-text">
                                Your GPA score is better than <strong class="guide-item-value">73%</strong> of the
                                participants.
                            </p>
                        </div>
                    </div>
                    <div class="guide-item">
                        <span class="guide-progress">
                            <span class="guide-progress-value">

                            </span>
                        </span>
                        <div class="guide-item-content">
                            <mark class="guide-item-title">GPA:</mark>
                            <p class="guide-item-text">
                                Your GPA score is better than <strong class="guide-item-value">73%</strong> of the
                                participants.
                            </p>
                        </div>
                    </div>
                    <div class="guide-item">
                        <span class="guide-progress">
                            <span class="guide-progress-value">

                            </span>
                        </span>
                        <div class="guide-item-content">
                            <mark class="guide-item-title">GPA:</mark>
                            <p class="guide-item-text">
                                Your GPA score is better than <strong class="guide-item-value">73%</strong> of the
                                participants.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <simple-block title-block="Olympiad" class="olympiad">
                <template v-slot:data>
                    <ul class="items">
                        <li class="item">Having olympiad exp.</li>
                        <li class="item">Missing olympiad exp.</li>
                    </ul>
                </template>
                <template v-slot:image>
                    <c-circle-chart
                            :data="rankData"
                            :options="rankOptions"
                    />
                </template>
            </simple-block>
            <simple-block title-block="Recommendation Letter" class="recom">
                <template v-slot:data>
                    <ul class="items">
                        <li class="item">Having recommendation letter.</li>
                        <li class="item">Missing recommendation letter.</li>
                    </ul>
                </template>
                <template v-slot:image>
                    <c-circle-chart
                            :data="rankData"
                            :options="rankOptions"
                    />
                </template>
            </simple-block>
            <simple-block title-block="Papers Type" class="papers">
                <template v-slot:data>
                    <ul class="items">
                        <li class="item">Conference (75%)</li>
                        <li class="item">Journal (25%)</li>
                    </ul>
                </template>
                <template v-slot:image>
                    <c-circle-chart
                            :data="rankData"
                            :options="rankOptions"
                    />
                </template>
            </simple-block>
            <simple-block title-block="Papers Impact" class="impact">
                <template v-slot:data>
                    <ul class="items">
                        <li class="item">1-3 (65%)</li>
                        <li class="item">4-10 (35%)</li>
                        <li class="item">+10 (20%)</li>
                    </ul>
                </template>
                <template v-slot:image>
                    <c-circle-chart
                            :data="rankData"
                            :options="rankOptions"
                    />
                </template>
            </simple-block>
            <section class="premium">
                <h1 class="premium-title">Premium Admission Chance Calculation</h1>
                <span class="prem-divider"></span>
                <p class="prem-desc">Our experts review your CV and help you understanding your exact admission
                    chances.</p>
                <router-link to="/" class="prem-link">Start Now</router-link>
            </section>
        </section>
    </section>
</template>

<script>
    import SimpleBlockScore from "@/components/FormResult/SimpleBlockScore";
    import ScoreOutOfMax from "@/components/FormResult/ScoreOutOfMax";
    import CircleChart from "@/components/FormResult/CircleChart";
    import BarChart from "@/components/FormResult/BarChart";
    import RadarChart from "@/components/FormResult/RadarChart";
    import ResultTab from "@/components/FormResult/ResultTab";
    import VerticalTab from "@/components/FormResult/VerticalTab";
    import DropdownInput from "@/components/Form/DropdownInput";
    import { VueSvgGauge } from 'vue-svg-gauge'

    export default {
        name: "Result",
        components: {
            "simple-block": SimpleBlockScore,
            "score-of-max": ScoreOutOfMax,
            "c-circle-chart": CircleChart,
            "c-radar-chart": RadarChart,
            "c-bar-chart": BarChart,
            "result-tab": ResultTab,
            "vertical-tabs": VerticalTab,
            "c-dropdown": DropdownInput,
            "c-gauge": VueSvgGauge
        },
        data() {
            return {
                comparisonCategory: null,
                comparisonData: {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8],
                    datasets: [
                        {
                            label: 'GPA',
                            backgroundColor: [
                                '#F2F2F2',
                                '#F2F2F2',
                                '#009FB3',
                                '#F2F2F2',
                                '#F2F2F2',
                                '#F2F2F2',
                                '#F2F2F2',
                                '#F2F2F2',
                            ],
                            barThickness: 'flex',
                            hoverBackgroundColor: [
                                '#DDEEFC',
                                '#DDEEFC',
                                '#009FB3',
                                '#DDEEFC',
                                '#DDEEFC',
                                '#DDEEFC',
                                '#DDEEFC',
                                '#DDEEFC',
                            ],
                            maxBarThickness: 30,
                            data: [20, 40, 60, 20, 35, 19, 10, 5]
                        }
                    ]
                },

                comparisonOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'GPA'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number'
                            },
                        }]
                    },
                },

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
                    responsive: true,
                    maintainAspectRatio: true,
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
        methods: {
            selectComparisonCategory(option) {
                this.comparisonCategory = option;
            }
        },
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
        grid-template-areas: "rank score" "grades grades" "chances chances" "olympiad recom" "paperType impactFactor" "prem prem";
        grid-row-gap: 40px;
        grid-column-gap: 20px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
    }

    .grades {
        grid-area: grades;
        display: grid;
        grid-template-areas: "title title" "tabs radar";
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
        /*height: 500px;*/
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
        margin-top: 50px;
    }

    .chances-tabs-charts {
        display: grid;
        grid-template-areas: "chart chart chart";
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-gap: 30px;
    }

    .charts-box {
        display: flex;
        flex-direction: column;
    }

    .charts-box-desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
    }

    .chances-destinations-title {
        color: #374957;
        font-size: 26px;
        margin: 50px 0 10px 10px;
        font-weight: normal;
    }

    .grid-table {
        display: grid;
        border-collapse: collapse;
        grid-template-columns: repeat(5, 1fr);
    }

    .grid-head,
    .grid-body,
    .grid-row {
        display: contents;
    }

    .grid-head-cell,
    .grid-cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 10px;
    }

    .grid-head-cell {
        color: #707070;
        font-weight: bold;
        display: flex;
        align-items: center;
    }

    .grid-head-cell i {
        color: #009FB3;
        border: 3px solid #009FB3;
        border-radius: 50%;
        margin-left: 5px;
        font-size: 18px;
        padding: 1px;
    }

    .grid-head-cell:last-child {
        border: 0;
    }

    .grid-cell {
        color: #808080;
    }

    .grid-row:nth-child(even) .grid-cell {
        background: #f8f8f8;
    }

    .chance-prob {
        background-color: red;
        color: black;
        border-radius: 20px;
        display: inline-block;
        font-size: 13px;
        font-weight: bold;
        padding: 5px 25px;
    }

    .cell--centered {
        text-align: center;
        justify-content: center;
    }

    .prob--medium {
        background-color: #FBF8DE;
        color: #6C2C10;
    }

    .prob--low {
        background-color: #FFECEC;
        color: #611818;
    }

    .prob--high {
        background-color: #E7FFFE;
        color: #173F5F;
    }

    .boost-link {
        background-color: #008DB8;
        color: #FFFFFF;
        align-self: center;
        border-radius: 10px;
        padding: 10px 25px;
        margin: 100px 0;
    }

    .table-similar {
        margin-top: 50px;
    }

    .showMore-link {
        align-self: center;
        text-decoration: underline;
        color: #009FB3;
        margin: 100px 0;
    }

    .comparisons-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .comparisons-dropdown {
        width: 50%;
        max-width: 250px;
    }

    .chart-bar {
        position: relative;
        max-height: 400px;
        margin-top: 70px;
    }

    .chart-guide {
        display: flex;
        flex-direction: column;
        margin: 20px;
    }

    .guide-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .guide-progress {
        width: 80px;
        height: 12px;
        border-radius: 20px;
        background-color: #F0E6FA;
        position: relative;
    }

    .guide-progress-value {
        position: absolute;
        left: 0;
        height: 12px;
        border-radius: 20px;
        width: 10%;
        background-color: #A347FF;
    }

    .guide-item-content {
        display: flex;
        margin-left: 10px;
    }

    .guide-item-title {
        background: none;
        padding: 0;
        font-weight: bold;
        color: #585858;
        margin-right: 5px;
    }

    .guide-item-text {
        color: #585858;
    }

    .guide-item-value {
        font-weight: bold;
    }

    .items {
        list-style: none;
        color: #173F5F;
        margin-left: 20px;
    }

    .item {
        margin-bottom: 10px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }

    .item::before {
        content: " ";
        position: absolute;
        left: -10px;
        top: 8px;
        border-radius: 50%;
        height: 10px;
        width: 10px;
        background-color: #007994;
    }

    .item:last-child {
        margin-bottom: 0;
    }

    .premium {
        grid-area: prem;
        height: 300px;
        border-radius: 15px;
        background: transparent linear-gradient(180deg, #009D83 0%, #007694 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .premium-title {
        color: white;
        font-size: 24px;
        margin-top: 40px;
    }

    .prem-divider {
        width: 80px;
        height: 3px;
        border-radius: 5px;
        margin: 20px 0 15px 0;
        background-color: #FFD869;
    }

    .prem-desc {
        color: white;
    }

    .prem-link {
        justify-self: flex-end;
        margin: auto 0 40px 0;
        color: #007994;
        background-color: white;
        border-radius: 15px;
        padding: 10px 30px;
        font-weight: bold;
        box-shadow: 0 3px 6px #00000029;
    }

    .grid-table-responsive {
        /*overflow: auto;*/
        /*width: 100%;*/
    }

    @media only screen and (max-width: 991.8px) {
        .result-container {
            grid-template-areas: "rank" "score" "grades" "chances" "olympiad" "recom" "paperType" "impactFacotr" "prem";
            grid-template-columns: 100%;
            grid-template-rows: auto;
        }

        .grades {
            grid-template-areas: "title" "tabs" "radar";
            grid-template-columns: 100%;
            grid-template-rows: auto;
        }

        .grades-radar {
            margin-left: 0;
        }

        .charts-box-desc span:first-child {
            display: none;
        }

        .charts-box-desc span:last-child {
            display: none;
        }

        .charts-box-desc {
            justify-content: center;
        }

        .grid-head-cell i {
            display: none;
        }

        .grid-table {
            /*min-width: 400px;*/
            overflow: auto;
        }
    }

    @media only screen and (max-width: 767.8px) {
        .chances-tabs-charts {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }

        .charts-box {
            max-width: 200px;
            margin-bottom: 10px;
        }

        .charts-box-desc {
            margin-top: 5px;
        }

        .grid-table {
            grid-template-columns: repeat(5, 150px);
        }

        .premium {
            padding: 20px;
        }
    }

    @media only screen and (max-width: 533.8px) {
        .comparisons-head {
            flex-direction: column;
            align-items: flex-start;
        }

        .comparisons-dropdown {
            width: 100%;
            max-width: unset;
            margin-top: 10px;
        }

        .chances-title {
            margin-left: 0;
        }

        .chances-desc {
            margin-left: 0;
        }

        .guide-progress {
            display: none;
        }

        .guide-progress-value {
            display: none;
        }

        .guide-item-content {
            margin-left: 0;
        }

        .grades-radar {
            position: relative;
            width: 100%;
        }

        .grades-radar-chart {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
        }

    }

</style>