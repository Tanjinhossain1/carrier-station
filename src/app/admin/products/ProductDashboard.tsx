'use client'
// components/CreateProductForm.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { DeleteIcon } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

interface CreateProductFormData {
  title: string;
  ratings: number;
  price: number;
  discount: number; // Made optional
  images: string[];
  category: string;
  returns: boolean;
  warranty: string;
  content: string;
  brand: string;
}
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  ratings: yup.number().min(0).max(5).required('Ratings are required'),
  price: yup.number().positive().required('Price is required'),
  discount: yup.number().min(0).max(100).notRequired(),
  images: yup.array().of(yup.string().url()).required('Images are required'),
  category: yup.string().required('Category is required'),
  returns: yup.boolean().required('Returns option is required'),
  warranty: yup.string().required('Warranty is required'),
  
  
  content: yup.string().required('Content is required'),
  brand: yup.string().required('Brand is required'),
});


const CreateProductForm: FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    // resolver: yupResolver(schema),

    defaultValues: {
      title: "",
      ratings: 0,
      price: 0,
      discount: 0, // Match optional discount
      images: [], // Allow undefined initially
      category: "",
      returns: false,
      warranty: "",
      content: "",
      brand: "",
    },
  });

  // Image upload handler
  const handleImageUpload = async (files: FileList) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await fetch("https://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadedImageUrls: string[] = await response.json();
      setUploadedImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // Image delete handler
  const handleImageDelete = async (imageUrl: string) => {
    try {
      await fetch(
        `https://localhost:5000/delete/image/${encodeURIComponent(imageUrl)}`,
        {
          method: "DELETE",
        }
      );

      setUploadedImages((prevImages) =>
        prevImages.filter((img) => img !== imageUrl)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      data.images = uploadedImages;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md rounded"
    >
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>

      {/* Title Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Product Title"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Ratings Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Ratings</label>
        <Controller
          name="ratings"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Product Ratings"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.ratings ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.ratings && (
          <p className="text-red-500 text-sm">{errors.ratings.message}</p>
        )}
      </div>

      {/* Price Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Product Price"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Discount Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Discount</label>
        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Product Discount"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.discount ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.discount && (
          <p className="text-red-500 text-sm">{errors.discount.message}</p>
        )}
      </div>

      {/* Images Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Images</label>
        {/* Image Upload Field */}
        <Controller
          name="images"
          control={control}
          render={({ field: { ref } }) => (
            <input
              type="file"
              multiple
              className="mt-1 block w-full"
              ref={ref}
              onChange={(e) => {
                if (e.target.files) {
                  handleImageUpload(e.target.files);
                }
              }}
            />
          )}
        />

        {/* Display Uploaded Images */}
        <div className="mt-4">
          {uploadedImages.map((imageUrl, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Image
                width={50}
                height={50}
                src={imageUrl}
                alt={`Uploaded ${index}`}
                className="w-20 h-20 object-cover"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(imageUrl)}
                className="text-red-600 hover:text-red-800"
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images.message}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Product Category"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Returns Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Returns</label>
        <Controller
          name="returns"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="checkbox"
              className="mt-1 block"
              onChange={(e) => onChange(e.target.checked)} // Update the field value based on checkbox state
              onBlur={onBlur}
              checked={value} // Use checked instead of value
              ref={ref}
            />
          )}
        />

        {errors.returns && (
          <p className="text-red-500 text-sm">{errors.returns.message}</p>
        )}
      </div>

      {/* Warranty Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Warranty</label>
        <Controller
          name="warranty"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Product Warranty"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.warranty ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.warranty && (
          <p className="text-red-500 text-sm">{errors.warranty.message}</p>
        )}
      </div>
 


      {/* Content Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Product Content"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      {/* Brand Field */}
      <div className="mb-4">
        <label className="block text-gray-700">Brand</label>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.brand ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a brand</option>
              <option value="no_brand">No Brand</option>
              <option value="brand">Brand</option>
            </select>
          )}
        />
        {errors.brand && (
          <p className="text-red-500 text-sm">{errors.brand.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateProductForm;
