# API de Control de Hábitos

Una API RESTful construida con **Express.js** y **MongoDB** para gestionar usuarios y sus hábitos de forma eficiente.

## 🚀 Características

- ✅ CRUD completo para Usuarios (crear, obtener, actualizar, eliminar)
- ✅ CRUD completo para Hábitos (crear, obtener, actualizar, eliminar)
- ✅ Base de datos MongoDB integrada
- ✅ Validación de datos con Mongoose
- ✅ Manejo de errores robusto
- ✅ MongoDB en memoria para desarrollo local

## 📋 Requisitos Previos

- **Node.js** 14.0.0 o superior
- **npm** 6.0.0 o superior

## 🔧 Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/LuisEstuardoLima/semana1.git
cd semana1
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/semana1
NODE_ENV=development
```

**Nota:** El proyecto usa **MongoDB en memoria** automáticamente en modo desarrollo, así que no necesitas una instancia de MongoDB corriendo.

## ▶️ Ejecutar el Proyecto

### Modo Desarrollo (con recarga automática)

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### Modo Producción

```bash
npm start
```

## 📚 Endpoints de la API

### Base URL
```
http://localhost:3001/api
```

---

## 👥 Usuarios

### Crear usuario (POST)
```http
POST /users
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com"
}
```

**Respuesta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "createdAt": "2024-02-22T10:30:00.000Z",
  "updatedAt": "2024-02-22T10:30:00.000Z"
}
```

---

### Obtener todos los usuarios (GET)
```http
GET /users
```

**Respuesta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2024-02-22T10:30:00.000Z",
    "updatedAt": "2024-02-22T10:30:00.000Z"
  }
]
```

---

### Obtener usuario por ID (GET)
```http
GET /users/507f1f77bcf86cd799439011
```

**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "createdAt": "2024-02-22T10:30:00.000Z",
  "updatedAt": "2024-02-22T10:30:00.000Z"
}
```

---

### Actualizar usuario (PUT)
```http
PUT /users/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}
```

**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "createdAt": "2024-02-22T10:30:00.000Z",
  "updatedAt": "2024-02-22T11:00:00.000Z"
}
```

---

### Eliminar usuario (DELETE)
```http
DELETE /users/507f1f77bcf86cd799439011
```

**Respuesta (200):**
```json
{
  "mensaje": "Usuario eliminado correctamente",
  "usuario": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

---

## 🎯 Hábitos

### Crear hábito (POST)
```http
POST /habits
Content-Type: application/json

{
  "name": "Hacer ejercicio",
  "description": "30 minutos de cardio",
  "targetDays": 66
}
```

**Respuesta (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Hacer ejercicio",
  "description": "30 minutos de cardio",
  "streak": 0,
  "targetDays": 66,
  "lastCompletedDate": null,
  "createdAt": "2024-02-22T10:30:00.000Z",
  "updatedAt": "2024-02-22T10:30:00.000Z"
}
```

---

### Obtener todos los hábitos (GET)
```http
GET /habits
```

**Respuesta (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Hacer ejercicio",
    "description": "30 minutos de cardio",
    "streak": 0,
    "targetDays": 66,
    "lastCompletedDate": null,
    "createdAt": "2024-02-22T10:30:00.000Z",
    "updatedAt": "2024-02-22T10:30:00.000Z"
  }
]
```

---

### Actualizar hábito (PUT)
```http
PUT /habits/507f1f77bcf86cd799439012
Content-Type: application/json

{
  "streak": 5,
  "lastCompletedDate": "2024-02-22T18:00:00.000Z"
}
```

**Respuesta (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Hacer ejercicio",
  "description": "30 minutos de cardio",
  "streak": 5,
  "targetDays": 66,
  "lastCompletedDate": "2024-02-22T18:00:00.000Z",
  "createdAt": "2024-02-22T10:30:00.000Z",
  "updatedAt": "2024-02-22T18:05:00.000Z"
}
```

---

### Eliminar hábito (DELETE)
```http
DELETE /habits/507f1f77bcf86cd799439012
```

**Respuesta (200):**
```json
{
  "mensaje": "Hábito eliminado"
}
```

---

## 📁 Estructura del Proyecto

```
semana1/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── config/
│   │   └── database.js        # Conexión a MongoDB
│   ├── models/
│   │   ├── User.js            # Esquema de Usuario
│   │   └── Habits.js          # Esquema de Hábito
│   ├── controllers/
│   │   └── userController.js  # Lógica de negocio - Usuarios
│   └── routes/
│       ├── userRoutes.js      # Rutas de Usuarios
│       └── habitRoutes.js     # Rutas de Hábitos
├── .env                        # Variables de entorno
├── package.json               # Dependencias
└── README.md                  # Este archivo
```

---

## 🔌 Pruebas con curl o Postman

### PowerShell (Windows)

**Crear usuario:**
```powershell
$body = @{
  nombre = "Carlos"
  email = "carlos@example.com"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3001/api/users `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

**Obtener usuarios:**
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/users -Method GET
```

### Linux/Mac (curl)

**Crear usuario:**
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Carlos","email":"carlos@example.com"}'
```

**Obtener usuarios:**
```bash
curl http://localhost:3001/api/users
```

---

## 📦 Dependencias

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **dotenv** - Gestión de variables de entorno
- **cors** - Soporte para CORS
- **mongodb-memory-server** - MongoDB en memoria (desarrollo)
- **nodemon** - Recarga automática en desarrollo

---

## 🐛 Solución de Problemas

### Error: "MongoDB connection timeout"
- Verifica que `mongodb-memory-server` esté instalado
- Reinicia el servidor: `rs` en la terminal de nodemon

### Puerto 3001 ya está en uso
Cambia el puerto en `.env`:
```env
PORT=3002
```

### CORS error
Los CORS están habilitados. Si aún tienes problemas, verifica `src/app.js`

---

## 🚀 Próximos Pasos

- Agregar validaciones más estrictas
- Implementar autenticación JWT
- Agregar tests unitarios
- Conectar con base de datos persistente (MongoDB Atlas)

---

## 📝 Autor

**Luis Estuardo Lima**

## 📄 Licencia

ISC

---

## 📞 Soporte

Para reportar problemas, crea un issue en el repositorio:
https://github.com/LuisEstuardoLima/semana1/issues
