FROM eclipse-temurin:21.0.10_7-jre-ubi10-minimal

WORKDIR /app
COPY target/*.jar /app/backend-0.1.5-SNAPSHOT.jar
EXPOSE 8080

LABEL org.opencontainers.image.source=https://github.com/sotarox/world
CMD ["java", "-XX:MaxRAMPercentage=75.0", "-XX:InitialRAMPercentage=50.0", "-jar", "/app/backend-0.1.5-SNAPSHOT.jar", "--spring.profiles.active=local-container"]