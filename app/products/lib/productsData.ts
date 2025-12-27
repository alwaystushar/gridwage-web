// app/products/lib/productsData.ts
import type { Product } from "./productTypes";
import { eorProduct } from "./eor";
import { contractorProduct } from "./contractor";
import { expatProduct } from "./expat";
import { globalPayrollProduct } from "./globalPayroll";

const products: Product[] = [
  eorProduct,
  contractorProduct,
  expatProduct,
  globalPayrollProduct,
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
