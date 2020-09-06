import React from 'react';
import './InfoModal.css';


 const InfoModal = (props) => {

    if (!props.displayModal){

        return null;


    }
        
    return( 
        <div className="ModalBackground">

            <div className="Modal">

                <div className="Welcome">
                    Welcome to Electrostatic Boundary Problem Solver!
                </div>

            <div className="Description">
                This is a webapp designed to solve any arbitrary 2D 
                Electrostatic Problem, just click on the plus sign to start 
                adding shapes! Once you've added your shapes, click on the relax button to have
                your system solved and it's heatmap will be shown on the grid.



            </div>
            <div className="Description2">
                This app uses Successive Over Relaxation (SOR) algorithm to solve 
                the system and Lagrange Interpolation to simulate an infinite grid - 
                a full technical explanation can be found on the <a href="https://github.com/ChristopherDocherty/ElectrostaticBPSolver" target="_blank">Github page</a> if you're interested!

                



            </div>

            <svg 
                    version="1.1" id="Layer_1" 
                    xmlns="http://www.w3.org/2000/svg"  
                    x="0px" 
                    y="0px"
                	viewBox="0 0 486.4 486.4" 
                    className="AtomIcon"
                    style={{enableBackground:"new 0 0 486.4 486.4"}}
                >
                    <g>
                    	<g>
                    		<path fill="currentcolor" d="M27.907,123.861c-4.671-2.382-10.395-0.525-12.778,4.149c-4.4,8.633-8.318,17.619-11.643,26.707
                    			c-1.804,4.927,0.729,10.383,5.656,12.186c1.077,0.394,2.18,0.581,3.264,0.581c3.875,0,7.514-2.389,8.923-6.238
                    			c3.064-8.373,6.674-16.653,10.728-24.607C34.439,131.964,32.582,126.243,27.907,123.861z"/>
                    	</g>
                    </g>
                    <g>
                    	<g>
                    		<g>
                    			<path fill="currentcolor" d="M322.419,243.2c0-43.682-35.538-79.22-79.219-79.22c-43.681,0-79.219,35.538-79.219,79.22s35.538,79.22,79.219,79.22
                    				S322.419,286.882,322.419,243.2z M182.981,243.2c0-33.206,27.014-60.22,60.219-60.22s60.219,27.014,60.219,60.22
                    				s-27.015,60.22-60.219,60.22C209.996,303.42,182.981,276.406,182.981,243.2z"/>
                    			<path fill="currentcolor" d="M415.169,71.232C369.234,25.297,308.161,0,243.2,0c-51.321,0-100.01,15.641-141.393,45.31
                    				c-6.924-5.656-15.759-9.056-25.376-9.056c-22.153,0-40.176,18.023-40.176,40.177c0,22.153,18.023,40.176,40.176,40.176
                    				c22.154,0,40.177-18.023,40.177-40.176c0-5.676-1.19-11.077-3.322-15.976C151.337,33.306,196.063,19,243.2,19
                    				c123.624,0,224.2,100.576,224.2,224.2S366.824,467.4,243.2,467.4S19,366.824,19,243.2c0-12.572,1.048-25.178,3.115-37.468
                    				c0.87-5.174-2.618-10.074-7.792-10.944c-5.178-0.873-10.075,2.619-10.944,7.792C1.136,215.909,0,229.575,0,243.2
                    				c0,64.961,25.297,126.034,71.231,171.968C117.166,461.103,178.239,486.4,243.2,486.4s126.034-25.297,171.969-71.232
                    				C461.103,369.234,486.4,308.161,486.4,243.2S461.103,117.166,415.169,71.232z M76.43,97.607c-11.676,0-21.176-9.5-21.176-21.176
                    				c0-11.676,9.5-21.177,21.176-21.177c11.677,0,21.177,9.5,21.177,21.177S88.108,97.607,76.43,97.607z"/>
                    			<path fill="currentcolor" d="M252.7,213.639c0-5.247-4.254-9.5-9.5-9.5c-21.538,0-39.061,17.523-39.061,39.061c0,5.247,4.254,9.5,9.5,9.5
                    				c5.246,0,9.5-4.253,9.5-9.5c0-11.062,8.999-20.061,20.061-20.061C248.446,223.139,252.7,218.886,252.7,213.639z"/>
                    		</g>
                    	</g>
                    </g>
                </svg>

            <div className="CloseModalBtn" onClick={() => props.toggleModalDisplay()}>
                <div>Get Started</div>
            </div>

            <div className="CloseModalCross" onClick={() => props.toggleModalDisplay()}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            </div>


            </div>




        </div>
    )
    
    
    


}


export default InfoModal;