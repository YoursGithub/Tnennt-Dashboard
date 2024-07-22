import { v4 as uuidv4 } from "uuid";
import { setDocument } from "../Database/db";


import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";

 
const uploadImage = async (productID , Images) => {
  try {
    for (let i = 0; i < Images.length; i++) {
      const { data , file , name } = Images[i];
      const storageRef = ref(
        storage,
        `products/${productID}/${name}`
      );
      await uploadBytes( storageRef , file);
    }
  } catch (error) {
    throw new Error("Image uploading error", error);
  }
};

export const createProduct = async (images, productDetails) => {
  const productID = `ProductID-${uuidv4()}`;

  try {
    productDetails["ProductImg"] = images.map(({ name }) => name);

    const newObj = {
      storeId: productDetails.storeId,
      name: productDetails.ProductName.toLowerCase(),
      description: productDetails.ProductDescription.toLowerCase(),
      storeCategory: productDetails.StoreOwnerCategory.toLowerCase(),
      productCategory: productDetails.ProductType.toLowerCase(),
      isAvailable: true,
      images: productDetails.ProductImg,
    };

    if (
      productDetails.hasOwnProperty("sizes") &&
      productDetails.sizes.length !== 0
    ) {
      [
        "ProductMrpPrice",
        "ProductPrice",
        "ProductDiscount",
        "ProductStockQuantity",
      ].forEach((prop) => {
        if (productDetails.hasOwnProperty(prop)) {
          delete productDetails[prop];
        }
      });
      const ProductVariationDetails = productDetails.sizes.reduce(
        (acc, details) => {
          const { ProductVariations } = details;

          acc[ProductVariations] = {
            price: details.ProductPrice,
            discount: parseFloat(details.ProductDiscount),
            stockQuantity: parseInt(details.ProductStockQuantity),
            mrp: parseFloat(details.ProductMrpPrice),
          };

          return acc;
        },
        {}
      );

      newObj.variations = ProductVariationDetails;
    } else {
      newObj.variations = {
        default: {
          price: productDetails.ProductPrice,
          discount: parseFloat(productDetails.ProductDiscount),
          stockQuantity: parseInt(productDetails.ProductStockQuantity),
          mrp: parseFloat(productDetails.ProductMrpPrice),
        },
      };
    }

    console.log(productID);
    // console.log(images);

    await uploadImage(productID, images);
    await setDocument(`Products/${productID}`, newObj);
    
  } catch (error) {
    throw new Error(error);
  }
};
