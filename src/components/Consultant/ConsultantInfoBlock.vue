<template>
    <div class="card descBox">
        <div class="infoBox" v-if="consultant.universities && consultant.countries && consultant.field_of_studies">
            <ConsultantInfoItem v-for="item in items" :item="item" :key="items.indexOf(item)"></ConsultantInfoItem>
        </div>

        <ConsultantActionBox :consultant="consultant"></ConsultantActionBox>
    </div>
</template>

<script>
    import ConsultantInfoItem from '@/components/Consultant/ConsultantInfoItem'
    import ConsultantActionBox from '@/components/Consultant/ConsultantActionBox'

    export default {
        name: "ConsultantInfoBlock",
        data() {
            return {
                items: [
                    {
                        icon: 'account_balance',
                        text: this.consultant.universities[0].name,
                        iconColor: '#ED8CB6'
                    }, {
                        icon: 'flag',
                        text: this.consultant.countries[0].name,
                        iconColor: '#8AC0E6'
                    },
                    {
                        icon: 'book',
                        text: this.consultant.field_of_studies[0].name,
                        iconColor: '#73BFBA'
                    },
                    {
                        icon: 'star',
                        text: (this.consultant.rate && this.consultant.rate.toFixed(1)) || 'بدون امتیاز',
                        iconColor: '#FBD497'
                    },
                ]
            }
        },
        components: {
            ConsultantInfoItem,
            ConsultantActionBox
        },
        props: {
            consultant: {},
        },
    }
</script>

<style scoped>
    .descBox {
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-right: 7px solid #fcf265;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        flex-wrap: wrap;
    }

    .infoBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-left: 1px solid white;
        flex-wrap: wrap;
    }
</style>