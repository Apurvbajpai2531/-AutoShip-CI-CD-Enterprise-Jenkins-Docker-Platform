pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Apurvbajpai2531/-AutoShip-CI-CD-Enterprise-Jenkins-Docker-Platform.git'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t autoship-cicd-app ./app'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        // TEMPORARILY DISABLED
        // stage('Health Check') {
        //     steps {
        //         sh 'curl -f http://localhost:3000/health'
        //     }
        // }

    }

    post {
        failure {
            echo 'Deployment failed'

            // Email Notification
            emailext (
                to: 'apurvbjp@gmail.com',  // your email
                subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    Hi Apurv,

                    The Jenkins pipeline for job '${env.JOB_NAME}' has failed.

                    Build Number: ${env.BUILD_NUMBER}
                    Status: ${currentBuild.currentResult}
                    Check console output at: ${env.BUILD_URL}

                    Regards,
                    Jenkins
                """
            )
        }
        success {
            emailext (
                to: 'apurvbjp@gmail.com',
                subject: "Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Good news! The Jenkins pipeline '${env.JOB_NAME}' succeeded.\nCheck it here: ${env.BUILD_URL}"
            )
        }
    }
}
