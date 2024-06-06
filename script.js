// Fungsi untuk memuat data JSON dan membuat grafik
async function loadAndRenderChart() {
    try {
        // Mengambil data dari file data.json
        const response = await fetch('data.json');
        const data = await response.json();

        // Memproses data untuk grafik
        const processedData = data.map(item => {
            let profit = item.Profit;
            if (typeof profit === 'string') {
                profit = parseFloat(profit.replace(',', '.'));
            } else {
                profit = parseFloat(profit);
            }
            return {
                orderId: item['Order ID'],
                year: item['Order Date'].split('/')[2],
                profit: profit
            };
        });

        // Mengelompokkan data berdasarkan tahun
        const groupedData = processedData.reduce((acc, item) => {
            if (!acc[item.year]) {
                acc[item.year] = {
                    totalProfit: 0,
                    orderIds: new Set()
                };
            }
            acc[item.year].totalProfit += item.profit;
            acc[item.year].orderIds.add(item.orderId);
            return acc;
        }, {});

        // Mengatur data untuk Chart.js
        const labels = Object.keys(groupedData);
        const profits = Object.values(groupedData).map(item => item.totalProfit);

        // Membuat grafik menggunakan Chart.js
        const ctx = document.getElementById('profitChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Profit per Tahun',
                    data: profits,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Grafik Total Profit per Tahun'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading or processing data:', error);
    }
}

// Memanggil fungsi untuk memuat data dan membuat grafik saat dokumen siap
document.addEventListener('DOMContentLoaded', loadAndRenderChart);
