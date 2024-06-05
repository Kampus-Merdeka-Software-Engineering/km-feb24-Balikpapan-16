document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data); // Debugging line

            // Process the data to get annual profits
            const profitData = {};

            data.forEach(item => {
                const year = new Date(item["Order Date"].split('/').reverse().join('-')).getFullYear();
                let profit;

                if (typeof item.Profit === 'string') {
                    profit = parseFloat(item.Profit.replace(",", "."));
                } else {
                    profit = parseFloat(item.Profit);
                }

                if (profitData[year]) {
                    profitData[year] += profit;
                } else {
                    profitData[year] = profit;
                }
            });

            console.log('Processed profit data:', profitData); // Debugging line

            // Prepare the data for Chart.js
            const labels = Object.keys(profitData).sort();
            const profits = labels.map(year => profitData[year].toFixed(2));

            console.log('Labels:', labels); // Debugging line
            console.log('Profits:', profits); // Debugging line

            // Create the chart
            const ctx = document.getElementById('profitChart').getContext('2d');
            const profitChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Annual Profit',
                        data: profits,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Profit'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
