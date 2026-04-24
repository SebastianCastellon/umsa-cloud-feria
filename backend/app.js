const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 CONFIGURACIÓN CORS CORREGIDA
app.use(cors({
  origin: '*',  // Permite TODOS los orígenes (para la feria)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// DATOS DE PRUEBA
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

// ENDPOINTS
app.get('/', (req, res) => {
  res.json({
    sistema: 'API UMSA Cloud',
    version: '2.0.0',
    estado: 'Operativo',
    seguridad: {
      iso27001: 'Implementado',
      iso27017: 'Implementado',
      iso27018: 'Implementado'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/estudiante/:id', (req, res) => {
  const estudiante = estudiantes[req.params.id];
  
  if (!estudiante) {
    return res.status(404).json({ 
      success: false, 
      error: 'Estudiante no encontrado',
      ids_disponibles: ['10018381', '1794688']
    });
  }
  
  res.json({ success: true, data: estudiante });
});

app.get('/api/notas/:id', (req, res) => {
  const estudiante = estudiantes[req.params.id];
  
  if (!estudiante) {
    return res.status(404).json({ success: false, error: 'Estudiante no encontrado' });
  }
  
  const notas = Object.values(estudiante.notas);
  const promedio = (notas.reduce((a,b) => a+b, 0) / notas.length).toFixed(2);
  
  res.json({
    success: true,
    data: {
      estudiante: estudiante.nombre,
      notas: estudiante.notas,
      promedio: parseFloat(promedio)
    }
  });
});

app.get('/api/seguridad/info', (req, res) => {
  res.json({
    iso_certificaciones: [
      { norma: 'ISO/IEC 27001:2022', titulo: 'SGSI', estado: 'Implementado', descripcion: 'Seguridad de la información' },
      { norma: 'ISO/IEC 27017:2015', titulo: 'Seguridad en Cloud', estado: 'Implementado', descripcion: 'Controles para servicios cloud' },
      { norma: 'ISO/IEC 27018:2019', titulo: 'Protección de datos PII', estado: 'Implementado', descripcion: 'Privacidad en la nube' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor UMSA corriendo en puerto ${PORT}`);
});
