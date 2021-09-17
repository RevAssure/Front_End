pipeline {
  agent any
  tools {nodejs "node"}
  stages {
      
    stage('Install') {
      steps { 
          echo 'Installing...'
          sh 'cd RevAssure'
          sh 'npm install'
          sh 'npm install -g @angular/cli'
      }
    }

    stage('Build') {
      steps { 
          echo 'Building...'
          sh 'ng build' 
          archiveArtifacts artifacts: '**/RevAssure/dist*'
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
                sh 'make publish'
            }
    }
    
  }
}
