"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// components/CreateProductForm.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { DeleteIcon, PlusIcon } from "lucide-react";
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
  title: yup.string().required("Title is required"),
  ratings: yup.number().min(0).max(5).required("Ratings are required"),
  price: yup.number().positive().required("Price is required"),
  discount: yup.number().min(0).max(100).notRequired(),
  images: yup.array().of(yup.string().url()).required("Images are required"),
  category: yup.string().required("Category is required"),
  returns: yup.boolean().required("Returns option is required"),
  warranty: yup.string().required("Warranty is required"),

  content: yup.string().required("Content is required"),
  brand: yup.string().required("Brand is required"),
});

const CreateProductForm: FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
  const handleImageUpload = async (files: FileList, isSingle?: boolean) => {
    const formData = new FormData();
    console.log("first files to upload ", files);
    for (let i = 0; i < files.length; i++) {
      formData.append(isSingle ? "file" : "files", files[i]);
    }

    try {
      if (isSingle) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // const uploadedImageUrls: any =   response?.data?.files
        const uploadedImageUrls = response?.data?.file.url;

        console.log(" uploaded image   ", uploadedImageUrls, response);
        setUploadedImage(uploadedImageUrls);
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/upload/multiple`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // const uploadedImageUrls: any =   response?.data?.files
        const uploadedImageUrls = response?.data?.files?.map(
          (file: any) => file.url
        );
        console.log(" uploaded image   ", uploadedImageUrls, response);
        setUploadedImages((prevImages) => [
          ...uploadedImageUrls,
          ...prevImages,
        ]);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  // Image delete handler
  const handleImageDelete = async (imageUrl: string,isSingle?:boolean) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/delete/${imageUrl}`
      );
      if(isSingle){
        setUploadedImage(null)
    }else{
      setUploadedImages((prevImages) =>
        prevImages.filter((img) => img !== imageUrl)
    );
  }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      data.images = uploadedImages;
      console.log("first data on submit: ", data);
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <Controller
            name="title"
            rules={{ required: "Title is required" }}
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
            rules={{ required: "Ratings is required" }}
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
        <div className="mb-4 ">
          <label className="block text-gray-700">Price</label>
          <Controller
            name="price"
            rules={{ required: "Price is required" }}
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
            rules={{ required: "Discount is required" }}
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
        <div>
          {/* Images Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
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
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
          </div>
          {/* Display Uploaded Images */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {uploadedImages.map((imageUrl, index) => {
              return (
                <div key={index} className="flex items-center space-x-4">
                  <Image
                    width={50}
                    height={50}
                    // src={${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/get/${imageUrl}}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/get/${imageUrl}`}
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
              );
            })}
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
            rules={{ required: "Category is required" }}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
              </select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                {" "}
                <PlusIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <form
                className="bg-white"
                onSubmit={async (e: any) => {
                  e.preventDefault();
                  const title = e.target.title.value;
                  console.log(" title: ", title);
                const response = await  axios.post(`/api/category`,{title,image:uploadedImage})
                 console.log('response: ', response)
                }}
              >
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="grid  py-4">
                  <div className="grid mb-2 grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="title" name="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4"> 
                    <input
                      type="file"
                      multiple
                      className="mt-1 block w-full"
                      // ref={ref}
                      onChange={(e) => {
                        if (e.target.files) {
                          handleImageUpload(e.target.files, true);
                        }
                      }}
                    />
                  </div>
                  {uploadedImage ? (
                    <div className="flex items-center space-x-4">
                      <Image
                        width={50}
                        height={50}
                        // src={${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/get/${imageUrl}}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER_URL}/get/${uploadedImage}`}
                        alt={`Uploaded Image`}
                        className="w-20 h-20 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleImageDelete(uploadedImage as string,true)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ) : null}
                </div>
                <DialogFooter>
                  <Button type="submit" className="border">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Returns Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Returns</label>
          <Controller
            name="returns"
            rules={{ required: "returns is required" }}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <input
                type="checkbox"
                className="mt-1 block"
                onChange={(e) => onChange(e.target.checked)}
                onBlur={onBlur}
                checked={value}
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
            rules={{ required: "Warranty is required" }}
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
            rules={{ required: "Content is required" }}
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
            rules={{ required: "Brands is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Brand"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>
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
