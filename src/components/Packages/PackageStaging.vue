<template>
    <div class="staging isansFont--faNum">
        <div class="staging-item" :class="[{'staging-item--done': stage.isDone, 'staging-item--current': stage.value === currentStageValue}]" v-for="stage in fromPaymentStages">
            <div class="staging-item-icon">
                <i class="material-icons" v-if="stage.isDone">done</i>
            </div>
            <p class="staging-item-name">{{stage.name}}</p>
            <p class="staging-item-desc">{{stage.desc}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PackageStaging",
        props: {
            currentStageValue: {
                type: String,
                default: () => "pay"
            },
        },
        data() {
            return {
                fromLoginStages: [
                    {name: 'مرحله 1', desc: 'ورود به حساب' ,value: 'login', order: 1, isDone: true},
                    {name: 'مرحله 2', desc: 'پرداخت هزینه رزرو', value: 'pay', order: 2, isDone: true},
                    {name: 'مرحله 3', desc: 'تکمیل فرم پکیج', value: 'fillout', order: 3, isDone: true},
                    {name: 'مرحله 4', desc: 'انتخاب مشاور اپلای', value: 'choosecons', order: 4, isDone: false},
                ],
                fromPaymentStages: [
                    {name: 'مرحله 1', desc: 'پرداخت هزینه رزرو', value: 'pay', order: 1, isDone: true},
                    {name: 'مرحله 2', desc: 'تکمیل فرم پکیج', value: 'fillout', order: 2, isDone: false},
                    {name: 'مرحله 3', desc: 'انتخاب مشاور اپلای', value: 'choosecons', order: 3, isDone: false},
                ]
            }
        },
        methods: {
            activeCurrentAndBeforeStatuses() {
                let currentStageIndex = this.fromPaymentStages.findIndex(stage => stage.value === this.currentStageValue);
                this.fromPaymentStages.forEach((stage, index) => {
                    stage.isDone = index <= currentStageIndex;
                })
                console.log(this.fromPaymentStages);
            }
        },
        created() {
            this.activeCurrentAndBeforeStatuses();
        }
    }
</script>

<style scoped>
    .staging {
        width: 100%;
        border-radius: 15px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        box-shadow: 0 2px 10px #00000029;
    }

    .staging-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .staging-item-icon {
        width: 30px;
        height: 30px;
        border: 2px solid #3CAEA3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .staging-item-icon {
        color: #3CAEA3;
    }

    .staging-item-name {
        margin: 5px 0;
        color: #B3B3B3;
        font-size: 12px;
    }

    .staging-item-desc {
        margin: 0;
        color: #585858;
        font-size: 14px;
        font-weight: bold;
    }

    .staging-item:not(:first-child) {
        position: relative;
    }

    .staging-item:not(:first-child).staging-item--done:before {
        content: " ";
        position: absolute;
        width: 100px;
        height: 3px;
        background-color: #3CAEA3;
        border-radius:  5px;
        right: -100px;
    }
</style>