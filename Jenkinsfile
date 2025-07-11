pipeline {
    agent any
    environment {
        NODEJS_HOME = "${tool 'jenkins-nodejs'}"
        MAVEN_HOME = "${tool 'jenkins-maven'}"
        PATH = "$NODEJS_HOME/bin:$MAVEN_HOME/bin:${env.PATH}"
    }
    stages {
        stage('Clean Up Jenkins branch info') {
            steps {
                checkout scm
                sh 'git remote prune origin'
            }
        }
        stage ('Frontend Build') {
            steps {
                  dir('frontend') {
                    sh "npm install"
                    sh "npm run build"
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
                dir('backend') {
                    sh "mvn test"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploy!"
            }
        }
    }
}