fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Inisialisasi objek untuk menyimpan profit berdasarkan category
    const profitByCategory = {};

    // Iterasi melalui setiap entri data
    data.forEach(entry => {
      // Ambil nilai profit dan category dari setiap entri
      const profit = parseFloat(entry.Profit.replace(',', '.')); // Mengubah string menjadi angka
      const category = entry.Category;

      // Jika category belum ada dalam objek profitByCategory, tambahkan
      if (!profitByCategory[category]) {
        profitByCategory[category] = profit;
      } else {
        // Jika category sudah ada dalam objek profitByCategory, tambahkan nilai profit ke profit yang sudah ada
        profitByCategory[category] += profit;
      }
    });

    // Mendapatkan label dan data dari objek profitByCategory
    const categories = Object.keys(profitByCategory);
    const profits = Object.values(profitByCategory);
    
    // Membuat grafik batang menggunakan Chart.js
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Profit Kategori Superstore',
                data: profits,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  })
  .catch(error => console.error('Error fetching the data:', error));
