<template>
  <main>
    <div class="container">
      <h1>Oops! The page that you requested could not be found.</h1>
      <RouterLink to="/" class="button"> Return to the home page </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 200px;
}

main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>