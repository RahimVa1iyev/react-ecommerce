import axios from 'axios';
import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    name: yup.string()
        .max(70, 'Name must be at most 30 characters')
        .required('Name is required')

})

export const productSchema = yup.object().shape({
    name: yup.string()
        .max(70, 'Name must be at most 30 characters')
        .required('Name is a required field'),

    brandId: yup.number().required("Brand is a required field")
        .test('brandId check', 'Brand is a required field', function (value) {
            return value > 0;
        }),

    categoryId: yup.number().required("Category is a required field")
        .test('categoryId check', 'Category is a required field', function (value) {
            return value > 0;
        }),

    gender: yup.number().required("Gender is a required field")
        .test('genderId check', 'Gender is a required field', function (value) {
            return value > 0;
        }),

    // sizeIds: yup.array()
    //     .test('sizeIds check', 'Size is a required field', function (value) {
    //         return value > 0;
    //     }),

    // colorIds: yup.array()
    //     .test('colorIds check', 'Color is a required field', function (value) {
    //         return value > 0;
    //     }),

    desc: yup.string().required("Product description is a required field")
        .min(40, "Product description must be longer than 30 characters")
        .max(500, "Product description must be less than 200 characters"),

    // salePrice: yup.number().min(0, "Product sale price must be more than 0")
    //     .max(100000, "Product sale price must be less than 100000")
    //     .test('sale-price-check', 'Sale Price must be greater than Cost Price', function (value) {
    //         const { costPrice } = this.parent;
    //         return value >= costPrice;
    //     }),

    // discountedPrice: yup.number().min(0, "Product discounted price must be more than 0")
    //     .max(100000, "Product discounted price must be less than 100000"),
       

    // costPrice: yup.number().min(0, "Product cost price must be more than 0")
    //     .max(100000, "Product cost price must be less than 100000"),

    posterFile: yup
        .mixed()
        .required("Poster image is a required field")
        .test('image-file-type', 'Poster image must be jpg , jpeg or png', function (value) {
            if (!value) {
                return true;
            }

            const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
            return allowedFormats.includes(value.type);
        })
        .test('poster-image-size', 'Image size must be less than 2MB', function (value) {
            if (!value) {
                return true;
            }

            const maxSizeInBytes = 2 * 1024 * 1024;
            return value.size <= maxSizeInBytes;
        }),


        hoverFile: yup
        .mixed()
       .required("Hover image is a required filed")
        .test('hover-image-type', 'Hover image must be jpg , jpeg or png', function (value) {
            if (!value) {
                return true;
            }

            const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
            return allowedFormats.includes(value.type);
        })
        .test('hover-image-size', 'Image size must be less than 2MB', function (value) {
            if (!value) {
                return true;
            }

            const maxSizeInBytes = 2 * 1024 * 1024;
            return value.size <= maxSizeInBytes;
        }),


    // imageFiles: yup
    //     .array()
    //     .of(
    //         yup
    //             .mixed()
    //     .required('Image files are required')

    //             .test('image-file-type', 'Image files must be jpg , jpeg or png', function (value) {
    //                 if (!value) {
    //                     return true; 
    //                 }

    //                 const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    //                 return allowedFormats.includes(value.type);
    //             })
    //             .test('image-file-size', 'Image size must be less than 2MB', function (value) {
    //                 if (!value) {
    //                     return true; 
    //                 }

    //                 const maxSizeInBytes = 2 * 1024 * 1024; 
    //                 return value.size <= maxSizeInBytes;
    //             })
    //     ),


})

export const loginSchema = yup.object().shape({
    userName : yup.string()
    .required('Username is requred')
    .max(25,'Username must be at maximum 25 characters')
    .min(4,'Username must be at minimum 4 characters'),

    password : yup.string()
    .required('Password is required')
    .max(25,'Password must be at maximum 25 characters')
    .min(6,'Password must be at minimum 6 characters')

})

export const registerSchema = yup.object().shape({
    firstname : yup.string()
    .required('Firstname is required')
    .max(20,'Firstname must be at maximum 20 characters')
    .min(3,'Firstname must be at minimum 3 characters'),

    lastname : yup.string()
    .required('Lastname is required')
    .max(20,'Lastname must be at maximum 20 characters')
    .min(3,'Lastname must be at minimum 3 characters'),

    userName : yup.string()
    .required('Username is required')
    .max(20,'Username must be at maximum 20 characters')
    .min(3,'Username must be at minimum 3 characters'),

    email : yup.string()
    .required('Email is required')
    .max(80,'Email must be at maximum 80 characters')
    .min(15,'Email must be at minimum 15 characters'),

    phoneNumber : yup.string()
    .required('Phone number is required')
    .max(20,'Phone number must be at maximum 20 characters')
    .min(10,'Phone number must be at minimum 10 characters'),

    password : yup.string()
    .required('Password is required')
    .max(25,'Passwor must be at maximum 25 characters')
    .min(6,'Passwor must be at minimum 6 characters'),

    confirmPassword : yup.string()
    .required('Confirm password is required')
    .max(25,'Confirm passwor must be at maximum 25 characters')
    .min(6,'Confirm passwor must be at minimum 6 characters')
    .oneOf([yup.ref('password')], 'Passwords must match'),



})