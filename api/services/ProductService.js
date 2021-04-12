/**
 * ProductService
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

function _log(method, message = null) {
  LogService.log('ProductService', method, message);
}

module.exports = {  
  async count (params) { 
    _log('count', params);
   
    try {      
      var resp = await Product.count(params);
    } catch (err) {
      _log('count', err);
      throw err;
    }

    _log('count', resp);

    return resp;   

  },

  async createEmpty(userId) { 
    _log('createEmpty', userId);
   
    try {
      let employee       = await EmployeeService.findByUser(userId);
      let total          = await ProductService.count({store: employee.store}) + 1;
      let newProductName = 'Produto ' + total;
      let newProduct     = {name: newProductName, store: employee.store};

      var resp = await ProductService.create(newProduct);      
    } catch (err) {
      _log('createEmpty', err);
      throw err;
    }

    _log('createEmpty', resp);

    return resp;    
  },

  async create(newProduct) { 
    _log('create', newProduct);
   
    try {      
      var resp = await Product.create(newProduct).fetch();
    } catch (err) {
      _log('create', err);
      throw err;
    }

    _log('create', resp);

    return resp;    
  },

  async updateAttribute(productId, attributeJSON) { 
    _log('updateAttribute');

    var product;

    try {
      product = await Product.updateOne({ id: productId }).set(attributeJSON);

      if(!product){
        const err = new Error('Product not found');
        err.status = 400;
        throw err;
      }
    } catch (err) {
      _log('updateAttribute', err);
      throw err;
    }

    _log('updateAttribute', product);

    return product;
  },

  // FIND
  async find(params) { 
    _log('find', params);

    try {
      var resp = await Product.find(params).populate('coverImage'); 
    } catch (err) {
      _log('find', err);
      throw err;
    }

    _log('find', resp);

    return resp;
  },

  async findById(productId) { 
    _log('findById', productId);

    try {
      var resp = await Product.findOne({id:productId}).populate('images').populate('coverImage');
      _log('findById', resp);

      var imagesArray = [];

      if(resp != null) {
        for (let index = 0; index < resp.images.length; index++) {
          let image = await ImageService.findById(resp.images[index].image);
          imagesArray.push(image);
        }

        _log('findById', imagesArray)
      }
      
      resp.images = imagesArray;
      
    } catch (err) {
      _log('findById', err);
      throw err;
    }

    _log('findById', resp);

    return resp;
  },

  async findByStore(storeId) { 
    _log('findByStore', storeId);

    try {
      var resp = await ProductService.find({store:storeId});
    } catch (err) {
      _log('findByStore', err);
      throw err;
    }

    _log('findByStore', resp);

    return resp;
  },

  async findByUser(userId) { 
    _log('findByUser', userId);

    try {
      let employee = await EmployeeService.findByUser(userId);
      var resp     = await ProductService.findByStore(employee.store);
    } catch (err) {
      _log('findByUser', err);
      throw err;
    }

    _log('findByUser', resp);

    return resp;
  },

  // DELETE
  async delete(params) {
    _log('delete');

    try {      
      await Product.destroy(params);
    } catch (err) {
      _log('delete', err);
      throw err;
    }

    _log('delete');

    return;
  },

  async remove(id) {
    _log('remove', id);

    try {  
      let product = await ProductService.findById(id);
      _log('remove', product);

      if(product.coverImage != null){
        await ImageService.remove(product.coverImage.id);
      }
        
      for (let index = 0; index < product.images.length; index++) {
        await ProductImageService.remove({product: id, image: product.images[index].id})
      }        

      await ProductService.delete({ id: id });
    } catch (err) {
      _log('remove', err);
      throw err;
    }

    _log('remove');

    return;
  },

  async addImage(productId, imageId) {
    _log('addImage', productId);   
    _log('addImage', imageId);  

    try {
      newObject = {product: productId, image: imageId}; 
      var resp = await ProductImage.create(newObject).fetch();
    } catch (err) {
      _log('addImage', err);
      throw err;
    }

    _log('addImage');

    return resp;
  },

  async updateCoverImage(productId, imageCreated) { 
    _log('updateCoverImage');

    try {  
      let product = await ProductService.findById(productId);

      if(product.coverImage != null){
        await ImageService.remove(product.coverImage.id);
      }                    

      var resp = await ProductService.updateAttribute(product.id, {coverImage: imageCreated.id});
      resp.coverImage = imageCreated;
    } catch (error) {
      _log('updateCoverImage', error);
      throw error;
    }

    _log('updateCoverImage', resp);

    return resp;
  },
};
