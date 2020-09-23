<template>

  <section class="admit-chance-section all-in-one">
    <div class="all-in-one-container">
      <div class="all-in-one-intro-info">
        <h2 class="all-in-one-info-title">To help you through the procsess</h2>
        <span class="all-in-one-info-small-title">
                                <div class="all-in-one-info-title-line"></div>
                               you will get complete insights on:</span>
        <ul class="all-in-one-list">
          <li class="all-in-one-list-items">your rank among competitors</li>
          <li  class="all-in-one-list-items">Scholarship Chance</li>
          <li  class="all-in-one-list-items">Admission Chance</li>
          <li  class="all-in-one-list-items">resume Strengths and weaknesess</li>
          <li  class="all-in-one-list-items">Timeline And Deadlines</li>
        </ul>
      </div>
      <img class="all-in-one-img" src="/sneedsAssets/img/all in one.png">
    </div>
  </section>

</template>

<script>
export default {
  name: "AdmitChanceAllinOne"
}
</script>

<style scoped>
.admit-chance-section {
  margin-bottom: 100px;
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}
.all-in-one-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
}
.all-in-one-intro-info {
  width: 40%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 3%;
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 10%;
  font-size: 14px;
}
.all-in-one-info-small-title {
  margin-bottom: 0px;
  margin-top: 10px;
  color: #707070;
}
.all-in-one-info-title-line {
  width: 100px;
  height: 3px;
  vertical-align: middle;
  background-color: #00D4ED;
  right: -125px;
  border-radius: 2px;
  margin-bottom: 7%;
}
.all-in-one-info-title {

  color: #303143;
  font-weight: bold;
}
.all-in-one-list {
  padding: 5% 5%;
  font-size: 14px;
}
all-in-one-list-items{
  margin: 10px;
}
.all-in-one-img {
  width: 50%;
  height: auto;
  padding: 3%;
}
@media only screen and (max-width: 767.8px) {
  .all-in-one-container {
    flex-direction: column-reverse;
  }
  .all-in-one-img {
    width: 70%;
    margin: auto;

  }
  .all-in-one-intro-info {
    width: 90%;
    text-align: center;
    align-items: center;
  }
  .all-in-one-info-title-line {
    margin: auto;
  }
}


</style>