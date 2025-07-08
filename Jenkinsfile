pipeline {
    agent any
    environment {
        NODE_PATH = "${tool 'jenkins-nodejs'}/bin:${env.PATH}"
        MAVEN_PATH = "${tool 'jenkins-maven'}/bin:${env.PATH}"
        PATH = "${NODE_PATH}:${MAVEN_PATH}"
    }
    stages {
        stage ('Frontend Build') {
            steps {
                  dir('frontend') {
                    sh "npm install"
                    sh "npm build"
                  }
            }
        }
        stage('Backend Build') {
            steps {
                echo "Building"
                dir('backend') {
                  sh "mvn clean install -DskipTests"
                }
            }
        }
        stage('Test') {
            steps {
                echo "Testing"
                dir('backend') {
                    sh "mvn test"
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