/**
 * TestController
 *
 * @description :: Server-side logic for tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// const fs = require('fs');
const path = require('path');

module.exports = {  
  async upload1 (req, res) { 
    LogService.controllerLog(req);

    try {
      let uploadedFiles = await req.file('image').upload({dirname: sails.config.upload.transferPath});

      if(uploadedFiles && uploadedFiles[0]){
        let file = uploadedFiles[0];
        
        LogService.controllerLog(req, file);

        let image = {};
        image.fileName = file.fd.substr(file.fd.lastIndexOf('/') + 1);
        image.fileName = image.fileName.substr(0, image.fileName.lastIndexOf('.'));
        image.originalName = file.filename.substr(0, file.filename.lastIndexOf('.'));;
        image.extension = file.filename.substr(file.filename.lastIndexOf('.') + 1);
        image.size = file.size;

        LogService.controllerLog(req, image);

        var imageCreated = await ImageService.create(image);

        let store = await StoreService.findByUser(req.user);

        if(store.coverImage){
          await ImageService.delete(store.coverImage);
        }                    

        await StoreService.updateAttribute(store.id, {coverImage: imageCreated});
      }
    } catch (error) {
      LogService.controllerLog(req, error);
      throw(error);
    }

    LogService.controllerLog(imageCreated);
    
    return res.ok(imageCreated);
  },

  upload: (req, res) => { 
    console.log('upload');       
    req.file('image').upload({
      dirname: sails.config.upload.transferPath,
      // dirname: '../../assets/uploads/',
      // saveAs: function(file, cb) {
      //   cb(null, file.filename);
      // }
      // dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    }, function(err, uploadedFiles) {
      console.log('upload');
      if (err) return res.serverError(err);
      
      if(uploadedFiles && uploadedFiles[0]){
        let file = uploadedFiles[0];
              
        console.log(file);
        let image = {};
        image.fileName = file.fd.substr(file.fd.lastIndexOf('/') + 1);
        image.fileName = image.fileName.substr(0, image.fileName.lastIndexOf('.'));
        image.originalName = file.filename.substr(0, file.filename.lastIndexOf('.'));;
        image.extension = file.filename.substr(file.filename.lastIndexOf('.') + 1);
        image.size = file.size;
        console.log(image);

        return ImageService.create(image).then((imageCreated)=>{
          console.log('Image created:');
          console.log(imageCreated);

          return StoreService.updateImage(req.user.id, imageCreated.id).then((store)=>{
            return store;                               
          }).catch((err) => {              
            console.log(err);
            throw err;
          });
          // return StoreService.findByUser(req.user).then((store) => {
          //   console.log('Store found:');
          //   // console.log(store);
          //   store.coverImage = imageCreated;

          //   StoreService.update(req.user, store).then((storeUpdated) => {
          //     console.log('Store updated:');
          //     console.log(storeUpdated);
          //     return res.ok(storeUpdated);
          //   }).catch((err) => {
          //     console.log('Error during update:');
          //     console.log(err);
          //     return ResponseService.sendError(res, err);
          //   }); 

          // }).catch((err) => {
          //   console.log('Error during search of store:');
          //   console.log(err);
          //   return ResponseService.sendError(res, err);
          // });
        }).catch((err) => {
          console.log('Error during creation of image:');
          console.log(err);
          throw err;
          // return ResponseService.sendError(res, err);
        });
      }

      return res.ok();
    });
    // return res.ok();
  },

  // Get one image by its ID
  async image (req, res) {
    let imgId = req.params.imageId;
    let base = sails.config.appPath;
    let uploadPath = sails.config.upload.path;
    LogService.controllerLog(req, imgId);

    try {
      var resp = await ImageService.findById(imgId);

      LogService.controllerLog(req, image);    
      res.setHeader('Content-Type', 'image/jpeg');

      let fs = require('fs');
      fs.createReadStream(path.join(base, uploadPath, image.fileName + '.' + image.extension)).pipe(res);   
    } catch (error) {
      LogService.controllerLog(req, err);
      throw(error);
    }
  }, 

  // Get one image by its ID
  image1: (req, res) => {
    let imgId = req.params.imageId;
    let base = sails.config.appPath;
    let uploadPath = sails.config.upload.path;
    LogService.controllerLog(req, imgId);

    ImageService.findById(imgId).then((image)=> {
      // stream the image back by loading the file
      LogService.controllerLog(req, 'image');    
      LogService.controllerLog(req, image);    
      res.setHeader('Content-Type', 'image/jpeg');

      let fs = require('fs');
      fs.createReadStream(path.join(base, uploadPath, image.fileName + '.' + image.extension)).pipe(res);     
    }).catch((error) => {
      throw(error);
      // ResponseService.sendError(res, err);
    });
  },   

};
