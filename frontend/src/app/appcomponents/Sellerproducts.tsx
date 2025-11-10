import { Button } from "@/components/ui/button";

export default function SellerProducts() {
    return (
        <div className="p-4 flex flex-col gap-10">

            <div className="w-full h-[100px]">
                <Button className="h-[50px] cursor-pointer">Upload New Product</Button>


            </div>


            <div>
                <h2 className="text-xl font-bold mb-4">All Products You Can Offer</h2>
                <div className="grid grid-cols-3 gap-4">

                    <div className="border p-4 rounded-md">Product 1 - Option to Sell</div>
                    <div className="border p-4 rounded-md">Product 2 - Option to Sell</div>
                    <div className="border p-4 rounded-md">Product 3 - Option to Sell</div>

                </div>
            </div>


            <div>
                <h2 className="text-xl font-bold mb-4">Your Active Products (Live on Website)</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="border p-4 rounded-md">Active Product 1</div>
                    <div className="border p-4 rounded-md">Active Product 2</div>
                    <div className="border p-4 rounded-md">Active Product 3</div>
                </div>
            </div>


            <div>
                <h2 className="text-xl font-bold mb-4">Top Rated Products</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="border p-4 rounded-md">Top Rated Product 1</div>
                    <div className="border p-4 rounded-md">Top Rated Product 2</div>
                    <div className="border p-4 rounded-md">Top Rated Product 3</div>
                </div>
            </div>

        </div>
    );
}
