pipeline {
    agent any

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
        stage('Archive Artifacts') {
            steps {
                script {
                    archiveArtifacts artifacts: 'dist/**/*'
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
