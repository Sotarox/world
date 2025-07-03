pipeline {
    agent any
    environment {
    		mavenHome = tool 'jenkins-maven'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building"
                dir('backend') {
                  sh "${mavenHome}/bin/mvn clean install -DskipTests"
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