
import './App.css';
import grocery from "./images/grocery.png";
import mobile from "./images/mobile.png";
import fashion from "./images/fashion.png";
import elec from "./images/elec.png";
import fur from "./images/fur.png";
import mach from "./images/mach.png";
import tyre from "./images/tyre.png";
import bike from "./images/bike.png";
import camera from "./images/camera.png";
import logo from "./images/logo.png";
import { Link } from 'react-router-dom';



import trimmer from "./images/trimmer.png";
import power from "./images/power.png";
import printer from "./images/printer.png";

import cycle from "./images/cycle.png";
import stationary from "./images/stationary.png";
import helmet from "./images/helmet.png";
import micro from "./images/micro.png";
import fairy from "./images/fairy.png";
import rideons from "./images/rideons.png";
import ai from "./images/ai.png";
import search from "./images/search.png";

function FlipkartIndex() {
  return (
    <div className="App">
        <nav>
          <ul className='listing'>
            <div className="one">
            <li> <div className="logo "><img className='logo' src={logo} alt="elec" />
</div></li>
            <img className='search' src={search} alt="elec" />

            <li> <input type="text " className='inp' placeholder='Search for Brands,Products and more' /></li>
            </div>
            
            <div className="two">
            <li>   <div className="seller t1">Become a seller</div></li>
            <li>   <div className="seller t1">  SignIn</div></li>

            <li><div className="cart t1">Cart</div></li>
           
             <li><div className="cart t1 ">
              <Link className='aba' to="/Chat"> UseAi</Link>
             </div></li>
            <img className='ai' src={ai} alt="elec" />

          
            </div>
            
          </ul>
        
        </nav>
        <div className="cont">
          <div className="box1">
          <img className='img' src={grocery} alt="Grocery" />
          <p className='mainp'>  Grocery</p>
           
            </div>
          <div className="box1">
          <img className='img' src={mobile} alt="mobile" />
          <p className='mainp'>Mobile</p>
          </div>
          <div className="box1">
          <img className='img fashion' src={fashion} alt="fashion" />
            <p className='mainp'>Fashion</p></div>
          <div className="box1">
          <img className='img' src={elec} alt="elec" />
          <p className='mainp'>Electronics</p>
          </div>
          <div className="box1">
          <img className='img' src={fur} alt="elec" />
          <p className='mainp'> Home and furniture</p>
           </div>
          <div className="box1">
          <img className='img mach' src={mach} alt="elec" />
           <p className='mainp'> Appliances</p></div>
          <div className="box1">
          <img className='img' src={tyre} alt="elec" />
           <p className='mainp'> Tyre</p></div>
          <div className="box1">
          <img className='img' src={bike} alt="elec" />
            <p className='mainp'>Two wheelers</p></div>
    

        </div>
        <div className="contbox">
          <div className="abc"><p className='parag'>Best of electronics</p></div>
          <div className="abcd">
          <div className="box2">
          <img className='img1' src={camera} alt="elec" />
            <p className='p2'>Top Mirrorless Camera</p>
            <p className='p1'>Shop Now</p>
          </div>
          <div className="box2">
          <img className='img1' src={trimmer} alt="elec" />
          <p className='p2'>Best of trimmers</p>
          <p className='p1'>From Rs 599</p>
          </div>
          <div className="box2">
          <img className='img1' src={power} alt="elec" /> 
          <p className='p2'>Premium power banks</p>
          <p className='p1'>Shop now!</p>
            </div>
          <div className="box2">
          <img className='img1' src={printer} alt="elec" /> 
          <p className='p2'>Printers</p>
          <p className='p1'>From Rs 5999</p>
          </div>
          <div className="box2">
          <img className='img1' src={mobile} alt="elec" /> 
          <p className='p2'>Mobile</p>
          <p className='p1'>Big deal!</p>
          </div>
          </div>
          
        
          
        </div>

        <div className="lower">
        <p>Beauty, food,toys and more</p>
        <div className="box3">
        <img className='img1' src={cycle} alt="elec" /> 
          Grocery</div>
          <div className="box3">
          <img className='img1' src={stationary} alt="elec" /> 
            Mobile</div>
          <div className="box3">
          <img className='img1' src={helmet} alt="elec" /> 
            Fashion</div>
          <div className="box3">
          <img className='img1' src={micro} alt="elec" /> 
            Electronics</div>
          <div className="box3">
          <img className='img1' src={fairy} alt="elec" /> 
            Home and furniture</div>
          <div className="box3">
          <img className='img1' src={rideons} alt="elec" /> 
            Appliances</div>
        </div>
        

    </div>
  );
}

export default FlipkartIndex;
