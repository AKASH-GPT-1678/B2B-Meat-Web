'use client'

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "./DisplayProd";
// Type for product
// export interface Product {
//   id: string;
//   name: string;
//   sellerName: string;
//   description: string;
//   minimumOrderQuantity: string;
//   price: number;
//   productImgUrl: string;
//   category: string;
// }

// Product card component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition rounded-xl border border-gray-200">
            <div className="relative">
                <img
                    src={product.productImgUrl}
                    alt={product.name}
                    className="w-full h-36 object-contain"
                />
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold truncate">
                    {product.name}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1 text-sm">
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <p className="font-semibold">₹{product.price}</p>
                <p className="text-xs text-gray-500">MOQ: {product.minimumOrderQuantity}</p>
            </CardContent>
        </Card>
    );
};
// Main grid
export default function ProductsGrid({ allProducts }: { allProducts: Product[] }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">All Products You Can Offer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

/*
Usage Example:

const [allProducts, setAllProducts] = React.useState<Product[]>([]);

React.useEffect(() => {
  // fetch products then setAllProducts(response.data)
}, []);

<ProductsGrid allProducts={allProducts} />
*/
