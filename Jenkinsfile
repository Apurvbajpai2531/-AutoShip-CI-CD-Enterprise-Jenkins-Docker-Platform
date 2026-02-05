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
        sh 'docker build -t autorship-app ./app'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker compose up -d --build'
      }
    }

    stage('Health Check') {
      steps {
        sh 'sleep 10'
        sh 'curl -f http://localhost:3000/health'
      }
    }
  }

  post {
    failure {
      sh 'bash scripts/rollback.sh'
    }
  }
}
   
