document.addEventListener('DOMContentLoaded', () => {
    // ---- 10. Theme Toggle ----
    const themeBtn = document.getElementById('theme-toggle');
    const app = document.getElementById('app');
    let isDark = true;

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        if(isDark) {
            document.body.classList.add('dark-mode');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        }
        if(window.mainChartInst) {
            Chart.defaults.color = isDark ? '#94a3b8' : '#475569';
            window.mainChartInst.update();
        }
    });

    // ---- Sidebar Navigation ----
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view-section');
    const viewTitle = document.getElementById('current-view-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            const target = item.getAttribute('data-target');
            viewTitle.textContent = item.textContent.trim() + ' View';

            views.forEach(v => {
                if(v.id === target) {
                    v.classList.remove('hidden');
                    v.classList.add('active');
                } else {
                    v.classList.add('hidden');
                    v.classList.remove('active');
                }
            });
            
            // Re-render charts if tab switched
            if(target === 'view-report') generateReport();
        });
    });

    // Go to upload button
    document.querySelector('.goto-upload').addEventListener('click', () => {
        document.querySelector('[data-target="view-upload"]').click();
    });

    // ---- Global State ----
    let rawData = [];
    let filteredData = [];
    let headers = [];
    let numericCols = [];

    // ---- 2. CSV Parsing ----
    const fileInput = document.getElementById('csv-file-input');
    const msg = document.getElementById('upload-msg');
    const dataStatus = document.getElementById('data-status');
    const exportBtn = document.getElementById('export-btn');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(!file) return;

        msg.textContent = "Parsing file...";
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            parseCSV(text);
        };
        reader.readAsText(file);
    });

    function parseCSV(text) {
        const lines = text.split('\n').filter(l => l.trim() !== '');
        if(lines.length < 2) {
            msg.textContent = "Invalid CSV format or empty.";
            return;
        }

        // Simple CSV split
        headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        
        rawData = [];
        for(let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            let row = {};
            headers.forEach((h, idx) => {
                let val = values[idx];
                // Try parsing numbers
                if(!isNaN(val) && val !== '') val = Number(val);
                row[h] = val;
            });
            rawData.push(row);
        }
        
        filteredData = [...rawData];
        
        // Identify numeric columns
        numericCols = headers.filter(h => typeof rawData[0][h] === 'number');

        msg.textContent = "File loaded successfully!";
        dataStatus.textContent = "Data Loaded";
        dataStatus.className = "status-badge status-success";
        exportBtn.disabled = false;

        updateDashboardStats();
        populateDropdowns();
        renderTable();
        
        // Auto-switch to dashboard
        document.querySelector('[data-target="view-dashboard"]').click();
    }

    // ---- 1. Dashboard Stats Update ----
    function updateDashboardStats() {
        document.getElementById('dash-rows').textContent = filteredData.length;
        document.getElementById('dash-cols').textContent = headers.length;
        document.getElementById('dash-num-cols').textContent = numericCols.length;
    }

    function populateDropdowns() {
        const html = headers.map(h => `<option value="${h}">${h}</option>`).join('');
        document.getElementById('filter-col').innerHTML = '<option value="">-- Select --</option>' + html;
        document.getElementById('chart-x').innerHTML = html;
        document.getElementById('chart-y').innerHTML = numericCols.map(h => `<option value="${h}">${h}</option>`).join('');
        document.getElementById('stat-col').innerHTML = numericCols.map(h => `<option value="${h}">${h}</option>`).join('');
    }

    // ---- 3. Interactive Data Table ----
    let currentSortCol = '';
    let sortAsc = true;

    function renderTable() {
        const head = document.getElementById('table-head');
        const body = document.getElementById('table-body');
        
        head.innerHTML = `<tr>${headers.map(h => `<th data-col="${h}">${h} ${currentSortCol === h ? (sortAsc ? '↑' : '↓') : ''}</th>`).join('')}</tr>`;
        
        // Add sorting listeners
        head.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', () => {
                const col = th.getAttribute('data-col');
                if(currentSortCol === col) sortAsc = !sortAsc;
                else { currentSortCol = col; sortAsc = true; }
                
                filteredData.sort((a, b) => {
                    if(a[col] < b[col]) return sortAsc ? -1 : 1;
                    if(a[col] > b[col]) return sortAsc ? 1 : -1;
                    return 0;
                });
                renderTable();
            });
        });

        const limit = Math.min(filteredData.length, 100); // Display max 100 rows for perf
        let rowsHtml = '';
        for(let i=0; i<limit; i++) {
            rowsHtml += `<tr>${headers.map(h => `<td>${filteredData[i][h]}</td>`).join('')}</tr>`;
        }
        body.innerHTML = rowsHtml;
        document.getElementById('page-info').textContent = `Showing ${limit} of ${filteredData.length} entries`;
    }

    // ---- 5. Data Filtering Engine ----
    document.getElementById('apply-filter').addEventListener('click', () => {
        const searchTxt = document.getElementById('table-search').value.toLowerCase();
        const col = document.getElementById('filter-col').value;
        const op = document.getElementById('filter-op').value;
        const val = document.getElementById('filter-val').value;

        filteredData = rawData.filter(row => {
            // Global Search
            if(searchTxt) {
                const matchesSearch = Object.values(row).some(v => String(v).toLowerCase().includes(searchTxt));
                if(!matchesSearch) return false;
            }
            
            // Column Filter
            if(col && val) {
                const cell = row[col];
                if(op === 'contains' && !String(cell).toLowerCase().includes(val.toLowerCase())) return false;
                if(op === 'equals' && String(cell) !== val) return false;
                if(op === '>' && Number(cell) <= Number(val)) return false;
                if(op === '<' && Number(cell) >= Number(val)) return false;
            }
            return true;
        });
        
        currentSortCol = '';
        renderTable();
        updateDashboardStats();
    });

    document.getElementById('clear-filter').addEventListener('click', () => {
        document.getElementById('table-search').value = '';
        document.getElementById('filter-col').value = '';
        document.getElementById('filter-val').value = '';
        filteredData = [...rawData];
        renderTable();
        updateDashboardStats();
    });

    // ---- 6. Export Data to CSV ----
    exportBtn.addEventListener('click', () => {
        if(filteredData.length === 0) return;
        let csvContent = headers.join(',') + '\n';
        filteredData.forEach(row => {
            csvContent += headers.map(h => `"${row[h]}"`).join(',') + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'exported_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // ---- 4. Advanced Visualizations (Chart.js) ----
    document.getElementById('generate-chart').addEventListener('click', () => {
        if(filteredData.length === 0) return;
        const xCol = document.getElementById('chart-x').value;
        const yCol = document.getElementById('chart-y').value;
        const type = document.getElementById('chart-type').value;

        if(!xCol || !yCol) return;

        // Aggregate data if categorical X
        let agg = {};
        filteredData.forEach(r => {
            const k = r[xCol];
            agg[k] = (agg[k] || 0) + (Number(r[yCol]) || 0);
        });

        // Limit to top 20 for readability
        let entries = Object.entries(agg).sort((a,b) => b[1] - a[1]).slice(0, 20);
        
        const labels = entries.map(e => e[0]);
        const data = entries.map(e => e[1]);

        if(window.mainChartInst) window.mainChartInst.destroy();

        const ctx = document.getElementById('mainChart').getContext('2d');
        Chart.defaults.color = isDark ? '#94a3b8' : '#475569';
        Chart.defaults.font.family = 'Inter';

        window.mainChartInst = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: `Sum of ${yCol} by ${xCol}`,
                    data: data,
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)',
                        'rgba(139, 92, 246, 0.7)', 'rgba(245, 158, 11, 0.7)',
                        'rgba(239, 68, 68, 0.7)', 'rgba(20, 184, 166, 0.7)'
                    ],
                    borderColor: isDark ? '#1e293b' : '#ffffff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        document.getElementById('chart-summary-text').innerHTML = `
            Displaying Top ${entries.length} <strong>${xCol}</strong> based on total <strong>${yCol}</strong>.<br><br>
            Max value: ${Math.max(...data).toLocaleString()}<br>
            Min value: ${Math.min(...data).toLocaleString()}
        `;
    });

    // ---- 7 & 8. Statistical Summary & Anomaly Detection ----
    document.getElementById('calc-stats').addEventListener('click', () => {
        if(filteredData.length === 0) return;
        const col = document.getElementById('stat-col').value;
        if(!col) return;

        const values = filteredData.map(r => Number(r[col])).filter(n => !isNaN(n));
        if(values.length === 0) return;

        // Math
        const sum = values.reduce((a,b) => a+b, 0);
        const mean = sum / values.length;
        
        values.sort((a,b) => a-b);
        const mid = Math.floor(values.length / 2);
        const median = values.length % 2 !== 0 ? values[mid] : (values[mid-1] + values[mid]) / 2;
        
        const min = values[0];
        const max = values[values.length-1];

        // Std Dev
        const variance = values.reduce((a,b) => a + Math.pow(b - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);

        document.getElementById('stat-mean').textContent = mean.toFixed(2);
        document.getElementById('stat-median').textContent = median.toFixed(2);
        document.getElementById('stat-min').textContent = min.toLocaleString();
        document.getElementById('stat-max').textContent = max.toLocaleString();

        // 8. Anomaly Detection (> 2 std devs from mean)
        let anomalies = [];
        filteredData.forEach((row, i) => {
            const v = Number(row[col]);
            if(!isNaN(v)) {
                const zScore = Math.abs((v - mean) / stdDev);
                if(zScore > 2) {
                    anomalies.push({ row: i+1, val: v, score: zScore.toFixed(2) });
                }
            }
        });

        document.getElementById('dash-anomalies').textContent = anomalies.length;

        const tbody = document.getElementById('anomalies-body');
        if(anomalies.length > 0) {
            tbody.innerHTML = anomalies.map(a => `
                <tr>
                    <td>Row ${a.row}</td>
                    <td class="text-danger">${a.val}</td>
                    <td>${a.score} σ</td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="3">No anomalies detected in this column.</td></tr>';
        }
    });

    // ---- 9. Printable Report View ----
    function generateReport() {
        if(rawData.length === 0) return;
        
        const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('report-date').textContent = "Generated on: " + date;
        document.getElementById('rep-rows').textContent = filteredData.length;
        document.getElementById('rep-cols').textContent = headers.length;

        const list = document.getElementById('rep-col-list');
        list.innerHTML = headers.map(h => {
            const isNum = numericCols.includes(h);
            return `<li><strong>${h}</strong>: ${isNum ? 'Numeric Data Type' : 'Categorical/Text Data Type'}</li>`;
        }).join('');
        
        const anomaliesCount = document.getElementById('dash-anomalies').textContent;
        document.getElementById('rep-anomalies-text').innerHTML = anomaliesCount > 0 ? 
            `<span class="text-danger">Warning: ${anomaliesCount} anomalies detected in recent analysis.</span> Check Statistics tab.` : 
            "Data appears stable. No major outliers detected in recent analysis.";
    }

    document.getElementById('print-report').addEventListener('click', () => {
        window.print();
    });
});
