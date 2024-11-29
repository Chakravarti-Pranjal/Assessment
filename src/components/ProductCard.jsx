
const ProductCard = ({name,image, category, price}) => {
  return (
   <div className="border p-4 rounded-lg shadow-md w-[300px]">
    <img src={image} alt={name} className="w-full h-48 object-cover mb-4" />
    <h2 className="text-xl font-bold">{name}</h2>
    <p className="text-gray-500">{category}</p>
    <p className="text-lg font-semibold mt-2">₹{price}</p>
  </div>
  )
}

export default ProductCard
