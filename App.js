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
      eys: "cc1269769bd442e6bed442f41f27c17a"
    },
    mounted() {},
    methods: {
      querySearchAsync(queryString, callback) {
        if (!queryString) {
          callback("");
          return;
        }
        axios
          .get(
            `https://geoapi.qweather.com/v2/city/lookup?location=${queryString}&key=${this.eys}`
          )
          .then((res) => {
            let { code, location } = res.data;
            if (code == 200) {
              callback(
                location.map((item) => {
                  return {
                    value: item.name,
                    ...item,
                  };
                })
              );
            } else {
              this.$message({
                message: "输入不正确！",
                type: "warning",
              });
            }
          });
      },
      handleSelect(item) {
        axios
          .get(
            `https://devapi.qweather.com/v7/weather/now?location=${item.id}&key=${this.eys}`
          )
          .then((res) => {
            let { code, now } = res.data;
            if (code == 200) {
              console.log(now, "now");
            }
          });

        console.log(item, "item");
      },
    },
  }).$mount("#app");
};
