const catalogo = document.getElementById('catalogo');
const clearAllBtn = document.getElementById('clearAll');

// Limpia todos los registros
clearAllBtn.addEventListener('click', () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todos los registros?')) {
        catalogo.querySelectorAll('.registro').forEach(r => r.remove());
    }
});

function validar() {
    // 1) Limpiar estilos previos
    const camposTexto = ['Usuario', 'Email', 'Telefono'];
    camposTexto.forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('invalid', 'valid');
        document.getElementById('label' + id).classList.remove('invalid', 'valid');
    });
    const textarea = document.getElementById('Comentario');
    textarea.classList.remove('invalid', 'valid');
    document.getElementById('labelComentario').classList.remove('invalid', 'valid');
    const select = document.getElementById('Idiomas');
    select.classList.remove('invalid', 'valid');
    document.getElementById('labelIdiomas').classList.remove('invalid', 'valid');
    document.getElementById('labelMotivacion').classList.remove('invalid', 'valid');

    let formularioValido = true;

    // 2) Validar textfields (no vacíos)
    camposTexto.forEach(id => {
        const el = document.getElementById(id);
        const label = document.getElementById('label' + id);
        if (!el.value.trim()) {
            el.classList.add('invalid');
            label.classList.add('invalid');
            formularioValido = false;
        } else {
            el.classList.add('valid');
            label.classList.add('valid');
        }
    });

    // 3) Validar textarea (no vacío)
    if (!textarea.value.trim()) {
        textarea.classList.add('invalid');
        document.getElementById('labelComentario').classList.add('invalid');
        formularioValido = false;
        mensajesError.push('El campo Descríbete no debe estar vacío.');
    } else {
        textarea.classList.add('valid');
        document.getElementById('labelComentario').classList.add('valid');
    }

    // 4) Validar select (debe elegir una opción)
    if (!select.value) {
        select.classList.add('invalid');
        document.getElementById('labelIdiomas').classList.add('invalid');
        formularioValido = false;
        mensajesError.push('Debes seleccionar un idioma.');
    } else {
        select.classList.add('valid');
        document.getElementById('labelIdiomas').classList.add('valid');
    }

    // 5) Validar checkboxes (al menos uno marcado)
    const checkboxes = document.querySelectorAll('input[name="motivacion"]');
    const alguno = Array.from(checkboxes).some(cb => cb.checked);
    if (!alguno) {
        document.getElementById('labelMotivacion').classList.add('invalid');
        formularioValido = false;
        mensajesError.push('Debes seleccionar al menos una motivación.');
    } else {
        document.getElementById('labelMotivacion').classList.add('valid');
    }

    // 6) Si todo es válido, agregamos el registro; si no, mostramos alerta
    if (formularioValido) {
        agregarRegistro();
        alert('¡Formulario válido! Registro añadido al catálogo.');
    } else {
        alert('Por favor, corrige los campos resaltados.');
    }
}

function agregarRegistro() {
    // Recoger datos
    const usuario = document.getElementById('Usuario').value.trim();
    const email = document.getElementById('Email').value.trim();
    const telefono = document.getElementById('Telefono').value.trim();
    const comentario = document.getElementById('Comentario').value.trim();
    const idioma = document.getElementById('Idiomas').value;
    const motivos = Array.from(
        document.querySelectorAll('input[name="motivacion"]:checked')
    ).map(cb => {
        const label = document.querySelector(`label[for="${cb.id}"]`);
        return label ? label.textContent : '';
    });

    // Crear contenedor del registro
    const registro = document.createElement('div');
    registro.classList.add('registro');

    // Botón borrar individual
    const del = document.createElement('button');
    del.classList.add('delete-btn');
    del.type = 'button';
    del.textContent = 'Eliminar';
    del.addEventListener('click', () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            registro.remove();
        }
    });
    registro.appendChild(del);

    // Título
    const titulo = document.createElement('h4');
    titulo.textContent = `${usuario} — ${idioma}`;
    registro.appendChild(titulo);

    // Campos a mostrar
    const campos = [
        ['Email', email],
        ['Teléfono', telefono],
        ['Comentario', comentario],
        ['Motivación', motivos.join(', ') || '—']
    ];
    campos.forEach(([etiqueta, valor]) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${etiqueta}:</strong> ${valor}`;
        registro.appendChild(p);
    });

    // Insertar al final del catálogo
    const catalogo = document.getElementById('catalogo');
    catalogo.appendChild(registro);

    // Limpiar formulario y estilos de validación
    document.getElementById('miFormulario').reset();
    document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
}