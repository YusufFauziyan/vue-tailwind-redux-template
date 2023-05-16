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
    const result = e.target.result;
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension === "csv") {
      convertCSVtoJSON(result)
        .then((json) => {
          console.table(json);

          // // Convert JSON to string
          const jsonString = JSON.stringify(json);

          // Create a Blob object with the JSON string
          const blob = new Blob([jsonString], { type: "application/json" });

          // Create a temporary download link
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = `${file.name.split(".")[0]}.json`;

          // Simulate a click on the download link to trigger the download
          downloadLink.click();

          // Clean up the temporary download link
          URL.revokeObjectURL(downloadLink.href);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (extension === "xlsx") {
      const workbook = XLSX.read(result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      convertCSVtoJSON(csv)
        .then((json) => {
          console.table(json);
          // headers.value = Object.keys(json[0]);
          // jsonRows.value = json;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Unsupported file format");
    }
  };

  reader.readAsBinaryString(file);
};

// const handleFileUpload = (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   console.log(file);

//   reader.onload = (e) => {
//     const csv = e.target.result;
//     convertCSVtoJSON(csv)
//       .then((json) => {
//         console.log(json);
//         // // Convert JSON to string
//         // const jsonString = JSON.stringify(json);

//         // // Create a Blob object with the JSON string
//         // const blob = new Blob([jsonString], { type: "application/json" });

//         // // Create a temporary download link
//         // const downloadLink = document.createElement("a");
//         // downloadLink.href = URL.createObjectURL(blob);
//         // downloadLink.download = `${file.name.split(".")[0]}.json`;

//         // // Simulate a click on the download link to trigger the download
//         // downloadLink.click();

//         // // Clean up the temporary download link
//         // URL.revokeObjectURL(downloadLink.href);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   reader.readAsText(file);
// };
</script>

<template>
  <div>
    <p>Upload and Download ur file automaticly into .json</p>
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
