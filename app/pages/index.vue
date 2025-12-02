<template>
  <div>
    <h1>Головна {{ version }}</h1>
    <NuxtLink to="/about">Перейти на About</NuxtLink><br />
    <NuxtLink to="/addProjectForm">Додати проект</NuxtLink><br />
    <NuxtLink to="/addTaskForm">Додати таску до проекта</NuxtLink><br />
    <NuxtLink to="/deleteProject">Видалити проект</NuxtLink><br />
    <NuxtLink to="/projectTasksList">Список</NuxtLink><br />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import pkg from "../package.json";

const version = pkg.version;
</script>
