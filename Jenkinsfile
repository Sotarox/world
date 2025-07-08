pipeline {
    agent any
    environment {
        mavenHome = tool 'jenkins-maven'
        nodejs = tool 'jenkins-nodejs'
    }
    stages {
        stage ('Frontend Install') {
            steps {
                  dir('frontend') {
                    sh "${nodejs} -v"
                  }
            }
        }
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
                    sh "${mavenHome}/bin/mvn test"
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