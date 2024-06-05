// Fungsi untuk memuat data dari file data.json
async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        processEastData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fungsi untuk memproses data untuk region East
function processEastData(data) {
    const eastData = data.filter(item => item.Region === 'East');

    renderSegmentChart(eastData);
    renderCategoryChart(eastData);
    renderDiscountChart(eastData);
    renderSubCategoryChart(eastData);  // Tambahkan fungsi untuk sub-kategori
}

// Fungsi untuk membuat grafik segment
function renderSegmentChart(data) {
    const segmentProfit = {};
    data.forEach(item => {
        let profit = parseFloat(item.Profit?.toString().replace(',', '.') || 0);
        if (segmentProfit[item.Segment]) {
            segmentProfit[item.Segment] += profit;
        } else {
            segmentProfit[item.Segment] = profit;
        }
    });

    const segments = Object.keys(segmentProfit);
    const profits = Object.values(segmentProfit);

    const ctx = document.getElementById('eastSegmentChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: segments,
            datasets: [{
                label: 'Profit',
                data: profits,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Set to false to adjust height
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Profit ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Segment'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Fungsi untuk membuat grafik kategori
function renderCategoryChart(data) {
    const categoryProfit = {};
    data.forEach(item => {
        let profit = parseFloat(item.Profit?.toString().replace(',', '.') || 0);
        if (categoryProfit[item.Category]) {
            categoryProfit[item.Category] += profit;
        } else {
            categoryProfit[item.Category] = profit;
        }
    });

    const categories = Object.keys(categoryProfit);
    const profits = Object.values(categoryProfit);

    const ctx = document.getElementById('eastCategoryChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Profit',
                data: profits,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Set to false to adjust height
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Profit ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Category'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Fungsi untuk membuat grafik diskon
function renderDiscountChart(data) {
    const discountProfit = {};
    data.forEach(item => {
        const discount = parseFloat(item.Discount?.toString().replace(',', '.') || 0);
        let profit = parseFloat(item.Profit?.toString().replace(',', '.') || 0);
        if (discountProfit[discount]) {
            discountProfit[discount] += profit;
        } else {
            discountProfit[discount] = profit;
        }
    });

    const discounts = Object.keys(discountProfit);
    const profits = Object.values(discountProfit);

    const ctx = document.getElementById('eastDiscountChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: discounts.map(d => `${(d * 100).toFixed(2)}%`),
            datasets: [{
                label: 'Profit',
                data: profits,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Set to false to adjust height
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Fungsi untuk membuat grafik sub-kategori
function renderSubCategoryChart(data) {
    const subCategoryProfit = {};
    data.forEach(item => {
        let profit = parseFloat(item.Profit?.toString().replace(',', '.') || 0);
        if (subCategoryProfit[item['Sub-Category']]) {
            subCategoryProfit[item['Sub-Category']] += profit;
        } else {
            subCategoryProfit[item['Sub-Category']] = profit;
        }
    });

    const subCategories = Object.keys(subCategoryProfit);
    const profits = Object.values(subCategoryProfit);

    const ctx = document.getElementById('eastSubCategoryChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subCategories,
            datasets: [{
                label: 'Profit',
                data: profits,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Set to false to adjust height
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Profit ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Sub-Category'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});