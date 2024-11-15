import React, { useEffect, useState } from 'react';
import './LandingPageStyles/LandingPageFeaturedProducts.css';
import LandingPageCards from './LandingPageComponents/LandingPageCards';
import LandingPageSectionComponent from './LandingPageComponents/LandingPageSectionComponent';
import LandingPageButton from './LandingPageComponents/LandingPageButton';
import { useNavigate } from 'react-router-dom';

const LandingPageFeaturedProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    // Fetch the featured products from the PHP script
    useEffect(() => {
        fetch(`${apiUrl}/KampBJ-api/server/fetchFeaturedProducts.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('There was an issue fetching the products:', error);
            });
    }, []);

    return (
        <LandingPageSectionComponent
            sectionId='product-section'
            sectionTitle='Featured Products'
            sectionSubtitle='View Some Of Our Products'
        >
            <div className='landing-page-featured-products__content-wrapper'>
                {products.length > 0 ? (
                    products.map(product => (
                        <LandingPageCards key={product.productId} product={product} id={product.productId} />
                    ))
                ) : (
                    <p>No featured products available at the moment.</p>
                )}
                <div className='landing-page-featured-products__button-wrapper'>
                    <LandingPageButton label='View More' onClick={() => navigate('/products')} />
                </div>
            </div>
        </LandingPageSectionComponent>
    );
};

export default LandingPageFeaturedProducts;
