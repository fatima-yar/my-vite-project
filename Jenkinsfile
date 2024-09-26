pipeline{
  agent any
stages {
  stage('Install Depencencies'){
    steps {
      script {
        //Install npm
        sh 'npm install'
      }
    }
  }
  stage('Run Tests'){
    step{
      script {
        //Run Vitest
        sh 'npm test'
      }
    }
  }

  stage('Build'){
    steps{
      script{
        //Run Vite build
        sh 'npm run build'
      }
    }
  }
}
post
always {
  // Archive test results or artifacts
  archiveArtifacts artifacts: '**/dist/**', allowEmptyArchive: true
}
success {
  echo 'Pipeline completed successfully!'

}
failure{
  echo 'Pipeline failed.....'
}
}