pipeline {
  agent any

  stages {

    stage('Repo Cloning') {
      steps {
        git branch: 'main',
            url: 'https://github.com/Apurvbajpai2531/-AutoShip-CI-CD-Enterprise-Jenkins-Docker-Platform.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t autorship-app ./app'
      }
    }

    stage('Deploy Application') {
      steps {
        sh 'docker-compose up -d --build'
      }
    }

    stage('Health Check') {
      steps {
        sh 'curl -f http://localhost/health'
      }
    }
  }

  post {
    failure {
      sh 'bash scripts/rollback.sh'
    }
  }
}

