// Call the dataTables jQuery plugin
$(document).ready(function() {
	cargarUsuarios();
	//$('#usuarios').DataTable();
	actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
	document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

async function cargarUsuarios() {
	const request = await fetch('api/usuarios', {
		method: 'GET',
		headers: getHeaders()
	});
	const usuarios = await request.json();

	$('#usuarios').DataTable({
		data: usuarios,
		columnDefs: [{
				targets: 0,
				data: 'id'
			},
			{
				targets: 1,
				data: '',
				render: function(data, type, row, meta) {
					return row.nombre + ' ' + row.apellido;
				}
			},
			{
				targets: 2,
				data: 'email'
			},
			{
				targets: 3,
				data: 'telefono',
				render: function(data, type, row, meta) {
					return data ?? '-';
				}
			},
			{
				targets: 4,
				data: 'id',
				render: function(data, type, row, meta) {
					return '<a href="#" onclick="eliminarUsuario(' + data + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
				}
			}
		]
	});

    /*
	let listadoHtml = '';
	for (let usuario of usuarios) {
		let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

		let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;
		let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>' +
			usuario.email + '</td><td>' + telefonoTexto +
			'</td><td>' + botonEliminar + '</td></tr>';
		listadoHtml += usuarioHtml;
	}

	document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
	*/
}

function getHeaders() {
	return {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': localStorage.token
	};
}

async function eliminarUsuario(id) {

	if (!confirm('¿Desea eliminar este usuario?')) {
		return;
	}

	const request = await fetch('api/usuarios/' + id, {
		method: 'DELETE',
		headers: getHeaders()
	});

	location.reload()
}