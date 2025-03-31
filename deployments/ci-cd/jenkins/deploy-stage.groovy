pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                script {
                    def deployScript = load 'deployments/ci-cd/scripts/deploy.sh'
                    deployScript.deploy()
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
