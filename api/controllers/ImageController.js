/**
 * ImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const uploadOption = {
    local: { 
        dirname: sails.config.upload.transferPath, 
        // don't allow the total upload size to exceed ~4MB
        maxBytes: 4000000 
    },
    s3: {
        adapter: require('skipper-better-s3'), 
        key: sails.config.AWS_KEY, 
        secret: sails.config.AWS_SECRET, 
        bucket: sails.config.AWS_BUCKET_NAME,
        region: sails.config.AWS_REGION,  // Optional - default is 'us-standard'
        // Let's use the custom s3params to upload this file as publicly
        // readable by anyone
        s3params: { 
            ACL: 'public-read'
        },
        // don't allow the total upload size to exceed ~4MB
        maxBytes: 4000000 
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
        LogService.controllerLog(req, process.env.NODE_ENV);
        LogService.controllerLog(req, sails.config.APP_URL);
        LogService.controllerLog(req, sails.config.STORAGE_TYPE);

        req.file('image').upload(uploadOption[sails.config.STORAGE_TYPE], function(err, files) { 
            LogService.controllerLog(req, files);
            
            if (err) return res.serverError(err);
            
            if(files && files[0]){
                let file = files[0];
                let {fd: fileName, filename: originalName, type, size} = file;
                let storage = sails.config.STORAGE_TYPE;

                let url = "";
                if(sails.config.STORAGE_TYPE == sails.config.LOCAL_STORAGE){
                    fileName = fileName.substr(fileName.lastIndexOf('/') + 1);
                    url = sails.config.APP_URL + '/uploads/' + fileName;
                } else if (sails.config.STORAGE_TYPE == sails.config.S3_STORAGE) {
                    url = file.extra.Location;
                }
                
                return res.ok({fileName, originalName, url, type, size, storage},file);
            }
            return res.ok();
        }); 
    },

};

