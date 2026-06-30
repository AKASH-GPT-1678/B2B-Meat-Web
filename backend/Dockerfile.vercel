# Step 1: Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

# Make mvnw executable
RUN chmod +x mvnw

# Run maven wrapper
RUN ./mvnw clean package -DskipTests

# Step 2: Runtime stage
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
