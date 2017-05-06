<template>
  <div class="hello">
    <HorizonChart :data="horizonChart.data" />
    <HorizonChart :height="20" startColor="red" endColor="yellow" :data="horizonChart.data" />
  </div>
</template>

<script>
import { HorizonChart } from 'vue2-d3-horizon-chart'
const DATA_VALUE_COUNT = 100

export default {
  name: 'hello',
  components: { HorizonChart },
  data () {
    return {
      horizonChart: {
        data: (new Array(DATA_VALUE_COUNT)).fill(0),
        metric: 'change'
      }
    }
  },
  methods: {
    processNewData (object, chart, transformation) {
      let len = chart.data.length
      chart.data.push(object[chart.metric])
      if (chart.data.length > len) {
        chart.data.shift()
      }
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    prices: function (data) {
      // let isoDates = (d, metric, index) => {
      //   return {iso_date: (new Date(d.dt)).toISOString(), value: d[metric]}
      // }
      let simple = (d, metric, index) => {
        return d[metric]
      }
      this.processNewData(data, this.horizonChart, simple)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding:  <div class="chart">
 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
