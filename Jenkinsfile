pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "cd client"
                sh "sudo npm run build"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
