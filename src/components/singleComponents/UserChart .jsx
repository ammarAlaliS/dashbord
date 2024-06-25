import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const UserChart = ({ backendInfo, name }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    // Cleanup previous chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Create new chart instance
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Generar datos para la evolución de usuarios por meses
      const dataPoints = Array.from({ length: 12 }, (_, index) => ({
        x: index + 1,
        y: Math.floor(Math.random() * 100) // Datos aleatorios entre 0 y 100 para cada mes
      }));

      // Datos para el gráfico de línea
      const lineData = {
        labels: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ], 
        datasets: [{
          label: `Evolución de ${name}`,
          data: dataPoints,
          borderColor: 'rgba(255, 99, 132, 1)', // Color rojo
          borderWidth: 2,
          fill: true,
          pointRadius: 3, // Tamaño de los puntos en la línea
        }]
      };

      // Configuración del gráfico
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: lineData,
        options: {
          scales: {
            x: {
              type: 'category', // Tipo de escala para los meses
              labels: lineData.labels, // Etiquetas personalizadas para los meses
              position: 'bottom'
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(56, 142, 60, 0.6)'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              enabled: true,
              intersect: false,
              mode: 'index',
            }
          }
        }
      });
    }

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [name]); // Dependencia solo de 'name', ya que los datos son generados estáticamente por meses

  return (
    <div className="user-chart">
      <h2>Gráfico de línea de {name}</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default UserChart;
