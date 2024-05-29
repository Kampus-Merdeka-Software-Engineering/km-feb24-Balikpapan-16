// Mengambil data dari data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Memproses data untuk chart
        const labels = data.map(item => item["Order Date"]);
        const profitData = data.map(item => parseFloat(item.Profit.replace(',', '.')));
        const discountData = data.map(item => item.Discount);

        // Membuat chart menggunakan Chart.js
        const ctx = document.getElementById('lineChart').getContext('2d');
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Profit',
                        data: profitData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false
                    },
                    {
                        label: 'Diskon',
                        data: discountData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Profit dan Diskon per Order Date'
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'dd/MM/yyyy',
                            displayFormats: {
                                day: 'dd/MM/yyyy'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Tanggal Order'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Nilai'
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching the data:', error));
