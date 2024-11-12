import React from 'react';
import { useParams } from 'react-router-dom';
import LandingPageButton from './LandingPageComponents/LandingPageButton'
import Product1 from '../Assets/product1.jpg';
import './LandingPageStyles/LandingPageProductView.css';

const LandingPageProductView = () => {
    //UseParams are used to extract the URL and de-structure it. Storing the :clickedItemId(URL)
    // and :clickedItemName(URL).
    const { productId, productName } = useParams();

    //fetch the whole database for products and search for the productId withing the fetched data
    const products = [
        { id: 1, img: Product1, name: 'Tempered Glass Aquarium', description: 'A durable and crystal-clear aquarium made with tempered glass.', brand: 'AquaPro', model: 'TG-300', category: 'Equipment', stocks: 20, price: 44.5 },
        { id: 2, img: Product1, name: 'LED Aquarium Light', description: 'Bright and energy-efficient LED light for aquariums.', brand: 'BrightLite', model: 'LED-X2', category: 'Equipment', stocks: 15, price: 84.8 },
        { id: 3, img: Product1, name: 'Submersible Water Heater', description: 'Efficient water heater with adjustable temperature settings.', brand: 'HeatWave', model: 'HW-100', category: 'Equipment', stocks: 10, price: 144.2 },
        { id: 4, img: Product1, name: 'Fish Food Pellets', description: 'Nutritious pellets suitable for most freshwater fish.', brand: 'NutriFish', model: 'FFP-1kg', category: 'Accessories', stocks: 50, price: 244.3 },
        { id: 5, img: Product1, name: 'Aquarium Gravel Cleaner', description: 'Manual siphon cleaner to remove debris from aquarium gravel.', brand: 'CleanSweep', model: 'GS-50', category: 'Accessories', stocks: 25, price: 19.9 },
        { id: 6, img: Product1, name: 'CO2 Diffuser Kit', description: 'Essential kit for healthy plant growth in aquariums.', brand: 'PlantPro', model: 'CO2-500', category: 'Accessories', stocks: 18, price: 59.5 },
        { id: 7, img: Product1, name: 'External Canister Filter', description: 'High-capacity filter for large aquariums.', brand: 'AquaClean', model: 'CF-600', category: 'Equipment', stocks: 5, price: 299.0 },
        { id: 8, img: Product1, name: 'Aquarium Plant Fertilizer', description: 'Liquid fertilizer to promote healthy aquatic plants.', brand: 'PlantGro', model: 'Fert-250ml', category: 'Accessories', stocks: 35, price: 15.5 },
        { id: 9, img: Product1, name: 'Automatic Fish Feeder', description: 'Convenient feeder with customizable feeding schedules.', brand: 'AutoFeed', model: 'AF-200', category: 'Accessories', stocks: 12, price: 65.0 },
        { id: 10, img: Product1, name: 'Aquarium Air Pump', description: 'Silent and efficient air pump for oxygenating aquariums.', brand: 'AirFlow', model: 'AP-150', category: 'Equipment', stocks: 22, price: 32.9 },
        { id: 11, img: Product1, name: 'Magnetic Glass Cleaner', description: 'Easy-to-use magnetic cleaner for aquarium glass.', brand: 'MagniClean', model: 'MC-80', category: 'Accessories', stocks: 30, price: 25.3 },
        { id: 12, img: Product1, name: 'Aquarium Background Poster', description: 'Decorative background poster for aquarium aesthetics.', brand: 'DecoView', model: 'BG-5', category: 'Accessories', stocks: 40, price: 12.0 },
        { id: 13, img: Product1, name: 'Aquarium Driftwood', description: 'Natural driftwood piece to enhance the aquarium environment.', brand: 'NatureWood', model: 'DW-20', category: 'Accessories', stocks: 16, price: 18.7 },
        { id: 14, img: Product1, name: 'Aquarium Test Kit', description: 'Complete kit for testing water parameters like pH and ammonia.', brand: 'AquaTest', model: 'TK-10', category: 'Accessories', stocks: 27, price: 35.0 },
        { id: 15, img: Product1, name: 'Aquarium Substrate Sand', description: 'Fine sand substrate for planted aquariums.', brand: 'SubstratePro', model: 'Sand-1kg', category: 'Accessories', stocks: 45, price: 21.0 }
    ];

    //Use the :clickedItemId to find the item id in the database. Once find, it will be used to display the contents
    const selectedProduct = products.find(product => product.id === Number(productId));

    //If the :clickedItemId from the URL is not present in the database
    if(!selectedProduct){
        return <p>Item Selected is Unavailable</p>
    }

  return (
    <div className='landing-page-product-view'>
        <div className='landing-page-product-view__content-wrapper'>
          <div className='landing-page-product-view__img-wrapper'>
            <img src={selectedProduct.img} className='landing-page-product-view__img' />
          </div>
          <div className='landing-page-product-view__details-wrapper'>
            <p className='landing-page-product-view__name'>{selectedProduct.name}</p>
            <p className='landing-page-product-view__description'>{selectedProduct.description}</p>
            <p className='landing-page-product-view__Brand'><span className='emphasized'>Brand:</span> {selectedProduct.brand}</p>
            <p className='landing-page-product-view__Model'><span className='emphasized'>Model:</span> {selectedProduct.model}</p>
            <p className='landing-page-product-view__category'><span className='emphasized'>Category:</span> {selectedProduct.category}</p>
            <p className='landing-page-product-view__stocks'><span className='emphasized'>Stocks:</span> {selectedProduct.stocks}</p>
            <p className='landing-page-product-view__price'>₱ {selectedProduct.price}</p>

            <LandingPageButton label='View More' varietyClass='landing-page-product-view__view-more'/>
          </div>
            
        </div>
    </div>
  )
}

export default LandingPageProductView
