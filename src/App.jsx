import Navbar from './components/Navbar'
import Login from './components/Login'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'

const App = () => {
  return (
    <div className='bg-gray-400'>
       <Navbar />
          <div className='flex flex-wrap items-center justify-center lg:gap-10 lg:mx-4 my-10   gap-3 mx-2 '>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />


          </div>
         
       <Footer />
    </div>
  )
}

export default App
