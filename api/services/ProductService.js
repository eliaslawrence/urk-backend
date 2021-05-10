/**
 * ProductService
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

const objectid = require('mongodb').ObjectID;

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
      let newProduct     = {name: newProductName, store: employee.store, searchField: newProductName.toLowerCase()};
      

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
      product = await Product.updateOne({ id: productId }).set({searchField: product.name.toLowerCase() + " " + product.description.toLowerCase().replace(/(\r\n|\n|\r)/gm," ") + " " + product.code});

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
  async find(params, limit, skip) { 
    _log('find', params);

    try {
      var resp = await Product.find(params).limit(limit).skip(skip).populate('coverImage'); 
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
      var resp = await Product.findOne({id:productId}).populate('images').populate('coverImage').populate('store');
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

  async findByStore(text, limit, skip, storeId) { 
    _log('findByStore', storeId);

    try {
      // var resp = await ProductService.find({store:storeId});
      var resp = await ProductService.search(text, limit, skip, {store: objectid(storeId), available : true});
    } catch (err) {
      _log('findByStore', err);
      throw err;
    }

    _log('findByStore', resp);

    return resp;
  },

  async findByUser(userId, text, limit, skip) { 
    _log('findByUser', userId);

    try {
      let employee = await EmployeeService.findByUser(userId);      
      var resp     = await ProductService.search(text, limit, skip, {store: objectid(employee.store)});
    } catch (err) {
      _log('findByUser', err);
      throw err;
    }

    _log('findByUser', resp);

    return resp;
  },

  async search(text, limit, skip, param = {}) { 
    _log('search');

    try {
      if(text != undefined) {
        let  words = text.split(" ");

        let andClause = [];
        for(let i = 0; i < words.length; i++){
          andClause.push({ searchField: {"$regex": new RegExp(words[i],"i")}});
        }
        
        param.$and = andClause;
      }
      _log('search', param);

      // Get access to the native MongoDB client via the default Sails datastore.
      var db = sails.getDatastore().manager;

      // Find all products with the expression "text" in the searchField.
      var products = await db.collection('product').find(param).project({ id: 1 }).toArray();
      _log('search', products);

      var ids = [];

      for(let i = 0; i < products.length; i++){
        ids.push(products[i]['_id'].toString());
      }

      // _log('search', ids);

      var resp = await Product.find({id: ids}).limit(limit).skip(skip).populate('coverImage').populate('store'); 
    } catch (err) {
      _log('search', err);
      throw err;
    }

    _log('search', resp);

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
