pipeline {
    agent any

    environment {
        DB_URL = 'jdbc:postgresql://localhost:5432/postgres'
        DB_USER = 'postgres'
        DB_PASSWORD = '1234'
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

        stage('Save to Database') {
            steps {
                script {
                    // Insert into PostgreSQL database
                    bat """
                        psql -h localhost -p 5432 -U postgres -d postgres -c "INSERT INTO your_table_name (id, name, path) VALUES (1, 'Test', '\\\\wsl.localhost\\Ubuntu\\home\\fatima\\workspace\\my-vite-project\\dist');"
                    """
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
