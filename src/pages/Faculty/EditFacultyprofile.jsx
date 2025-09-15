import React from 'react';
import { useParams } from 'react-router-dom';
import '../../CSSfolder/CommonCSS/allfile.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import apiClient from '../../services/axios';

const EditFacultyprofile = () => {

    const [fname, setfName] = useState('');
    const [midname, setMidname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [father, setFather] = useState('');
    const [fatheroccupation, setFatheroccupation] = useState('');
    const [cast, setCast] = useState('');
    const [mother, setMother] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [abcid, setAbcid] = useState('');
    const [pan, setPan] = useState('');
    const [session, setSession] = useState('');
    const [admission, setAdmission] = useState('');
    const [rollno, setRollno] = useState('');
    const [studenttype, setStudenttype] = useState('');
    const [course, setCourse] = useState('');
    const [medium, setMedium] = useState('');
    const [studentid, setStudentid] = useState('');
    const [admissionstatus, setAdmissionstatus] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [permanentaddress, setpermanentaddress] = useState('');
    const [houseno, setHouseno] = useState('');
    const [pincode, setPincode] = useState('');
    const [department, setDepartment] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(`/api/faculty/exactfaculty/${id}`);
                setData(response.data);
                console.log(response.data);
                setfName(data.username);
                setMidname(data.midname);
                setLastname(data.lastname);
                setGender(data.gender);
                setMobile(data.mobile);
                setEmail(data.email);
                setDob(data.dob);
                setFather(data.father);
                setFatheroccupation(data.lastPaidSalary);
                setCast(data.cast);
                setMother(data.mother);
                setNationality(data.nationality);
                setReligion(data.religion);
                setAadhar(data.aadhar);
                setAbcid(data.abcid);
                setPan(data.pan);
                setSession(data.session);
                setAdmission(data.admission);
                setRollno(data.rank);
                setStudenttype(data.designation);
                setCourse(data.course);
                setMedium(data.medium);
                setStudentid(data.status);
                setAdmissionstatus(data.admissionstatus);
                setCountry(data.country);
                setState(data.state);
                setDistrict(data.district);
                setCity(data.city);
                setpermanentaddress(data.permanentaddress);
                setPincode(data.pincode);
                setHouseno(data.houseno);
                setDepartment(data.department);
                // console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    return (
        <div className='allcontainer'>
            <h1>Edit Profile {data.username}</h1>
            {/* <div className="facultyprofileeditbox">
            <div className="facultyprofileedit1">
                <label htmlFor="fname">Name:</label>
                <input type="text" id="name" value={data.username} />
                <label htmlFor="lname">Last Name:</label>
                <input type="text" id="lname" value={data.lastname} />
            </div>
            <div className="facultyprofileedit1">
                <label htmlFor="mname">Middle Name:</label>
                <input type="text" id="mname" value={data.middlename} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={data.email} />
            <p>Name:{data.username}</p>
            </div>
        </div> */}
            <div className="alldetail">
                <div className="firstdetailbox">
                    <div className="il">
                        <label htmlFor="First Name">
                            First Name
                        </label>
                        <input type="text" className='inputboxpro' value={fname} onChange={(e) => setfName(e.target.value)} required />
                    </div>
                    <div className="il">
                        <label htmlFor="Last Name">
                            Last Name
                        </label>
                        <input type="text" className='inputboxpro' value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    </div>
                    <div className="il">
                        <label htmlFor="Mobile No">
                            Mobile No
                        </label>
                        <input type="text" className='inputboxpro' value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    </div>
                    <div className="il">
                        <label htmlFor="Date of Birth">
                            Date of Birth
                        </label>
                        <input type="date" className='inputboxpro' value={dob} onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Father Occupation">
                        LastPaidSalary
                        </label>
                        <input type="text" className='inputboxpro' value={fatheroccupation} onChange={(e) => setFatheroccupation(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Mother Name">
                            Mother Name
                        </label>
                        <input type="text" className='inputboxpro' value={mother} onChange={(e) => setMother(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Religion">
                            Religion
                        </label>
                        <input type="text" className='inputboxpro' value={religion} onChange={(e) => setReligion(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="ABC No">
                            Academic Bank Credit(ABC) No
                        </label>
                        <input type="text" className='inputboxpro' value={abcid} onChange={(e) => setAbcid(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Session">
                            Session
                        </label>
                        <input type="text" className='inputboxpro' value={session} onChange={(e) => setSession(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Student Type">
                        Designation
                        </label>
                        <input type="text" className='inputboxpro' value={studenttype} onChange={(e) => setStudenttype(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Course">
                            Course
                        </label>
                        <input type="text" className='inputboxpro' value={course} onChange={(e) => setCourse(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Student Id">
                            Status
                        </label>
                        <input type="text" className='inputboxpro' value={studentid} onChange={(e) => setStudentid(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Country">
                            Country
                        </label>
                        <input type="text" className='inputboxpro' value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="State">
                            State
                        </label>
                        <input type="text" className='inputboxpro' value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="District">
                            District
                        </label>
                        <input type="text" className='inputboxpro' value={district} onChange={(e) => setDistrict(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="City">
                            City
                        </label>
                        <input type="text" className='inputboxpro' value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                </div>

                <div className="seconddetilbox">
                    <div className="il">
                        <label htmlFor="Middle Name">
                            Middle Name
                        </label>
                        <input type="text" className='inputboxpro' value={midname} onChange={(e) => setMidname(e.target.value)} required />
                    </div>
                    <div className="il">
                        <label htmlFor="Gender">
                            Gender
                        </label>
                        <select name="gender" id="gender" className='inputboxpro' value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {/* <input type="text" className='inputboxpro' value={gender} onChange={(e) => setGender(e.target.value)} required /> */}
                    </div>
                    <div className="il">
                        <label htmlFor="Email">
                            Email
                        </label>
                        <input type="text" className='inputboxpro' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="il">
                        <label htmlFor="Father Name">
                            Father Name
                        </label>
                        <input type="text" className='inputboxpro' value={father} onChange={(e) => setFather(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Cast Category">
                            Cast Category
                        </label>
                        <select name="cast" id="castcategory" className='inputboxpro' value={cast} onChange={(e) => setCast(e.target.value)}>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                        </select>
                        {/* <input type="text" className='inputboxpro' value={cast} onChange={(e) => setCast(e.target.value)} /> */}
                    </div>
                    <div className="il">
                        <label htmlFor="Nationality">
                            Nationality
                        </label>
                        <input type="text" className='inputboxpro' value={nationality} onChange={(e) => setNationality(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Aadhar No">
                            Aadhar No
                        </label>
                        <input type="text" className='inputboxpro' value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Pan No">
                            Pan No
                        </label>
                        <input type="text" className='inputboxpro' value={pan} onChange={(e) => setPan(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Admission Date">
                            Admission Date
                        </label>
                        <input type="text" className='inputboxpro' value={admission} onChange={(e) => setAdmission(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Roll No">
                            Rank
                        </label>
                        <input type="text" className='inputboxpro' value={rollno} onChange={(e) => setRollno(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Medium">
                            Medium
                        </label>
                        <input type="text" className='inputboxpro' value={medium} onChange={(e) => setMedium(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Admission Status">
                            Admission Status
                        </label>
                        <input type="text" className='inputboxpro' value={admissionstatus} onChange={(e) => setAdmissionstatus(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Permanent Address">
                            Permanent Address
                        </label>
                        <input type="text" className='inputboxpro' value={permanentaddress} onChange={(e) => setpermanentaddress(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="House Number">
                            House Number
                        </label>
                        <input type="text" className='inputboxpro' value={houseno} onChange={(e) => setHouseno(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Pin Code">
                            Pin Code
                        </label>
                        <input type="text" className='inputboxpro' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                    </div>
                    <div className="il">
                        <label htmlFor="Pin Code">
                            Department:
                        </label>
                        <select name="department" id="sdepartment" className='inputboxpro' value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select Department</option>
                            <option value="CSE">Computer Science and Engineering</option>
                            <option value="ECE">Electronics and Communication Engineering</option>
                            <option value="EE">Electrical and Electronics Engineering</option>
                            <option value="ME">Mechanical Engineering</option>
                            <option value="CE">Civil Engineering</option>
                            <option value="IT">Information Technology</option>
                            <option value="Other">Other</option>
                        </select>
                        {/* <input type="text" className='inputboxpro' value={department} onChange={(e) => setDepartment(e.target.value)}/> */}
                    </div>
                </div>
            </div>
            <div className="butts">
                <button className='subtn' >
                    Update
                </button>
                <button className='canl'>
                    Cancel
                </button>
            </div>


        </div>
    )
}

export default EditFacultyprofile
