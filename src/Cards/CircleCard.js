import React, {useState} from 'react';
import './CircleCard.css';
import {CSSTransition} from 'react-transition-group';
import SettingsItem from './SettingsItem.js';


function CircleCard() {

    const [showCard, setShowCard] = useState(true);



    return(
        <div>


            <CSSTransition
                in={showCard}
                timeout={300}
                classNames="CircleCard"
                unmountOnExit
              >

                <div className="CircleCard" style={{color:"white", textAlign:"center"}}>
                    
                    
                    <div className="CardTitle">Circle 1</div>

                    <div className="SubTitle" style={{top: "127px"}}>Boundary</div>
                    <div className="SubTitle" style={{top: "190px"}}>Inside</div>
                    <div className="SubTitle" style={{top: "250px"}}>Outside</div>

                    <div className="PotentialSettings" style={{top: "60px"}}> 
                        {
                            ["Centre X", "Centre Y"].map( (x, i) => <SettingsItem title={x} inputType="text" key={i}/>)
                        }
                    </div>

                    <div className="PotentialSettings" style={{top: "88px"}}> 
                        
                        <SettingsItem title={"Radius"} inputType="text"/>
                        
                    </div>


                    <div className="PotentialSettings" style={{top: "155px"}}> 
                        <SettingsItem title="Fix Values" inputType="checkbox" />
                        <SettingsItem title="Potential" inputType="text" />
                    </div>

                    <div className="PotentialSettings" style={{top: "220px"}}> 
                        <SettingsItem title="Fix Values" inputType="checkbox" />
                        <SettingsItem title="Potential" inputType="text" />
                    </div>

                    <div className="PotentialSettings" style={{top: "284px"}}> 
                        <SettingsItem title="Fix Values" inputType="checkbox" />
                        <SettingsItem title="Potential" inputType="text" />
                    </div>



                  </div>

            </CSSTransition>





                <button onClick={() => showCard ? setShowCard(false) : setShowCard(true)} style={{position:"absolute", top:"200px", left:"500px"}}>
                    Hit me
                </button>
            
        </div>


    )



}
export default CircleCard;