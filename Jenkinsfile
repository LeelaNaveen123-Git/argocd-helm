pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REPOSITORY = '565905129126.dkr.ecr.ap-south-1.amazonaws.com/sample-app'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('app') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    env.IMAGE_TAG = "${env.BUILD_NUMBER}"

                    sh """
                        docker build \
                          -t ${ECR_REPOSITORY}:${IMAGE_TAG} \
                          ./app
                    """
                }
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                    aws ecr get-login-password \
                      --region ${AWS_REGION} | \
                    docker login \
                      --username AWS \
                      --password-stdin ${ECR_REPOSITORY}
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                    docker push ${ECR_REPOSITORY}:${IMAGE_TAG}
                '''
            }
        }

        stage('Update Helm Image Tag') {
            steps {
                sh '''
                    sed -i -E 's/^  tag: .*/  tag: "'${IMAGE_TAG}'"/' \
                      helm/sample-app/values.yaml

                    grep -A3 '^image:' helm/sample-app/values.yaml
                '''
            }
        }

        stage('Commit and Push GitOps Change') {
            steps {
                sh '''
                    git config user.name "Jenkins"
                    git config user.email "jenkins@localhost"

                    git add helm/sample-app/values.yaml

                    git commit -m "Update sample-app image to ${IMAGE_TAG}" || true

                    git push origin HEAD:main
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'CI/CD pipeline failed. Check the stage logs above.'
        }
    }
}