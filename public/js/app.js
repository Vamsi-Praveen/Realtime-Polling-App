const socket = io()

document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                submitVote(`option${index + 1}`)
                window.location.href = '/thankyou'
            }
        })
    })
})

function submitVote(option) {
    socket.emit('submit_vote', option)
}

let chart;
function createChart(data) {
    const ctx = document.getElementById('pollChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Manmohan Singh', 'Prathiba Patel', 'Narendra Modi', 'Sardar Vallabai Patel'],
            datasets: [{
                label: 'Poll Results',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
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
    })
}


socket.on('update_votes', (votes) => {
    if (chart) {
        chart.data.datasets[0].data = Object.values(votes);
        chart.update()
    }
    else {
        createChart(votes)
    }
})