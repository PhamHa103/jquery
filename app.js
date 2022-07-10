function validate(name, birthday, phone) {
    const result = {
        name: true,
        birthday: true,
        phone: true
    }
    if (name.length > 50 || name === "")
        result.name = false;
    const birthdayDate = new Date(birthday);
    const now = new Date();
    if (birthday === "" || now <= birthdayDate || now.getFullYear() - birthdayDate.getFullYear() > 120)
        result.birthday = false;
    if (phone.length != 10 || !/^[0-9]+$/.test(phone))
        result.phone = false;
    return result;
}
function enableOrDisableEditAndDeleteButton(disabled) {
    $("#buttonEdit").prop("disabled", disabled);
    $("#buttonDelete").prop("disabled", disabled);
}

function countCheckedRow() {
    return $("input:checked").length;
}
function onChangeCheckbox(rowId) {
    $(`#${rowId} td:first-child input`).change(function (e) {
        const checked = e.target.checked;
        if (checked) {
            $(`#${rowId} td:first-child input`).attr("checked");
            if (countCheckedRow() === 1) {
                enableOrDisableEditAndDeleteButton(false);
            }

        } else {
            $(`#${rowId} td:first-child input`).removeAttr("checked");
            if (countCheckedRow() === 0) {
                enableOrDisableEditAndDeleteButton(true);
            }
        }
    });
}

function addStudent(name, birthday, phone, hometown) {
    const idOfRow = new Date().getTime();
    const studentRow = `
    <tr id="${idOfRow}">
      <td>
        <input type="checkbox"></input>
      </td>
      <td>${name}</td>
      <td>${birthday}</td>
      <td>${phone}</td>
      <td>${hometown}</td>
    </tr>
    `
    $("#tableBody").append(studentRow);
    onChangeCheckbox(idOfRow);
}
$("#buttonSave").click(function () {
    const name = $("#name").val();
    const birthday = $("#birthday").val();
    const phone = $("#phone").val();
    const hometown = $("#hometown").val();
    const validateResult = validate(name, birthday, phone);
    if (Object.values(validateResult).every(
        function (value) { return value; }
    )) {
        addStudent(name, birthday, phone, hometown);
        $("#buttonReset").click();
        // add or edit
        $("#nameError").hide();
        $("#birthdayError").hide();
        $("#phoneError").hide();
    } else {
        if (!validateResult.name) {
            $("#nameError").show();
        } else {
            $("#nameError").hide();
        }
        if (!validateResult.birthday) {
            $("#birthdayError").show();
        } else {
            $("#birthdayError").hide();
        }
        if (!validateResult.phone) {
            $("#phoneError").show();
        } else {
            $("#phoneError").hide();
        }
    }
})
$("#buttonDelete").click(function () {
    const checkedInputs = $("input:checked");
    for (let index = 0; index < checkedInputs.length; index++) {
        const element = checkedInputs[index];
        const rowElement = $(element).parent().parent();
        $(rowElement).remove();
    }
})



