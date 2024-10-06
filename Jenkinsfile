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
  stage('Upload to Dropbox') {
    steps {
        script {
            publishOverDropbox([
                credentialsId: 'dropbox-access-token',
                files: 'dist/**/*', 
                remoteDirectory: 'Jenkins-artifacts/Upload'
            ])
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
