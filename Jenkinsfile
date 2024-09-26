
pipeline {
  agent any

  stages{
    stage('install Dependencies'){
      steps{
        script{
         bat 'npm install'
      }
    }
    
  }
  stage('run test'){
    steps{
      script{
        bat 'npm test'
      }
    }
  }
  stage('Build'){
    steps{
      script{
        bat 'npm run build'
      }
    }
  }
}
post {
  success{
    echo 'Build Successful!'
    archiveArtifacts artifacts: 'build/libs/**/*.jar',
    
  }
  failure{
    echo 'Build failed.'
  }
}
}