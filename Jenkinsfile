pipeline {
        agent any
        environment {
            GIT_URL = credentials('git_hub_url')
            DOCKER = credentials('DOCKER_CREDEN')
            
        }
        
        stages {
            stage('Cleaning Workspace') {
                steps {
                    script {
                        echo "***Cleaning Work Space***"
                        
                        sh 'docker rm -f todo-list_backend todo-list_frontend'
                        sh 'docker image prune -af'
                        sh 'docker images -a'
                        sh 'pwd'
                    }
                    cleanWs()
                }
                
            }
            stage('Checkout') {
                steps {
                    echo "_____Checkout_______"
                    git branch: 'main', url: "${GIT_URL}"
                    
                    
                    echo "_____Checkout successful_____"
                }
            }
            
            stage('Build') {
                steps {
                    echo "***LOOKING FOR BUILD ***"
                    
                    sh 'docker-compose -f docker-compose.yml up -d --build' 
                  // sh 'docker-compose build'
                    sh 'docker-compose ps -a'
                }
            }
            stage('PUBLISHING IMAGES TO DOCKERHUB') {
                steps {
    
                    echo "Tagging backend Image"
                    sh "docker tag todo_list_backend:latest $DOCKER_USR/todo_backend:$BUILD_NUMBER"
    
                    echo "Tagging Frontend Image"
                    sh "docker tag todo_list_frontend:latest $DOCKER_USR/todo_frontend:$BUILD_NUMBER"
                    
                    sh 'docker images -a'
                    
                    echo "Tagging MONGO Image"
                    sh "docker tag mongo $DOCKER_USR/mongo:$BUILD_NUMBER"
    
                    
                    sh "docker login -u ${DOCKER_USR} -p ${DOCKER_PSW}"
    
                    echo "Pushing Tagged Images"
                    sh "docker push $DOCKER_USR/todo_frontend:${BUILD_NUMBER}"
                    sh "docker push $DOCKER_USR/todo_backend:${BUILD_NUMBER}"
                    sh "docker push $DOCKER_USR/mongo:${BUILD_NUMBER}"
                    
                    sh 'docker logout'
                    
                }
            } 
    
        
        }
            
        
        
        
    
        post {
            always {
                    echo 'JENKINS CI/CD'
                   // cleanWs()
            }
            success {
                
                echo 'Pipeline executed successfully!'
            }
            failure {
                
                echo 'Pipeline failed!'
            }
        }
    }