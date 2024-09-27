
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
        def dropboxUploadCmd = """
        curl -X POST https://content.dropboxapi.com/2/files/upload \
        --header "Authorization: Bearer ${env.DROPBOX_ACCESS_TOKEN}" \
        --header "Dropbox-API-Arg: {\"path\": \"/your-folder/your-artifact.zip\", \"mode\": \"add\", \"autorename\": true, \"mute\": false}" \
        --header "Content-Type: application/octet-stream" \
        --data-binary @dist/your-artifact.zip
        """
        bat dropboxUploadCmd
      }
    }
  failure{
    echo 'Build failed.'
  }
}
}