
export class ValidationMessage {
    constructor() {
        // Puedes inicializar cualquier configuración necesaria aquí
    }

    showMessage(target, message) {
        // Primero limpiar cualquier tooltip existente en el target
        this.clearMessage(target);

        // Crear un nuevo tooltip con Tippy.js
        tippy(target, {
            content: message,
            placement: 'top',
            theme: 'error',
            trigger: 'manual',
            onCreate(instance) {
                // Mostrar el tooltip después de crearlo
                instance.show();
             }
        });
    }

    clearMessage(target) {
        const tippyInstance = $(target).data('tippy');

        // Verificar si la instancia de Tippy.js existe
        if (tippyInstance) {
            // Ocultar y destruir el tooltip
            tippyInstance.hide(); // Oculta el tooltip
            tippyInstance.destroy(); // Destruye el tooltip y elimina la referencia
            $(target).removeData('tippy'); // Elimina la referencia a la instancia en el DOM
        }

    }
}