pipeline {
    agent any
    environment {
    		mavenHome = tool 'jenkins-maven'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building"
                sh "mvn clean install -DskipTests"
            }
        }
        stage('Test') {
            steps {
                echo "Testing"
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying"
            }
        }
    }
}