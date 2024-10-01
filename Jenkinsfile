
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
stage('Add Artifact to Database') {
            steps {
                script {
                    // Ensure you have psql in your PATH or specify the full path
                    bat '''
                        psql -h localhost -U postgres -d postgres -c "COPY artifacts (name, path) FROM 'dist/artifact_name.ext' WITH (FORMAT csv);"
                    '''
                }
            }
        }
    
post {
        success {
            echo 'Build Successful!'
            
            // Archive the built artifacts
            archiveArtifacts artifacts: 'dist/**/*'
        }

        failure {
            echo 'Build failed.'
        }
    }
}