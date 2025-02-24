document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        ccemail: '',
        asunto: '',
        mensaje: ''
    }
    
    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCcEmail = document.querySelector('#ccemail');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignar eventos
    inputEmail.addEventListener('blur', validarCampo);
    inputCcEmail.addEventListener('blur', validarCampo);
    inputAsunto.addEventListener('blur', validarCampo);
    inputMensaje.addEventListener('blur', validarCampo);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    });

    formulario.addEventListener('submit', enviarEmail);

    function enviarEmail(e) {
        e.preventDefault();
        
        spinner.classList.add('spinner');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('spinner');
            spinner.classList.add('hidden');
            resetFormulario();
            //Mostrar mensaje de éxito
            messageSuccess('El mensaje se ha enviado correctamente');
        }, 3000);
    };

    //Funciones 
    function validarCampo(e){
        //validar que el campo es requerido



        if (e.target.required && !e.target.value.trim() ) {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El campo ${e.target.id} no es válido`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'ccemail' && !validarEmail(e.target.value)){
            console.log('ccemail');
            mostrarAlerta(`El campo ${e.target.id} no es válido`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.id] = e.target.value.trim().toLowerCase();  
        
        comprobarEmail();
         
    }
    
    function mostrarAlerta(mensaje, referencia){
        //Comprobar si ya exxiste una alerta
        limpiarAlerta(referencia);
        
        //Generar laerta en HTML
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('message-error');

        //Agregar la alerta al formulario
        try {
            referencia.appendChild(error);
        } catch (err) {
            console.error('Error al agregar la alerta:', err);
        }
        
    }

    function validarEmail(inputEmail) {
        const email = inputEmail;
        const expresion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = expresion.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;

        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    messageSuccess = (mensaje) => {
        const alerta = document.createElement('DIV');
        alerta.textContent = mensaje;
        alerta.classList.add('message-success');
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.message-error');
        if (alerta) {
            alerta.remove();
        }
    }

    function limpiarAlertas() {
        const alertas = document.querySelectorAll('.message-error');
        alertas.forEach(alerta => alerta.remove());
    }

    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
        limpiarAlertas();
    }

});