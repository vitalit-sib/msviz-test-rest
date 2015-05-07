# msviz backend REST API testing

Launches a series of integration test on the REST API. We use node.js and the [frisby](http://frisbyjs.com/docs/api/) framework, executing all ```src/spec/api/*_spec.js``` files.
It populates mongodb with temporary data from the ```resources/`` directory

## Launch the test

     node_modules/jasmine-node/bin/jasmine-node src/spec/api/ --junitreport
     
 The default backend url is http://localhost:9000 but it can be specified via:
 
     export URL_MSVIZ_SERVER=http://msviz.vital-it.ch/backend
