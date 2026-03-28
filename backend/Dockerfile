FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias con legacy peer deps
RUN npm install --legacy-peer-deps

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 10000

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]