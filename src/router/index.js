import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/components/Index";
import AddCocktail from "@/components/AddCocktail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/add-cocktail",
    name: "AddCocktail",
    component: AddCocktail
  }
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
