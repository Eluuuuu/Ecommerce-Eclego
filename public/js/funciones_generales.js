const campos_obligatorios = (ref) => {
    let div_ref = document.getElementById(ref)

    const obligatorios = div_ref.querySelectorAll('.obligatorio');
    let datosOk = true

    for (const oblig of obligatorios) {
        if (oblig.value == "") {

            let error = oblig.getAttribute('data_error')
            document.getElementById('mensajeError').innerHTML = error
            datosOk = false
            break
        }
    }

    return datosOk
}