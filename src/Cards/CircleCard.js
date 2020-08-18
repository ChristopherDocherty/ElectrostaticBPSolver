import React, {useState} from 'react';
import './CircleCard.css';
import {CSSTransition} from 'react-transition-group';
import SettingsItem from './SettingsItem.js';


function CircleCard() {

    const [showCard, setShowCard] = useState(true);



    return(
            <CSSTransition
                in={showCard}
                timeout={300}
                classNames="CircleCard"
                unmountOnExit
              >

                <div className="CircleCard">
                    
                    
                    <div className="CardTitle">Circle 1</div>

                    <div className="SubTitle" style={{top: "12.4vh"}}>Boundary</div>
                    <div className="SubTitle" style={{top: "18.5vh"}}>Inside</div>
                    <div className="SubTitle" style={{top: "24.5vh"}}>Outside</div>

                    <div className="PotentialSettings" style={{top: "5.85vh"}}> 
                        {
                            ["Centre X", "Centre Y"].map( (x, i) => <SettingsItem title={x} inputType="text" key={i}/>)
                        }
                    </div>

                    <div className="PotentialSettings" style={{top: "8.6vh"}}> 
                        
                        <SettingsItem title={"Radius"} inputType="text"/>
                        
                    </div>


                    <div className="PotentialSettings" style={{top: "15.1vh"}}> 
                        <SettingsItem title="Fix Values" inputType="checkbox" />
                        <SettingsItem title="Potential" inputType="text" />
                    </div>

                    <div className="PotentialSettings" style={{top: "21.5vh"}}> 
                        <SettingsItem title="Fix Values" inputType="checkbox" />
                        <SettingsItem title="Potential" inputType="text" />
                    </div>

                    <div className="PotentialSettings" style={{top: "27.7vh"}}> 
                        <SettingsItem title="Fix Values" inputType="checkbox" />
                        <SettingsItem title="Potential" inputType="text" />
                    </div>



                  </div>

            </CSSTransition>
    )



}
export default CircleCard;