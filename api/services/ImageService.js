/**
 * ImageService
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
function _log(method, message = null) {
  LogService.log('ImageService', method, message);
}

module.exports = {
  async create (newImage) {  
    _log('create', newImage);   

    try {
      var resp = Image.create(newImage).fetch();
    } catch (error) {
      _log('create', error);
      throw(error);
    }

    _log('create', resp);

    return resp;
  },

  async createFromFile (file) {  
    _log('createFromFile', file);   

    try {
      let image = {};
      image.fileName = file.fd.substr(file.fd.lastIndexOf('/') + 1);
      image.fileName = image.fileName.substr(0, image.fileName.lastIndexOf('.'));
      image.originalName = file.filename.substr(0, file.filename.lastIndexOf('.'));;
      image.extension = file.filename.substr(file.filename.lastIndexOf('.') + 1);
      image.url = sails.config.APP_URL + '/uploads/' + image.fileName + '.' + image.extension;
      image.size = file.size;

      _log('createFromFile', image); 

      var resp = ImageService.create(image);
    } catch (error) {
      _log('createFromFile', error);
      throw(error);
    }

    _log('createFromFile', resp);

    return resp;
  },

  //SEARCH

  async findById (id) {
    _log('findById', id);

    try {
      var resp = await Image.findOne({id: id});
    } catch (error) {
      _log('findById', error);
      throw(error);
    }  

    _log('findById', resp);

    return resp;
  },  
  
  async find (params) {
    _log('findById', id);

    try {
      var resp = await Image.find(params);
    } catch (error) {
      _log('findById', error);
      throw(error);
    }  

    _log('findById', resp);

    return resp;
  },  
  //

  // DELETE
  async delete(id) {
    _log('delete');

    try {
      await Image.destroy({ id: id });
    } catch (err) {
      _log('delete', err);
      throw err;
    }

    _log('delete');

    return;
  },

  /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Delete image by id
     */
   async remove(imgId) {
    const fs = require('fs')
    _log('remove', imgId);

    const base  = sails.config.appPath;
    const path  = sails.config.upload.path;

    _log('remove', base + path);

    try {
        if(imgId && imgId != null){
            let image = await ImageService.findById(imgId);

            _log('remove', image); 
            
            if(image && image != null){
              if(sails.config.UPLOAD_TYPE == "local"){
                fs.unlinkSync(base + path + image.fileName + '.' + image.extension); 
              } else {
                // const skipper = require('skipper-s3')({key: KEY,secret: SECRET,bucket: BUCKET});
                // skipper.rm(image.fileName + '.' + image.extension,function(){});
              }                           

              await ImageService.delete(imgId);
            }                
        }          
    } catch(error) {
      _log('remove', error);
      throw(error);
    }

    return;
}

};
