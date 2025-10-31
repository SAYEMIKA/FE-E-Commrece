import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat tenetur, distinctio eligendi harum blanditiis sequi natus architecto esse ex optio cupiditate repudiandae dolorem, ducimus sunt, facere nulla! Delectus, mollitia recusandae.</p>
            <p>
                E-commerce website typicall Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae sed? Quam aut exercitationem rem ullam dolorem assumenda veniam commodi dolorum. Soluta quia laudantium veritatis placeat temporibus incidunt, excepturi earum.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox