





import "dotenv/config";
import { PrismaClient, type Product } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";




const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });


async function main() {
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    const electronics = await prisma.category.create({
        data : {
            name :"Electronics",
            slug:"electronics"
        }
    })

    const clothing = await prisma.category.create({
        data : {
            name :"Clothing",
            slug:"clothing"
        }
    })

    const home = await prisma.category.create({
        data : {
            name :"Home",
            slug:"home"
        }
    })

    
    const products: Product[] = [
      {
        id: "1",
        name: "Wireless Headphones",
        description:
          "Premium noise-cancelling wireless headphones with long battery life.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        
        categoryId : electronics.id,
        slug: "wireless-headphones"
      },
            // Electronics
        {
        id: "2",
        name: "Smart Watch",
        description:
            "Fitness tracker with heart rate monitoring and sleep analysis.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        categoryId: electronics.id,
        slug: "smart-watch"
        },
        
       

        // Clothing
        {
        id: "3",
        name: "Denim Jacket",
        description:
            "Classic blue denim jacket made from premium cotton with a comfortable fit.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        categoryId: clothing.id,
        slug: "denim-jacket"
        },
        {
        id: "4",
        name: "Running Sneakers",
        description:
            "Lightweight running sneakers designed for all-day comfort.",
        price: 109.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        categoryId: clothing.id,
        slug: "running-sneakers"
        },

        // Home
        {
        id: "5",
        name: "Wooden Coffee Table",
        description:
            "Modern wooden coffee table with a natural oak finish for living rooms.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        categoryId: home.id,
        slug: "wooden-coffee-table"
        },
        {
        id: "6",
        name: "Desk Lamp",
        description:
            "Minimalist LED desk lamp with adjustable brightness.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        categoryId: home.id,
        slug: "desk-lamp"
        },
    ];

    for(const product of products){
        await prisma.product.create({
            data:product
        })
    }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

