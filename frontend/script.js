// ============================================
// CONFIGURACIÓN
// ============================================
const API_URL = 'https://umsa-cloud-feria.onrender.com';

// ============================================
// CARGAR INFORMACIÓN ISO DESDE LA API
// ============================================
async function cargarInfoISO() {
    const isoGrid = document.getElementById('isoGrid');
    
    try {
        const response = await fetch(`${API_URL}/api/seguridad/info`);
        
        if (!response.ok) {
            throw new Error('No se pudo cargar la info ISO');
        }
        
        const data = await response.json();
        
        if (data.iso_certificaciones) {
            let isoHTML = '';
            data.iso_certificaciones.forEach(iso => {
                isoHTML += `
                    <div class="iso-item">
                        <div class="iso-norma">${iso.norma}</div>
                        <h4>${iso.titulo}</h4>
                        <p>${iso.descripcion}</p>
                        <span class="estado-badge">✅ ${iso.estado}</span>
                    </div>
                `;
            });
            isoGrid.innerHTML = isoHTML;
        } else {
            isoGrid.innerHTML = '<p>Información ISO disponible en el informe</p>';
        }
    } catch (error) {
        console.error('Error cargando ISO:', error);
        isoGrid.innerHTML = `
            <div style="text-align:center; padding:20px;">
                ℹ️ ISO 27001, 27017, 27018 implementados
                <br><small>Seguridad de nivel empresarial</small>
            </div>
        `;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏛️ UMSA Cloud - Sistema Académico con Historial');
    cargarInfoISO();
});
