
import Image from "next/image"


import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";

export function ProductCard({product} :{product:Product}){

    return(
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="relative aspect-video">
                 <Image
                src={product.image}
                alt={product.name}
                //className="w-full h-48 object-cover object-center mb-4"
                className="object-cover"
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 30vw "
            />
            </div>
           
            <h2 className="text-lg font-semibold" > {product.name} </h2>
            <p className="text-gray-600">{formatPrice(product.price)}</p>
            <p className="text-gray-600">{product.description}</p>
        </div>
    )

}