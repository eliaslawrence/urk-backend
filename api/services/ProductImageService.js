/**
 * ProductImageService
 *
 * @description :: Server-side logic for managing product images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

const ImageService = require("./ImageService");

function _log(method, message = null) {
  LogService.log('ProductImageService', method, message);
}

module.exports = { 
  
  // CREATE
  async create(productId, imageId) {
    _log('create', productId);   
    _log('create', imageId);  

    try {
      let newProductImage = {product: productId, image: imageId}; 
      var resp = await ProductImage.create(newProductImage).fetch();
    } catch (err) {
      _log('create', err);
      throw err;
    }

    _log('create');

    return resp;
  },

  // DELETE
  async deleteById(id) {
    _log('delete');

    try {
      await ProductImage.destroy({ id: id });
    } catch (err) {
      _log('delete', err);
      throw err;
    }

    _log('delete');

    return;
  },

  async delete(params) {
    _log('delete', params);

    try {
      await ProductImage.destroy(params);
    } catch (err) {
      _log('delete', err);
      throw err;
    }

    _log('delete');

    return;
  },

  async remove(productImage) {
    _log('remove', productImage);

    try {      
      await ProductImageService.delete({product: productImage.product, image: productImage.image});
      await ImageService.remove(productImage.image);
    } catch (err) {
      _log('remove', err);
      throw err;
    }

    _log('remove');

    return;
  },

};
