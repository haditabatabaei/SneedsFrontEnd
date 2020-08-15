<template>
    <section class="paper-items isansFont">
        <p class="paper-items-notif">
            <i class="material-icons">done</i>
            اطلاعات این مقصد با موفقیت اضافه شد.
        </p>
        <div class="paper-items-wrapper isansFont--faNum">
            <div class="paper-items-item" v-for="item in items">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info">
                    <p class="paper-item-summary">کشور {{item.country.name}}، {{item.semester_year.semester}} {{item.semester_year.year}}</p>
                    <p class="paper-item-title">مقطع {{getGrade(item.grade)}} رشته {{item.major.name}}</p>
                    <div class="paper-item-universitytags">
                        <span class="university-tag" v-for="uni in item.universities">
                            {{uni.name}}
                        </span>
                    </div>
                </div>
                <button class="paper-item-remove" @click="deleteDestination(item)">
                    <i class="material-icons">close</i>
                </button>
            </div>

            <p class="paper-items-empty" v-if="items.length == 0">
                مقصدی وارد نشده است.
            </p>

            <router-link to="/analysis/form/destination" class="paper-items-addnew" v-if="items.length > 0">
                افزودن مقصد دیگر
            </router-link>
            <router-link to="/analysis/form/destination" class="paper-items-addnew" v-else>
                افزودن مقصد جدید
            </router-link>
        </div>
    </section>
</template>

<script>
    export default {
        name: "DestinationItems",
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

            detailedFormId() {
                return this.$store.getters.detailedFormId;
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

            getAuthorNumber(authorNumber) {
                switch (authorNumber.toLowerCase()) {
                    case 'first':
                        return 'اول'
                    case 'second':
                        return 'دوم'
                    case 'third':
                        return 'سوم'
                    case 'fourth_or_more':
                        return 'چهارم به بعد'
                }
            },

            getJournalReputation(rp) {
                switch (rp.toLowerCase()) {
                    case 'one_to_three':
                        return '1 تا 3';
                    case 'four_to_then':
                        return '4 تا 10'
                    case 'above_ten':
                        return 'بالای 10'
                }
            },

            getSummary(item) {
                return `${this.getType(item.type)}، ${item.publish_year}، نویسنده ${this.getAuthorNumber(item.which_author)}`
            },

            async getDestinations() {
                let result = await this.$api.get(`${this.api}/account/want-to-applies/?student-detailed-info=${this.detailedFormId}`, this.httpConfig);
                this.items = result.data;
            },

            async deleteDestination(dest) {
                let result = await this.$api.delete(`${this.api}/account/want-to-applies/${dest.id}/`, this.httpConfig);
                console.log(result);
                this.getDestinations();
            }
        },
        watch: {
            detailedForm(newDetailedForm) {
                console.log('detailed form changed ', newDetailedForm);
                this.getDestinations();
            }
        },
        created() {
            if(this.detailedForm) {
                this.getDestinations();
            }
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

    .paper-item-universitytags {
        display: flex;
    }

    .paper-item-universitytags {
        margin: 10px 0 0 0;
    }

    .university-tag {
        background-color: #FFFFFF;
        color: #9B9999;
        border-radius: 15px;
        font-size: 13px;
        padding: 3px 12px;
        margin-left: 5px;
    }

    @media only screen and (max-width: 767.8px) {
        .paper-items-item {
            flex-direction: column;
            position: relative;
            align-items: center;
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