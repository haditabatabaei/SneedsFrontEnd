<template>
    <div class="descBox">
        <div class="infoBox" v-if="consultant.universities && consultant.countries && consultant.field_of_studies">
            <ConsultantInfoItem v-for="item in items" :item="item" ></ConsultantInfoItem>
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
                items : [
                    {
                        icon : 'account_balance',
                        text : this.consultant.universities[0].name
                    },                    {
                        icon : 'flag',
                        text : this.consultant.countries[0].name
                    },
                    {
                        icon : 'book',
                        text : this.consultant.field_of_studies[0].name
                    },
                    {
                        icon : 'star',
                        text : (this.consultant.rate && this.consultant.rate.toFixed(1)) || 'بدون امتیاز'
                    },
                ]
            }
        },
        components : {
            ConsultantInfoItem,
            ConsultantActionBox
        },
        props : {
            consultant : {},
        },
    }
</script>

<style scoped>
    .descBox {
        background-color: #F2F2F2;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .infoBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-left: 1px solid white;
        flex-wrap:wrap;
    }
</style>