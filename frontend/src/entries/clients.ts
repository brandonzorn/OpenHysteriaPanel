import "../style.css";
import { createApp } from "vue";

import ClientsListPage from "../pages/ClientsListPage.vue";

const el = document.getElementById("app-clients");
if (el) createApp(ClientsListPage).mount(el);