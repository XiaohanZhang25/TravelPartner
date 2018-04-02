<template>
  <div>
    <img :src="image" :alt="alt" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      "alt": "Maintenance",
      "image": ""
    }
  }
}

</script>