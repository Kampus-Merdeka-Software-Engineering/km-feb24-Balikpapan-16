document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  // Fungsi untuk memuat data dari file data.json
  async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        processCentralData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }
  
  // Fungsi untuk memproses data untuk region Central
  function processCentralData(data) {
    const centralData = data.filter(item => item.Region === 'Central');
  
    renderSegmentChart(centralData);
    renderCategoryChart(centralData);
    renderDiscountChart(centralData);
    renderSubCategoryChart(centralData);  // Tambahkan fungsi untuk sub-kategori
  }
  
  // Fungsi untuk membuat grafik segment
  function renderSegmentChart(data) {
    const segmentProfit = {};
    data.forEach(item => {
        if (segmentProfit[item.Segment]) {
            let char = ',' ? ',' : '';
            segmentProfit[item.Segment] += parseFloat(item.Profit.replace(char, '.'));
        } else {
            segmentProfit[item.Segment] = parseFloat(item.Profit.replace(',', '.'));
        }
    });
  
    const segments = Object.keys(segmentProfit);
    const profits = Object.values(segmentProfit);
  
    const ctx = document.getElementById('centralSegmentChart').getContext('2d');
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
        if (categoryProfit[item.Category]) {
            categoryProfit[item.Category] += parseFloat(item.Profit.replace(',', '.'));
        } else {
            categoryProfit[item.Category] = parseFloat(item.Profit.replace(',', '.'));
        }
    });
  
    const categories = Object.keys(categoryProfit);
    const profits = Object.values(categoryProfit);
  
    const ctx = document.getElementById('centralCategoryChart').getContext('2d');
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
        const discount = parseFloat(item.Discount.toString().replace(',', '.')) || 0;
        if (discountProfit[discount]) {
            discountProfit[discount] += parseFloat(item.Profit.replace(',', '.'));
        } else {
            discountProfit[discount] = parseFloat(item.Profit.replace(',', '.'));
        }
    });
  
    const discounts = Object.keys(discountProfit);
    const profits = Object.values(discountProfit);
  
    const ctx = document.getElementById('centralDiscountChart').getContext('2d');
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
        if (subCategoryProfit[item['Sub-Category']]) {
            subCategoryProfit[item['Sub-Category']] += parseFloat(item.Profit.replace(',', '.'));
        } else {
            subCategoryProfit[item['Sub-Category']] = parseFloat(item.Profit.replace(',', '.'));
        }
    });
  
    const subCategories = Object.keys(subCategoryProfit);
    const profits = Object.values(subCategoryProfit);
  
    const ctx = document.getElementById('centralSubCategoryChart').getContext('2d');
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
  