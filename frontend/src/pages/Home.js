import "../assets/css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<header className="banner">
				<img className="image" src="images/banner.jpg" alt="Your wish" />
			</header>
			<div className="category-grid">
				<Link to="/product-listing/men" className="link">
					<div className="category">Men</div>
				</Link>
				<Link to="/product-listing/women" className="link">
					<div className="category">Women</div>
				</Link>
				<Link to="/product-listing/boys" className="link">
					<div className="category">Boys</div>
				</Link>
				<Link to="/product-listing/girls" className="link">
					<div className="category">Girls</div>
				</Link>
				<Link to="/product-listing/senior" className="link">
					<div className="category">Senior</div>
				</Link>
				<Link to="/product-listing/beginner" className="link">
					<div className="category">Beginner</div>
				</Link>
				<Link to="/product-listing/amateur" className="link">
					<div className="category">Amateur</div>
				</Link>
				<Link to="/product-listing/intermediate" className="link">
					<div className="category">Intermediate</div>
				</Link>
				<Link to="/product-listing/advanced" className="link">
					<div className="category">Advanced</div>
				</Link>
				<Link to="/product-listing/professional" className="link">
					<div className="category">Professional</div>
				</Link>
			</div>
			<button className="btn primary">
				<Link to="/product-listing" className="nav-links">
					View Products
				</Link>
			</button>
		</>
	);
};
export default Home;
