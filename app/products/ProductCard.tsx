
import Image from "next/image"


import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";



export function ProductCard({product} :{product:Product}){

    return(
        <Card className="pt-0">
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
            <CardHeader>
                <CardTitle>{product.name} </CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <p className="text-gray-600">{formatPrice(product.price)}</p>
            </CardFooter>
           
     
        </Card>
    )

}