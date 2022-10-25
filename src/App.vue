<script setup>
  import { ref, reactive, computed, watch } from "vue";
  import Header from "./components/Header.vue";
  import Button from "./components/Button.vue";
  import { calcularTotalPagar } from "./helpers/index.js";

  const cantidad = ref(10000);
  const meses = ref(6);
  const total = ref(0);
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const formatoDinero = (valor) => {
    const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });

    return formatter.format(valor);
  };

  watch([cantidad, meses], () => {
    total.value = calcularTotalPagar(cantidad.value, meses.value);
  });

  const pagoMensual = computed(() => {
    return total.value / meses.value;
  });

  const handleChangeDecremento = () => {
    const valor = cantidad.value - STEP;

    if (valor < MIN) {
      alert('Cantidad no valida');
      return;
    }

    cantidad.value = cantidad.value - STEP;
  }

  const handleChangeIncremento = () => {
    const valor = cantidad.value + STEP;

    if (valor > MAX) {
      alert('Cantidad no valida');
      return;
    }

    cantidad.value = cantidad.value + STEP;
  }

  /*const state = reactive({
    cantidad: 0
  });*/

  /*function handleChange(e) {
    cantidad.value = +e.target.value; // El "+" lo convierte en número
    state.cantidad = Number(e.target.value);
  }*/

  /*
    Si utilizo option no pongo setup

      export default {
        components: {
          Header
        }
      };
  */
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />
    <div class="flex justify-between mt-10">
      <Button
        :operador="'-'"
        @fn="handleChangeDecremento"
      />
      <Button
        :operador="'+'"
        @fn="handleChangeIncremento"
      />
    </div>
    <div class="my-5">
      <input
          type="range"
          class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
          :min="MIN"
          :max="MAX"
          :step="STEP"
          v-model.number="cantidad"
      >
      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{ formatoDinero(cantidad) }}</p>
<!--      <p v-text="`$ ${state.cantidad}`"></p>-->
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">Elige un <span class="text-indigo-600">Plazo</span> a pagar</h2>
      <select
          name="plazo"
          id="plazo"
          class="w-full bg-white border border-gray-300 rounde-lg text-center text-xl font-bold text-gray-500 mt-6"
          :value="meses"
          v-model.number="meses"
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
    </div>
    <div
        class="my-5 space-y-3 bg-gray-50 p-5"
         v-if="total > 0">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">Resumen <span class="text-indigo-600">de pagos</span></h2>
      <ul>
        <li class="text-xl text-gray-500 text-center font-bold">{{ meses }} Meses</li>
        <li class="text-xl text-gray-500 text-center font-bold">Total a pagar: {{ formatoDinero(total) }}</li>
        <li class="text-xl text-gray-500 text-center font-bold">Mensuales: {{ formatoDinero(pagoMensual) }}</li>
      </ul>
    </div>
    <p
        class="text-center"
        v-else
    >Añade una cantidad y plazo a pagar</p>
  </div>
</template>

<style scoped>

</style>
