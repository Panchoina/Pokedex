const verificar = async (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        if (id == 'numero'){
            div.innerHTML = ''
            if (input.value > 42) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Porfavor Ingrese Un ID De El 1 Al 42</span>'
            }
        }
        if (id == 'cuando') {
            if (validarFecha(input.value) < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No Puede Ingresar Pensando A Futuro</span>'
            }
        }

    }
}
const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = (resta / (1000 * 60 * 60 * 24))
    return dia.toFixed(0)
}
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
    })
    document.querySelectorAll('[id^="e-"]').forEach(div => {
        div.innerHTML = '';
    });
}
const soloNumero = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
