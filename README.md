# ☁️ UMSA Cloud - Sistema Académico en la Nube

![UMSA Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Escudo_UMSA.svg/1200px-Escudo_UMSA.svg.png)

## 📋 Información del Proyecto

| Campo | Valor |
|-------|-------|
| **Materia** | Información en la Nube - SIS 372 |
| **Estudiante** | Goytia Aquise Abigail Marcia |
| **CI** | 10018381 |
| **Docente** | Lic. José María Tapia Baltazar |
| **Fecha** | Abril, 2026 |

---

## 🌐 URLs del Proyecto (acceso desde cualquier lugar)

| Componente | URL | Descripción |
|------------|-----|-------------|
| **Frontend (pagina web)** | https://umsa-cloud-feria.netlify.app | Interfaz de usuario |
| **Backend (API)** | https://umsa-cloud-feria.onrender.com | Servidor en la nube |
| **Repositorio GitHub** | https://github.com/SebastianCastellon/umsa-cloud-feria | Código fuente |

---

## 🚀 Cómo abrir y trabajar desde CUALQUIER computadora

Sigue estos pasos. No necesitas instalar nada en la computadora que estés usando.

### Opción 1: Solo USAR el sistema (para demostración)

1. Abre el navegador (Chrome, Firefox, Edge, etc.)
2. Ve a: **https://umsa-cloud-feria.netlify.app**
3. Inicia sesión con una de estas cuentas:

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | Administrador |
| abigail | umsa2026 | Estudiante |
| demo | demo123 | Estudiante |

4. Una vez dentro, prueba con los carnets:
   - `10018381` - Para ver notas de Abigail
   - `1794688` - Para ver notas del estudiante demo

✅ **¡Listo! El sistema funciona desde cualquier dispositivo con internet.**

---

### Opción 2: EDITAR el código (para desarrolladores)

No necesitas instalar VS Code ni nada local. Puedes editar todo desde el navegador.

#### Paso 1: Acceder al código

Ve a: https://github.com/SebastianCastellon/umsa-cloud-feria

#### Paso 2: Navegar a los archivos

La estructura del proyecto es:
umsa-cloud-feria/
├── backend/
│ ├── app.js ← Lógica del servidor (API)
│ └── package.json ← Dependencias
└── frontend/
├── index.html ← Página principal
├── login.html ← Pantalla de acceso
├── admin.html ← Panel de administración
├── style.css ← Estilos y diseño
└── script.js ← Comportamiento del frontend

#### Paso 3: Editar un archivo

1. Haz clic en el archivo que quieras modificar (ej: `frontend/index.html`)
2. Haz clic en el ícono **lápiz** ✏️ (arriba a la derecha)
3. Realiza los cambios que necesites
4. Haz clic en **"Commit changes..."** (botón verde)
5. Escribe un mensaje describiendo el cambio
6. Haz clic en **"Commit changes"**

#### Paso 4: Ver los cambios en vivo

- **Frontend (Netlify):** Los cambios se ven en 1-2 minutos en https://umsa-cloud-feria.netlify.app
- **Backend (Render):** Los cambios se ven en 2-3 minutos en https://umsa-cloud-feria.onrender.com

✅ **No necesitas hacer nada más. La nube actualiza automáticamente.**

---

### Opción 3: Usar VS Code en otra computadora (opcional)

Si prefieres usar VS Code en la otra computadora:

#### Paso 1: Instalar VS Code (si no está)

Descargar desde: https://code.visualstudio.com/

#### Paso 2: Clonar el repositorio

Abre VS Code y luego abre la terminal (Ctrl + Ñ o Terminal → New Terminal):

```bash
git clone https://github.com/SebastianCastellon/umsa-cloud-feria.git
cd umsa-cloud-feria
code .
