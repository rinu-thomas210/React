
import { useState } from "react";
import Header from "./Header";
import EmployeeCard from "./EmployeeCard";
import EmployeeStatus from "./EmployeeStatus";
import "./App.css";

function App() {
  const [profileViews, setProfileViews] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [search, setSearch] = useState("");

  const employees = [
    {
      id: 1,
      name: "Rinu Thomas K",
      role: "Python Developer",
      department: "Delivery",
      location: "Kayamkulam",
      initials: "RT",
      color: "#efedff",
    },
    {
      id: 2,
      name: "Ann Elizabeth k",
      role: "Data Scientist",
      department: "Sales",
      location: "Thrissur",
      initials: "AE",
      color: "#fce7f3",
    },
    {
      id: 3,
      name: "Indulekha Haridas",
      role: "Associate Full stack Developer",
      department: "Delivery",
      location: "kochi",
      initials: "IH",
      color: "#dcfce7",
    },
  ];

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.role} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleViewProfile(employee) {
    setSelectedEmployee(employee);
    setProfileViews((count) => count + 1);
  }

  return (
    <div className="dashboard">
      <Header />

      <main className="main-content">
        <section className="welcome">
          <div>
            <p className="eyebrow">TEAM MANAGEMENT</p>
            <h1>Employee Directory</h1>
            <p className="subtitle">
              Discover and connect with your team.
            </p>
          </div>

          <div className="profile-views">
            <div>
              <p>Profile Views</p>
              <h2>{profileViews}</h2>
            </div>

            <button
              className="view-button"
              onClick={() =>
                setProfileViews((count) => count + 1)
              }
            >
              + Increase View
            </button>
          </div>
        </section>

        <section className="employee-section">
          <div className="section-heading">
            <div>
              <h2>Our Employees</h2>
              <p className="section-subtitle">
                Get to know your team members.
              </p>
            </div>

            <span className="employee-count">
              {filteredEmployees.length} employees
            </span>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onViewProfile={handleViewProfile}
              />
            ))}

            {filteredEmployees.length === 0 && (
              <p className="empty-state">
                No employees found.
              </p>
            )}
          </div>
        </section>

        {selectedEmployee && (
          <section className="profile-details">
            <button
              className="close-button"
              onClick={() => setSelectedEmployee(null)}
              aria-label="Close profile"
            >
              ✕
            </button>

            <div
              className="avatar large-avatar"
              style={{ backgroundColor: selectedEmployee.color }}
            >
              {selectedEmployee.initials}
            </div>

            <p className="eyebrow">EMPLOYEE PROFILE</p>
            <h2>{selectedEmployee.name}</h2>
            <p className="employee-role">
              {selectedEmployee.role}
            </p>
            <p>
              <strong>Department:</strong>{" "}
              {selectedEmployee.department}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {selectedEmployee.location}
            </p>
          </section>
        )}

        <section className="bottom-grid">
          <div className="status-panel">
            <div>
              <h3>Your Availability</h3>
              <p>Update your current work status.</p>
            </div>

            <EmployeeStatus
              isAvailable={isAvailable}
              onToggleStatus={() =>
                setIsAvailable((previous) => !previous)
              }
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2026 PeopleHub
      </footer>
    </div>
  );
}

export default App;
