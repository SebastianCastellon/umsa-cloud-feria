// ============================================
// CONFIGURACIÓN - CAMBIAR CUANDO DESPLEGUES
// ============================================
// URL del backend en Render (actualizar después del despliegue)
// Mientras pruebas local, usa localhost
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://umsa-cloud-api.onrender.com';  // ← Cambiar por tu URL de Render

// ============================================
// FUNCIÓN PRINCIPAL - BUSCAR ESTUDIANTE
// ============================================
async function buscarEstudiante() {
    const studentId = document.getElementById('studentId').value.trim();
    const resultsDiv = document.getElementById('results');
    
    // Validación
    if (!studentId) {
        mostrarError('Por favor, ingresa tu carnet de identidad');
        return;
    }
    
    // Mostrar loading
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <div class="loading-spinner">
            🔄 Consultando en la nube...
            <br><small>Conectando con servidores en Google Cloud</small>
        </div>
    `;
    
    // Scroll a resultados
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    try {
        // Llamar a la API
        const response = await fetch(`${API_URL}/api/estudiante/${studentId}`);
        const data = await response.json();
        
        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Estudiante no encontrado');
        }
        
        // Mostrar resultados
        mostrarResultados(data.data, studentId);
        
        // Registrar consulta (para auditoría - ISO 27001)
        console.log(`[AUDITORÍA] Consulta realizada: ${studentId} - ${new Date().toISOString()}`);
        
    } catch (error) {
        console.error('Error:', error);
        
        // Mensaje de error más amigable
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            mostrarError(`
                <strong>❌ Error de conexión</strong><br>
                No se pudo conectar con el servidor cloud.<br>
                <small>Verifica que el backend esté desplegado en Render o ejecutándose localmente.</small>
            `);
        } else {
            mostrarError(`
                <strong>❌ ${error.message}</strong><br>
                <small>Los carnet disponibles para prueba son: 10018381 y 1794688</small>
            `);
        }
    }
}

// ============================================
// MOSTRAR RESULTADOS DEL ESTUDIANTE
// ============================================
function mostrarResultados(estudiante, id) {
    const resultsDiv = document.getElementById('results');
    
    // Construir HTML de notas
    let notasHTML = '';
    let sumaNotas = 0;
    let totalMaterias = 0;
    
    for (const [materia, nota] of Object.entries(estudiante.notas)) {
        let notaClass = '';
        if (nota >= 90) notaClass = 'nota-buena';
        else if (nota >= 70) notaClass = 'nota-regular';
        else notaClass = 'nota-mala';
        
        notasHTML += `
            <div class="nota-item">
                <span>📖 ${materia}</span>
                <span class="${notaClass}"><strong>${nota}</strong> puntos</span>
            </div>
        `;
        sumaNotas += nota;
        totalMaterias++;
    }
    
    const promedio = (sumaNotas / totalMaterias).toFixed(2);
    let promedioClass = '';
    if (promedio >= 90) promedioClass = 'nota-buena';
    else if (promedio >= 70) promedioClass = 'nota-regular';
    else promedioClass = 'nota-mala';
    
    // Determinar estado según promedio
    let estadoAcademico = '';
    let estadoColor = '';
    if (promedio >= 85) {
        estadoAcademico = '🌟 Excelente';
        estadoColor = '#2e7d32';
    } else if (promedio >= 70) {
        estadoAcademico = '✅ Aprobado';
        estadoColor = '#f57c00';
    } else {
        estadoAcademico = '⚠️ En seguimiento';
        estadoColor = '#c62828';
    }
    
    resultsDiv.innerHTML = `
        <div class="student-card">
            <div class="student-header">
                <h3>🎓 ${estudiante.nombre}</h3>
                <div class="student-id">Carnet: ${id}</div>
            </div>
            <div class="student-info">
                <div class="info-row">
                    <strong>📚 Carrera:</strong>
                    <span>${estudiante.carrera}</span>
                </div>
                <div class="info-row">
                    <strong>✅ Asistencia:</strong>
                    <span>${estudiante.asistencia}%</span>
                </div>
                <div class="info-row">
                    <strong>📊 Estado Académico:</strong>
                    <span style="color: ${estadoColor}">${estadoAcademico}</span>
                </div>
                
                <div class="notas-section">
                    <h4>📝 Notas por Materia</h4>
                    ${notasHTML}
                    
                    <div class="promedio">
                        📈 <strong>Promedio General:</strong> 
                        <span class="${promedioClass}">${promedio} puntos</span>
                    </div>
                </div>
                
                <small style="display: block; margin-top: 20px; text-align: center; color: #888;">
                    ☁️ Datos obtenidos desde la nube (Supabase)<br>
                    🔒 Conexión segura con cifrado TLS
                </small>
            </div>
        </div>
    `;
}

// ============================================
// FUNCIÓN PARA PROBAR CON ESTUDIANTES RÁPIDOS
// ============================================
function probarEstudiante(id) {
    document.getElementById('studentId').value = id;
    buscarEstudiante();
}

// ============================================
// MOSTRAR ERROR
// ============================================
function mostrarError(mensaje) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="error-message">
            ${mensaje}
        </div>
    `;
}

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
            isoGrid.innerHTML = '<p>Información ISO no disponible</p>';
        }
    } catch (error) {
        console.error('Error cargando ISO:', error);
        isoGrid.innerHTML = `
            <div style="text-align:center; padding:20px;">
                ℹ️ Información de seguridad disponible en el informe completo
                <br><small>ISO 27001, 27017, 27018 implementados</small>
            </div>
        `;
    }
}

// ============================================
// VERIFICAR CONEXIÓN CON EL BACKEND AL CARGAR
// ============================================
async function verificarBackend() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        console.log('✅ Backend conectado:', data);
        
        // Mostrar notificación sutil
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 1000;
            opacity: 0.9;
        `;
        statusDiv.innerHTML = '☁️ Cloud Active';
        document.body.appendChild(statusDiv);
        
        setTimeout(() => statusDiv.remove(), 3000);
        
    } catch (error) {
        console.warn('⚠️ Backend no disponible:', error);
        // No mostrar error aquí, solo en consola
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log(`
    ╔══════════════════════════════════════════════════════╗
    ║     🏛️ UMSA CLOUD - Sistema Académico                ║
    ║     🌐 Frontend cargado correctamente                ║
    ║     🔒 Seguridad ISO 27001/27017/27018               ║
    ║     📡 Backend: ${API_URL}                               ║
    ╚══════════════════════════════════════════════════════╝
    `);
    
    // Cargar información ISO
    cargarInfoISO();
    
    // Verificar conexión con backend
    verificarBackend();
    
    // Permitir búsqueda con Enter
    document.getElementById('studentId').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarEstudiante();
        }
    });
});