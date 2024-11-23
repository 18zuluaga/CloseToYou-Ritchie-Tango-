export const getErrorMessageAndColor = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return {
        message: 'Petición incorrecta. Verifica los datos enviados.',
        color: '#FF8C8C', // Rojo pastel
      };
    case 401:
      return {
        message: 'No autorizado. Asegúrate de que tus credenciales sean correctas.',
        color: '#FF8C8C', // Rojo pastel
      };
    case 403:
      return {
        message: 'Acceso prohibido. No tienes permisos para realizar esta acción.',
        color: '#FF8C8C', // Rojo pastel
      };
    case 404:
      return {
        message: 'No encontrado. El recurso solicitado no existe.',
        color: '#FF8C8C', // Rojo pastel
      };
    case 409:
      return {
        message: 'Conflicto. Ya existe un recurso con los mismos datos.',
        color: '#FF8C8C', // Rojo pastel (puedes cambiarlo si lo prefieres)
      };
    default:
      return {
        message: 'Ocurrió un error desconocido. Intenta nuevamente más tarde.',
        color: '#FF8C8C', // Rojo pastel
      };
  }
};
