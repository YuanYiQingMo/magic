<template>
    <div :class="'character-name '+type">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
        type:String
    }
}
</script>
<style scoped>
.character-name{
    font-size: bolder;
}
</style>