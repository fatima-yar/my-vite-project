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
                          @echo off
                        set PGPASSWORD=${DB_PASSWORD} 
                        psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -c "INSERT INTO artifacts (id, name, path) VALUES (2, 'test2', 'c:/save2');"
                    """
                    bat insertCommand
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
