<template>
    <section class="deposit-wrapper gadugiFont">
      <h2 class="deposit-title">
        Deposit
      </h2>

      <div class="grid-table-responsive">
        <table class="grid-table">
          <thead class="grid-head">
          <tr class="grid-row">
            <th class="grid-head-cell">
              ID
            </th >
            <th class="grid-head-cell cell--centered">
              Time
            </th>
            <th class="grid-head-cell cell--centered">
              Amount
            </th>
            <th class="grid-head-cell cell--centered">
              Comment
            </th>
          </tr>
          </thead>
          <tbody class="grid-body">
          <tr class="grid-row" v-for="(payment, index) in payments" :key="index">
            <td class="grid-cell">
              {{payment.consultant_deposit_info_id}}

            </td>
            <td class="grid-cell cell--centered">
              <p>
                {{getJalali(payment.updated).format('	YYYY, MMM, Do, h:mm:ss a')}}
              </p>
            </td>
            <td class="grid-cell cell--centered">
              <p>
                {{payment.amount}}
              </p>
            </td>
            <td class="grid-cell cell--centered">
              <p>
                {{payment.comment}}
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <p v-if="payments.length === 0" class="no-record-message">
        No records found.
      </p>
    </section>
</template>
<script>
import jalali from 'jalali-moment';
export default {
  name: "ConsultantDeposit",
  computed: {
    api() {
      return this.$store.getters.getApi;
    },
    httpConfig() {
      return this.$store.getters.httpConfig;
    }

  },
  data() {
    return {
      payments :[]
    }

  },
  created() {
    this.getPayments()
  },
  methods: {
    getPayments() {
      this.$api
          .get(`${this.api}/payment/consultant-deposits/`, this.httpConfig)
          .then(response => {
            this.payments = response.data;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {}
          )
    },
    getJalali(date) {
      return jalali(date);
    },
  }

}
</script>
<style scoped>
.deposit-wrapper {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 30px;
  padding-bottom: 15px;
}
.deposit-title {
  color: #374957;
  font-size: 26px;
  margin: 50px 0 10px 10px;
  font-weight: normal;
}
 .grid-table-responsive {
   width: 100%;
 }
.grid-table {
  display: grid;
  border-collapse: collapse;
  grid-template-columns: repeat(4, 1fr);
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

.cell--centered {
  text-align: center;
  justify-content: center;
}

.no-record-message {
  color: #808080;
  align-self: center;
}
@media only screen and (max-width: 767.8px) {
  .deposit-wrapper {
    overflow: auto;
  }
  .grid-table {
    grid-template-columns: repeat(4, 185px);
    overflow: auto;
  }

}
</style>