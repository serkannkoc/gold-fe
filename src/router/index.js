import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("../views/Home.vue");
const BuyGold = () => import("../views/BuyGold.vue");
const SellGold = () => import("../views/SellGold.vue");
const TransactionHistory = () => import("../views/TransactionHistory.vue");

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/buy-gold",
        name: "BuyGold",
        component: BuyGold,
    },
    {
        path: "/sell-gold",
        name: "SellGold",
        component: SellGold,
    },
    {
        path: "/transaction-history",
        name: "TransactionHistory",
        component: TransactionHistory,
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    },
    ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
