FROM openjdk:21-slim
WORKDIR /app
COPY backend/target/*.jar /app/world.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/world.jar"]