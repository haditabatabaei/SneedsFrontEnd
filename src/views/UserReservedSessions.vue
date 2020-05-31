<template>
    <div class="itemBlock">
        <div class="authWrapper">
            <div class="authFormWrapper">
                <div class="authFormWrapper-switcher isansFont">
                    <button v-for="(filter, index) in availableFilters"
                            :key="index"
                            @click="filterBy(filter)"
                            class="switcher"
                            :class="[{'switcher--active' : activeFilter.value === filter.value}]">
                        {{filter.name}}
                    </button>
                </div>
            </div>
        </div>
        <div class="session-items">
            <p v-if="(startedSessions.length === 0 && activeFilter.value === 'finished') || (notStartedSessions.length === 0 && activeFilter.value === 'notstarted')" class="session-items--text isansFont">
                جلسه ای برای نمایش وجود ندارد.
            </p>
            <div v-if="activeFilter.value === 'notstarted'">
                <reserved-session-block
                        v-for="session in notStartedSessions"
                        :currentTime="currentTime"
                        :session="session"
                        :isConsultant="isConsultant"
                />
            </div>
            <div v-else-if="activeFilter.value === 'finished'">
                <reserved-session-block
                        v-for="session in startedSessions"
                        :currentTime="currentTime"
                        :session="session"
                        :isConsultant="isConsultant"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import ReservedSessionBlock from '@/components/Consultant/ReservedSessionBlock'

    export default {
        name: "UserReservedSessions",
        components: {"reserved-session-block": ReservedSessionBlock},
        data() {
            return {
                notStartedSessions: [],
                startedSessions: [],
                currentTime: null,
                activeFilter: {name: 'برگزار نشده', value: "notstarted"},
                availableFilters: [
                    {name: 'برگزار نشده', value: "notstarted"},
                    {name: 'برگزار شده', value: "finished"}
                ]
            }
        },

        computed: {
            isConsultant() {
                return this.$store.getters.getUserInfo.user_type === 'consultant';
            }
        },

        async created() {
            await this.getCurrentTimeInTimezone();
            await this.getAllSessions();
        },

        methods: {
            async getAllSessions() {
                try {
                    this.$loading(true);
                    this.startedSessions = [];
                    this.notStartedSessions = (await this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/?ordering=-start_time&used=false`, this.$store.getters.httpConfig)).data;
                    // console.log(this.reservedSessions);
                    // this.filterBy(this.activeFilter);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async getUsedSessions() {
                try {
                    this.$loading(true);
                    this.notStartedSessions  = [];
                    this.startedSessions = (await this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/?ordering=-start_time&used=true`, this.$store.getters.httpConfig)).data;
                    // console.log(this.reservedSessions);
                    // this.filterBy(this.activeFilter);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async getCurrentTimeInTimezone() {
                try {
                    this.$loading(true);
                    let timeString = ((await this.$api.get(
                        `${this.$store.getters.getApi}/utils/timezone-time/${this.$store.getters.timezoneSafe}/`,
                        this.$store.getters.httpConfig)).data).now;
                    this.currentTime = this.getJalali(timeString).locale(this.$store.getters.locale);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            filterBy(filter) {
                this.activeFilter = filter;
                switch (this.activeFilter.value) {
                    case 'notstarted' :
                        this.getAllSessions();
                        break;
                    case 'finished' :
                        this.getUsedSessions();
                        break;
                }
                this.getCurrentTimeInTimezone();
            },

            getJalali(date) {
                return jalali(date);
            },
        },
    }

</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .authFormWrapper-switcher {
        border-bottom: 3px solid #eee;
        min-height: 50px;
        margin: 15px 0 0 0;
        display: flex;
        align-items: stretch;
    }

    .authWrapper {
        width: 100%;
    }

    .switcher {
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        color: #aaa;
        background: none;
        border: none;
    }

    .switcher--active {
        border-bottom: 3px solid #9038CC;
        color: #9038CC;
    }

    .session-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        min-height: 400px;
    }

    .session-items--text {
        text-align: center;
        margin-top: 30px;
    }

</style>
