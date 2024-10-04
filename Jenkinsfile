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


        stage('Archive Artifacts') {
            steps {
                script {
                    archiveArtifacts artifacts: 'dist/**/*'
                }
            }
        }
        stage('Save to Database'){
          steps {
            script {
              def dbHost="localhost"
              def dbPost="5432" 
               def dbName = "postgres"
                    def dbUser = "postgres"
                    def dbPassword = "1234"
                    def buildId = "1"
                    def buildName = "Test"
                    def buildPath = "\dist"
                    // Save to the PostgreSQL table
                    bat """
                        psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -c "INSERT INTO your_table_name (id, name, path) VALUES (${buildId}, '${buildName}', '${buildPath}');"
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
