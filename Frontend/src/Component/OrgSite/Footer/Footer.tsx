import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="relative hidden lg:block bg-gray-200 dark:bg-gray-700 pt-8 pb-6 mt-auto min-w-full ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold text-gray-700 dark:text-gray-400">
                Let's keep in touch!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="btnLink"
                  type="button"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  className="btnLink"
                  type="button"
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button
                  className="btnLink"
                  type="button"
                >
                  <i className="fab fa-dribbble"></i>
                </button>
                <button
                  className="btnLink"
                  type="button"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="usefulL">Useful Links</span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="li-f">About Us</a>
                    </li>
                    <li>
                      <a className="li-f">Blog</a>
                    </li>
                    <li>
                      <a className="li-f">Github</a>
                    </li>
                    <li>
                      <a className="li-f">Free Products</a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="usefulL">Other Resources</span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="li-f">MIT License</a>
                    </li>
                    <li>
                      <a className="li-f">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a className="li-f">Privacy Policy</a>
                    </li>
                    <li>
                      <a className="li-f">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2021</span>
              </div>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              >
                {" "}
                Notus JS by
              </a>
              <a
                href="https://www.creative-tim.com?ref=njs-profile"
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                Creative Tim
              </a>
              .
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
