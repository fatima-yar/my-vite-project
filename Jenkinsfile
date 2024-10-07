pipeline {
    agent any
        environment {
        
        DB_USER = 'postgres'
        DB_PASSWORD = credentials('postgres_password')
        DB_NAME = 'postgres'  
        DB_HOST = 'localhost' 
        DB_PORT = '5432'  
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }


        stage('Archive Artifacts') {
            steps {
                script {
                    archiveArtifacts artifacts: 'dist/**/*'
                }
            }
        }
         stage('Insert Data into PostgreSQL') {
            steps {
                script {
                    // Use psql to insert the data
                    def insertCommand = """
                         
                        set PGPASSWORD=${DB_PASSWORD} 
                        psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO artifacts ( name, path) VALUES ( 'test2', 'c:/22');"
                    """
                    bat insertCommand
                }
                script {
                    // Get list of artifacts
                    def artifacts = findFiles(glob: 'dist/**/*') 

                    // Loop through each artifact and insert into PostgreSQL
                    artifacts.each { artifact ->
                        def artifactName = artifact.name
                        def artifactPath = artifact.path

                        // Use psql to insert the data
                        def insertCommand = """
                            set PGPASSWORD=${DB_PASSWORD}
                            psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO artifacts (name, path) VALUES ('${artifactName}', '${artifactPath}');"
                        """
                        bat insertCommand
                    }
                  }
        }
    }
// stage('Upload to Dropbox') {
//     steps {
//         script {
//             publish-over-dropbox([
//                 credentialsId: 'dropbox-access-token',
//                 files: 'dist/**/*', 
//                 remoteDirectory: 'Jenkins-artifacts/Upload'
//             ])
//         }
//     }
// }

//without plugin
// stage('Upload to Dropbox') {
//     steps {
//         script {
//             def dropboxToken = credentials('dropbox-access-token')
//             def filesToUpload = findFiles(glob: 'dist/**/*')

//             filesToUpload.each { file ->
//                 def filePath = file.path
//                 def dropboxPath = "/Jenkins-artifacts/Upload/${file.name}"
//                 def curlCommand = """
//                     curl -X POST https://content.dropboxapi.com/2/files/upload \
//                     --header "Authorization: Bearer ${dropboxToken}" \
//                     --header "Dropbox-API-Arg: {\\"path\\":\\"${dropboxPath}\\", \\"mode\\":\\"add\\", \\"autorename\\":true, \\"mute\\":false}" \
//                     --header "Content-Type: application/octet-stream" \
//                     --data-binary @${filePath}
//                 """
//                 bat curlCommand
//             }
//         }
//     }
// }
stage('Upload to Dropbox') {
    steps {
        script {
            def dropboxToken = credentials('dropbox-access-token')
            def filesToUpload = findFiles(glob: 'dist/**/*')

            filesToUpload.each { file ->
                def filePath = file.path
                def dropboxPath = "/Jenkins-artifacts/Upload/${file.name}"
                def curlCommand = """
                    curl -X POST https://content.dropboxapi.com/2/files/upload \
                    --header "Authorization: Bearer ${dropboxToken}" \
                    --header "Dropbox-API-Arg: {\\"path\\":\\"${dropboxPath}\\", \\"mode\\":\\"add\\", \\"autorename\\":true, \\"mute\\":false}" \
                    --header "Content-Type: application/octet-stream" \
                    --data-binary @${filePath} -v
                """
                bat curlCommand
            }
        }
    }
}

    }

    post {
        success {
            echo 'Build Successful!'
        }

        failure {
            echo 'Build failed.'
        }
    }
}
