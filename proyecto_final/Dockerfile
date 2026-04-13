# Etapa de construcción (Build)
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Dar permisos de ejecución al wrapper de Maven y construir el .jar
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Etapa de ejecución (Run)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar solo el archivo .jar generado desde la etapa de construcción
COPY --from=build /app/target/proyecto_final-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto 8080 (el que usa Spring Boot por defecto)
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
