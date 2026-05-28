import api from '../../../lib/axios';
export const productsService = {
    getProducts: async (filters) => {
        const response = await api.get('/products', { params: filters });
        return {
            data: response.data.data,
            total: response.data.meta.total,
            page: response.data.meta.page,
            limit: response.data.meta.limit,
            totalPages: response.data.meta.totalPages,
        };
    },
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    },
    createProduct: async (data) => {
        const response = await api.post('/products', data);
        return response.data.data;
    },
    updateProduct: async (id, data) => {
        const response = await api.patch(`/products/${id}`, data);
        return response.data.data;
    },
    deleteProduct: async (id) => {
        await api.delete(`/products/${id}`);
    },
    getCategories: async () => {
        const response = await api.get('/categories');
        return response.data.data;
    },
    createCategory: async (data) => {
        const response = await api.post('/categories', data);
        return response.data.data;
    },
    getBrands: async () => {
        const response = await api.get('/brands');
        return response.data.data;
    },
    createBrand: async (data) => {
        const response = await api.post('/brands', data);
        return response.data.data;
    },
};
