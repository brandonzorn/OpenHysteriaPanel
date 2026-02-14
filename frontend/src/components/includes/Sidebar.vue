<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { isSidebarOpen, closeSidebar } from "@/composables/useSidebar";
</script>

<template>
  <Transition name="fade">
    <div v-if="isSidebarOpen" class="fixed inset-0 z-20 backdrop-blur-sm lg:hidden" @click="closeSidebar" />
  </Transition>

  <aside v-on-click-outside="closeSidebar"
    class="fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900/95 border-r border-white/10 transform transition-transform duration-300 flex flex-col -translate-x-full lg:translate-x-0"
    :class="{ 'translate-x-0': isSidebarOpen }">
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
      <a href="/" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Dashboard
      </a>
      <a href="/clients" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Clients
      </a>
      <a href="/settings" class="nav-link">
        <svg class="w-6 h-6 shrink-0 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        Settings
      </a>
      <a href="/admin" class="nav-link">
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