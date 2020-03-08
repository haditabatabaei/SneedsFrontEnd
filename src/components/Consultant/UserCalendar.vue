<template>
    <div v-if="consultantId" class="userCalendarWrapper">
        <div class="userCalendarWeekWrapper isansFont--faNum">
            <button @click.prevent="showPrevWeek()">
                <i class="material-icons">keyboard_arrow_right</i>
                هفته قبلی
            </button>
            <button @click.prevent="showNextWeek()">
                هفته بعدی
                <i class="material-icons">keyboard_arrow_left</i>
            </button>
        </div>
        <div class="calendarTopWrapper">

            <div class="calendarGuideWrapper">
                <span class="isansFont text-sm">راهنمایی تقویم :</span>
                <span class="btn btn-round btn-sm btn-sample timeNotAvailable isansFont">بسته</span>
                <span class="btn btn-round btn-sm btn-sample timeOpen isansFont">باز</span>
                <span class="btn btn-round btn-sm btn-sample timeSelected isansFont">انتخاب شده</span>
                <span class="btn btn-round btn-sm btn-simple timeReserved isansFont--faNum">رزرو شده</span>
            </div>
        </div>
        <div class="myTable isansFont" v-if="days.length != 0">
            <div class="myTableRow firstRow">
                <div class="myTableCell">ساعت / روز</div>
                <div class="myTableCell dayTitleCell" v-for="(day, index) in tableDataArray" :key="index">
                    <p>{{day.format('dddd')}}</p>
                    <p class="monthSmallText">{{day.format('DD MMMM')}}</p>
                </div>
            </div>
            <div v-for="index in 16" :key="index" class="myTableRow">
                <div class="myTableCell firstCellInRow">
                    {{ (index - 1 + 8) + ":00" + " تا " + (index - 1 + 1 + 8) + ":00"}}
                </div>
                <div class="myTableLargerCell myTableSemiRow" v-for="rowIndex in 7" :key="rowIndex">
                    <div
                        v-if="days[rowIndex - 1].clone().hour(index + 7).isBefore(justNowDate) && !isReserved(days[rowIndex - 1].clone().hour(index + 7), days[rowIndex - 1].clone().hour(index + 8))"
                        class="myTableSemiCell timeNotAvailable"
                    ></div>

                    <div
                        v-else-if="isInConsultantTime(days[rowIndex - 1].clone().hour(index + 7), days[rowIndex - 1].clone().hour(index + 8))"
                        @click="itemClickHandler(days[rowIndex - 1].clone().hour(index + 7).toISOString(),days[rowIndex - 1].clone().hour(index + 8).toISOString())"
                        :class="[
                            {'timeOpen' : !isDatePresentOnSelectedList($store.getters.getStash, days[rowIndex - 1].clone().hour(index + 7).toISOString(),days[rowIndex - 1].clone().hour(index + 8).toISOString())},
                            {'timeSelected' : isDatePresentOnSelectedList($store.getters.getStash, days[rowIndex - 1].clone().hour(index + 7).toISOString(),days[rowIndex - 1].clone().hour(index + 8).toISOString())},
                        ]"
                    ></div>

                    <div
                        v-else-if="isReserved(days[rowIndex - 1].clone().hour(index + 7), days[rowIndex - 1].clone().hour(index + 8))" class="myTableSemiCell timeReserved"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import {required, between, numeric} from 'vuelidate/lib/validators'

    export default {
        name: "Calendar",
        validations: {
            selectedPrice: {required, between: between(1000, 100000), numeric}
        },
        props: {
            consultantId: {
                type : Number || String
            },
        },
        data() {
            return {
                slots: [],
                soldSlots : [],
                days: [],
                selectedDates: [],
                shownDate: {},
                justNowDate: jalali().locale('fa'),
                tableDataArray: [],
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            },
        },
        created() {
            this.initComp();
        },

        methods: {
            getJalali: function (date) {
                return jalali(date);
            },

            async initComp() {
                try {
                    this.$loading(true);
                    let result = await axios.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${this.consultantId}`);
                    // let soldResult = await axios.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig);
                    console.log(result);
                    // console.log(soldResult);
                    this.slots = result.data;
                    // this.soldSlots = soldResult.data;
                    this.$emit('get-slots', this.slots);
                    this.shownDate = jalali().locale('fa');
                    this.handleWeek(this.shownDate);
                } catch (e) {
                    console.log(e);
                    if (e.response)
                        console.log(e.response);
                } finally {
                    this.$loading(false);
                }
            },

            getTimeStampByIndex(dayIndexInArr, timeIndex, hourToAdd, getIsoString) {
                if (getIsoString) {
                    return this.days[dayIndexInArr - 1].clone().hour(Number(timeIndex) + Number(hourToAdd)).toISOString();
                } else {
                    return this.days[dayIndexInArr - 1].clone().hour(Number(timeIndex) + Number(hourToAdd));
                }
            },

            itemClickHandler(datestart, dateend) {
                //check see if this time is not added to the list
                if (!this.isDatePresentOnSelectedList(this.$store.getters.getStash, datestart, dateend)) {
                    this.$store.commit('addItemToStash', {'datestart': datestart, 'dateend': dateend})
                }// else means that element is present in the list, so we will remove it from the list
                else {
                    this.$store.commit('removeItemFromStash', {'datestart': datestart, 'dateend': dateend});
                }
                console.log(this.$store.getters.getStash);
            },

            isDatePresentOnSelectedList(listToCheck, datestart, dateend) {
                for (let i = 0; i < listToCheck.length; i++) {
                    if (listToCheck[i].datestart == datestart && listToCheck[i].dateend == dateend)
                        return true;
                }
                return false;
            },

            showWeek: function (numOfWeek, siblingStatus) {
                if (siblingStatus === 'prev') {
                    this.handleWeek(this.shownDate.subtract(Number(numOfWeek) * 7, 'd').locale('fa'));
                } else if (siblingStatus === 'next') {
                    this.handleWeek(this.shownDate.add(Number(numOfWeek) * 7, 'd').locale('fa'));
                }
            },

            showPrevWeek: function () {
                this.showWeek(1, 'prev');
            },

            showNextWeek: function () {
                this.showWeek(1, 'next');
            },

            generateSaturdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(0 - date.weekday(), 'd');
            },

            generateSundayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(1 - date.weekday(), 'd');
            },

            generateMondayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(2 - date.weekday(), 'd');
            },

            generateTuesdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(3 - date.weekday(), 'd');
            },

            generateWednesdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(4 - date.weekday(), 'd');
            },

            generateThursdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(5 - date.weekday(), 'd');
            },

            generateFridayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(6 - date.weekday(), 'd');
            },

            handleWeek(now) {
                console.log(now.locale('fa').weekday());
                this.days = [];
                this.days.push(this.generateSaturdayNew(now));
                this.days.push(this.generateSundayNew(now));
                this.days.push(this.generateMondayNew(now));
                this.days.push(this.generateTuesdayNew(now));
                this.days.push(this.generateWednesdayNew(now));
                this.days.push(this.generateThursdayNew(now));
                this.days.push(this.generateFridayNew(now));
                console.log(this.days);
                for (let i = 0; i < this.days.length; i++) {
                    console.log(this.days[i].format('dddd'));
                    this.tableDataArray[i] = this.days[i];
                }
            },

            isReserved(cellStartDate, cellEndDate) {
                for(let slot of this.soldSlots) {
                    if (cellStartDate.isSame(jalali(slot.start_time), 'minutes') && cellEndDate.isSame(jalali(slot.end_time), 'minutes')) {
                        return true;
                    }
                }
                return false;
            },

            isInConsultantTime(cellStartDate, cellEndDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (cellStartDate.isSame(jalali(this.slots[i].start_time), 'minute') && cellEndDate.isSame(jalali(this.slots[i].end_time), 'minute')) {
                        return true;
                    }
                }
                return false;
            },
        },

    }
</script>

<style scoped>

    .userCalendarWrapper {
        width: 100%;
        background-color: white;
        border: 1.5px solid #ccc;
        min-height: 300px;

        border-radius: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
    }

    .userCalendarWeekWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        width: 100%;
    }

    .userCalendarWeekWrapper button {
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        background-color: #f3f3f3;
        border-radius: 10px;
        border: none;
        padding: 5px 15px;
        font-size: 13px;

        color: #666;
    }

    .userCalendarWeekWrapper button:hover {
        background-color: #e1e1e1;
    }

    .userCalendarWeekWrapper button:first-child {
        margin-left: 10px;
    }

    .selectedDateBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #f9f9f9;
        border-top: 1px solid #e2e2e2;
        min-height: 60px;
        position: fixed;
        left: 0;
        bottom: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .selectedDateBlockContent {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .selectedDateBlock {
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #a8a8a8;
    }

    .selectedDateBlock button {
        margin-right: 5px;
    }

    .selectedDateBlock:last-child {
        border-left: none;
    }

    .selectedDateBlock p {
        font-size: 12px;
        padding: 10px;
        margin-bottom: 0;
    }

    .selectedDateBlockHeader p {
        margin-top: 20px;
    }

    .selectedDateBlockFooter {
        display: flex;
        align-items: center;
        justify-content: space-around;
        align-self: stretch;
        flex-wrap: wrap;
    }

    .btn-sample {
        cursor: default !important;
    }

    .btn-sample.text-dark {
        color: #b3b3b3;
    }

    .btn-sample.text-dark:hover {
        color: #b3b3b3;
    }

    .timeNotAvailable {
        background-color: #fafafa;
        color: #ccc;
    }

    .timeOpen {
        border:2px solid #6ed7d3;
        transition: all 80ms;
        background-color: white;
        cursor: pointer;
        color: #6ed7d3;
    }

    .timeOpen:hover {
        border-width: 4px;
    }

    .timeReserved {
        border:2px solid #c9737c;
        color: #c9737c;
    }

    .timeSelected {
        background-color: #6ed7d3 !important;
        cursor: pointer;
    }

    .calendarTopWrapper {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 20px;
        position: sticky;
        top: 70px;
        background-color: white;
        width: 100%;
    }

    .myTable {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        width: 100%;
    }

    .myTableRow {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-height: 50px;
        width: 100%;
    }

    .myTableLargerCell {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .myTableRow > div {
        width: calc(100% / 8);
        min-height: 50px;
    }

    .myTableCell, .myTableLargerCell div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dayTitleCell {
        flex-direction: column;
    }

    .dayTitleCell p {
        margin: 0;
        color: #4D4D4D;
        font-size: 12px;
    }

    .dayTitleCell .monthSmallText {
        color: #808080;
        font-size: 10px;
    }

    .myTableLargerCell div {
        border-radius: 20px;
        min-height: 35px;
        width: 90%;
    }

    .firstRow {
        background-color: white;
        position: sticky;
        top: 115px;
    }

    .firstCellInRow {
        background-color: white;
    }

    .lastCellInRow {
        background-color: white;
    }

    .btn-week {
        color: #666666;
    }

    .btn-week:hover {
        color: #3d3d3d;
    }

    p.text-danger {
        font-size: 12px;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .myTableCell {
            font-size: 10px;
        }
    }

</style>
