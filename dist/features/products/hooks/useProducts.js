"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProducts = useProducts;
exports.useProduct = useProduct;
exports.useCreateProduct = useCreateProduct;
exports.useUpdateProduct = useUpdateProduct;
exports.useDeleteProduct = useDeleteProduct;
exports.useAddVariant = useAddVariant;
exports.useUpdateVariant = useUpdateVariant;
exports.useDeleteVariant = useDeleteVariant;
exports.useAddImage = useAddImage;
exports.useDeleteImage = useDeleteImage;
var react_query_1 = require("@tanstack/react-query");
var product_service_1 = require("../services/product.service");
var productsKey = function (filters) { return ['products', filters]; };
var productKey = function (id) { return ['product', id]; };
function useProducts(filters) {
    if (filters === void 0) { filters = {}; }
    return (0, react_query_1.useQuery)({
        queryKey: productsKey(filters),
        queryFn: function () { return product_service_1.productsService.findAll(filters); },
    });
}
function useProduct(id) {
    return (0, react_query_1.useQuery)({
        queryKey: id ? productKey(id) : ['product', 'empty'],
        queryFn: function () { return product_service_1.productsService.findById(id); },
        enabled: !!id,
    });
}
function useCreateProduct() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (dto) { return product_service_1.productsService.create(dto); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
function useUpdateProduct() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var id = _a.id, dto = _a.dto;
            return product_service_1.productsService.update(id, dto);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: productKey(variables.id) });
        },
    });
}
function useDeleteProduct() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (id) { return product_service_1.productsService.remove(id); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
function useAddVariant() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var productId = _a.productId, dto = _a.dto;
            return product_service_1.productsService.addVariant(productId, dto);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: productKey(variables.productId) });
        },
    });
}
function useUpdateVariant() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var productId = _a.productId, variantId = _a.variantId, dto = _a.dto;
            return product_service_1.productsService.updateVariant(productId, variantId, dto);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: productKey(variables.productId) });
        },
    });
}
function useDeleteVariant() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var productId = _a.productId, variantId = _a.variantId;
            return product_service_1.productsService.removeVariant(productId, variantId);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: productKey(variables.productId) });
        },
    });
}
function useAddImage() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var productId = _a.productId, dto = _a.dto;
            return product_service_1.productsService.addImage(productId, dto);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: productKey(variables.productId) });
        },
    });
}
function useDeleteImage() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var productId = _a.productId, imageId = _a.imageId;
            return product_service_1.productsService.removeImage(productId, imageId);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: productKey(variables.productId) });
        },
    });
}
