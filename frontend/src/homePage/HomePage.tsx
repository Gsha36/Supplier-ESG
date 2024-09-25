import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to /login using react-router-dom
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="w-full bg-gray-800 p-4">
        <div className="flex justify-between items-center container mx-auto">
          <h1 className="text-white text-lg font-bold">
            Carbon Crunch ESG-Suite
          </h1>
          <Button onClick={handleLoginClick} variant="outline">
            Login
          </Button>
        </div>
      </nav>

      {/* Main Content Section */}
      <main className="container mx-auto my-10 p-4">
        <h2 className="text-3xl font-bold text-center">
          Welcome to Carbon Crunch ESG-Suite
        </h2>

        {/* Middle Section */}
        <div className="my-10">
          <section id="overview" className="my-8">
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <p>
              Carbon Crunch ESG-Suite is a powerful platform designed to help
              businesses monitor, report, and reduce their carbon footprint. We
              provide tools to simplify the sustainability journey.
            </p>
          </section>

          <section id="use-cases" className="my-8">
            <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
            <p>
              Our platform is ideal for companies aiming to manage their
              greenhouse gas emissions, comply with regulations, and improve
              their ESG (Environmental, Social, and Governance) scores.
            </p>
          </section>

          <section id="key-features" className="my-8">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="list-disc list-inside">
              <li>GHG Reporting</li>
              <li>Carbon Market Participation</li>
              <li>Comprehensive BRSR Reporting</li>
              <li>Emissions Reduction Insights</li>
              <li>Data-driven decision-making</li>
            </ul>
          </section>

          <section id="case-studies" className="my-8">
            <h3 className="text-xl font-semibold mb-4">Case Studies</h3>
            <p>
              Explore how companies have successfully used our platform to
              optimize their sustainability efforts and comply with carbon
              regulations.
            </p>
          </section>

          <section id="next-steps" className="my-8">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <p>
              Join us in our journey to build a sustainable future. Learn more
              about how Carbon Crunch ESG-Suite can transform your business.
            </p>
            <Button onClick={() => navigate("/contact")} variant="default">
              Get Started
            </Button>
          </section>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 p-6 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} Carbon Crunch ESG-Suite. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
