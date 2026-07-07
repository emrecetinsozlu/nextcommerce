//import { mockProducts } from "@/lib/mocks";
import { ProductCard } from "./products/ProductCard";
import { prisma } from "@/lib/prisma";



export default async function Home() {

  const products = await prisma.product.findMany();
  console.log(products)

  
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p>Showing  {products.length}  </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-col-3">

        {
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })
        }


      </div>
      
    </main>
  );
}
