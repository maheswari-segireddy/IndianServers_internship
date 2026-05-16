document.addEventListener('DOMContentLoaded', () => {
    // ---- THEME TOGGLE ----
    const themeToggleBtn = document.getElementById('theme-toggle');
    const appContainer = document.getElementById('app');
    const themeIcon = themeToggleBtn.querySelector('i');

    let isDarkMode = true;

    const getChartTextColor = () => isDarkMode ? '#94a3b8' : '#475569';
    const getChartGridColor = () => isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

    themeToggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if(isDarkMode) {
            appContainer.classList.add('dark-mode');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            appContainer.classList.remove('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        updateChartThemes();
    });

    // ---- NAVIGATION LOGIC ----
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if(!targetId) return;

            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show target section, hide others
            viewSections.forEach(section => {
                if(section.id === targetId) {
                    section.classList.add('active');
                    section.classList.remove('hidden');
                } else {
                    section.classList.remove('active');
                    section.classList.add('hidden');
                }
            });
        });
    });

    // ---- DUMMY DATA FOR TABLES ----
    function populateTables() {
        const productsTbody = document.getElementById('products-tbody');
        const products = [
            { id: 'PRD-101', name: 'Nexus Smartwatch', category: 'Electronics', price: '$299.00', stock: 124, status: 'In Stock' },
            { id: 'PRD-102', name: 'Wireless Earbuds Pro', category: 'Electronics', price: '$149.00', stock: 45, status: 'Low Stock' },
            { id: 'PRD-103', name: 'Ergonomic Desk Chair', category: 'Home', price: '$249.50', stock: 0, status: 'Out of Stock' },
            { id: 'PRD-104', name: 'Organic Cotton T-Shirt', category: 'Clothing', price: '$29.99', stock: 300, status: 'In Stock' },
            { id: 'PRD-105', name: 'Hydration Face Serum', category: 'Beauty', price: '$45.00', stock: 12, status: 'Low Stock' }
        ];

        products.forEach(p => {
            let statusClass = '';
            if(p.status === 'In Stock') statusClass = 'status-instock';
            else if(p.status === 'Low Stock') statusClass = 'status-lowstock';
            else statusClass = 'status-outofstock';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${p.id}</strong></td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
                <td><span class="status-badge ${statusClass}">${p.status}</span></td>
            `;
            productsTbody.appendChild(tr);
        });

        const customersTbody = document.getElementById('customers-tbody');
        const customers = [
            { name: 'Alice Freeman', email: 'alice.f@example.com', orders: 12, spent: '$1,240.00' },
            { name: 'Michael Chen', email: 'm.chen@example.com', orders: 4, spent: '$430.50' },
            { name: 'Sarah Jenkins', email: 'sarah.j@example.com', orders: 28, spent: '$5,120.00' },
            { name: 'David Smith', email: 'david.smith99@example.com', orders: 1, spent: '$29.99' }
        ];

        customers.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${c.name}</strong></td>
                <td>${c.email}</td>
                <td>${c.orders}</td>
                <td>${c.spent}</td>
            `;
            customersTbody.appendChild(tr);
        });
    }

    populateTables();

    // ---- CHART LOGIC ----
    const allMonthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseData = {
        totalRevenue: [15000, 18500, 14200, 21000, 25400, 28500],
        salesCategory: [4500, 7200, 3100, 8900],
        customerGrowth: [120, 150, 145, 190, 230, 260],
        trafficSource: [45, 25, 20, 10],
        deviceUsage: [55, 40, 5]
    };

    let areaChart, barChart, lineChart, doughnutChart, pieChart;

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: getChartTextColor(), font: { family: 'Inter' } }
            }
        }
    };

    const commonScaleOptions = {
        x: {
            ticks: { color: getChartTextColor() },
            grid: { color: getChartGridColor() }
        },
        y: {
            ticks: { color: getChartTextColor() },
            grid: { color: getChartGridColor() }
        }
    };

    function initCharts() {
        Chart.defaults.color = getChartTextColor();
        Chart.defaults.font.family = 'Inter';

        const ctxArea = document.getElementById('areaChart').getContext('2d');
        const gradientArea = ctxArea.createLinearGradient(0, 0, 0, 400);
        gradientArea.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradientArea.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        areaChart = new Chart(ctxArea, {
            type: 'line',
            data: {
                labels: allMonthsLabels,
                datasets: [{
                    label: 'Total Revenue ($)',
                    data: baseData.totalRevenue,
                    borderColor: '#3b82f6',
                    backgroundColor: gradientArea,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6'
                }]
            },
            options: { ...commonOptions, scales: commonScaleOptions }
        });

        const ctxBar = document.getElementById('barChart').getContext('2d');
        barChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Electronics', 'Clothing', 'Home', 'Beauty'],
                datasets: [{
                    label: 'Sales ($)',
                    data: baseData.salesCategory,
                    backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'],
                    borderRadius: 6
                }]
            },
            options: { ...commonOptions, scales: commonScaleOptions }
        });

        const ctxLine = document.getElementById('lineChart').getContext('2d');
        lineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: allMonthsLabels,
                datasets: [{
                    label: 'New Customers',
                    data: baseData.customerGrowth,
                    borderColor: '#10b981',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981'
                }]
            },
            options: { ...commonOptions, scales: commonScaleOptions }
        });

        const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
        doughnutChart = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social', 'Organic', 'Referral'],
                datasets: [{
                    data: baseData.trafficSource,
                    backgroundColor: ['#3b82f6', '#ec4899', '#10b981', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: { ...commonOptions, cutout: '75%' }
        });

        const ctxPie = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Mobile', 'Desktop', 'Tablet'],
                datasets: [{
                    data: baseData.deviceUsage,
                    backgroundColor: ['#8b5cf6', '#3b82f6', '#14b8a6'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: commonOptions
        });
        
        updateStatsCards('All');
    }

    function updateChartThemes() {
        const textColor = getChartTextColor();
        const gridColor = getChartGridColor();

        const charts = [areaChart, barChart, lineChart, doughnutChart, pieChart];
        
        charts.forEach(chart => {
            if(chart.options.plugins.legend.labels) chart.options.plugins.legend.labels.color = textColor;
            if(chart.options.scales) {
                if(chart.options.scales.x) {
                    chart.options.scales.x.ticks.color = textColor;
                    chart.options.scales.x.grid.color = gridColor;
                }
                if(chart.options.scales.y) {
                    chart.options.scales.y.ticks.color = textColor;
                    chart.options.scales.y.grid.color = gridColor;
                }
            }
            chart.update();
        });
    }

    const monthFilter = document.getElementById('month-filter');
    const elRevenue = document.getElementById('total-revenue');
    const elSales = document.getElementById('total-sales');
    const elCustomers = document.getElementById('active-customers');
    const elConversion = document.getElementById('conversion-rate');

    function updateStatsCards(month) {
        if(month === 'All') {
            elRevenue.textContent = '$122,600';
            elSales.textContent = '23,700';
            elCustomers.textContent = '1,095';
            elConversion.textContent = '4.2%';
        } else {
            const randFactor = Math.random() * 0.5 + 0.8;
            elRevenue.textContent = '$' + Math.floor(25000 * randFactor).toLocaleString();
            elSales.textContent = Math.floor(4500 * randFactor).toLocaleString();
            elCustomers.textContent = Math.floor(200 * randFactor).toLocaleString();
            elConversion.textContent = (3.5 * randFactor).toFixed(1) + '%';
        }
    }

    monthFilter.addEventListener('change', (e) => {
        const selectedMonth = e.target.value;
        updateStatsCards(selectedMonth);

        let newLabels, newRevenue, newCustomers, randFactor;
        
        if(selectedMonth === 'All') {
            newLabels = allMonthsLabels;
            newRevenue = baseData.totalRevenue;
            newCustomers = baseData.customerGrowth;
            randFactor = 1;
        } else {
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            randFactor = Math.random() * 0.5 + 0.5;
            newRevenue = [
                Math.floor(6000 * randFactor), 
                Math.floor(7500 * randFactor), 
                Math.floor(5000 * randFactor), 
                Math.floor(8200 * randFactor)
            ];
            newCustomers = [
                Math.floor(40 * randFactor),
                Math.floor(60 * randFactor),
                Math.floor(35 * randFactor),
                Math.floor(80 * randFactor)
            ];
        }

        areaChart.data.labels = newLabels;
        areaChart.data.datasets[0].data = newRevenue;
        areaChart.update();

        lineChart.data.labels = newLabels;
        lineChart.data.datasets[0].data = newCustomers;
        lineChart.update();

        barChart.data.datasets[0].data = baseData.salesCategory.map(val => val * randFactor);
        barChart.update();

        doughnutChart.data.datasets[0].data = baseData.trafficSource.map(val => val * (Math.random() + 0.5));
        doughnutChart.update();

        pieChart.data.datasets[0].data = baseData.deviceUsage.map(val => val * (Math.random() + 0.5));
        pieChart.update();
    });

    initCharts();
});
