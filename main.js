

const employeeHead = document.getElementsByClassName('employee-head')[0];
let trashidden = document.getElementsByClassName('hidden')[0];
const employeeForm =document.querySelector('.employee-form');
const trashTableBody = document.getElementById('trashTableBody');
const toggleTrashBtn = document.getElementById('toggleTrash');
const trashSection = document.getElementById('trashSection');
const activeCount = document.getElementById('activeCount');
const trashCount = document.getElementById('trashCount');


const header= document.createElement("header");


header.className= "header";

employeeHead.appendChild(header);

    

const h1= document.createElement("h1");
h1.textContent='Empolyee Management';
header.appendChild(h1)
//انشاء نموذج الادخال الخاص بالموظف
const empform= document.createElement("form");
empform.className="emp_form";
employeeForm.appendChild(empform);


const nameGroup= document.createElement("div");
nameGroup.className="emp_Group";
empform.appendChild(nameGroup);
const emplebal= document.createElement("lebal");
emplebal.textContent="Employee Name";

const inputName= document.createElement("input");
inputName.id="name";
inputName.className="emp_name";
inputName.placeholder="Enter Employee Name";
inputName.type="text";
// inputName.required=true;
const nameError= document.createElement("span");
nameError.className="error-message";
nameError.id="nameError"
nameGroup.appendChild(emplebal);
nameGroup.appendChild(inputName);
nameGroup.appendChild(nameError);


const roleGroup= document.createElement("div");
roleGroup.className="emp_Group";
empform.appendChild(roleGroup)
const rolelebal= document.createElement("lebal");
rolelebal.textContent="Employee Role";


const inputRole= document.createElement("input");
inputRole.id="role";
inputRole.name="role";
inputRole.className="emp_name";
inputRole.placeholder="Enter Employee Role";
inputRole.type="text";
inputRole.required=true;
const roleError= document.createElement("span");
roleError.className="error-message";
roleError.id="roleError";
roleGroup.appendChild(rolelebal);
roleGroup.appendChild(inputRole);
roleGroup.appendChild(roleError);

const dropdownStatus= document.createElement("div");
dropdownStatus.className="emp_Group";
empform.appendChild(dropdownStatus);

const selectlebal= document.createElement("lebal");
selectlebal.textContent="Employee Status";
const selectionStatus= document.createElement("select");
 selectionStatus.className="dropdown-status";
selectionStatus.id="status";

dropdownStatus.appendChild(selectlebal);
dropdownStatus.appendChild(selectionStatus);
const statuss=[
 {'value':'active' ,'Text':'active'},
{'value': 'onLeave','Text':'onLeave'},
{'value': 'terminated','Text':'terminated'}
]


statuss.forEach(option => {
    const item=document.createElement("option");
      item.value=option.value;
      item.text=option.Text;
      selectionStatus.appendChild(item);

});

const addBtn= document.createElement("button");
addBtn.className="addBtn";
addBtn.type='submit';
addBtn.textContent="Add Employee";
empform.appendChild(addBtn);


let employees = [
    // { id: 1, name: "أحمد محمد", role: "مطور ويب", status: "Active" },
    // { id: 2, name: "سارة عبدالله", role: "مصممة", status: "On Leave" },
    // { id: 3, name: "خالد علي", role: "مدير مشاريع", status: "Terminated" }
];


const employeeTableBody = document.getElementById('employeeTableBody');
document.addEventListener('DOMContentLoaded', () => {
    renderEmployeeTable();
    renderTrashTable();
    updateCounters();
});
// تعريف مصفوفه لتخزين القيم المحذوفه 
let trash = [];

empform.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const newEmployee = {
        //  id هنا حتى يتم التعامل مع جدول الموضفين من حيث الحذف والتعديل عن طريق  id تم استخدام 
         id: Date.now(), 
        name: inputName.value.trim(),
        role: inputRole.value,
        status: selectionStatus.value.trim()
    };

    employees.push(newEmployee);
    
    // إعادة عرض الجدول
    renderEmployeeTable();
    updateCounters();
    
    // إعادة تعيين النموذج
    empform.reset();
      hideErrorMessages();

    alert('تمت إضافة الموظف بنجاح!');
});
function validateForm() {
    let isValid = true;

    const nameValue = inputName.value.trim();
    const roleValue = inputRole.value.trim();

  

   
    if (nameValue.trim()) {
        showError('nameError', 'يرجى إدخال اسم الموظف');
        isValid = false;
    } 

    // التحقق من الوظيفة بنفس الشروط (أو يمكنك استخدام شروط مختلفة حسب حاجتك)
    if (!roleValue) {
        showError('roleError', 'يرجى إدخال الوظيفة');
        isValid = false;
    } else if (!onlyLettersRegex.test(roleValue)) {
        showError('roleError', 'الوظيفة يجب أن تحتوي على حروف فقط بدون أرقام أو رموز');
        isValid = false;
    }

    // التحقق من الحالة
    if (!selectionStatus.value) {
        showError('statusError', 'يرجى اختيار حالة الموظف');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

// // إخفاء جميع رسائل الخطأ
// function hideErrorMessages() {
//     for (let i = 0; i < errorMessages.length; i++) {
//         errorMessages[i].style.display = 'none';
//     }
// }
function renderEmployeeTable() {
    employeeTableBody.innerHTML = ''; // تفريغ الجدول
    
    employees.forEach(employee => {
        const row = document.createElement('tr');
        
        // إنشاء خلايا الجدول
        const nameCell = document.createElement('td');
        nameCell.textContent = employee.name; // استخدام textContent للسلامة
        
        const roleCell = document.createElement('td');
        roleCell.textContent = employee.role;
        
        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        // statusBadge.className = `status-badge status-${employee.status.toLowerCase().replace(' ', '-')}`;
        statusBadge.textContent = employee.status;
        statusCell.appendChild(statusBadge);
        
        const actionsCell = document.createElement('td');
        
        // زر التعديل
        const editBtn = document.createElement('button');
        editBtn.className = 'btn edit-btn';
        editBtn.textContent = 'update';
        editBtn.onclick = () => editEmployee(id);
        
        // زر الحذف
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn delete-btn';
        deleteBtn.textContent = 'delete';
        deleteBtn.onclick = () => deleteEmployee(employee.id, false);
        
        // إضافة الأزرار إلى خلية الإجراءات
        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
        
        // إضافة الخلايا إلى الصف
        row.appendChild(nameCell);
        row.appendChild(roleCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        
        // إضافة الصف إلى الجدول
        employeeTableBody.appendChild(row);
    });
}
function editEmployee(id) {
    
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return;
    
    // استخدام prompt للحصول على البيانات الجديدة
    const newName = prompt('أدخل الاسم الجديد:', employee.name);
    if (newName === null) {
     
        return; }
    
    const newRole = prompt('أدخل الوظيفة الجديدة:', employee.role);
    if (newRole === null) {
        return;
    }
    
    const newStatus = prompt('أدخل الحالة الجديدة (Active, On Leave, Terminated):', employee.status);
    if (newStatus === null) {
       
        return;
    }
    
    // التحقق من صحة الحالة
    if (!['Active', 'On Leave', 'Terminated'].includes(newStatus)) {
        alert('الحالة يجب أن تكون واحدة من: Active, On Leave, Terminated');

        return;
    }
    
    // تحديث بيانات الموظف
    employee.role = newRole.trim();
    employee.name = newName.trim();
    employee.status = newStatus;
    
    // إعادة عرض الجدول
    renderEmployeeTable();

    alert('تم تحديث بيانات الموظف بنجاح!');
}


function renderTrashTable() {
    
    
    trash.forEach(employee => {
        const row = document.createElement('tr');
        
        // إنشاء خلايا الجدول
        const nameCell = document.createElement('td');
        nameCell.textContent = employee.name;
        
        const roleCell = document.createElement('td');
        roleCell.textContent = employee.role;
        
        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = `status-badge status-${employee.status.toLowerCase().replace(' ', '-')}`;
        statusBadge.textContent = employee.status;
        statusCell.appendChild(statusBadge);
        
        const actionsCell = document.createElement('td');
        
        // زر الاستعادة
        const restoreBtn = document.createElement('button');
        restoreBtn.className = 'btn restore-btn';
        restoreBtn.textContent = 'استعادة';
        restoreBtn.onclick = () => restoreEmployee(employee.id);
        
        // زر الحذف النهائي
        const permanentDeleteBtn = document.createElement('button');
        permanentDeleteBtn.className = 'btn delete-btn';
        permanentDeleteBtn.textContent = 'حذف نهائي';
        permanentDeleteBtn.onclick = () => deleteEmployee(employee.id, true);
        
        // إضافة الأزرار إلى خلية الإجراءات
        actionsCell.appendChild(restoreBtn);
        actionsCell.appendChild(permanentDeleteBtn);
        
        // إضافة الخلايا إلى الصف
        row.appendChild(nameCell);
        row.appendChild(roleCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        
        // إضافة الصف إلى الجدول
        trashTableBody.appendChild(row);
    });
}




function updateCounters() {
    activeCount.textContent = `${employees.length} Active Employee `;
    trashCount.textContent = trash.length;
}

// تبديل عرض سلة المحذوفات
toggleTrashBtn.addEventListener('click', () => {
    trashSection.classList.toggle('hidden');
    toggleTrashBtn.textContent = trashSection.classList.contains('hidden') ? 
        `عرض المحذوفات (${trash.length})` : `إخفاء المحذوفات (${trash.length})`;
});
function deleteEmployee(id, isPermanent) {
    

    const confirmMessage = isPermanent ? 
        'هل أنت متأكد من أنك تريد حذف هذا الموظف نهائيًا؟' : 
        'هل أنت متأكد من أنك تريد نقل هذا الموظف إلى سلة المحذوفات؟';
    
    if (!confirm(confirmMessage)) {
    
        return;
    }
    
    if (isPermanent) {
        // حذف نهائي من سلة المحذوفات
        trash = trash.filter(emp => emp.id !== id);
        renderTrashTable();
    } else {
        // حذف ناعم (نقل إلى سلة المحذوفات)
        const employeeIndex = employees.findIndex(emp => emp.id === id);
        if (employeeIndex !== -1) {
            const [deletedEmployee] = employees.splice(employeeIndex, 1);
            trash.push(deletedEmployee);
            renderEmployeeTable();
            renderTrashTable();
        }
    }
    
    updateCounters();
    
    if (!isPermanent) {
        alert('تم نقل الموظف إلى سلة المحذوفات!');
    } else {
        alert('تم حذف الموظف نهائيًا!');
    }
}