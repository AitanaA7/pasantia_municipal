export const fetchCalles = async () => {
    try {
        const response = await fetch('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/commons/calles');
        if (!response.ok) {
        throw new Error('Error al cargar las calles');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching calles:', error);
        throw error;
    }
}