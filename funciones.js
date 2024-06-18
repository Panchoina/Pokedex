import { edit, getAll, remove, save, selectOne, subirImagen, checkarNombre } from "./firebase.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.we').forEach(item => {
        verificar(item.id)
    })
    const num = document.getElementById('numero').value.trim()
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (await checkarNombre(num)) {
            Swal.fire({
                title: "ERROR",
                icon: "error",
                text:"El nombre del juego ya está registrado",
                confirmButtonColor: '#00ffe1',
                customClass:{
                confirmButton: 'swal2-confirmm'
                }
            });
        }
        else{
            Swal.fire(':D', 'Pokemon Registrado', 'success');
            const url = await subirImagen(); // Espera a que se suba la imagen y obtener la URL
            console.log(url)
            if (document.querySelectorAll('.is-invalid').length == 0) {
                const sexo = document.querySelector('input[name="sexo"]:checked');
                const sexoValue = sexo ? sexo.value : '';
                const poke = {
                    numero: document.getElementById('numero').value,
                    nom: document.getElementById('nombre').value,
                    tipo: document.getElementById('tipo').value,
                    tipo2: document.getElementById('tipo2').value,
                    sexo: sexoValue, 
                    generacion: document.getElementById('generacion').value,
                    cuando: document.getElementById('cuando').value,
                    url: url}
            if (document.getElementById('btnGuardar').value == 'Guardar') {
                save(poke)
            } else {
                edit(id, poke)
                id = 0
            }limpiar()
        }
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getAll(poke => {
        let tabla = ''
        poke.forEach(doc => {
            const item = doc.data()

            tabla += `<tr>
                <td>${item.numero}</td>
                <td>${item.nom}</td>
                <td>${item.tipo}</td>
                <td>${item.tipo2}</td>
                <td>${item.sexo}</td>
                <td>${item.generacion}</td>
                <td>${item.cuando}</td>
                <td><img src="${item.url}" width="50" /></td> <!-- Mostrar imagen -->
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        //eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estas Seguro Que Quieres Eliminar Tu Registro!!!?",
                    text: "NO PODRAS REVERTIR LOS CAMBIOS D:",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //eliminar
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado con exito.",
                            icon: "success"
                        });
                    }
                });
            })
        })

        // boton editar
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const pok = await selectOne(btn.id)
                const item = pok.data()
                //nuevos valores
                document.getElementById('numero').value = item.numero
                document.getElementById('nombre').value = item.nom
                document.getElementById('tipo').value = item.tipo
                document.getElementById('tipo2').value = item.tipo2
                document.querySelector(`input[name="sexo"][value="${item.sexo}"]`).checked = true;
                document.getElementById('generacion').value = item.generacion
                document.getElementById('cuando').value = item.cuando
                //cambiar el boton de guardar a editar
                document.getElementById('btnGuardar').value = 'Editar'
                id = btn.id
            })
        })

    })
})

// boton limpiar
document.getElementById('limpiar').addEventListener('click', () => {
    limpiar()
})
