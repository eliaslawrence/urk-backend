/**
 * ImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const uploadOption = {
    local: { dirname: sails.config.upload.transferPath },
    s3: {
      // adapter: require('skipper-s3'),
      key: 'S3 Key',
      secret: 'S3 Secret',
      bucket: 'Bucket Name'
    }
};

module.exports = {
    
    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Find image by id
     */
    async findById (req, res) {
        let imgId = req.params.imageId;
        let base = sails.config.appPath;
        let uploadPath = sails.config.upload.path;
        LogService.controllerLog(req, imgId);

        try {
            if(imgId && imgId != null){
                let image = await ImageService.findById(imgId);

                LogService.controllerLog(req, image); 
                
                if(image && image != null){
                    res.setHeader('Content-Type', 'image/jpeg');

                    let fs   = require('fs');
                    let path = require('path');
                    return fs.createReadStream(path.join(base, uploadPath, image.fileName + '.' + image.extension)).pipe(res); 
                }           
            }           
        } catch (error) {
            LogService.controllerLog(req, error);
            throw(error);
        }  
        return res.ok();      
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Delete image by id
     */
     async delete(req, res) {
        let imgId = req.params.imageId;
        
        LogService.controllerLog(req, imgId);

        try {
            await ImageService.remove(imgId);
        } catch(error) {
            LogService.controllerLog(req, error);
            throw(error);
        }

        return res.ok();
    },

    /**  
     * @author      Elias Lawrence
     * @param       
     * @returns     
     * @description Upload image
     */
    upload: (req, res) => { 
        LogService.controllerLog(req);
    
        req.file('image').upload(uploadOption[sails.config.UPLOAD_TYPE], function(err, uploadedFiles) {   
          LogService.controllerLog(req, uploadedFiles);
    
          if (err) return res.serverError(err);
          
          if(uploadedFiles && uploadedFiles[0]){
            let file = uploadedFiles[0];
            return res.ok(file);
          }
    
          return res.ok();
        });
    },

};

