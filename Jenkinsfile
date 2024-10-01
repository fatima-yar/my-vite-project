
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
  stage('Post Actions') {
            steps {
                script {
                    // On success
                    bat """
                        psql -h localhost -U postgres -d postgres -c "INSERT INTO build_results (build_number, status) VALUES (${env.BUILD_NUMBER}, 'SUCCESS');"
                    """
                }
            }
            post {
                failure {
                    script {
                        // On failure
                        bat """
                            psql -h localhost -U postgres -d postgres -c "INSERT INTO build_results (build_number, status) VALUES (${env.BUILD_NUMBER}, 'FAILURE');"
                        """
                    }
                }
            }
        }
    }
