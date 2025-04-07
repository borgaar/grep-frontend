/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponse } from '../models/CategoryResponse';
import type { CreateCategoryRequest } from '../models/CreateCategoryRequest';
import type { PaginationDetail } from '../models/PaginationDetail';
import type { UpdateCategoryRequest } from '../models/UpdateCategoryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoryControllerService {
    /**
     * @returns CategoryResponse OK
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreateCategoryRequest,
    }): CancelablePromise<CategoryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/category/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CategoryResponse OK
     * @throws ApiError
     */
    public static update({
        requestBody,
    }: {
        requestBody: UpdateCategoryRequest,
    }): CancelablePromise<CategoryResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/category/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CategoryResponse OK
     * @throws ApiError
     */
    public static getAll({
        requestBody,
    }: {
        requestBody: PaginationDetail,
    }): CancelablePromise<Array<CategoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/category/get',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CategoryResponse OK
     * @throws ApiError
     */
    public static delete({
        name,
    }: {
        name: string,
    }): CancelablePromise<CategoryResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/category/delete/{name}',
            path: {
                'name': name,
            },
        });
    }
}
