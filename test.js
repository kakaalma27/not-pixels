(function () {
  // Buat objek untuk menampung semua data dari localStorage
  const localStorageData = {};

  // Loop melalui localStorage dan ambil semua key dan value
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }

  // Ubah objek menjadi string JSON
  const jsonString = JSON.stringify(localStorageData, null, 2);

  // Buat elemen link untuk mendownload file
  const downloadLink = document.createElement("a");

  // Buat blob dengan data JSON dan set sebagai file untuk diunduh
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Set properti pada link untuk mendownload file
  downloadLink.href = url;
  downloadLink.download = "localStorageData.json";

  // Tambahkan link ke dokumen dan trigger klik untuk mendownload file
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Hapus link setelah selesai
  document.body.removeChild(downloadLink);
})();
