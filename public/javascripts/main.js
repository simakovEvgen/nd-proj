window.onload = function () {

    // PORTFOLIO MENU
    let all = document.getElementById('all-link');
    let print = document.getElementById('print-link');
    let photo = document.getElementById('photo-link');
    let web = document.getElementById('web-link');
    let app = document.getElementById('app-link');
    let output = document.getElementById('app-link');

    function builder(data) {

        var arr = JSON.parse(data);

        var html = '';
        for(var i = 0; i < arr.length; i++){

            var str = '<div class="image"><img src="'+ arr[i].src + '" alt="i"><a href="/edit/'+ arr[i].id + '"><span class="edit"></span></a><a href="/view/'+ arr[i].id + '"><span class="view"></span></a><a class="delete-link" data-id="'+ arr[i].id + '"><span class="delete"></span></a></div>'
            html += str;
        }
        document.getElementById('output').innerHTML = html +
            '<div class="image green"><a href="/new"><img src="uploads/001.jpg" alt="i"></a></div>';
    }

    function getAll() {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/all');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            builder(this.responseText);
        };
        xhr.send();
    }

    if (window.location.href == 'http://localhost:3000/home') {
        getAll();
    }

    if(all != undefined){
        all.addEventListener('click', function() {
            console.log('all');
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/all');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                builder(this.responseText);
                deleted()
            };
            if (window.location.href != 'http://localhost:3000/home') {
                window.location.href = '/home';
            } else {
                xhr.send()
            }

        });
        print.addEventListener('click', function() {
            console.log('print')
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/print');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                builder(this.responseText);
                deleted()
            };
            if (window.location.href != 'http://localhost:3000/home') {
                window.location.href = '/home';
            } else {
                xhr.send()
            }
        })
        photo.addEventListener('click', function() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/photo');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                builder(this.responseText);
                deleted()
            };
            if (window.location.href != 'http://localhost:3000/home') {
                window.location.href = '/home';
            } else {
                xhr.send()
            }
        })
        web.addEventListener('click', function() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/web');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                builder(this.responseText);
                deleted()
            };
            if (window.location.href != 'http://localhost:3000/home') {
                window.location.href = '/home';
            } else {
                xhr.send()
            }
        })
        app.addEventListener('click', function() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/app');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                builder(this.responseText);
                deleted()
            };
            if (window.location.href != 'http://localhost:3000/home') {
                window.location.href = '/home';
            } else {
                xhr.send()
            }
        })
    }

    // LOGIN
    let loginBtn = document.getElementById('login-btn');
    let userLogin = document.getElementById('login');
    let userPass = document.getElementById('password');
    if(loginBtn != undefined){
        loginBtn.addEventListener('click', function () {
            let xhr = new XMLHttpRequest();
            xhr.open('POST','/login');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {

                var fail = document.getElementById('fail');
                var login = document.getElementById('login-accepted')
                if (this.responseText == 'fail'){
                    function show() {
                        fail.classList.remove("hide");
                        fail.classList.add('show');
                    }
                    function hide() {
                        fail.classList.remove("show");
                        fail.classList.add('hide');
                    }
                    setTimeout(show, 300);
                    setTimeout(hide, 2000);
                } else {
                    if (this.responseText = 'gohome'){
                        function show() {
                            login.classList.remove("hide");
                            login.classList.add('show');
                        }
                        function hide() {
                            login.classList.remove("show");
                            login.classList.add('hide');
                            userLogin.value = '';
                            userPass.value = '';
                        }
                        setTimeout(show, 300);
                        setTimeout(hide, 2000);
                    }
                }
                if (window.location.href != 'http://localhost:3000/home') {
                    window.location.href = '/home'
                }
            };
            if (userLogin.value != '' && userPass.value != '') {
                let loginData = {};
                loginData.login = userLogin.value;
                loginData.password = userPass.value;
                xhr.send(JSON.stringify(loginData));
            }
        });
    }

    // DELETE
    function deleted() {
        let delBtn = document.getElementsByClassName('delete-link');
        for (let i = 0; i < delBtn.length; i++){
            if (delBtn != undefined){
                delBtn[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    let xhr = new XMLHttpRequest();
                    var id = delBtn[i].dataset.id;
                    xhr.open('DELETE','/delete/'+ id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.onload = function() {
                        if (this.responseText == 'fail') {
                            location.href = '/autorization'
                        } else {
                            alert('!')
                        }
                    };
                    xhr.send();
                })
            }
        }
    }
    setTimeout(deleted,1000);

    // FILE NAME
    let fileInput = document.getElementById('file');
    var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
    function validateFileType() {
        var oInput = fileInput;
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            console.log(oInput.value);
            if (sFileName.length > 0) {
                var blnValid = false;
                for (let j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;

                        var file = document.getElementById('file').value;

                        file = file.replace( /\\/g, "/").split('/').pop();

                        document.getElementById('file-info').innerHTML = 'File : ' + file;

                        break;
                    }
                }
                if (!blnValid) {
                    alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    return false;
                }
            }
        }
        return true;
    }

    if(fileInput != undefined){
        fileInput.addEventListener('change', function() {
            validateFileType();
        })
    }

    // NEW PROJECT FORM VALIDATE
    let projectTitle = document.getElementById('newTitle');
    let projectAuthor = document.getElementById('newAuthor');
    let projectDecr = document.getElementById('descForNew');

    if(projectTitle != undefined){
        projectTitle.addEventListener('keypress', function(event) {
            if(((event.keyCode > 65 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 122)) || (event.keyCode > 48 && event.keyCode < 57)){

            } else {
                event.preventDefault()
            }
        });
        projectAuthor.addEventListener('keypress', function() {
            if((event.keyCode > 65 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 122) || event.keyCode == 32){
                if (projectAuthor.value == '' && event.keyCode == 32){
                    event.preventDefault()
                }
                console.log(Boolean(projectAuthor.value))
            } else {
                console.log(event.keyCode);
                event.preventDefault()
            }
        });
        projectDecr.addEventListener('keypress', function() {
            if (projectAuthor.value == '' && event.keyCode == 32){
                    event.preventDefault()
                }
        })
    }

    // SPAN COLOR TRANSFORM
    let outDesc = document.getElementById('outDesc');
    var text = '';

    var spanCheck = function (data) {
        var regPattern = /[\&lt\;](\[)(\S{1,})(\])(\|)(\[)(\S{1,})(\])[\&gt\;]/g;
        var regPatternF = /(\<)(\[)(\S{1,})(\])(\|)(\[)(\S{1,})(\])(\>)/g;
        if(regPattern.test(data)){
            text = data.replace(/(\&lt\;)(\[)/g, '<span style="color:');
            text = text.replace(/(\])(\|)(\[)/g, '">');
            text = text.replace(/(\])(\&gt\;)/g, '</span>');
            data = text;
            outDesc.innerHTML = text;
            console.log(data)
        }

    };
    if(outDesc){
        spanCheck(outDesc.innerHTML);
    }

    // EDIT PAGE
    let editForm = document.getElementById('editForm');
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let category = document.getElementById('category');
    let desc = document.getElementById('desc');

    if (editForm) {
        editForm.addEventListener('submit', function() {

            var href = window.location.href;
            var num = href.indexOf("edit/");
            var newId = href.slice(num+5);

            let xhr = new XMLHttpRequest();
            xhr.open('PUT', ('edit/'+newId));
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                window.location.href = ('view/'+newId);
            };
            var newData = {};
            newData.title = title.value;
            newData.author = author.value;
            newData.category = category.value;
            newData.desc = desc.value;
            xhr.send(JSON.stringify(newData));
        });

        title.addEventListener('keypress', function(event) {
            if(((event.keyCode > 65 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 122)) || (event.keyCode > 48 && event.keyCode < 57)){
                console.log(category.value)
            } else {
                event.preventDefault()
            }
        });
        author.addEventListener('keypress', function() {
            if((event.keyCode > 65 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 122) || event.keyCode == 32){
                if (author.value == '' && event.keyCode == 32){
                    event.preventDefault()
                }
            } else {
                console.log(event.keyCode);
                event.preventDefault()
            }
        });
        desc.addEventListener('keypress', function() {
            if (desc.value == '' && event.keyCode == 32){
                event.preventDefault()
            }
        })
    }

    // MESSAGE CONTACT

    let formMessage = document.getElementById('formMessage');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let subject = document.getElementById('subject');
    let messageText = document.getElementById('messageText');
    let subButton = document.getElementById('subButton');

    if (formMessage){

        name.addEventListener('keypress', function (event) {
            if((event.keyCode > 65 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 122) || event.keyCode == 32){
                if (name.value == '' && event.keyCode == 32){
                    event.preventDefault()
                }
            } else {
                console.log(event.keyCode);
                event.preventDefault()
            }
        });
        function setStyle(data) {
            data.style({background: '#2ecc71'})
        }
        email.addEventListener('keyup', function (event) {
            let str = event.currentTarget.value;
            let that = this;
            let patternEmail = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/igm;
            if(patternEmail.test(str)){
                that.style.background = 'lightgreen';
            } else {
                that.style.background = 'lightpink';
            }
            console.log(this.value);
        });

        email.addEventListener('blur', function (event) {
            let str = event.currentTarget.value;
            let that = this;
            let patternEmail = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/igm;
            if(patternEmail.test(str)){
                that.style.background = 'lightgreen';
            } else {
                that.style.background = 'lightpink';
            }
            console.log(this.value);
        });

        subject.addEventListener('keypress', function (event) {
            if((event.keyCode > 65 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 122) || event.keyCode == 32){
                if (subject.value == '' && event.keyCode == 32){
                    event.preventDefault()
                }
                console.log(event.target.value);
            } else {
                console.log(event.keyCode);
                event.preventDefault()
            }
        },true);

        formMessage.addEventListener('submit', function (event) {
            let messageLen = messageText.value.length;
            console.log(messageLen);
            if (messageLen < 20){
                event.preventDefault();
                alert("Message must be more than 20 symbols!")
            } else {
                event.preventDefault();
                let xhr = new XMLHttpRequest();
                xhr.open('POST','/email');
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onload = function() {
                    alert("Thank You for Your message!");
                    window.location.href = '/home';
                };

                let emailData = {};
                emailData.name = name.value;
                emailData.email = email.value;
                emailData.subject = subject.value;
                emailData.messageText = messageText.value;
                xhr.send(JSON.stringify(emailData));

            }
        })
    }

    // RESET PASS

    let resetPass = document.getElementById('reset-pass');
    let loginForResetPass = document.getElementById('login-for-reset');
    if(resetPass){
        resetPass.addEventListener('click', function () {
            let xhr = new XMLHttpRequest();
            xhr.open('POST','/logincheck');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
                if (this.responseText == 'fail'){
                    alert('Username not exist!')
                } else {
                    alert('Check Your Email!');
                    window.location.href = '/home'
                }
            };

            let data = {};
            data.login = loginForResetPass.value;
            xhr.send(JSON.stringify(data));
        })
    }

    let firstPassword = document.getElementById('first-password');
    let secondPassword = document.getElementById('second-password');
    let newPass = document.getElementById('new-pass');
    let loginForPassReset = document.getElementById('pass-reset-login');

    if (newPass) {
        newPass.addEventListener('click', function (event) {
            if(firstPassword.value == secondPassword.value){

                let xhr = new XMLHttpRequest();
                xhr.open('POST','/newpass');
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onload = function() {
                    alert('Password reset! Try to LogIn with new password ');
                    window.location.href = '/home'
                };

                let data = {};
                data.pass = secondPassword.value;
                data.login = loginForPassReset.value;
                xhr.send(JSON.stringify(data));
            } else {
                alert('You have an error in password confirm!')
            }
        })
    }
};