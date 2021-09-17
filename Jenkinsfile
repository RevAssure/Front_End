pipeline {
  agent any
  tools {nodejs "node"}
  stages {
      
    stage('Install') {
      steps { 
          echo 'Installing...'

          sh 'npm install'
          sh 'npm install -g @angular/cli'
      }
    }

    stage('Build') {
      steps { 
          echo 'Building...'
          sh 'ng build' 
      }
    }
    
    stage('Test'){
        steps {echo 'Testing...'}
    }
    
    stage ('Deploy'){
        when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                echo 'Deploying'
                sh 'ng serve'
            }
    }
    
  }
}
