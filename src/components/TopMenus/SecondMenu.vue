<template>
  <div
    class="container-fullwidth secondContainer customContainer navbar navbar-default navbar-transparent navbar-color-on-scroll"
    color-on-scroll=" ">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header navbar-right">
      <button type="button" class="navbar-toggle" data-toggle="collapse"
              data-target="#dropdownTogglerTarget">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="dropdownTogglerTarget">
      <ul class="nav navbar-nav navbar-right isansFont">
        <li class="text-right" v-for="item in this.topMenuListItems"
            v-bind:class="[{'dropdown':item.hasDropdown}]">
          <a href="#" v-if="item.hasDropdown" class="dropdown-toggle" data-toggle="dropdown">
            <span>{{item.itemName}}</span>
            <b class="caret"></b>
          </a>
          <router-link href="#" v-else :to="item.target">{{item.itemName}}</router-link>
          <ul v-if="item.hasDropdown" class="dropdown-menu customRadius">
            <li v-for="dropdownItem in item.dropdownItems"
                v-bind:class="[{'dropdown' : dropdownItem.hasDropdown}]">
              <router-link v-bind:to="dropdownItem.target">{{dropdownItem.itemName}}</router-link>
            </li>
          </ul>
        </li>

      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-->

</template>

<script>
  export default {
    name: "SecondMenu",
    data: function () {
      return {
        topMenuListItems: [
          {itemName: 'صفحه اول', target: '/', hasDropdown: false, dropdownItems: []},
          {itemName: 'مشاوران', target: '/advisors', hasDropDown: false, dropdownItems: []},
          {itemName: 'تماس با ما', target: '/in-touch/contact', hasDropdown: false, dropdgownItems: []},
          {itemName: 'درباره ما', target: '/in-touch/aboutus', hasDropdown: false, dropdgownItems: []},
        ]
      }
    }, methods: {},
    created() {
    },
    mounted() {
    },

  }
</script>

<style scoped>

  .customContainer {
    margin-bottom: 0;
    padding: 0;
  }

  .secondContainer {
    padding: 0 10px 0 0;
    border-radius: 0;
  }

  .dropdown-menu {
    min-width: 200px;
    margin-top: -1px !important;
  }

  .dropdown-menu li:hover > a {
    background-color: #00bcd4 !important;
  }
</style>
