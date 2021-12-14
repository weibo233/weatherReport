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
      key: "cc1269769bd442e6bed442f41f27c17a",
      updateTime:"",
      now:{},
      name:"",
      activeIndex:1
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
            `https://geoapi.qweather.com/v2/city/lookup?location=${queryString}&key=${this.key}`
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
        this.name = item.name
        axios
          .get(
            `https://devapi.qweather.com/v7/weather/now?location=${item.id}&key=${this.key}`
          )
          .then((res) => {
            let { code, now ,updateTime} = res.data;
            if (code == 200) {
              this.updateTime = dayjs(updateTime).format('HH:mm:ss');
              this.now = now
              console.log(now, "now");
            }
          });

        console.log(item, "item");
      },
      handleSelectOptions(item) {
        console.log(item,"item")
      }
    },
  }).$mount("#app");
};
