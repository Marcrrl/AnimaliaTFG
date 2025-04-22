# Usa OpenJDK como base
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR generado por Spring Boot
COPY target/*.jar app.jar

# Expone el puerto 9000 para el backend
EXPOSE 9000

# Ejecuta la API REST
CMD ["java", "-jar", "app.jar"]
