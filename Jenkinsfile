
pipeline {
  agent any

  stages{
    stage('install Dependencies'){
      steps{
        script{
         sh 'npm install'
      }
    }
    
  }
  stage('run test'){
    steps{
      script{
        sh 'npm test'
      }
    }
  }
}
}