<template>
    <div>
        <div class="circle">
        <div class="absolute hand-min"></div>
        <div class="absolute hand-max"></div>
        <div class="hand-temperature" :style="temperatureStyle"></div>
    </div>
    <div>
        <p
            v-if="showCurrent"
            class="current-temperature"
        >
            {{ current }}&deg;C
        </p>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  min: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
    default: 0,
  },
  current: {
    type: Number,
    required: true,
    default: 0,
  },
  showCurrent: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const temperatureStyle = ref({})


const updateTemperature = () => {
    const section = 300 / (props.max - props.min) 
    const degree = ((props.current - props.min) * section) + 30
    temperatureStyle.value = {
        transform: `rotate(${degree}deg)`,
    }
}

onMounted(() => {
    updateTemperature()
})

defineExpose({
    updateTemperature,
});

</script>


<style scoped>
.absolute {
    position: absolute;
}

.circle {
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border: 2px solid #333;
    border-radius: 50%;
}

/* hand-min is located through the 30deg of hand-temperature */
.hand-min {
    top: 100%;
    left: 27px;
    width: 30px;
    height: 2px;
    background-color: #333;
    transform: rotate(-60deg);
}

/* hand-max is located through the -30deg of hand-temperature */
.hand-max {
    top: 100%;
    right: 24px;
    width: 30px;
    height: 2px;
    background-color: #333;
    transform: rotate(60deg);
}

.hand-temperature {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 50%; 
    background-color: #333;
    transform-origin: top center;
    transform: translateX(-50%) rotate(0);
}

.current-temperature {
    margin-top: 15px;
    text-align: center;
}
</style>