pipeline {
    agent any
    environment {
        DB_USER = 'postgres'
        DB_PASSWORD = '1234'
        DB_NAME = 'postgres'
        DB_HOST = 'localhost' // '172.19.34.170' 
        DB_PORT = '5432'
    }
    tools {
        nodejs 'nodejs' // Replace with your actual Node.js installation name
    }

    stages {
        stage('Check Node Version') {
            steps {
                script {
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Encoding texts and send to pg') {
            steps {
                script {
           def files = findFiles(glob: 'public/**/*')
            // Loop through each file
            files.each { file ->
                def fileName = file.name
                // Use shell command to read file content
                def fileContent = sh(script: "cat ${file.path}", returnStdout: true).trim()
                
                // Encode the content in Base64
                def encodedContent = sh(script: "echo '${fileContent}' | base64", returnStdout: true).trim()

                def insertCommand = """
                PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO textfile (filename, content) VALUES ('${fileName}', '${encodedContent}');"
                """
                // Execute the insert command
                sh insertCommand
                    }
                }
            }
        }
    


    //     stage('Archive Artifacts') {
    //         steps {
    //             script {
    //                 archiveArtifacts artifacts: 'dist/**/*'
    //             }
    //         }
    //     }
    //      stage('Insert Data into PostgreSQL') {
    //         steps {
    //             script {
    //                 // Use psql to insert the data
    //                 def insertCommand = """
                         
    //                     set PGPASSWORD=${DB_PASSWORD} 
    //                     psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO artifacts ( name, path,created_at) VALUES ( 'test1', 'path-to-artifact1','2024-10-09');"
    //                 """
    //                 sh insertCommand
    //             }
    //             script {
    // // Get list of artifacts
    // def artifacts = findFiles(glob: 'dist/**/*')

    // // Loop through each artifact and insert into PostgreSQL
    // artifacts.each { artifact ->
    //     def artifactName = artifact.name
    //     def artifactPath = artifact.path 
    //     def artifactDate = new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('UTC'))

    //     // Use psql to insert the data
    //     def insertCommand = """
    //         set PGPASSWORD=${DB_PASSWORD}
    //         psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO artifacts (name, path, created_at) VALUES ('${artifactName}', '${artifactPath}', '${artifactDate}');"
    //     """
    //     // Execute the insert command
    //     sh insertCommand
    //                 }
    //               }
    //     }
    // }

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
