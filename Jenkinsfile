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

        stage('Encoding texts and send to pg'){
          steps {
            script {
            def files = findFiles(glob: 'public/**/*')
    // // Loop through each 
   files.each { file ->
              def fileName= file.name
              def fileContent = readFile(file.path)

              // Encode the content in Base64
              def encodedContent = "${fileContent.bytes.encodeBase64().toString()}"
       
               // Use psql to insert the encoded data
               def insertCommand = """
                  set PGPASSWORD=${DB_PASSWORD}
                      psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO textfile (filename, content) VALUES ('${fileName}', '${encodedContent}');"

               """
               bat insertCommand
            }
          }
        }}
   

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
    //                 bat insertCommand
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
    //     bat insertCommand
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
