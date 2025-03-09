pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'aldocker10/your-spring-app'
        DOCKER_IMAGE_FRONTEND = 'aldocker10/your-angular-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Alsite/restaurantapp'
            }
        }

        stage('Build Backend') {
            steps {
                dir('restaurant') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('restaurant-front') {
                    sh 'npm install'
                    sh 'npm run build -- --prod'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}:${env.BUILD_ID}", "./restaurant")
                    docker.build("${DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID}", "./restaurant-front")
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}:${env.BUILD_ID}").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying application..."'
sh 'docker run -d -p 8080:8080 ${DOCKER_IMAGE_BACKEND}:${env.BUILD_ID}'
                sh 'docker run -d -p 4200:4200 ${DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID}'            }
        }
    }
}