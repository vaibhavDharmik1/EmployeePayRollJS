let isUpdate=false;
let employeePayrollObj={};
window.addEventListener("DOMContentLoaded", (event) => {
  // The querySelector() method returns the first element that matches a CSS selector.
    const name = document.querySelector("#name");
    name.addEventListener("input", function() {
        if(name.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            (new EmployeePayRoll()).name = name.value;
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", e);
        }
    });
    // const EmployeID = document.querySelector("#EmployeID");
    // EmployeID.addEventListener("input", function() {
    //     if(EmployeID.value.length == 0) {
    //         setTextValue(".text-error", "");
    //         return;
    //     }
    //     try {
    //         (new EmployeePayRoll()).EmployeeID = EmployeeID.value;
    //         setTextValue(".text-error", "");
    //     } catch (e) {
    //         setTextValue(".text-error", e);
    //     }
    // });
    const EmailID = document.querySelector("#EmailID");
    EmailID.addEventListener("input", function() {
        if(EmailID.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            (new EmployeePayRoll()).EmailID = EmailID.value;
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", e);
        }
    });
    const Contact = document.querySelector("#Contact");
    Contact.addEventListener("input", function() {
        if(Contact.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            (new EmployeePayRoll()).Contact = Contact.value;
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", e);
        }
    });
    const date = document.querySelector("#date");
    date.addEventListener("input", function() {
        let startDate = getInputValueById("#day")+" "+getInputValueById("#month")+" "+
                      getInputValueById("#year") ;
        try {
            (new EmployeePayRoll()).startDate = new Date(Date.parse(startDate));
            setTextValue(".date-error", "");
        } catch (e) {
            setTextValue(".date-error", e);
        }
    });
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent=salary.value;
    salary.addEventListener("input", function() {
        output.textContent=salary.value;
    });
    checkForUpdate();
});
const save = (event) => 
{ 
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject(); 
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);    
        
    } catch (e) {
        alert(e);
        return;
    }
} 
const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById("#name");
    // employeePayrollObj._EmployeID = getInputValueById("#EmployeID");
    employeePayrollObj._EmailID = getInputValueById("#EmailID");
    employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
    employeePayrollObj._department = getSelectedValues("[name=department]");
    employeePayrollObj._Contact = getInputValueById("#Contact");
    employeePayrollObj._note = getInputValueById("#notes");
    let date = getInputValueById("#day")+" "+getInputValueById("#month")+" "+
               getInputValueById("#year") ;
    employeePayrollObj._startDate = date;
    employeePayrollObj._salary = getInputValueById("#salary");
}
function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(
      localStorage.getItem("EmployeePayrollList")
    );
    if (employeePayrollList) {
      let empPayrollData = employeePayrollList.find(
        (empData) => empData._id == employeePayrollObj._id
      );
      if (!empPayrollData) {
        employeePayrollList.push(createEmployeePayrollData());
      } else {
        const index = employeePayrollList
          .map((empData) => empData._id)
          .indexOf(empPayrollData._id);
        employeePayrollList.splice(
          index,
          1,
          createEmployeePayrollData(empPayrollData._id)
        );
      }
    } else {
      employeePayrollList = [createEmployeePayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem(
      "EmployeePayrollList",
      JSON.stringify(employeePayrollList)
    );
  }
  const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayRoll();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
  };
  
  const setEmployeePayrollData = (employeePayrollData) => {
    try {
      employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
      setTextValue(".name-error", e);
      throw e;
    }
    // try {
    //   employeePayrollData.EmployeID = employeePayrollObj._EmployeID;
    // } catch (e) {
    //   setTextValue(".EmployeID-error", e);
    //   throw e;
    // }
    try {
      employeePayrollData.EmailID = employeePayrollObj._EmailID;
    } catch (e) {
      setTextValue(".EmailID-error", e);
      throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    try {
      employeePayrollData.Contact = employeePayrollObj._Contact;
    } catch (e) {
      setTextValue(".Contact-error", e);
      throw e;
    }
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
      employeePayrollData.startDate = new Date(
        Date.parse(employeePayrollObj._startDate)
      );
    } catch (e) {
      setTextValue(".date-error", e);
      throw e;
    }
    alert(employeePayrollData.toString());
  };
  
  const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
  };
  const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach((item) => {
      if (item.checked) selItems.push(item.value);
    });
    return selItems;
  };
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  };
  const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
  };
  const resetForm = () => {
    setValue("#name", "");
    // setValue("#EmployeID", "");
    setValue("#EmailID", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#Contact", "");
    setValue("#salary", "");
    setValue("#notes", "");
    setValue("#day", 1);
    setValue("#month", "January");
    setValue("#year", "2018");
  };
  const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((items) => {
      items.checked = false;
    });
  };
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  };
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
  };
  const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
  };
  
  const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    // setValue("#EmployeID", employeePayrollObj._EmployeID);
    setValue("#EmailID", employeePayrollObj._EmailID);
    setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
    setSelectedValues("[name=gender]", employeePayrollObj._gender);
    setSelectedValues("[name=department]", employeePayrollObj._department);
    setValue("#Contact", employeePayrollObj._Contact);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    setValue("#notes", employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
  };
  const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
      if (Array.isArray(value)) {
        if (value.includes(item.value)) {
          item.checked = true;
        }
      }
      else if (item.value === value) item.checked = true;
    });
  };