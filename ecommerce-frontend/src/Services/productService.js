import Api from './Api';

const productService = {
    getProducts: async () => {
        try {
            const response = await Api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Could not fetch products.');
        }
    },

    addProduct: async (product) => {
        try {
            const response = await Api.post('/products', product);
            return response.data;
        } catch (error) {
            console.error('Error adding product:', error);
            // Check if the error response exists and has a status of 422
            if (error.response && error.response.status === 422) {
                throw new Error('Barcode already exists!');
            }
            throw new Error('Could not add product.'); // Generic error for other cases
        }
    },

    updateProduct: async (id, updateProduct) => {
        try {
            const response = await Api.put(`/products/${id}`, updateProduct);
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Could not update product.');
        }
    },

    deleteProduct: async (id) => {
        try {
            await Api.delete(`/products/${id}`);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw new Error('Could not delete product.');
        }
    },
}

export default productService;
