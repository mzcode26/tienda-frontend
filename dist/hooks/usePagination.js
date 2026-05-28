"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = void 0;
var usePagination = function (total, page, limit) {
    var totalPages = Math.max(1, Math.ceil(total / limit));
    return {
        total: total,
        page: page,
        limit: limit,
        totalPages: totalPages,
        hasPrevious: page > 1,
        hasNext: page < totalPages,
    };
};
exports.usePagination = usePagination;
