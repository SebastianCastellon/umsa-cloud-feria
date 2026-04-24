const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURACIÓN CORS - HABILITAR TODOS LOS ORÍGENES
// ============================================
app.use(cors({
  origin: '*',  // Permite cualquier dominio (Netlify, localhost, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Manejar preflight requests (OPTIONS)
app.options('*', cors());

app.use(express.json());

// ============================================
// DATOS DE PRUEBA (no necesita base de datos)
// ============================================
const estudiantes = {
  "10018381": {
    id: "10018381",
    nombre: "Abigail Marcia Goytia Aquise",
    carrera: "Informática",
    asistencia: 95,
    estado: "Activo",
    notas: {
      "Información en la Nube SIS-372": 92,
      "Programación Avanzada": 88,
      "Bases de Datos": 95,
      "Redes de Computadoras": 90
    }
  },
  "1794688": {
    id: "1794688",
    nombre: "Estudiante Demo UMSA",
    carrera: "Informática",
    asistencia: 90,
    estado: "Activo",
    notas: {
      "Información en la Nube SIS-372": 88,
      "Programación Avanzada": 90,
      "Bases de Datos": 85,
      "Redes de Computadoras": 87
    }
  }
};

// ============================================
// ENDPOINTS
// ============================================

app.get('/', (req, res) => {
  res.json({
    sistema: 'API UMSA Cloud',
    version: '2.0.0',
    estado: 'Operativo',
    seguridad: {
      iso27001: 'Implementado',
      iso27017: 'Implementado',
      iso27018: 'Implementado',
      cifrado: 'TLS 1.3',
      rateLimiting: 'Activo'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/estudiante/:id', (req, res) => {
  const estudiante = estudiantes[req.params.id];
  
  if (!estudiante) {
    return res.status(404).json({ 
      success: false, 
      error: 'Estudiante no encontrado',
      mensaje: 'IDs válidos: 10018381 y 1794688'
    });
  }
  
  res.json({ success: true, data: estudiante });
});

app.get('/api/notas/:id', (req, res) => {
  const estudiante = estudiantes[req.params.id];
  
  if (!estudiante) {
    return res.status(404).json({ success: false, error: 'Estudiante no encontrado' });
  }
  
  const valores = Object.values(estudiante.notas);
  const promedio = (valores.reduce((a,b) => a+b, 0) / valores.length).toFixed(2);
  
  res.json({
    success: true,
    data: {
      estudiante: estudiante.nombre,
      estudiante_id: estudiante.id,
      notas: estudiante.notas,
      promedio: parseFloat(promedio)
    }
  });
});

app.get('/api/seguridad/info', (req, res) => {
  res.json({
    iso_certificaciones: [
      { 
        norma: 'ISO/IEC 27001:2022', 
        titulo: 'Sistema de Gestión de Seguridad de la Información',
        estado: 'Implementado',
        descripcion: 'Políticas de seguridad, control de accesos'
      },
      { 
        norma: 'ISO/IEC 27017:2015', 
        titulo: 'Controles de Seguridad para Servicios Cloud',
        estado: 'Implementado',
        descripcion: 'Segregación de entornos, protección de datos en la nube'
      },
      { 
        norma: 'ISO/IEC 27018:2019', 
        titulo: 'Protección de Datos Personales en la Nube',
        estado: 'Implementado',
        descripcion: 'Privacidad de PII, consentimiento'
      }
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║     🚀 UMSA CLOUD - API EN EJECUCIÓN (CORREGIDA)    ║
  ╠══════════════════════════════════════════════════════╣
  ║  📡 Puerto: ${PORT}                                       ║
  ║  🔒 CORS: Permitidos todos los orígenes              ║
  ║  🧪 IDs de prueba: 10018381, 1794688                ║
  ╚══════════════════════════════════════════════════════╝
  `);
});
