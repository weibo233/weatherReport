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
      drawer: false,
      direction: "ltr",
    },
    mounted() {
      setTimeout(() => {
        this.drawer = true;
      }, 1000);
    },
    methods: {
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {});
      },
    },
  }).$mount("#app");
};
