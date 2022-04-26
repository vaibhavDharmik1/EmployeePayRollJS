
class EmployeePayRoll 
{
   // getter and setter method
   get id() { return this._id; }
   set id(id) { 
     this._id = id; 
   }
 
   get name() { return this._name; }
   set name(name) { 
     let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
     if (nameRegex.test(name))
       this._name = name; 
     else throw 'Name is Incorrect!';
   }

  //  get EmployeID() { return this._EmployeID; }
  //  set EmployeID(EmployeID) { 
  //    let EmployeIDRegex = RegExp("^[A-Z\d]{1}[A-Z\d._/\-]{49}$");
  //    if (EmployeIDRegex.test(EmployeID))
  //      this._EmployeID = EmployeID; 
  //    else throw 'EmployeID is Incorrect!';
  //  }

   get EmailID() { return this._EmailID; }
   set EmailID(EmailID) { 
     let EmailIDRegex = RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
     if (EmailIDRegex.test(EmailID))
       this._EmailID = EmailID;
     else throw 'EmailID is Incorrect!';
   }
 
   get profilePic() { return this._profilePic; }
   set profilePic(profilePic) { 
     this._profilePic = profilePic; 
   }
 
   get gender() { return this._gender; }
   set gender(gender) { 
     this._gender = gender; 
   }
 
   get department() { return this._department; }
   set department(department) { 
     this._department = department; 
   }
   get Contact() { return this._Contact; }
   set Contact(Contact) { 
     let ContactRegex = RegExp("^[0-9]{2} [0-9]{10}$");
     if (ContactRegex.test(Contact))
       this._Contact = Contact;
     else throw 'Contact is Incorrect!';
   }
 
   get salary() { return this._salary; }
   set salary(salary) { 
     this._salary = salary; 
   }
 
   get note() { return this._note; }
   set note(note) { 
     this._note = note; 
   }
 
   get startDate() { return this._startDate; }
   set startDate(startDate) { 
    this._startDate = startDate; 
  }
 
   toString() {
     const options = { year: 'numeric', month: 'short', day: 'numeric' };
     const empDate = !this.startDate ? "undefined" : 
                     this.startDate;
     return "id=" + this.id + ", name='" + this.name + ", EmailID ='" + this.EmailID + ", gender='" + this.gender + 
            ", profilePic='" + this.profilePic + ", department=" + this.department + ", Contact ='" + this.Contact +
            ", salary=" + this.salary + ", startDate=" + empDate + ", note=" + this.note;
   }
}