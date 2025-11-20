import ProductDetail from "@/components/ProductDetail"

type ProductParams = Promise<{ id: string }>

export default async function ProductPage({ params }: { params: ProductParams }) {
  const { id } = await params
  return <ProductDetail productId={parseInt(id, 10)} />
}
