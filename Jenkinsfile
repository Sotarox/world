pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Building"
                dir('backend') {
                  sh "./mvnw clean install -DskipTests"
                }
            }
        }
        stage('Test') {
            steps {
                echo "Testing"
                dir('backend') {
                    sh "./mvnw test"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying"
            }
        }
    }
}