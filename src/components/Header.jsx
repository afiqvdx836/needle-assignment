import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="header-area">
        <div className="header-top_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="short_contact_list">
                  <ul>
                    <li><a href="#">+880 4664 216</a></li>
                    <li><a href="#">Mon - Sat 10:00 - 7:00</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-4">
                <div className="social_media_links">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-pinterest-p"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
