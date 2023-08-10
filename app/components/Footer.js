import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  return (
    <div className='pageFooter'>
        <div className='SocialMedia'> 
        <InstagramIcon />
        <TwitterIcon />
        <FacebookIcon />
        </div>
        <p> &copy; 2023 BestRecipes.com </p>
    </div>
  )
}

export default Footer