const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];

const router = new VueRouter({
  routes,
});

window.onload = function () {
  const app = new Vue({
    router,
    data: {
      cityOrCode: "",
      eys: "cc1269769bd442e6bed442f41f27c17a",
      updateTime: "",
      now: {},
      daily:[{},{},{}],//未来三天
      name: "",
      activeIndex: 1,
      loading:true
    },
    mounted() {
      this.querySearchAsync("北京").then((res) => {
        this.handleSelect(res)
      })
    },
    methods: {
      // 城市API
      querySearchAsync(queryString, callback) {
        if (!queryString) {
          callback("");
          return;
        }
        return new Promise((resovle, reject) => {
          axios
            .get(
              `https://geoapi.qweather.com/v2/city/lookup?location=${queryString}&key=${this.eys}`
            )
            .then((res) => {
              let { code, location } = res.data;
              if (code == 200) {
                this.loading = false
                resovle(location[0])
                callback(
                  location.map((item) => {
                    return {
                      value: item.name,
                      ...item,
                    };
                  })
                );
              } else {
                reject()
                this.$notify({
                  title: '提示',
                  message: '输入不正确！',
                  duration: 0
                });
              }
            });
        })
      },
      handleSelect(item) {
        this.name = item.name
        axios
          .get(
            `https://devapi.qweather.com/v7/weather/now?location=${item.id}&key=${this.eys}`
          )
          .then((res) => {
            let { code, now, updateTime } = res.data;
            if (code == 200) {
              this.updateTime = dayjs(updateTime).format('HH:mm:ss');
              this.now = now
            }
          });
          this.hanldeSelect24Hours(item)
      },
      // 未来三天天气预报
      hanldeSelect24Hours(item) {
        axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${item.id}&key=${this.eys}`).then(res => {
          let { code,  daily } = res.data;
          if (code == 200) {
            console.log(daily,"daily")
            this.daily = daily
          }
        })
      },
      handleSelectOptions(item) {
        console.log(item, "item")
      }
    },
  }).$mount("#app");
};

