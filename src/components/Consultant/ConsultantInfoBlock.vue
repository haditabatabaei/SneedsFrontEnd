<template>
    <div class="descBox">
        <div class="infoBox" v-if="consultant.universities && consultant.countries && consultant.field_of_studies">
            <ConsultantInfoItem :item="{'icon' : 'account_balance','text' : consultant.universities[0].name}"></ConsultantInfoItem>
            <ConsultantInfoItem :item="{'icon' : 'flag' , 'text' : consultant.countries[0].name}"></ConsultantInfoItem>
            <ConsultantInfoItem :item="{'icon' : 'book' , 'text' : consultant.field_of_studies[0].name}"></ConsultantInfoItem>
            <ConsultantInfoItem :item="{'icon' : 'star' , 'text' : consultant.rate.toFixed(1)}" v-if="consultant.rate"></ConsultantInfoItem>
            <ConsultantInfoItem :item="{'icon' : 'star' , 'text' : 'بدون امتیاز'}" v-else></ConsultantInfoItem>
        </div>

        <ConsultantActionBox :consultant="consultant"></ConsultantActionBox>

    </div>
</template>

<script>
    import ConsultantInfoItem from '@/components/Consultant/ConsultantInfoItem'
    import ConsultantActionBox from '@/components/Consultant/ConsultantActionBox'

    export default {
        name: "ConsultantInfoBlock",
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