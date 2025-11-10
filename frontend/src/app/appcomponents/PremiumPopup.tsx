import CheckoutButton from "./CheckourButton";

export function NotPremiumUser() {


    return (
        <>
            <div className="p-6 bg-white min-h-[150px] w-[300px] flex flex-col gap-6 justify-center rounded-xl shadow-2xl">
                <h1 className="text-xl font-bold">Only Premium Users can Contact</h1>

                <CheckoutButton />
                
            </div>


        </>
    )
};
