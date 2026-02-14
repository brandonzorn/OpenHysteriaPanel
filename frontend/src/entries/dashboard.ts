import "../style.css";
import { createApp } from "vue";

import DashboardPage from "../pages/DashboardPage.vue";

const el = document.getElementById("app-dashboard");
if (el) createApp(DashboardPage).mount(el);