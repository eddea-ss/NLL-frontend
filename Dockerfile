# Etapa 1: Construcción y ejecución de la aplicación con Bun
FROM oven/bun:latest

WORKDIR /app

COPY . .

# Instalar dependencias con Bun
RUN bun install

EXPOSE 4200

# Ejecutar el servidor de desarrollo con Bun
CMD ["bun", "run", "start", "--", "--host", "0.0.0.0"]