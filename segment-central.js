fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Inisialisasi objek untuk menyimpan profit berdasarkan segment
    const profitBySegment = {};

    // Iterasi melalui setiap entri data
    data.forEach(entry => {
      // Ambil nilai profit dan segment dari setiap entri
      const profit = parseFloat(entry.Profit.replace(',', '.')); // Mengubah string menjadi angka
      const segment = entry.Segment;

      // Jika segment belum ada dalam objek profitBySegment, tambahkan
      if (!profitBySegment[segment]) {
        profitBySegment[segment] = profit;
      } else {
        // Jika segment sudah ada dalam objek profitBySegment, tambahkan nilai profit ke profit yang sudah ada
        profitBySegment[segment] += profit;
      }
    });

    // Mendapatkan label dan data dari objek profitBySegment
    const segments = Object.keys(profitBySegment);
    const profits = Object.values(profitBySegment);
    
    // Membuat grafik batang menggunakan Chart.js
    const ctx = document.getElementById('segmentChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: segments,
            datasets: [{
                label: 'Profit Segmen Superstore',
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
