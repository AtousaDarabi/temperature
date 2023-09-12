<template>
    <div class="form-wrapper">
        <div class="flex">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
            <h1 class="green">Temperature Form</h1>
        </div>

        <form
            @submit.prevent="submit"
        >
            <div class="form-group">
                <label for="min">Min:</label>
                <input
                    v-model="min"
                    type="number"
                    id="min"
                    name="min"
                    placeholder="Enter Min"
                    required
                >
            </div>
            <div class="form-group">
                <label for="max">Max:</label>
                <input
                    v-model="max"
                    type="number"
                    id="max"
                    name="max"
                    placeholder="Enter Max"
                    required
                >
            </div>
            <div class="form-group">
                <label for="current">Current:</label>
                <input
                    v-model="current"
                    type="number"
                    id="current"
                    name="current"
                    placeholder="Enter Current"
                    required
                >
            </div>
            <button
                type="submit"
                class="submit-btn"
            >
                Submit
            </button>
        </form>

        <p
            v-if="validatedStatus"
            class="red bold"
        >
            Please enter a number between {{ min }} and {{ max }}
        </p>
    </div>
    <div class="temperature-wrapper flex">
        <TheTemperature
            ref="temperature"
            :min="min"
            :max="max"
            :current="current"
            :show-current="showCurrent"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheTemperature from '@/components/TheTemperature.vue'

const min = ref<number>()
const max = ref<number>()
const current = ref<number>()
const temperature = ref();
const validatedStatus = ref<boolean>(false)
const showCurrent = ref<boolean>(false)

const submit = () => {
    if (min.value !== undefined && max.value !== undefined && current.value !== undefined) {
        if (current.value < min.value || current.value > max.value) {
            validatedStatus.value = true
        } else {
            validatedStatus.value = false
            showCurrent.value = true
            temperature.value.updateTemperature()
        }
    }
}

</script>

<style scoped>
.form-wrapper {
  line-height: 1.5;
  max-height: 100vh;
}

.form-wrapper form {
    margin: 24px auto;
}

.temperature-wrapper {
    margin-top: 10%;
}

@media (min-width: 1024px) {
    .temperature-wrapper {
        margin-top: 0;
    }
}

h1 {
    font-weight: 500;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.submit-btn {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #41b883;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.submit-btn:hover {
    box-shadow: 0 0 1px #333;
    opacity: 0.5;
}

</style>