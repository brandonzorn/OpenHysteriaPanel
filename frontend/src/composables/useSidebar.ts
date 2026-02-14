import { shallowRef } from "vue";
export const isSidebarOpen = shallowRef(false);
export const openSidebar = () => (isSidebarOpen.value = true);
export const closeSidebar = () => (isSidebarOpen.value = false);