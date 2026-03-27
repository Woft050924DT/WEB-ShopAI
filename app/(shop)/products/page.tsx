import ProductsClient from './products-client';

type SearchParams = Promise<{
  q?: string;
  search?: string;
  featured?: string;
}>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <ProductsClient
      initialSearch={resolvedSearchParams.q ?? resolvedSearchParams.search ?? ''}
      initialFeatured={resolvedSearchParams.featured === 'true'}
    />
  );
}
