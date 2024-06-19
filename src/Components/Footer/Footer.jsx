import './Footer.css'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-left'>
                <div>
                    <h2>Flixster</h2>
                    <p className='footer-text'>Copyright © 2024 <a href='https://github.com/M-a-b-e-l/'>Mabel I.M.</a></p>
                </div>
            </div>
            
            <div className='footer-right'>
                <div className='gif-container'>
                    <iframe src="https://giphy.com/embed/TkY47nTD8pai63serT" width="480" height="269" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/salesforce-TkY47nTD8pai63serT"></a></p> 
                </div>
            </div>
            

        </div>
    )
    }

export default Footer
