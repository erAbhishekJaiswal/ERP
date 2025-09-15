import React, { useEffect, useState } from "react";
import "../../CSSfolder/AdminCSS/allfacultylist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/axios";

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const facultyPerPage = 10;

  // Fetch faculty data from API
  const fetchFacultyData = async () => {
    try {
      const response = await apiClient.get(
        "/api/faculty/facultyslist"
      );
      setFacultyList(response.data || []);
      setFilteredFaculty(response.data || []);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch faculty list", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  // Apply filters whenever filters or search term changes
  useEffect(() => {
    const filtered = facultyList.filter((faculty) => {
      const { personal_details, employment, departments, designation } =
        faculty;
      const fullName =
        `${personal_details.first_name} ${personal_details.last_name}`.toLowerCase();

      // Search filter
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        personal_details.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        personal_details.mobile.includes(searchTerm);

      // Department filter
      const matchesDepartment =
        !departmentFilter ||
        (departments &&
          departments.some((dept) => dept.name === departmentFilter));

      // Status filter
      const matchesStatus =
        !statusFilter ||
        (employment.is_active ? "Inactive": "Active") === statusFilter;

      // Designation filter
      const matchesDesignation =
        !designationFilter || designation === designationFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesDesignation
      );
    });

    setFilteredFaculty(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchTerm,
    departmentFilter,
    statusFilter,
    designationFilter,
    facultyList,
  ]);

  // Get unique departments for filter dropdown
  const getUniqueDepartments = () => {
    const departments = new Set();
    facultyList.forEach((faculty) => {
      if (faculty.departments) {
        faculty.departments.forEach((dept) => {
          if (dept.name) departments.add(dept.name);
        });
      }
    });
    return Array.from(departments).sort();
  };

  // Get unique designations for filter dropdown
  const getUniqueDesignations = () => {
    const designations = new Set();
    facultyList.forEach((faculty) => {
      if (faculty.designation) designations.add(faculty.designation);
    });
    return Array.from(designations).sort();
  };

  // Get current faculty for pagination
  const indexOfLastFaculty = currentPage * facultyPerPage;
  const indexOfFirstFaculty = indexOfLastFaculty - facultyPerPage;
  const currentFaculty = filteredFaculty.slice(
    indexOfFirstFaculty,
    indexOfLastFaculty
  );
  const totalPages = Math.ceil(filteredFaculty.length / facultyPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleview = (id) => {
    if (role === "Dean" || role === "Director" || role === "Accountant") {
      navigate(`/${role}/faculty-profile/${id}`);
    } else if (role === "Registrar") {
      navigate(`/admin/faculty-profile/${id}`);
    }
  };

  const handledit = (id) => {
    if (role === "Dean" || role === "Director" || role === "Accountant") {
      navigate(`/${role}/faculty/edit/${id}`);
    } else if (role === "Registrar") {
      navigate(`/admin/faculty/edit/${id}`);
    }
  };

  return (
    <div className="faculty-list-container">
      <h1>Faculty Directory</h1>
      <div className="faculty-list-header">
        <div className="allfaculty-search-box">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {getUniqueDepartments().map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={designationFilter}
            onChange={(e) => setDesignationFilter(e.target.value)}
          >
            <option value="">All Designations</option>
            {getUniqueDesignations()?.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            className="reset-filters"
            onClick={() => {
              setSearchTerm("");
              setDepartmentFilter("");
              setStatusFilter("");
              setDesignationFilter("");
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="faculty-table-container">
        <table className="faculty-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Employment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="8" className="loading-cell">
                  <div className="faculty-loading">Loading faculty data...</div>
                </td>
              </tr>
            </tbody>
          ) : filteredFaculty?.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="8" className="no-results">
                  No faculty members found matching your criteria
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentFaculty &&
                currentFaculty?.map((faculty) => {
                  // const fullName = `${faculty?.personal_details?.first_name} ${faculty?.personal_details?.middle_name} ${faculty?.personal_details?.last_name}`;
                  // const { firstname, lastname, email, mobile } = faculty?.personal_details;
                  // const { is_active, profile_picture_url } = faculty?.employment;
                  // Extracting values
                  const firstName = faculty?.personal_details[0];
                  const lastName = faculty?.personal_details[1];
                  const email = faculty?.personal_details[2];
                  const mobile = faculty?.personal_details[3];

                  const isActive = faculty?.employment[0];
                  const profilePic = faculty?.employment[1];
                  const departments =
                    faculty?.departments?.map((dept) => dept.name).join(", ") ||
                    "Not assigned";

                  return (
                    <tr key={faculty?._id}>
                      <td>
                        <img
                          src={
                            profilePic ||
                            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_960_720.png"
                          }
                          // alt={`${first_name} ${last_name}`}
                          className="faculty-image"
                          // onError={(e) => {
                          //   e.target.onerror = null;
                          //   // e.target.src = 'https://via.placeholder.com/50';
                          // }}
                        />
                      </td>
                      <td>
                        {firstName} {lastName}
                      </td>
                      <td>
                        <a href={`mailto:${email}`}>{email}</a>
                      </td>
                      <td>
                        <a href={`tel:${mobile}`}>{mobile}</a>
                      </td>
                      <td>{departments}</td>
                      <td>{faculty?.designation || "Not specified"}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            isActive ? "active" : "inactive"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => handleview(faculty?._id)}
                        >
                          View
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => handledit(faculty?._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </div>

      {filteredFaculty?.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array?.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="ellipsis">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => paginate(totalPages)}
              className={currentPage === totalPages ? "active" : ""}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <div className="results-count">
        Showing {indexOfFirstFaculty + 1} to{" "}
        {Math.min(indexOfLastFaculty, filteredFaculty?.length)} of{" "}
        {filteredFaculty?.length} faculty members
      </div>
    </div>
  );
};

export default FacultyList;
