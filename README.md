# 🖥️ TKD-HUB API

Este es el **backend** de la aplicación **TKD-HUB**, desarrollado para gestionar toda la lógica del sistema de campeonatos de Taekwondo, incluyendo el manejo de datos de competidores, grupos, llaves, resultados y más.

## ⚙️ Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **Sequelize**
- **MySQL**
- **JWT (JSON Web Token)**

## 📚 Estructura del proyecto

- `controllers/` → Lógica de manejo para cada recurso (competidores, campeonatos, etc.)
- `models/` → Definiciones de entidades con Sequelize
- `routes/` → Rutas protegidas y públicas de la API
- `middlewares/` → Autenticación, validación, manejo de errores
- `config/` → Configuración de conexión a base de datos

## 🔐 Seguridad

- Autenticación mediante **JWT**
- Protección de rutas
- Manejo de tokens en cada solicitud segura

## 📌 Funcionalidades

- CRUD completo de competidores
- Validación y registro de pesaje
- Agrupación automática por peso/categoría
- Generación y persistencia de llaves
- Registro de resultados
- Gestión de campeonatos

## 🔧 Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/R4shad/tkd-hub-api.git

# Entra a la carpeta
cd tkd-hub-api

# Instala dependencias
npm install

# Compilar el codigo
npm run ts

# Inicia la aplicación
npm run dev
