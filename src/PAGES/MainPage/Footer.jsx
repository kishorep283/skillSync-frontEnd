const Footer = () => {
    return (
      <footer style={{ backgroundColor: "#F5F5F5", color: "black", padding: "30px 0", marginTop: "5%" }}>
        <div className="container text-center">
          <div className="row">
            {/* Logo & Description */}
            <div className="col-md-4">
              <h3>SkillSync</h3>
              <p>Empowering learners with 1-on-1 mentorship.</p>
            </div>
  
            {/* Quick Links */}
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><a href="/mentor/browse" style={{ color: "black", textDecoration: "none" }}>Find a Mentor</a></li>
                <li><a href="/about" style={{ color: "black", textDecoration: "none" }}>About Us</a></li>
                <li><a href="/contact" style={{ color: "black", textDecoration: "none" }}>Contact</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <div>
                <i className="bi bi-facebook mx-2"></i>
                <i className="bi bi-twitter mx-2"></i>
                <i className="bi bi-instagram mx-2"></i>
                <i className="bi bi-linkedin mx-2"></i>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-4">
            <p>&copy; {new Date().getFullYear()} SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  