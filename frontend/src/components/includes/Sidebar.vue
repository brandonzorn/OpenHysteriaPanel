<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { isSidebarOpen, closeSidebar } from "@/composables/useSidebar";
</script>

<template>
  <Transition name="fade">
    <div v-if="isSidebarOpen" class="fixed inset-0 z-20 backdrop-blur-sm lg:hidden" @click="closeSidebar" />
  </Transition>

  <aside
    v-on-click-outside="closeSidebar"
    class="fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900/95 border-r border-white/10 transform transition-transform duration-300 flex flex-col -translate-x-full lg:translate-x-0"
    :class="{ 'translate-x-0': isSidebarOpen }"
  >
    <div class="h-16 flex items-center px-6 border-b border-white/10 justify-between lg:justify-start">
      <div class="flex items-center">
        <svg class="w-8 h-8 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h1 class="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
          HysteriaPanel</h1>
      </div>
      <button @click="isSidebarOpen = false" class="lg:hidden text-gray-400 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <nav class="flex-1 py-6 px-2 space-y-2 overflow-y-auto">
      <a href="{% url 'dashboard:dashboard' %}" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Dashboard
      </a>
      <a href="{% url 'clients:clients-list' %}" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Clients
      </a>
      <a href="{% url 'settings:panel-settings' %}" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings
      </a>
      <a href="{% url 'admin:index' %}" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4M12 3l7 4v5c0 4.418-3.134 8.418-7 9-3.866-.582-7-4.582-7-9V7l7-4z" />
        </svg>
        Admin
      </a>
    </nav>
    <div class="p-4 border-t border-white/10 flex items-center">
      <a href="{% url 'account_login' %}" class="nav-link w-full justify-center">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
        </svg>
        Log in
      </a>
    </div>
  </aside>
</template>