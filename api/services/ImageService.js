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
              if(image.storage == sails.config.LOCAL_STORAGE){
                fs.unlinkSync(base + path + image.fileName); 
              } else if(image.storage == sails.config.S3_STORAGE){
                const skipper = require('skipper-better-s3')({
                  key: sails.config.AWS_KEY, 
                  secret: sails.config.AWS_SECRET, 
                  bucket: sails.config.AWS_BUCKET_NAME,
                  region: sails.config.AWS_REGION
                });
                skipper.rm(image.fileName,function(){});
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
