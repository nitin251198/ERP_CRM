// HomePage.tsx
import React from 'react';
import Navbar from '../components/NavBar';
import Dashboard from './Dashboard'; // Assuming you have a TaskList component

const HomePage: React.FC = () => {
  return (
    <div className='w-full'>
      <Navbar />
      {
        localStorage.getItem("authToken")?

      
      <div className="w-full">
        {/* Other content */}
        <Dashboard />
      </div>:
     <div className="flex flex-col items-center justify-center min-h-screen text-center">
     <img src="/path/to/illustration.png" alt="Illustration" className="mb-8 w-1/2 max-w-md" />
     <div>
       <h1 className="m-10 text-3xl">Please Login to get your Data!</h1>
     </div>
   </div>
   
}
    </div>
    
  );
};

export default HomePage;
