import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-5">Welcome, {user.name}!</h1>

      <div className="row justify-content-center mt-4">
        <div className="col-12 col-sm-6 col-md-4 mb-4">
          <div className="card bg-dark" style={{ height: '300px', background: 'linear-gradient(to bottom, #5E5FFF, #B6B6FF, #5E5FFF)' }}>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div>
                <p className="card-title">New Feature</p>
                <h3 className="card-text">Coming Soon</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-4">
          <div className="card bg-dark" style={{ height: '300px', background: 'linear-gradient(to bottom, #5E5FFF, #B6B6FF, #5E5FFF)' }}>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div>
                <p className="card-title">New Feature</p>
                <h3 className="card-text">Coming Soon</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-4">
          <div className="card bg-dark" style={{ height: '300px', background: 'linear-gradient(to bottom, #5E5FFF, #B6B6FF, #5E5FFF)' }}>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div>
                <p className="card-title">New Feature</p>
                <h3 className="card-text">Coming Soon</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
