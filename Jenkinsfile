
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
    archiveArtifacts artifacts: 'dist/**/*'
    //Upload to Dropbox
    script {
      def dropboxAccessToken = credentials('DROPBOX_ACCESS_TOKEN')  // For Jenkins credentials

      def filePath= 'dist/*'
       // Get the list of files to upload
       def files = sh(script:"ls ${filePath}", returnStdout:true).trim().split('\n')
       for (file in files){
        echo "Uploading ${file} to Dropbox"
        sh """
             curl -X POST https://content.dropboxapi.com/2/files/upload \
                        --header 'Authorization: Bearer ${dropboxAccessToken}' \
                        --header 'Dropbox-API-Arg: {\"path\": \"/${file}\",\"mode\": \"add\",\"autorename\": true}' \
                        --header 'Content-Type: application/octet-stream' \
                        --data-binary @${file}
                    """
       }
    }
    
  }
  failure{
    echo 'Build failed.'
  }
}
}