pipeline {
    agent any

    environment {
        EC2_IP  = "16.171.38.150"
        APP_DIR = "autoship-cicd-platform"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Apurvbajpai2531/-AutoShip-CI-CD-Enterprise-Jenkins-Docker-Platform.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t autoship-cicd-app ./app'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} << 'EOF'
                        set -e

                        if [ ! -d ${APP_DIR} ]; then
                            git clone https://github.com/Apurvbajpai2531/-AutoShip-CI-CD-Enterprise-Jenkins-Docker-Platform.git ${APP_DIR}
                        fi

                        cd ${APP_DIR}
                        git pull origin main

                        docker-compose down || true
                        docker-compose up -d --build
                    EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful on EC2"

            emailext(
                to: 'apurvbjp@gmail.com',
                subject: "✅ Jenkins SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hi Apurv,

Your Jenkins pipeline ran successfully 🎉

Job Name : ${env.JOB_NAME}
Build No : ${env.BUILD_NUMBER}
Status   : SUCCESS

View build details:
${env.BUILD_URL}

Regards,
Jenkins
"""
            )
        }

        failure {
            echo "❌ Deployment failed"

            emailext(
                to: 'apurvbjp@gmail.com',
                subject: "❌ Jenkins FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hi Apurv,

Your Jenkins pipeline has FAILED ❌

Job Name : ${env.JOB_NAME}
Build No : ${env.BUILD_NUMBER}
Status   : FAILURE

Check logs here:
${env.BUILD_URL}

Regards,
Jenkins
"""
            )
        }
    }
}
