<template>
  <section class="features">
    <div class="features-container">
      <div class="features-intro-info">
                            <span class="features-info-small-title">
                                <div class="features-info-title-line"></div>
                                Unique featurs</span>
        <h2 class="features-info-title">To help you through the procsess</h2>
        <p class="features-info-text">
          We are here for you in this long and challenging journey to study abroad.
        </p>
        <div class="features-info-links">
          <a href="#" class=" features-link-start">
            Start your journey
            <i  class="material-icons">keyboard_arrow_right</i>
          </a>
        </div>
      </div>
      <img class="features-img" src="/sneedsAssets/img/features.png">


    </div>

  </section>

</template>

<script>
export default {
  name: "LandingFeatures"
}
</script>

<style scoped>
.features {
  margin-bottom: 100px;
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}
.features-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: hidden;
  justify-content: center;
  align-items: flex-start;
}
.features-intro-info {
  width: 40%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  margin-top: 3%;
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 10%;
  font-size: 16px;
}
.features-info-small-title {
  margin-bottom: 0px;
  margin-top: 10px;
  color: #374957;
}
.features-info-title-line {
  display: inline-block;
  width: 20px;
  height: 3px;
  vertical-align: middle;
  background-color: #00D4ED;
  right: -125px;
  border-radius: 2px
}
.features-info-title {

  color: #303143;
  font-weight: bold;
}
.features-info-text {
  padding: 5% 0px;
  font-size: 16px;
}
.features-link-start {
  color: #008DB8;
  min-width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 10px;
  padding: 10px 0px;
}
.features-img {
  width: 50%;
  height: auto;
  padding: 3%;
}
@media only screen and (max-width: 767.8px) {
  .features-container {
    flex-direction: column-reverse;
    align-items: center;
  }
  .features-img {
    width: 70%;
    margin: auto;

  }
  .features-intro-info {
    width: 90%;
    text-align: center;
    align-items: center;
  }
}

</style>