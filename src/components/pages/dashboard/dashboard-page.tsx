import ProductCategoryCard from "@/components/common/card/product-category-card"
import { useNavigate } from "react-router"

const DashboardPage = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-8 lg:grid-cols-2">
        <ProductCategoryCard
          title="Semua Produk"
          description="Kelola semua produk yang tersedia di toko Anda."
          onClick={() => navigate("/products/all")}
        />
        <ProductCategoryCard
          title="Produk Terlaris"
          description="Kelola produk terlaris yang paling banyak dibeli."
          onClick={() => navigate("/products/best-seller")}
        />
        <ProductCategoryCard
          title="Produk Baru"
          description="Kelola produk baru yang baru saja ditambahkan."
          onClick={() => navigate("/products/new-arrivals")}
        />
        <ProductCategoryCard
          title="Produk Diskon"
          description="Kelola produk yang sedang dalam diskon atau promo."
          onClick={() => navigate("/products/discount")}
        />
      </div>
    </div>
  )
}

export default DashboardPage