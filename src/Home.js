import React from 'react';
import './Home.css';
import Product from './Product';
function Home() {
  return(
    <div className='home'>
        <div className='home__container'>
            <img 
                className='home__image'
                src='https://m.media-amazon.com/images/I/61NAdLjXLlL._SX3000_.jpg'/>
            <div className="home__row">
                <Product 
                id="1233244"
                title="The lean startup: How to Constant Innovation Creates Radically Successful Businesses Paperback"
                price ={24.99} 
                image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SX329_BO1,204,203,200_.jpg"
                rating={5}/>
                <Product 
                id="9785935"
                title="Furhaven,Orthopedic,
                Cooling Gel, and Memory Foam pet Beds"
                price ={39.99} 
                image="https://m.media-amazon.com/images/I/81cAMYRiMtL._AC_UY218.jpg"
                rating={5}/>
            </div>     
            <div className="home__row">
                <Product 
                id="5583649"
                title="Kenwood kMix stand Mixer fo Baking, 
                Stylish Kitchen Mixer with K-baeater, 
                Dough Hook and Whisk, 5 Litre Glass Bowl"
                price ={224.35} 
                image="https://m.media-amazon.com/images/I/71Bd8BPk6gL._AC_UY218.jpg"
                rating={4}/>
                <Product 
                id="3568247"
                title="Amazon Echo (3rd Generation)|Smart Speaker with Alexa, Charcoal Fabric"
                price ={98.99} 
                image="https://images-na.ssl-images-amazon.com/images/I/51EVETDOOeL._AC_UY218_.jpg"
                rating={5}/>
                <Product 
                id="9872346"
                title="New Apple iPad Pro(12.9-inch, Wi-Fi,128GB)-silver (4th Genertaion)"
                price ={644.99} 
                image="https://images-na.ssl-images-amazon.com/images/I/61DsXT1ldtL._AC_UY218.jpg"
                rating={4}/>
            </div>     
            <div className="home__row">
                <Product 
                id="9785935"
                title="SAMSUNG LC49RG90SSNXZA 49-inch Curved LED Gaming Monitor"
                price ={199.99} 
                image="https://images-na.ssl-images-amazon.com/images/I/71916r38cNL._AC_UY218.jpg"
                rating={5}/>
            </div>            
        </div>
    </div>
  )
}

export default Home;
