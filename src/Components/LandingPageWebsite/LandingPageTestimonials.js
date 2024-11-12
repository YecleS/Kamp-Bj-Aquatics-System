import React from 'react';
import './LandingPageStyles/LandingPageTestimonials.css'
import LandingPageButton from './LandingPageComponents/LandingPageButton';
import LandingPageSectionComponent from './LandingPageComponents/LandingPageSectionComponent';
import LandingPageTestimonialCards from './LandingPageComponents/LandingPageTestimonialCards';
import LandingPageSocialIcons from './LandingPageComponents/LandingPageSocialIcons';
import CustomerAnonymous from '../Assets/customer-blank.png';
import CustomerImg1 from '../Assets/customer1.png';
import CustomerImg2 from '../Assets/customer2.png';
import CustomerImg3 from '../Assets/customer3.png';
import CustomerImg4 from '../Assets/cutomer4.png';
import { useNavigate } from 'react-router-dom';

const LandingPageTestimonials = () => {
  const navigate = useNavigate();

    const testimonialData = [
        { id: 1,
          img: CustomerImg1, 
          feedback:'Kahit paulit ulit ang tanong ko dahil minsan di natutuloy ung pag order ko, at nalilimutan ko na mga prices, pero sumasagot parin sila. Kudos to you mga sir',
          name:'Janno Valida Mamucod', 
        },
    
        { id: 2,
          img: CustomerImg2,  
          feedback:'Very accomodating',
          name:'Kimberli Ann Fernandez Labe', 
        },
    
        { id: 3,
          img: CustomerImg3,  
          feedback:'100% the most accomodating seller for me sa Pacita/Chrysanthemum/Rosario. Very helpful sa buyers lalo if may questions and requests. A good shop for newbies and experienced keepers alike! Highly recommended to visit the store atleast once para makita nyo madami talagang options lalo if may new arrivals',
          name:'Rhodri Aurelio', 
        },
    
        { id: 4,
          img: CustomerImg4,  
          feedback:'Yow thank you so much po Sir Brix and Sir Jess ng Kamp BJ Aquatics napaka solid ulit ng pag pasyal ko jan, salute po sainyo.',
          name:"Mitra's Backyard", 
        },
    
        { id: 5,
          img: CustomerAnonymous,  
          feedback:'You are a good seller. Nag enquire din ako sa iba tagal mag respond, yong iba no response at all kahit malapit lang dito sa place ko. Kaya kahit malayo go lang keep it up.',
          name:"Anonymous Customer", 
        },
    
        { id: 6,
          img: CustomerAnonymous,  
          feedback:'First time buyer here sa shop nila. Super kind and accomodating si seller. Bilis nila mag process agad ng order at safe din nakakarating via Lalamove. Highly recommended',
          name:"Anonymous Customer", 
        },
    
        { id: 7,
          img: CustomerAnonymous,  
          feedback:'Salamat po sa pag guide sa newbie very appreciated po. Smooth transaction nadin po. More sales po sainyo, have a blessed holy week po',
          name:"Anonymous Customer", 
        },
    
        { id: 8,
          img: CustomerAnonymous,  
          feedback:'approachable and accomodating yung seller. Fast transaction din. Thank you',
          name:"Anonymous Customer", 
        },
      ]
  return (
    <LandingPageSectionComponent
        sectionId='testimonial-section'
        sectionTitle='What Our Customer Says'
        sectionSubtitle='Be A Kamper Now !'
    >
        <div className='landing-page-testimonials__content-wrapper'>
          <div className='landing-page-testimonials__text-wrapper'>
            <div className='landing-page-testimonials__text-header'>
                <h3 className='landing-page-testimonials__title'>What they've said about us</h3>
                <p className='landing-page-testimonials__sub-title'>Join our community now, be a kamper now!</p>
                <p className='landing-page-testimonials__description'>Discover why our customers rave about their experiences with Kamp BJ Aquatics. From top-tier products to exceptional customer service, our dedication to aquatic excellence has earned us the loyalty and trust of countless aquatic enthusiasts. At Kamp BJ Aquatics, we’re not just a store—we’re a community.</p>
                <LandingPageButton label='Reach Out' varietyClass='landing-page-testimonials__reach-out' onClick={() => navigate('/contacts')}/>
            </div>
            <div className='landing-page-testimonials__socials-wrapper'>
              <h3 className='landing-page-testimonials__social-icons-title'>Follow Us:</h3>
              <div className='landing-page-testimonials__icons-wrapper'>
                <LandingPageSocialIcons link='https://www.facebook.com/search/top?q=kamp%20bj%20aquatics' icon='fa-facebook-f'/>
                <LandingPageSocialIcons link='https://www.tiktok.com/@kampbjaquatics?lang=en' icon='fa-tiktok'/>
                <LandingPageSocialIcons link='https://www.instagram.com/kamp.bj.3/?hl=am-et' icon='fa-instagram'/>
              </div>
            </div>
          </div>
          <div className='landing-page-testimonials__testimonial-img-wrapper'>
          {testimonialData.map((testimonials) =>(
              <LandingPageTestimonialCards  key={testimonials.id} image={testimonials.img} feedback={testimonials.feedback} name={testimonials.name} />
            ))}
            
          </div>
        </div>
    </LandingPageSectionComponent>
  )
}

export default LandingPageTestimonials
