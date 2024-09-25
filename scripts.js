// Script to toggle the sidebar
document.getElementById('sidebarToggle').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    if (sidebar.style.width === '250px' || sidebar.style.width === '') {
        sidebar.style.width = '0';
        content.style.marginLeft = '0';
    } else {
        sidebar.style.width = '250px';
        content.style.marginLeft = '250px';
    }
})
let  clientes 

fetch('http://localhost:5000/cliente')
    .then(response => {
        if (!response.ok) { // Verificamos si hubo un error en la respuesta
            throw new Error('Error en la petición: ' + response.status);
        }
        return  response.json() // Convertimos la respuesta en JSON
    })
    .then(data => {
        clientes = data // Mostramos los datos
        generateTableRows()

    })
    .catch(error => {
        console.error('Hubo un problema con la petición:', error);
    })


const tableBody = document.getElementById('table-body');
function generateTableRows() {
    clientes.forEach(row => {
        // Create a new row
        const tr = document.createElement('tr');

        // Create and populate <th> for the row number
        const th = document.createElement('th');
        th.scope = "row";
        th.textContent = row.id;

        // Create and populate <td> for the name
        const tdName = document.createElement('td');
        tdName.textContent = row.nombre;

        // Create and populate <td> for the age
        const tdAge = document.createElement('td');
        tdAge.textContent = row.Apellido;

        // Append <th> and <td> to the row
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdAge);

        // Append the row to the <tbody>
        tableBody.appendChild(tr);
    });
}


