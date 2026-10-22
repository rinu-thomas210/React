
function EmployeeCard({ employee, onViewProfile }) {
  const {
    name,
    role,
    department,
    location,
    initials,
    color,
  } = employee;

  return (
    <article className="employee-card">
      <div className="card-top">
        <div
          className="avatar"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>

        <span className="active-badge">
          <span className="online-dot"></span>
          Active
        </span>
      </div>

      <h3>{name}</h3>
      <p className="employee-role">{role}</p>

      <div className="employee-details">
        <span className="department-tag">{department}</span>
        <span className="location">⌖ {location}</span>
      </div>

      <button
        className="profile-button"
        onClick={() => onViewProfile(employee)}
      >
        View Profile <span>→</span>
      </button>
    </article>
  );
}

export default EmployeeCard;
