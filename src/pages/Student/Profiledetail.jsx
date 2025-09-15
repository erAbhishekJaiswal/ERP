import React, { useEffect, useState } from 'react';
import "../../CSSfolder/StudentCSS/profiledetail.css";
import "../../CSSfolder/StudentCSS/student.css"
import '../../CSSfolder/CommonCSS/allfile.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/axios';

const Profiledetail = () => {
    const theme = localStorage.getItem('theme');
    const navigate = useNavigate();
    // const id = localStorage.getItem('studentid');
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

    const { id } = useParams();
    console.log(id);


    useEffect(() => {
        getStudentdata();
    }, []);

    const getStudentdata = async () => {
        try {
            const studentdata = await apiClient.get(`/api/student/students/${id}`);
            // console.log(studentdata.data);
            setfName(studentdata.data.fname);
            setMidname(studentdata.data.midname);
            setLastname(studentdata.data.lastname);
            setGender(studentdata.data.gender);
            setMobile(studentdata.data.mobile);
            setEmail(studentdata.data.email);
            setDob(studentdata.data.dob);
            setFather(studentdata.data.father);
            setFatheroccupation(studentdata.data.fatheroccupation);
            setCast(studentdata.data.cast);
            setMother(studentdata.data.mother);
            setNationality(studentdata.data.nationality);
            setReligion(studentdata.data.religion);
            setAadhar(studentdata.data.aadhar);
            setAbcid(studentdata.data.abcid);
            setPan(studentdata.data.pan);
            setSession(studentdata.data.session);
            setAdmission(studentdata.data.admission);
            setRollno(studentdata.data.rollno);
            setStudenttype(studentdata.data.studenttype);
            setCourse(studentdata.data.course);
            setMedium(studentdata.data.medium);
            setStudentid(studentdata.data.studentid);
            setAdmissionstatus(studentdata.data.admissionstatus);
            setCountry(studentdata.data.country);
            setState(studentdata.data.state);
            setDistrict(studentdata.data.district);
            setCity(studentdata.data.city);
            setpermanentaddress(studentdata.data.permanentaddress);
            setPincode(studentdata.data.pincode);
            setHouseno(studentdata.data.houseno);
            setDepartment(studentdata.data.department);
        } catch (error) {
            console.log(error);
        }
    }


    const CreateStudent = async () => {
        try {
            const studentdetails = {
                fname,
                midname,
                lastname,
                gender,
                mobile,
                email,
                dob,
                father,
                fatheroccupation,
                cast,
                mother,
                nationality,
                religion,
                aadhar,
                abcid,
                pan,
                session,
                admission,
                rollno,
                studenttype,
                course,
                medium,
                studentid,
                admissionstatus,
                country,
                state,
                district,
                city,
                permanentaddress,
                houseno,
                pincode,
                department
            };

            const newstudent = await axios.put(`http://localhost:5000/api/student/students/edit/${id}`, studentdetails);
            // console.log(studentdetails);

            console.log(newstudent);
            navigate(`/student-profile/${id}`);
            // setfName('');
            // setMidname('');
            // setLastname('');
            // setGender('');
            // setMobile('');
            // setEmail('');
            // setDob('');
            // setFather('');
            // setFatheroccupation('');
            // setCast('');
            // setMother('');
            // setNationality('');
            // setReligion('');
            // setAadhar('');
            // setAbcid('');
            // setPan('');
            // setSession('');
            // setAdmission('');
            // setRollno('');
            // setStudenttype('');
            // setCourse('');
            // setMedium('');
            // setStudentid('');
            // setAdmissionstatus('');
            // setCountry('');
            // setState('');
            // setDistrict('');
            // setCity('');
            // setpermanentaddress('');
            // setPincode('');
            // setHouseno('');

        } catch (error) {
            console.log(error);
        }

    }






    return (
        <>
            <div className="allcontainer">
                <div className="mai">
                    <h1>Personal Deatails</h1>
                    <div className="imagebox">    
                        <div className="profilephoto">
                            <img className='profileimg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile Photo" />
                            <div className="file-input-wrapper">
                            <input type="file" id="fileInput" className="file-input" />
                            <label for="fileInput" className="file-input-label">Choose a file</label>
                            <p id="fileName" className="file-name"></p>
                        </div>
                        </div>
                    </div>
                    <div className="alldetail">
                        <div className="firstdetailbox">
                            <div className="il">
                                <label htmlFor="First Name">
                                    First Name
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={fname} onChange={(e) => setfName(e.target.value)} required />
                            </div>
                            <div className="il">
                                <label htmlFor="Last Name">
                                    Last Name
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                            </div>
                            <div className="il">
                                <label htmlFor="Mobile No">
                                    Mobile No
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                            </div>
                            <div className="il">
                                <label htmlFor="Date of Birth">
                                    Date of Birth
                                </label>
                                <input type="date" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Father Occupation">
                                    Father Occupation
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={fatheroccupation} onChange={(e) => setFatheroccupation(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Mother Name">
                                    Mother Name
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={mother} onChange={(e) => setMother(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Religion">
                                    Religion
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={religion} onChange={(e) => setReligion(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="ABC No">
                                    Academic Bank Credit(ABC) No
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={abcid} onChange={(e) => setAbcid(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Session">
                                    Session
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={session} onChange={(e) => setSession(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Student Type">
                                    Student Type
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={studenttype} onChange={(e) => setStudenttype(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Course">
                                    Course
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={course} onChange={(e) => setCourse(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Student Id">
                                    Student Id
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={studentid} onChange={(e) => setStudentid(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Country">
                                    Country
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="State">
                                    State
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="District">
                                    District
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={district} onChange={(e) => setDistrict(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="City">
                                    City
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>

                        </div>

                        <div className="seconddetilbox">
                            <div className="il">
                                <label htmlFor="Middle Name">
                                    Middle Name
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={midname} onChange={(e) => setMidname(e.target.value)} required />
                            </div>
                            <div className="il">
                                <label htmlFor="Gender">
                                    Gender
                                </label>
                                <select name="gender" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} id="gender" className='inputboxpro' value={gender} onChange={(e) => setGender(e.target.value)}>
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
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="il">
                                <label htmlFor="Father Name">
                                    Father Name
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={father} onChange={(e) => setFather(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Cast Category">
                                    Cast Category
                                </label>
                                <select name="cast" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} id="castcategory" className='inputboxpro' value={cast} onChange={(e) => setCast(e.target.value)}>
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
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={nationality} onChange={(e) => setNationality(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Aadhar No">
                                    Aadhar No
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Pan No">
                                    Pan No
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={pan} onChange={(e) => setPan(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Admission Date">
                                    Admission Date
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={admission} onChange={(e) => setAdmission(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Roll No">
                                    Roll No
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={rollno} onChange={(e) => setRollno(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Medium">
                                    Medium
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={medium} onChange={(e) => setMedium(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Admission Status">
                                    Admission Status
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={admissionstatus} onChange={(e) => setAdmissionstatus(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Permanent Address">
                                    Permanent Address
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={permanentaddress} onChange={(e) => setpermanentaddress(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="House Number">
                                    House Number
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={houseno} onChange={(e) => setHouseno(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Pin Code">
                                    Pin Code
                                </label>
                                <input type="text" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} className='inputboxpro' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            </div>
                            <div className="il">
                                <label htmlFor="Pin Code">
                                    Department:
                                </label>
                                <select name="department" style={{color: theme === 'dark' ? '#ffffff' : '#000000'}} id="sdepartment" className='inputboxpro' value={department} onChange={(e) => setDepartment(e.target.value)}>
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
                        <button className='subtn' onClick={CreateStudent}>
                            Update
                        </button>
                        <button className='canl'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profiledetail
