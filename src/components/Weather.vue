<template >
    <div>
        <h1>View City</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2"><router-link :to="{ name: 'DisplayItem' }" class="btn btn-success">Return to List</router-link></div>
        </div>

        <form v-on:submit.prevent="searchForecast(item.name)">
            <div class="form-group">
                <label>Name</label>: {{item.name}}
            </div>

            <div class="form-group">
                <label name="product_price">Note</label>:{{item.description}}
            </div>
            <div class="form-group">
                <button class="btn btn-info">Check Weather</button>
            </div> 
        <div class="row" v-show='dataShow'>
             <div class="col-md-5 col-xs-12 col-lg-5">
                <b>Weather in {{countryName}}, {{country}}</b><br>
                <b>Weather {{countryName}} , {{tempDay}} °C</b><br>
                <b>{{main}}</b><br>
                <b>{{dayDate1}}</b><br>

        <table class="table table-hover">
            <thead>
            <tr>
                <td><b>Cloudiness</b></td>
                <td>{{description}}</td>
            </tr>
            <tr>
                <td><b>Pressure</b></td>
                <td>{{pressure}}</td>
            </tr>
             <tr>
                <td><b>Humidity</b></td>
                <td>{{humidity}}%</td>
            </tr>
            <tr>
                <td><b>Max</b></td>
                <td>{{max}}°C</td>
            </tr>
             <tr>
                <td><b>Min</b></td>
                <td>{{min}}°C</td>
            </tr>
            <tr>
                <td><b>Geo coords</b></td>
                <td>{{coord}}</td>
            </tr>
            </thead>
        </table>
             </div>
 
        <div class="col-md-6 col-xs-12 col-lg-6">
                <table class="table table-hover">
            <thead>
            <tr>
                <td>{{dayDate1}}<img v-bind:src="day1icon"></td>
                <td>{{min}}°C-{{max}}°C, {{description}}<br>P:{{pressure}}, H:{{humidity}}%</td>
            </tr>
            <tr>
                <td>{{dayDate2}}<img v-bind:src="day2icon"></td>
                <td>{{min1}}°C-{{max1}}°C ,{{description1}}<br>P:{{pressure1}}, H:{{humidity1}}%</td>
            </tr>
             <tr>
                <td>{{dayDate3}}<img v-bind:src="day3icon"></td>
                <td>{{min2}}°C-{{max2}}°C , {{description2}}<br>P:{{pressure2}}, H:{{humidity2}}%</td>
            </tr>
            <tr>
                <td>{{dayDate4}}<img v-bind:src="day4icon"></td>
                <td>{{min3}}°C-{{max3}}°C , {{description3}}<br>P:{{pressure3}}, H:{{humidity3}}%</td>
            </tr>
             <tr>
                <td>{{dayDate5}}<img v-bind:src="day5icon"></td>
                <td> {{min4}}°C-{{max4}}°C, {{description4}}<br>P:{{pressure4}}, H:{{humidity4}}%</td>
            </tr>
            </thead>
</table>
        </div>
        </div>
        <div class="row" v-show='dataShow'>
            <div class="col-md-3 col-xs-12 col-lg-3"> </div>
            <div class="col-md-6 col-xs-12 col-lg-6">
        <highcharts :options="options" ref="highcharts"></highcharts>
</div>
   <div class="col-md-3 col-xs-12 col-lg-3"> </div>
</div>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      icon: String,
      countryName: String,
      country: String,
      day1: String,
      day2: String,
      day3: String,
      day4: String,
      day5: String,
      day1icon: String,
      day2icon: String,
      day3icon: String,
      day4icon: String,
      day5icon: String,
      dayDate1: String,
      dayDate2: String,
      dayDate3: String,
      dayDate4: String,
      dayDate5: String,
      coord: String,
      main: String,
      tempDay: String,
      pressure: String,
      humidity: String,
      description: String,
      min: String,
      max: String,
      tempDay1: String,
      pressure1: String,
      humidity1: String,
      description1: String,
      min1: String,
      max1: String,
      tempDay2: String,
      pressure2: String,
      humidity2: String,
      description2: String,
      min2: String,
      max2: String,
      tempDay3: String,
      pressure3: String,
      humidity3: String,
      description3: String,
      min3: String,
      max3: String,
      tempDay4: String,
      pressure4: String,
      humidity4: String,
      description4: String,
      min4: String,
      max4: String,
      options: {},
      dataShow: false
    };
  },

  created: function() {
    this.getItem();
  },

  methods: {
    getItem() {
      let uri = "http://localhost:4000/items/edit/" + this.$route.params.id;
      this.axios.get(uri).then(response => {
        this.item = response.data;
      });
    },

    searchForecast(name) {
      this.dataShow = true;
      let uri =
        "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
        name +
        "&units=metric&APPID=73136fa514890c15bc4534e7b8a1c0c4";
      this.axios.post(uri).then(response => {
        this.data = response;
        this.countryName = response.data.city.name;
        this.country = response.data.city.country;
        this.coord = response.data.city.coord;
        this.day1 = this.data.data.list[0];
        this.day2 = this.data.data.list[1];
        this.day3 = this.data.data.list[2];
        this.day4 = this.data.data.list[3];
        this.day5 = this.data.data.list[4];

        this.day1icon = "/src/assets/img/" + this.day1.weather[0].icon + ".png";
        this.day2icon = "/src/assets/img/" + this.day2.weather[0].icon + ".png";
        this.day3icon = "/src/assets/img/" + this.day3.weather[0].icon + ".png";
        this.day4icon = "/src/assets/img/" + this.day4.weather[0].icon + ".png";
        this.day5icon = "/src/assets/img/" + this.day5.weather[0].icon + ".png";

        this.main = this.day1.weather[0].main;
        this.description = this.day1.weather[0].description;
        this.tempDay = this.day1.temp.day;
        this.max = this.day1.temp.max;
        this.min = this.day1.temp.min;
        this.pressure = this.day1.pressure;
        this.humidity = this.day1.humidity;

        this.main1 = this.day2.weather[0].main;
        this.description1 = this.day2.weather[0].description;
        this.tempDay1 = this.day2.temp.day;
        this.max1 = this.day2.temp.max;
        this.min1 = this.day2.temp.min;
        this.pressure1 = this.day2.pressure;
        this.humidity1 = this.day2.humidity;

        this.main2 = this.day3.weather[0].main;
        this.description2 = this.day3.weather[0].description;
        this.tempDay2 = this.day3.temp.day;
        this.max2 = this.day3.temp.max;
        this.min2 = this.day3.temp.min;
        this.pressure2 = this.day3.pressure;
        this.humidity2 = this.day3.humidity;

        this.main3 = this.day4.weather[0].main;
        this.description3 = this.day4.weather[0].description;
        this.tempDay3 = this.day4.temp.day;
        this.max3 = this.day4.temp.max;
        this.min3 = this.day4.temp.min;
        this.pressure3 = this.day4.pressure;
        this.humidity3 = this.day4.humidity;

        this.main4 = this.day5.weather[0].main;
        this.description4 = this.day5.weather[0].description;
        this.tempDay4 = this.day5.temp.day;
        this.max4 = this.day5.temp.max;
        this.min4 = this.day5.temp.min;
        this.pressure4 = this.day5.pressure;
        this.humidity4 = this.day5.humidity;

        this.dayDate1 = new Date(this.day1.dt * 1000).toGMTString();
        this.dayDate2 = new Date(this.day2.dt * 1000).toGMTString();
        this.dayDate3 = new Date(this.day3.dt * 1000).toGMTString();
        this.dayDate4 = new Date(this.day4.dt * 1000).toGMTString();
        this.dayDate5 = new Date(this.day5.dt * 1000).toGMTString();

        this.options = {
          title: {
            text: "Last five days Average Temperature",
            x: -20 //center
          },
          xAxis: {
            type: "category"
          },
          yAxis: {
            title: {
              text: "Temperature (°C)"
            },
            plotLines: [
              {
                value: 0,
                width: 1,
                color: "#808080"
              }
            ]
          },
          tooltip: {
            valueSuffix: "°C"
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: this.dayDate1,
              data: [this.min, this.tempDay, this.max]
            },
            {
              name: this.dayDate2,
              data: [this.min1, this.tempDay1, this.max1]
            },
            {
              name: this.dayDate3,
              data: [this.min2, this.tempDay2, this.max2]
            },
            {
              name: this.dayDate4,
              data: [this.min3, this.tempDay3, , this.max3]
            },
            {
              name: this.dayDate5,
              data: [this.min4, this.tempDay4, , this.max4]
            }
          ]
        };
        var chart = this.$refs.highcharts.chart;
      });
    }
  }
};
</script>