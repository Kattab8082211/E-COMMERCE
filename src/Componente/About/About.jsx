import React from 'react'

export default function About() {
  return (
    <>
        <div className="  bg-green-home d-flex justify-content-center align-items-center  pt-3 " >
          <div className="text-cente container">
          <div className="pt-5 mb-4">
            <h2 className="text-center text-uppercase fs-1 fw-bolder">about component</h2>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <div className="line-home mr-home"></div>
              <i className="fa-solid fa-star fa-lg" style={{color: '#ffffff'}} />
              <div className="line-home ml-home"></div>
            </div>
          </div>
          <div className=' row ps-5 pe-5'>
            <div className='col-12 col-md-6 ps-5 '>
              <p>
              Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.
              </p>
            </div>
            <div className='col-12 col-md-6 pe-5'>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</div>
          </div>
          </div>
        </div>
    </>
  )
}
