import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { DbopsService } from './dbops.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(public storage:Storage, public route:Router, public navCtrl: NavController, public dbops:DbopsService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public jwt:JwtHelperService) { }
  token = 'no stuff'; //jwt token
  async doToast(message,position,time) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: time,
    });
    toast.present();
  }
  loading
  async doLoading(m) {
    this.loading = await this.loadingCtrl.create({
      message: m,
      spinner: "bubbles",
      id: 'loader',
      duration: 1000
    });
     this.loading.present();
    
    console.log('Loading dismissed!');
  }
  StudentloginStatus  = false;
  LecturerLoginStatus = false;
  user_login_info;
  registered_course_status = false;
  notDepartmentCourse = false //used to validate if hoc is registering a department course or not
  campus = [
    {
      name: "ojo",
      faculty: [
        {
          faculty_name: "Faculty of Arts",
          department: [
            "European Languages", 
            "Creative Arts Music",
            "Creative Arts Visual Arts",
            "Department Of History",
            "Philosophy",
            "Linguistics , African And Asian",
            "English Literature",
            "English Language",          
          ]
        },
        {
          faculty_name: "Faculty of Education",
          department: [
            "Sociology Of Education",
            "Philosophy Of Education",
            "Education Psychology",
            "Educational Administration And Planning",
            "Curriculum Theory",
            "Religion Education",
            "Islamic Studies Education",
            "Christian Religious Studies",
            "Yoruba Education",
            "French Education",
            "English Literature Education",
            "English Education",
            "Business Education",
            "Technology Education",
            "Home Economics Education",
            "Sports Administration/Management",
            "Exercise Physiology",
            "Human Kinetics And Health Education",
            "History Education",
            "Geography Education",
            "Social Studies Education",
            "Integrated Science Education",
            "Chemistry Education",
            "Biology Education",
            "Adult Literacy And Non Formal Education",
            "Adult Education Management",
            "Adult Education",
            "Guidance and Counseling"
          ]
        },
        {
          faculty_name: "Faculty of Law",
          department:[
            "Jurisprudence And International Law",
            "Legal Studies",
            "Private And Property Law",
            "Islamic Law",
            "Public Law",
            "Commercial And Industrial Law",
            "Jurisprudence International Law",
          ]
        },
        {
          faculty_name: "Faculty of Science",
          department:[
            "Department Of Fishery Sciences",
            "Department Of Biology",
            "Department Of Microbiology",
            "Department Of Botany",
            "Department Of Fisheries",
            "Department Of Zoology",
            "Department Of Computer Sciences",
            "Department Of Chemistry",
            "Department Of Physics",
            "Department Of Mathematics And Statistics",
            "Department of Biochemistry",
          ]
        },
        {
          faculty_name: "Faculty of Social Science",
          department: [
            "Transport Planning And Management",
            "Public And International Affairs",
            "Department Of Sociology",
            "Department Of Psychology",
            "Department Of Social Works",
            "Department Of Political Sciences",
            "Department Of Mass Communication And Journalism",
            "Department Of Economics",
            "Faculty of Business Administration",
            "Finance",
            "Management",
            "Accounting",
            "Insurance",
            "Industrial Relations And Personnel Management",
            "Department Of Business Administration",
          ]
        }         
      ]
    },
    {
      name: "epe",
      faculty: [
        {
          faculty_name: "Faculty Of Engineering",
          department: [
            "Mechanical Engineering",
            "Electronic And Computer Engineering",
            "Chemical And Polymer Engineering",
          ]
        }
      ]
    },
    {
      name: "LASUCOM",
      faculty: [
        {
          faculty_name: "School of Clinical Sciences",
          department:[
            "Dentistry",
            "Medicine",
          ]
        },
        {
          faculty_name: "School Of Basic Medical Sciences",
          department:[
            "Physiology"
          ]
        }
      ]
    }
  ];
//General School Stuff
  getAllCampus(){
    let campus_name = [];
    for (let index = 0; index < this.campus.length; index++) {
       campus_name.push(this.campus[index].name);
    }
    return campus_name;
    
  }
  getCampus(gcampus){
    const  mycampus = this.campus.find(campus => {
      return campus.name === gcampus
    })
   return mycampus;
  }
   getFaculty(campus){
    let currentCampus   = this.getCampus(campus);
    const afaculty      = currentCampus.faculty
    return afaculty;
  }
   getDepartment(campus,faculty){
   let testDept   = this.getFaculty(campus);
   let testDept2  = testDept.filter(fac =>{
     return fac.faculty_name === faculty
   })
  let testDept3 = testDept2.find(det => {
    return det.department == det.department
  }) 
  return testDept3.department;
}
  semester_courses = [{
    course_code: '',
    course_title: '',
    class_date: [],
    course_lecturer: [],
  }]

//Regular student stuff
  async get_student_login_data(){
    // Get student login data from storage
    // Mostly used by pages who needs update storage data
    return  await this.storage.get('stud_loggedin_data')    
  }
  async stud_register(full_name, matric_number, password){
    // Registers student to the database and redirects to login page
    let token =  await this.storage.get('login_access_token')
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
      let body={
        function        : 'stud_register',
        full_name       : full_name,
        matric_number   : matric_number,
        password        : password,         
      }
      let request:any = await this.dbops.postData(token,body, 'api.php')
        if(request.success === true){
            loading.dismiss();
            this.doToast(request.msg,"middle",1500);
            //redirect to login page
            this.route.navigateByUrl('home/login')

        }else{
          loading.dismiss();
          this.doToast(request.msg,"middle",1500);
        }
  }
  async stud_login(matric_number,password){
    //Logs in a student, then create a loggedin_student data storage
    // this.get_stud_data() add this function after success login

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present(); 
   
      let body={
        function        : 'student_login',
        matric_number   : matric_number,
        password        : password,         
      }
      let token = await this.storage.get('login_access_token');
      if(!token){
        token = 'login auth'
      }
      console.log('token', token)
      let request:any = await this.dbops.postData(token,body, 'api.php')
      if(request===null){
        console.log('could not connect to server')
        loading.dismiss()
      }else{
        if(request.success === true){
          console.log(request)
          await this.storage.set('login_access_token', request.token)
          this.route.navigateByUrl('student-profile-tab')
          loading.dismiss()
        }
        else{
          console.log(request.msg)
          loading.dismiss()
        }
      }
}
  async get_stud_data(){
    const token = await this.storage.get('login_access_token');
    //gets student data from the server and returns user data from the server
    
    let body={
        function        : 'get_student_data',
      }
      let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
            const decodedToken = this.jwt.decodeToken(pD.result)
            const {data} = decodedToken
            await this.storage.set('stud_loggedin_data', data)
            //get courses offered by a student
            await this.get_student_course();
            return this.storage.get('stud_loggedin_data');
          }else{
            console.log(pD.msg)
            this.route.navigateByUrl('home/login')
          }
        }
      }
  }
  async update_stud_data(full_name,matric_number,password,selectedCampus,selectedFaculty,selectedDepartment,level){ 
    //function called in edit profile page used to edit student profile
    let token =  await this.storage.get('login_access_token')
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present(); 
    let body={
      function        : 'student_update_profile',
      full_name       : full_name,
      matric_number  : matric_number,
      password        : password,
      campus          : selectedCampus,
      faculty         : selectedFaculty,
      department      : selectedDepartment,
      level           : level,
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected","middle",2000)
        this.route.navigateByUrl('home/login')
        loading.dismiss()
      }else{
        let pD;
        try {
          let request:any = await this.dbops.postData(token,body, 'api.php')
          pD = request
        } catch (error) {
          console.log(error)
          this.doToast(error.error.msg,"middle",4000)
          this.route.navigateByUrl('home/login')
          loading.dismiss();
        }
        if(!pD){
          loading.dismiss()
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success === true){
            loading.dismiss();
            this.doToast(pD.msg,"middle",1500);
            this.get_stud_data();
            this.route.navigateByUrl('student-profile-tab/profile')
        }else{
          loading.dismiss();
          this.doToast(pD.msg,"middle",1500);
        }
      }  
    }
  }
  
  async stud_logout(){
    this.storage.keys().then(res=>{
      res.forEach(element => {
        this.storage.remove(element)
        console.log(element + ' has been removed')
      });
      
    })
    this.route.navigateByUrl('/home');
  }

  async fetch_course_data(){
    let token =  await this.storage.get('login_access_token')
    const loading = await this.loadingCtrl.create({
      message: 'Please wait o...',
      // duration: 2000
    });
    await loading.present(); 
    //function to get courses registered by an HOC
    let a = await this.storage.get('stud_loggedin_data');
    console.log(a)
    let level =  a.level
    let Hoc_department =  a.department
    let body={
      function        :  'get_course_data',
      level             :  level,
      hoc_department   : Hoc_department
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          loading.dismiss()
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
        if(pD.success===true){
          console.log('success')
          let fetch_data = await this.storage.set('hoc_course_data',pD.result)
          this.route.navigateByUrl('student-profile-tab/hoc')
          loading.dismiss()
          return fetch_data
        }else{
        console.log(pD.msg)
        }
        }
    }
  }
  async get_course_details_from_server(courseCode){
    let token =  await this.storage.get('login_access_token')
    //haven't figured out why i created this function
    let body ={
      function : 'get_course_details_from_server',
      courseCode
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
          return pD.result
        }else{
          console.log(pD.msg)
        }
      }
    }
  }

  async hoc_course_reg(Course_code,Course_title,Course_time,Course_lecturer,Course_hoc,Course_dept,class_day,hoc_mat_number){
    let token =  await this.storage.get('login_access_token')
    let a = await this.storage.get('stud_loggedin_data');
    let body={
      function          : 'hoc_course_reg',
      course_code       : Course_code,
      course_title      : Course_title,
      course_time       : Course_time,
      level             : a.level,
      course_lecturer   : Course_lecturer,
      class_hoc         : Course_hoc,
      department        : Course_dept,
      class_day         : class_day,
      matric_number     : hoc_mat_number,
    }
    //Course Reg for department course reg
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
          this.fetch_course_data()
        }else{
          this.doToast(pD.msg,'middle',2000)
          console.log(pD.msg)
        }
      }
    }
  }

  async hoc_non_dept_course_reg(hoc_name,hoc_department,original_course_department,class_day,course_time,course_lecturer,course_code,course_title){
    let token =  await this.storage.get('login_access_token')
    let a = await this.storage.get('stud_loggedin_data');
    let body = {
      function: 'hoc_non_dept_course_reg',
      hoc_name,hoc_department,original_course_department,class_day,course_time,course_lecturer,course_code,course_title,
      level: a.level
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
        if(pD.success===true){
        this.fetch_course_data()
        console.log(pD.msg)
        }else{
          this.doToast(pD.msg,"bottom",2000)
          console.log(pD.msg)
        }
      }
    }
  }
  async get_hoc_lecturer(Department){
    let token =  await this.storage.get('login_access_token')
    //gets the lecturers in hoc department, used to produce lecturers during signup
    let body={
      function: 'get_hoc_lecturer',
      department: Department,
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
        if(pD.success===true){
          console.log(pD.msg)
          await this.storage.set('hoc_lecturers',pD.result)
        }else{
          console.log(pD.msg,Department)
        }
      }
    }
  }

  non_dpt_lec
  async get_non_department_courses(Department){
    let token =  await this.storage.get('login_access_token')
    console.log("started ...")
    let a = await this.storage.get('stud_loggedin_data')
    //for hoc registering external courses
    let body={
      function: 'get_non_department_courses',
      department: Department,
      level: a.level
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
        if(pD.success===true){
        console.log(pD.msg)
        this.non_dpt_lec = await this.storage.set('non_dept_course',pD.result)
        }else{
          console.log(pD.msg)
        }
        return this.non_dpt_lec
      }
    }
  }  
  async get_course_data(){
    return await this.storage.get('hoc_course_data');
  }
  async delete_course(courseCode,hoc_department){
    let token =  await this.storage.get('login_access_token')
    let a = await this.storage.get('stud_loggedin_data')
    let body={
      function: 'delete_course',
      courseCode,
      hoc_department,
      level:a.level
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
          console.log(pD.msg);
          this.doToast(pD.msg,'middle',2000)
        }
      }
    }
  }

  async get_student_course(){
    //function to fetch courses related to student's department
    //server collects all registered courses even from external courses
    let a = await this.storage.get('stud_loggedin_data');
    let token =  await this.storage.get('login_access_token')
    let body = {
      function : 'check_available_course',
      department: a.department,
      level:  a.level
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
          this.storage.set('student_course_data', pD.result)
          let courseData = await this.storage.get('student_course_data');
          console.log(courseData)
          // this.route.navigateByUrl('student-profile-tab/profile')
          return courseData;
        }else{
          console.log(pD.msg)
        }
      }
    }
  }

  async  register_course(course){
    let token =  await this.storage.get('login_access_token')
    this.doLoading("sending data to serve...")
    let a = await this.storage.get('stud_loggedin_data');
    let body = {
      function      :   'student_register_course',
      department    :   a.department,
      courses       :   course,
      matric_number :   a.matric_number
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
            console.log(pD.msg)
            this.get_registered_courses();
            this.loadingCtrl.dismiss()
          }else{
            console.log(pD.msg)
            this.loadingCtrl.dismiss()
          }   
        }
      }
  }

  async get_registered_courses(){
    let token =  await this.storage.get('login_access_token')
    let a = await this.storage.get('stud_loggedin_data');
    let body = {
      function    : 'get_registered_courses',
      matric_number : a.matric_number,
      level:  a.level
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
            let courses = await this.storage.set('registered_courses', pD.result)
            this.doToast(pD.msg,'middle',2000)
            return courses;
          }else{
            console.log(pD.msg)
          }
        }
      }
  }
  // async unregister_course(removedCourse,courses){

  //   //deprecated function
  //   let a = await this.storage.get('stud_loggedin_data');
  //   let body = {
  //     function: 'unregister_course',
  //     matric_number: a.matric_number,
  //     department : a.department,
  //     course: courses,
  //     rCourse: removedCourse,
  //   }
  //   let request:any = await (await this.dbops.postData(body, 'api.php')
  //   if(request.success === true){
  //     this.get_registered_courses();
  //     return courses;
  //   }else{
  //     console.log(request.msg)
  //   }
  // }
  //=====================================================================
  //Lecturer stuffs
  incomplete_profile = true //manages the state of lecturer's complete profile

  async get_lecturer_data(){
    let token =  await this.storage.get('login_access_token')
    this.doLoading("please wait")
    //get campus,faculty and department details for the lecturer
    let body = {
      function    : 'get_lecturer_data',
    } 
    let expiredToken = this.jwt.isTokenExpired(token)
    if(expiredToken === true){
      this.doToast("Suspcious activity detected, please sign in again","middle",2000)
      this.route.navigateByUrl('home/login')
    }else{
      let pD;
      try {
        let postData: any = await this.dbops.postData(token,body,'api.php')
        pD = postData
      }catch (error) {
        console.log(error)
        this.doToast("Suspcious activity detected","middle",2000)
        this.route.navigateByUrl('home/login')
      }
      if(!pD){
        this.doToast('can\'t get resources from server','middle',2000)
      }else{
        if(pD.success===true){
          await this.storage.set('lecturer_academic_data', pD.result)
          let a = await this.storage.get('lecturer_academic_data')
          console.log(a)
          await this.get_lecturer_courses(a.full_name)
          this.loadingCtrl.dismiss()
          }else{
            this.doToast(pD.msg, 'bottom',3000)
            this.loadingCtrl.dismiss()
          }
      }
   }
  }

  async get_lecturer_courses(lecturer){
    let token =  await this.storage.get('login_access_token')
    //get unique courses registered
    let body = {
      function : 'get_lecturer_courses',
      lecturer
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
            console.log('could communicate with server')
            let a = await this.storage.set('unique_lecturers_courses',pD.result)
          }else{
          console.log(pD.msg)
          }
        }
      }
  }  

  async get_all_offering_my_course(lecturer,courseCode){
    let token =  await this.storage.get('login_access_token')
    //can't find where i used this function
    let body = {
      function: 'get_all_offering_my_course',
      lecturer,
      courseCode
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
            console.log(pD.msg)
            let a = await this.storage.set('teee',pD.result)
            console.log(a)
          }else{
           console.log(pD.msg)
          }
        }
      }
   }
  async complete_lecturer_signup(Campus,Faculty,Department){
    let token =  await this.storage.get('login_access_token')
    //registers the academic data for the lecturer
    let a = await this.storage.get('loggedin_lecturer_data')
    let body = {
      function     : 'complete_lecturer_signup',
      user_name    : a.user_name,
      campus       : Campus,
      faculty      : Faculty,
      department   : Department,
      complete     : 1
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
          this.doToast(pD.msg,'middle',3000)
          await this.get_lecturer_data();
          let data = await this.storage.get('lecturer_academic_data');
          console.log(data)
          this.checkLecuturerProfile()
        }else{
          this.doToast(pD.msg, 'bottom', 2000)
        }
      }
    }
  }

  async lecturer_login(User_name,Password){
    let token =  await this.storage.get('login_access_token')
    this.doLoading("please wait")
      let body = {
        function      : 'lecturer_login',
        user_name     : User_name,
        password      : Password
      }
      if(!token){
        token = 'lecturer login auth'
      }
      console.log('token', token)
      let request:any = await this.dbops.postData(token,body, 'api.php')
      if(request===null){
        console.log('could not connect to server')
      }else{
        if(request.success === true){
          await this.storage.set('login_access_token', request.token)
          const decodedToken = this.jwt.decodeToken(request.token)
          const {data} = decodedToken
          await this.storage.set('loggedin_lecturer_data',data)
          console.log('lecturer logged in data',data)
          this.storage.get('login_access_token').then(res=>{
            console.log(res)
          })
          await this.get_lecturer_data(); 
          // this.route.navigateByUrl('lecturer-profile-tab');
          this.loadingCtrl.dismiss();
  
        }else{
          this.doToast("Login failed, try again","middle",200)
          this.loadingCtrl.dismiss();
        }
      }
    }

  async checkLecuturerProfile(){
    let token =  await this.storage.get('login_access_token')
    let data = await this.storage.get('lecturer_academic_data')
    if(data.complete == '1'){
      this.incomplete_profile = false
      console.log(data.complete +' testing incomplete profile' + this.incomplete_profile)
    }else if(data.complete == null || data.complete == '0'){
      console.log('testing incomplete profile null')
      this.incomplete_profile = true
    }
  }
  async update_lecturer_profile(User_name,SelectedCampus,SelectedFaculty,SelectedDepartment){
    let token =  await this.storage.get('login_access_token')
    let body = {
      function            : 'update_lecturer_profile',
      user_name           :  User_name,
      campus              : SelectedCampus,
      faculty             : SelectedFaculty,
      department          : SelectedDepartment
    }
    let expiredToken = this.jwt.isTokenExpired(token)
      if(expiredToken === true){
        this.doToast("Suspcious activity detected, please sign in again","middle",2000)
        this.route.navigateByUrl('home/login')
      }else{
        let pD;
        try {
          let postData: any = await this.dbops.postData(token,body,'api.php')
          pD = postData
        }catch (error) {
          console.log(error)
          this.doToast("Suspcious activity detected","middle",2000)
          this.route.navigateByUrl('home/login')
        }
        if(!pD){
          this.doToast('can\'t get resources from server','middle',2000)
        }else{
          if(pD.success===true){
            this.doToast("profile updated successfully","bottom",2000)
          }else if(pD.success === false||pD.success === null){
            this.doToast("tasked failed to complete","middle",2500)
          }
        }
      }
    }
}