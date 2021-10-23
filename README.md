# URK Store Backend

[URK Store App](https://github.com/eliaslawrence/urk-store-app) and [URK Client App](https://github.com/eliaslawrence/urk-client-app) backend developed in Node.js and NoSQL database. Published in a Amazon EC2 instance by docker-machine.

### Technologies

+ Node.js ([Sails v1](https://sailsjs.com))
+ [Docker](https://www.docker.com/)
+ [Traefik Reverse Proxy](https://traefik.io/traefik/)
+ [MongoDB](https://www.mongodb.com/)

### Integrations

+ [Heroku](https://www.heroku.com/) 
+ [AWS EC2](https://aws.amazon.com/)
+ [S3](https://aws.amazon.com/pt/s3/)
+ [MongoDB Atlas](https://www.mongodb.com/atlas/database)

### Features

+ [JWT/Passport Authentication](https://github.com/eliaslawrence/urk-backend/blob/master/api/services/AuthService.js)
+ [Email](https://github.com/eliaslawrence/urk-backend/blob/master/api/services/AuthService.js)
+ [File / Image Storage](https://github.com/eliaslawrence/urk-backend/blob/master/api/controllers/ImageController.js)
+ [File / Image Transfer](https://github.com/eliaslawrence/urk-backend/blob/master/api/controllers/ImageController.js)
+ [TLS](https://github.com/eliaslawrence/urk-backend/blob/master/docker-production.yml)


### Version info

This app was originally generated on Wed Sep 18 2019 10:42:14 GMT-0300 (Hora oficial do Brasil) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->