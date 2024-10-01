
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
        success {
            echo 'Build Successful!'
            
            // Archive the built artifacts
            archiveArtifacts artifacts: 'dist/**/*'
                 // Insert success result into PostgreSQL
        bat '''
        psql -h localhost -U postgres -d postgres -c "INSERT INTO build_results (build_number, status) VALUES ($BUILD_NUMBER, 'SUCCESS');"
        '''
        }

         failure {
      script {
        echo 'Build failed.'
        // Insert failure result into PostgreSQL
        bat '''
        psql -h localhost -U postgres -d postgres -c "INSERT INTO build_results (build_number, status) VALUES ($BUILD_NUMBER, 'FAILURE');"
        '''
      }
    }
  }
}