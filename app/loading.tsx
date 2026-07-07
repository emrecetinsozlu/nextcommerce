import { ProductCardSkeleton } from "./ProductCardSkeleton"



export default function Loading(){
    return(
          <main className="container mx-auto p-4">
              <h1 className="text-3xl font-bold mb-6">Home</h1>
              <p>Showing  5 products </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-col-3">
        
                {
                  Array.from({length:6}).map((_,i) => {
                    return <ProductCardSkeleton key={i} />
                  })
                }
        
        
              </div>
              
            </main>
    )
}