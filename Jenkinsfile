
pipeline {
  agent any
  tools { nodejs "nodejs v20.17.0" }
  stages{
    stage('Build'){
      steps{
        sh 'npm install'
        sh 'npm test'
      }
    }
  }
}