<template>
  <div>
    <h1> {{ errors._404.msg }} </h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      "errors": {
        "_404" : { "msg" : "404 NOT FOUND" }
      }
    }
  }
}

</script>