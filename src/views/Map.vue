<script setup>
import Papa from "papaparse";
import { ref } from "vue";

const headers = ref([]);
const jsonRows = ref([]);

const convertCSVtoJSON = (csv) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const csv = e.target.result;
    convertCSVtoJSON(csv)
      .then((json) => {
        console.table(json);
        // headers.value = Object.keys(json[0]);
        // jsonRows.value = json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  reader.readAsText(file);
};
</script>

<template>
  <div>
    <input accept=".csv" type="file" @change="handleFileUpload" />
    <table v-if="jsonRows.length">
      <thead>
        <tr>
          <th
            class="border border-black p-2"
            v-for="header in headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in jsonRows" :key="row.id">
          <td
            class="border border-black p-2"
            v-for="header in headers"
            :key="header"
          >
            {{ row[header] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
