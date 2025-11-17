import { Product } from "@/types/producttype";
import Image from "next/image";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  return res.json();
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="dark:bg-black h-screen mt-[70px]">

    <div className="grid grid-cols-3 gap-5 p-5">
      {products.map((item: Product) => (
        <div key={item.id} className="border p-4 rounded-lg width-[300px]">
          <Image
            src={item.image}
            alt={item.title}
            width={400}
            height={200}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-green-600 font-bold">${item.price}</p>
        </div>
      ))}
    </div>
     </div>
  );
}
