// Course CLass
class Course {
    constructor(title, instructor, image){
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }

}

// UI CLASS
class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');
        var html = `
            <tr>
                <td><img style="width: 50%;" src="${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class="btn btn-danger btb-sm delete">Delete</a></td>
            </tr>
        `;
    
        list.innerHTML += html;
    }

    clearControls() {
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = "";
    }

    deleteCourse(element) {
            element.parentElement.parentElement.remove();
    }

    showAlert(message, className) {
        var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
    `;

    const row = document.querySelector('.row');
    // beforeBegin, afterBegin, beforeEnd, afterEnd
    row.insertAdjacentHTML('beforeBegin', alert)

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
    }
}


// STorage Class

class Storage {

    static getCourses() {
        let courses;

        if(localStorage.getItem('courses')===null) {
            courses=[];
        }else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }


        return courses;
    }

    static displayCourses() {
        const courses = Storage.getCourses();

        Array.from(courses).forEach(element => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    static AddCourse(course) {
        const courses = Storage.getCourses();
        Array.from(courses).push(course);
        localStorage.setItem('courses', JSON.stringify(course));
    }

    static deleteCourse() {

    }
}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);

document.getElementById('new-course').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    // Create course object
    const course = new Course(title, instructor, image)

    // TODO: Create UI object
    const ui = new UI();

    if (title === "" || instructor === "" || image === "") {
        ui.showAlert('Please complete the form', "warning")
    } else {
        // TODO: Add course to list
        ui.addCourseToList(course);

        //Save to local storage
        Storage.AddCourse(course);

        ui.showAlert('The course has been added', "success")
    }

    // TODO: Clear controls
    ui.clearControls();

    e.preventDefault();
})

document.getElementById('course-list').addEventListener('click', function (e) {
    const ui = new UI();
    if(e.target.classList.contains('delete')){
        ui.deleteCourse(e.target);
        //Delete course from local Storage
        storage.deleteCourse();
        ui.showAlert('The course has been deleted', 'danger');
    }
})