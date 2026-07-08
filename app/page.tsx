//import { mockProducts } from "@/lib/mocks";
import { ProductCard } from './products/ProductCard'
import { prisma } from '@/lib/prisma'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const page = Number(searchParams.page) || 1
  const pageSize = 3
  const skip = (page - 1) * pageSize

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: pageSize,
      orderBy: {
        id: 'asc',
      },
    }),

    prisma.product.count(),
  ])

  const totalPages = Math.ceil(total / pageSize)
  console.log(totalPages,page)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Home</h1>
      <p>Showing {products.length} </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-col-3'>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>

      <Pagination className='mt-8'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${Math.max(page - 1, 1)}`} />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`?page=${pageNumber}`}
                  isActive={page === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          {
            page < totalPages && (
              <PaginationItem>
                <PaginationNext href={`?page=${Math.min(page + 1, totalPages)}`} />
              </PaginationItem>

            )
          }
          
        </PaginationContent>
      </Pagination>
    </main>
  )
}
