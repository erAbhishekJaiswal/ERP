import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../CSSfolder/FacultyCSS/facultyprofile-edit.css";
import apiClient from "../../services/axios";

const FacultyProfileEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableDesignations, setAvailableDesignations] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await apiClient.get(
          `/api/faculty/${id}`
        );
        setFaculty(response.data.faculty);
        setFormData(response.data.faculty);
        // console.log(response.data.faculty);

        const deptResponse = await apiClient.get(
          "/api/features/getdepartmentname"
        );
        setAvailableDepartments(deptResponse.data);

        // Fetch available designations
      const designationResponse = await apiClient.get(
        "/api/features/getdesignationname"
      );
      setAvailableDesignations(designationResponse.data.designations);
      console.log(designationResponse.data.designations);

        // Fetch available subjects
        const subjectResponse = await apiClient.get(
          "/api/features/subjectcodenamelist"
        );
        setAvailableSubjects(subjectResponse.data.subjectNames);
        // console.log(subjectResponse.data.subjectNames);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch faculty data", error);
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [id]);

  //   useEffect(() => {
  //     const fetchInitialData = async () => {
  //       try {
  //         // Fetch faculty data
  //         const facultyResponse = await axios.get(`http://localhost:5000/api/faculty/${id}`);
  //         setFaculty(facultyResponse.data.faculty);
  //         setFormData(facultyResponse.data.faculty);

  //         // Fetch available departments
  //         const deptResponse = await axios.get('http://localhost:5000/api/departments');
  //         setAvailableDepartments(deptResponse.data);

  //         // Fetch available subjects
  //         const subjectResponse = await axios.get('http://localhost:5000/api/subjects');
  //         setAvailableSubjects(subjectResponse.data);

  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Failed to fetch initial data", error);
  //         setLoading(false);
  //       }
  //     };
  //     fetchInitialData();
  //   }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personal_details: {
        ...prev.personal_details,
        [name]: value,
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personal_details: {
        ...prev.personal_details,
        address: {
          ...prev.personal_details.address,
          [name]: value,
        },
      },
    }));
  };

  const handleEmploymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        [name]: value,
      },
    }));
  };

  const handleQualificationChange = (index, value) => {
    const updatedQualifications = [...formData.employment.qualifications];
    updatedQualifications[index] = value;
    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        qualifications: updatedQualifications,
      },
    }));
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        qualifications: [...prev.employment.qualifications, ""],
      },
    }));
  };

  const removeQualification = (index) => {
    const updatedQualifications = formData.employment.qualifications.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        qualifications: updatedQualifications,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare data for backend
      const dataToSend = {
        ...formData,
        departments: formData?.departments?.map((dept) => ({
          id: dept.id || dept._id, // Send only the ID if backend expects ObjectId references
        })),
        subjects: formData?.subjects?.map((subj) => ({
          _id: subj.id || subj._id, // Similarly for subjects
        })),
        designation: formData.designation 
        ? { id: formData.designation.id || formData.designation._id }
        : undefined,
        publications: formData.publications?.map((pub) => ({
          ...pub,
          date: pub.date ? new Date(pub.date).toISOString() : null,
        })),
      };
      console.log("Data to send:", dataToSend);

      const response = await apiClient.put(
        `/api/faculty/update/${id}`,
        { updateData: dataToSend }
      );
      setFaculty(response.data.faculty);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
      setErrorMessage("Failed to update profile. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading faculty data...</p>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="edit-profile-error">Failed to load faculty data</div>
    );
  }

  return (
    <div className="faculty-edit-container">
      <div className="edit-header">
        <h1>Edit Faculty Profile</h1>
        <div className="header-actions">
          <button
            onClick={() => {
              navigate(
                `/${
                  role === "Registrar" ? "admin" : role
                }/faculty-profile/${id}`
              );
            }}
            className="btn preview-btn"
          >
            Preview Profile
          </button>
          <button
            className="btn save-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {successMessage && <div className="alert success">{successMessage}</div>}
      {errorMessage && <div className="alert error">{errorMessage}</div>}

      <div className="edit-navigation">
        <button
          className={`nav-btn ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          <i className="icon user"></i> Personal
        </button>
        <button
          className={`nav-btn ${activeTab === "professional" ? "active" : ""}`}
          onClick={() => setActiveTab("professional")}
        >
          <i className="icon briefcase"></i> Professional
        </button>
        <button
          className={`nav-btn ${activeTab === "departments" ? "active" : ""}`}
          onClick={() => setActiveTab("departments")}
        >
          <i className="icon university"></i> Departments
        </button>
        <button
          className={`nav-btn ${activeTab === "subjects" ? "active" : ""}`}
          onClick={() => setActiveTab("subjects")}
        >
          <i className="icon book"></i> Subjects
        </button>
        <button
          className={`nav-btn ${activeTab === "research" ? "active" : ""}`}
          onClick={() => setActiveTab("research")}
        >
          <i className="icon flask"></i> Research
        </button>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        {activeTab === "personal" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <p>Update your personal details and contact information</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.personal_details?.first_name || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.personal_details?.last_name || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={
                    formData.personal_details?.date_of_birth?.split("T")[0] ||
                    ""
                  }
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.personal_details?.gender || ""}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.personal_details?.email || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.personal_details?.mobile || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group full-width">
                <label>Profile Picture URL</label>
                <input
                  type="url"
                  name="profile_picture_url"
                  value={formData.employment?.profile_picture_url || ""}
                  onChange={handleEmploymentChange}
                  className="form-input"
                />
              </div>

              <div className="address-section full-width">
                <h3>Address</h3>
                <div className="address-grid">
                  <div className="form-group">
                    <label>Street</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.personal_details?.address?.street || ""}
                      onChange={handleAddressChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.personal_details?.address?.city || ""}
                      onChange={handleAddressChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.personal_details?.address?.state || ""}
                      onChange={handleAddressChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={
                        formData.personal_details?.address?.postal_code || ""
                      }
                      onChange={handleAddressChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.personal_details?.address?.country || ""}
                      onChange={handleAddressChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "professional" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Professional Information</h2>
              <p>Update your employment details and qualifications</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  name="joining_date"
                  value={formData.employment?.joining_date?.split("T")[0] || ""}
                  onChange={handleEmploymentChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Employment Status</label>
                <select
                  name="is_active"
                  value={formData.employment?.is_active || ""}
                  onChange={(e) =>
                    handleEmploymentChange({
                      target: {
                        name: "is_active",
                        value: e.target.value === "true",
                      },
                    })
                  }
                  className="form-input"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.employment?.bio || ""}
                  onChange={handleEmploymentChange}
                  className="form-input"
                  rows="4"
                />
              </div>

              <div className="qualifications-section full-width">
                <div className="section-title">
                  <h3>Qualifications</h3>
                  <button
                    type="button"
                    className="qualification-btn add-btn"
                    onClick={addQualification}
                  >
                    <i className="icon plus"></i> Add
                  </button>
                </div>

                {formData.employment?.qualifications?.map((qual, index) => (
                  <div key={index} className="qualification-item">
                    <input
                      type="text"
                      value={qual}
                      onChange={(e) =>
                        handleQualificationChange(index, e.target.value)
                      }
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="removequalificationbtn remove-btn"
                      onClick={() => removeQualification(index)}
                    >
                      <i className="icon trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select
                name="designation"
                value={
                  formData.designation?._id || formData.designation?.id || ""
                }
                onChange={(e) => {
                  const selectedDesignation = availableDesignations.find(
                    (d) => d._id === e.target.value || d.id === e.target.value
                  );
                  if (selectedDesignation) {
                    setFormData((prev) => ({
                      ...prev,
                      designation: {
                        _id: selectedDesignation._id,
                        id: selectedDesignation.id,
                        name: selectedDesignation.name,
                      },
                    }));
                  }
                }}
                className="form-input"
              >
                <option value="">Select Designation</option>
                {availableDesignations.map((designation) => (
                  <option
                    key={designation._id || designation.id}
                    value={designation._id || designation.id}
                  >
                    {designation?.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === "departments" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Department Information</h2>
              <p>Manage your department affiliations</p>
            </div>

            <div className="departments-edit">
              {formData.departments?.map((dept, index) => (
                <div
                  key={dept.id || dept._id || index}
                  className="department-card"
                >
                  <div className="department-header">
                    <div className="form-group">
                      <label>Department</label>
                      <select
                        value={dept.id || dept._id || ""}
                        onChange={(e) => {
                          const selectedDept = availableDepartments.find(
                            (d) =>
                              d.id === e.target.value ||
                              d._id === e.target.value
                          );
                          if (selectedDept) {
                            const updatedDepartments = [
                              ...formData.departments,
                            ];
                            updatedDepartments[index] = {
                              id: selectedDept.id || selectedDept._id,
                              name: selectedDept.name,
                              // Preserve any existing additional fields
                              ...(dept._id && { _id: dept._id }),
                            };
                            setFormData((prev) => ({
                              ...prev,
                              departments: updatedDepartments,
                            }));
                          }
                        }}
                        className="form-input"
                      >
                        <option value="">Select Department</option>
                        {availableDepartments.map((dept) => (
                          <option
                            key={dept.id || dept._id}
                            value={dept.id || dept._id}
                          >
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="department-btn remove-btn"
                      onClick={() => {
                        const updatedDepartments = formData.departments.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          departments: updatedDepartments,
                        }));
                      }}
                    >
                      <i className="icon trash"></i> Remove
                    </button>
                  </div>

                  {(dept.id || dept._id) && (
                    <>
                      <div className="form-group">
                        <label>Department Name</label>
                        <input
                          type="text"
                          value={dept.name || ""}
                          className="form-input"
                          readOnly
                        />
                      </div>
                      {/* Hidden field to preserve _id if it exists */}
                      {dept._id && (
                        <input
                          type="hidden"
                          name={`departments[${index}]._id`}
                          value={dept._id}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-department-btn"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    departments: [
                      ...prev.departments,
                      {
                        id: "",
                        name: "",
                      },
                    ],
                  }));
                }}
              >
                <i className="icon plus"></i> Add Department
              </button>
            </div>
          </div>
        )}

        {activeTab === "subjects" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Teaching Subjects</h2>
              <p>Manage the subjects you teach</p>
            </div>

            <div className="subjects-edit">
              {formData.subjects?.map((subject, index) => (
                <div key={subject._id || index} className="subject-card">
                  <div className="subject-header">
                    <div className="form-group">
                      <label>Subject</label>
                      <select
                        value={subject._id || ""}
                        onChange={(e) => {
                          const selectedSubject = availableSubjects.find(
                            (s) => s._id === e.target.value
                          );
                          const updatedSubjects = [...formData.subjects];
                          updatedSubjects[index] = {
                            ...selectedSubject,
                            _id: selectedSubject._id,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            subjects: updatedSubjects,
                          }));
                        }}
                        className="form-input"
                      >
                        <option value="">Select Subject</option>
                        {availableSubjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.code} - {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="subject-remove-btn remove-btn"
                      onClick={() => {
                        const updatedSubjects = formData.subjects.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          subjects: updatedSubjects,
                        }));
                      }}
                    >
                      <i className="icon trash"></i> Remove
                    </button>
                  </div>

                  {subject._id && (
                    <>
                      <div className="form-group">
                        <label>Subject Code</label>
                        <input
                          type="text"
                          value={subject.code}
                          onChange={(e) => {
                            const updatedSubjects = [...formData.subjects];
                            updatedSubjects[index].code = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              subjects: updatedSubjects,
                            }));
                          }}
                          className="form-input"
                          readOnly // Since code comes from selection
                        />
                      </div>

                      <div className="form-group">
                        <label>Subject Name</label>
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => {
                            const updatedSubjects = [...formData.subjects];
                            updatedSubjects[index].name = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              subjects: updatedSubjects,
                            }));
                          }}
                          className="form-input"
                          readOnly // Since name comes from selection
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-subject-btn"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    subjects: [
                      ...prev.subjects,
                      {
                        _id: "",
                        code: "",
                        name: "",
                      },
                    ],
                  }));
                }}
              >
                <i className="icon plus"></i> Add Subject
              </button>
            </div>
          </div>
        )}

        {activeTab === "research" && (
          <div className="form-section">
            <div className="section-header">
              <h2>Research Information</h2>
              <p>Update your research interests and publications</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Research Interests (comma separated)</label>
                <textarea
                  value={formData.research_interests?.join(", ")}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      research_interests: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    }));
                  }}
                  className="form-input"
                  rows="3"
                />
              </div>

              <div className="publications-edit full-width">
                <div className="section-title">
                  <h3>Publications</h3>
                  <button
                    type="button"
                    className="publication-add-btn add-btn"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        publications: [
                          ...(prev.publications || []),
                          {
                            title: "",
                            journal: "",
                            date: "",
                            link: "",
                          },
                        ],
                      }));
                    }}
                  >
                    <i className="icon plus"></i> Add Publication
                  </button>
                </div>

                {formData.publications?.map((pub, index) => (
                  <div key={index} className="publication-card">
                    <div className="publication-header">
                      <h4>Publication {index + 1}</h4>
                      <button
                        type="button"
                        className="publication-remove-btn remove-btn"
                        onClick={() => {
                          const updatedPublications =
                            formData.publications.filter((_, i) => i !== index);
                          setFormData((prev) => ({
                            ...prev,
                            publications: updatedPublications,
                          }));
                        }}
                      >
                        <i className="icon trash"></i> Remove
                      </button>
                    </div>

                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={pub.title || ""}
                        onChange={(e) => {
                          const updatedPublications = [
                            ...formData.publications,
                          ];
                          updatedPublications[index] = {
                            ...updatedPublications[index],
                            title: e.target.value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            publications: updatedPublications,
                          }));
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Journal/Conference</label>
                      <input
                        type="text"
                        value={pub.journal || ""}
                        onChange={(e) => {
                          const updatedPublications = [
                            ...formData.publications,
                          ];
                          updatedPublications[index] = {
                            ...updatedPublications[index],
                            journal: e.target.value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            publications: updatedPublications,
                          }));
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Publication Date</label>
                      <input
                        type="date"
                        value={pub.date?.split("T")[0] || ""}
                        onChange={(e) => {
                          const updatedPublications = [
                            ...formData.publications,
                          ];
                          updatedPublications[index] = {
                            ...updatedPublications[index],
                            date: e.target.value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            publications: updatedPublications,
                          }));
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Link</label>
                      <input
                        type="url"
                        value={pub.link || ""}
                        onChange={(e) => {
                          const updatedPublications = [
                            ...formData.publications,
                          ];
                          updatedPublications[index] = {
                            ...updatedPublications[index],
                            link: e.target.value,
                          };
                          setFormData((prev) => ({
                            ...prev,
                            publications: updatedPublications,
                          }));
                        }}
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FacultyProfileEdit;
