import React, { useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState(null);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            const result = await response.json();
            setAnswer(result.answer);
            setData(result.data);

            // Basic Chart Data Processing (Adapt based on your backend data)
            if (result.data && result.data.length > 0) {
                const labels = result.data.map(item => Object.values(item)[0]);
                const values = result.data.map(item => Object.values(item)[1] || 0);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Data Values',
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            data: values,
                        },
                    ],
                });
            } else {
                setChartData(null);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setAnswer('Error fetching data.');
            setData([]);
            setChartData(null);
        }
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart',
            },
        },
    };

    return (
        <div className="App">
            <h1>AI Data Agent (Simplified)</h1>
            <input
                type="text"
                placeholder="Ask a SQL query..."
                value={query}
                onChange={handleInputChange}
                style={{ width: '80%', padding: '10px', fontSize: '16px' }}
            />
            <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>Ask</button>

            {answer && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Answer:</h2>
                    <p>{answer}</p>
                </div>
            )}

            {data.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Data:</h2>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key} style={{ border: '1px solid black', padding: '8px' }}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {chartData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Chart:</h2>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
}

export default App;