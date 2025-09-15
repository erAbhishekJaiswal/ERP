// utils/authRoutes.jsx
export const routes = {
  student: [
    "/studentdash",
    "/student/student-profile/:id",
    "/e-course",
    "/student/attendence",
    "/student/submission",
    "/student/grades",
    "/student/collaboration",
    "/student/student-assignment",
    "/student/studentsquiz",
    "/student/feature-one"
  ],
  faculty: [
    "/faculty/facultydash",
    "/faculty/student-list",
    "/faculty/view-timetable",
    "/faculty/viewacadmic-calender",
    "/faculty/attendance-dashboard",
    "/faculty/attendance-reports",
    "/faculty/attendance-recording",
    "/faculty/create-assignment",
    "/faculty/class-management",
    "/faculty/set-quiz",
    "/faculty/all-quiz",
  ],
  dean: [
    "/dean/deandashboard",
    "/dean/facultylist",
    "/dean/allstudentlist",
    "/dean/viewcourses",
    "/dean/assignfacultycourse",
    "/dean/approvepromotion",
    "/dean/viewdepartmentbudget",
    "/dean/viewalltimetables",
  ],
  director: [
    "/director/diractordash",
    "/director/coursesreview",
    "/director/assignfacultyrole",
    "/director/facultylist",
    "/director/allstudentlist"
  ],
  registrar: [
    "/admin/registrardash",
    "/admin/facultylist",
    "/admin/allstudentlist",
    "/admin/createexam",
    "/admin/allexams",

    "/admin/newstudentregistration",
    "/admin/newfacultyregistration",

    "/admin/newtimetable",
    "/admin/viewalltimetables",

    "/admin/departmentform",
    "/admin/departmentlist",

    "/admin/designationform",
    "/admin/designationlist",

    "/admin/createsubject",
    "/admin/subjectslist",

    "/admin/createcourse",
    "/admin/courselist",

    "/admin/createacadmiccalender",
    "/admin/viewacadmiccalender"

  ],
  accountant: [
    "/accountant/accountantdash",
    "/accountant/managefeerecords",
    "/accountant/processfeepayment",
    "/accountant/issuereceipt",
    "/accountant/processfacultysalary",
    "/accountant/generatefinancialreport",
    "/accountant/processvendorpayment",
    "/accountant/checkfinancialcomplaince"
  ],
};

// export const isAuthorized = (role, path) => {
//   if (!role) return console.log("No role provided");
//   return routes[role.toLowerCase()]?.some(route => path.startsWith(route) || path === '/' );
// };

export const isAuthorized = (role, path) => {
    if (!role) return false;
    
    // Normalize role to lowercase
    const normalizedRole = role.toLowerCase();
    const roleRoutes = routes[normalizedRole] || [];
    
    // Check if path starts with any allowed route
    return roleRoutes.some(route => {
      // Handle paths with parameters
      const routeBase = route.split(':')[0];
      return path.startsWith(routeBase) || path === route;
    });
  };

export const getDefaultRoute = (role) => {
  if (!role) return "/login";
  return routes[role.toLowerCase()]?.[0] || "/login";
};
