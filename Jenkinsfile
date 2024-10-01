
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
      script {
        echo 'Build Successful!'
        // Archive 
        archiveArtifacts artifacts: 'dist/**/*'
        // result into PostgreSQL
        withCredentials([string(credentialsId: 'postgres_password', variable: 'PGPASSWORD')]) {
          bat '''
          psql -h localhost -U postgres -d postgres -c "INSERT INTO build_results (build_number, status) VALUES ($BUILD_NUMBER, 'SUCCESS');"
          '''
        }
      }
    }

    failure {
      script {
        echo 'Build failed.'
        // failure result into PostgreSQL
        withCredentials([string(credentialsId: 'postgres_password', variable: 'PGPASSWORD')]) {
          bat '''
          psql -h localhost -U postgres -d postgres -c "INSERT INTO build_results (build_number, status) VALUES ($BUILD_NUMBER, 'FAILURE');"
          '''
        }
      }
    }
  }
}