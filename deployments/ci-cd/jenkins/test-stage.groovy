pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                script {
                    try {
                        echo 'Running tests...'
                        sh 'npm test'
                    } catch (Exception e) {
                        echo 'Tests failed'
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }
}
