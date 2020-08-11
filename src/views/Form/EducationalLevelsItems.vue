<template>
    <section class="paper-items isansFont">
        <p class="paper-items-notif">
            <i class="material-icons">done</i>
            اطلاعات این مقطع با موفقیت اضافه شد.
        </p>
        <div class="paper-items-wrapper isansFont--faNum">
            <div class="paper-items-item" v-for="item in items">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info">
                    <p class="paper-item-summary">{{getSummary(item)}}</p>
                    <p class="paper-item-title">{{getDesc(item)}}</p>
                    <p class="paper-item-title">عنوان پایان نامه: {{item.thesis_title}}</p>
                </div>
                <button class="paper-item-remove">
                    <i class="material-icons">close</i>
                </button>
            </div>

            <p class="paper-items-empty" v-if="items.length == 0">
                مقطعی وارد نشده است.
            </p>

            <button class="paper-items-addnew" v-if="items.length > 0">
                افزودن مقطع دیگر
            </button>
            <button class="paper-items-addnew" v-else>
                اضافه کردن مقطع جدید
            </button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "EducationalLevelsItems",
        data() {
            return {
                items: []
            }
        },
        computed: {
            user() {
                return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
            },

            detailedForm() {
                return this.$store.getters.detailedForm;
            },

            api() {
                return this.$store.getters.getApi
            },

            httpConfig() {
                return this.$store.getters.httpConfig
            },

            multipartHttpConfig() {
                return this.$store.getters.multipartHttpConfig
            }
        },
        methods: {
            getGrade(grade) {
                switch (grade.toLowerCase()) {
                    case 'bachelor':
                        return 'کارشناسی'
                    case 'master':
                        return 'کارشناسی ارشد';
                    case 'phd':
                        return 'دکتری';
                    case 'post_doc':
                        return 'پسا دکتری';

                }
            },

            getSummary(item) {
                return `${this.getGrade(item.grade)} ${item.university.name}`
            },

            getDesc(item) {
                return ` ${item.major.name} تا سال ${item.graduate_in} معدل ${item.gpa}`
            }


        },
        created() {
            this.items = this.detailedForm.universities;
        }
    }
</script>

<style scoped>
    .paper-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 100px 20px 20px 20px;
    }

    .paper-items-notif {
        color: white;
        background-color: #009FB3;
        border-radius: 15px;
        font-size: 16px;
        display: flex;
        align-items: center;
        min-height: 45px;
    }

    .paper-items-notif i {
        margin: 0 15px 0 10px;
        background-color: white;
        border-radius: 50%;
        color: #009FB3;
        font-size: 20px;
    }

    .paper-items-wrapper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border-radius: 20px;
        background-color: #F5F7FA;
        border: 2px solid #F2F2F2;
        margin-top: 20px;
    }

    .paper-items-item {
        display: flex;
        align-items: center;
    }

    .paper-item-info {
        margin: 20px 0 0 0;
    }

    .paper-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F4CA64;
        border: 5px solid white;
        width: 60px;
        height: 60px;
        font-size: 26px;
        color: white;
        border-radius: 50%;
        box-shadow: 0 2px 20px #00000029;
        margin: 20px;
    }

    .paper-item-remove {
        margin: 0 auto 0 20px;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        color: #B3B3B3;
    }

    .paper-item-summary {
        margin: 0;
        font-size: 20px;
        color: #173F5F;
    }

    .paper-item-title {
        margin: 5px 0 0 0;
        font-size: 14px;
        color: #9B9999;
    }

    .paper-items-empty {
        align-self: center;
        margin-top: 20px;
    }

    .paper-items-addnew {
        align-self: flex-end;
        margin: 20px;
        background-color: #F5F7FA;
        border: 2px solid #00BFD6;
        color: #009FB3;
        border-radius: 5px;
        padding: 5px 15px;
    }

    @media only screen and (max-width: 767.8px) {
        .paper-items-item {
            flex-direction: column;
            position: relative;
        }

        .paper-item-icon {
            margin: 20px 0 10px 0;
        }

        .paper-item-info {
            text-align: center;
            margin: 10px 0 0 0;
        }

        .paper-item-remove {
            position: absolute;
            top: 20px;
            right: 20px;
            margin: 0;
        }

        .paper-items-addnew {
            align-self: center;
        }

        .paper-items-notif {
            justify-content: center;
        }
    }

</style>