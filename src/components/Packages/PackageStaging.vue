<template>
    <div class="staging isansFont--faNum">
        <div class="staging-item" :class="[{'staging-item--done': stage.isDone, 'staging-item--current': stage.value === currentStageValue}]" v-for="stage in fromLoginStages">
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
                default: () => "login"
            },
        },
        data() {
            return {
                fromLoginStages: [
                    {name: 'مرحله 1', desc: 'ورود به حساب' ,value: 'login', order: 1, isDone: true},
                    {name: 'مرحله 2', desc: 'پرداخت هزینه رزرو', value: 'pay', order: 2, isDone: false},
                    {name: 'مرحله 3', desc: 'تکمیل فرم پکیج', value: 'fillout', order: 3, isDone: false},
                    {name: 'مرحله 4', desc: 'انتخاب پکیج رزرو شده', value: 'selectpackage', order: 4, isDone: false},
                    {name: 'مرحله 5', desc: 'انتخاب مشاور اپلای', value: 'choosecons', order: 5, isDone: false},
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
                let currentStageIndex = this.fromLoginStages.findIndex(stage => stage.value === this.currentStageValue);
                this.fromLoginStages.forEach((stage, index) => {
                    stage.isDone = index <= currentStageIndex;
                })
                console.log(this.fromLoginStages);
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
        width: 50px;
        height: 3px;
        background-color: #3CAEA3;
        border-radius:  5px;
        right: -50px;
    }

    @media only screen and (max-width: 1200px) {
        .staging-item:not(:first-child).staging-item--done:before {
            right: -35px;
        }
    }

    @media only screen and (max-width: 991.8px) {
        .staging-item:not(:first-child).staging-item--done:before {
            right: -50px;
        }
    }

    @media only screen and (max-width: 767.8px) {
        .staging-item:not(:first-child).staging-item--done:before {
            right: -25px;
            width: 30px;
        }
        .staging-item-name {
            font-size: 11px;
        }

        .staging-item-desc {
            font-size: 12px;
        }

        .staging-item-icon {
            width: 20px;
            height: 20px;
            border-width: 1px;
        }

        .staging-item-icon i {
            font-size: 14px;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .staging-item:not(:first-child).staging-item--done:before {
            display: none;
        }

        .staging-item-desc {
            text-align: center;
            font-size: 10px;
        }
    }
</style>